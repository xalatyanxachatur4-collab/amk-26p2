import React, { useState, useEffect, useRef } from 'react';
import { AnimationController } from './AnimationController.js';
import { useLanguage } from '../../context/LanguageContext.js';
import { Zap, Gauge, ArrowRight, BatteryCharging, RotateCcw, ShieldCheck, Activity, Compass } from 'lucide-react';

export const EVReducerAnimation: React.FC = () => {
  const { language } = useLanguage();

  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [motorRPM, setMotorRPM] = useState(7200);
  const [operatingMode, setOperatingMode] = useState<'accel' | 'cruise' | 'regen' | 'cornering'>('accel');
  const [rotationAngle, setRotationAngle] = useState(0);

  const requestRef = useRef<number>();

  useEffect(() => {
    let lastTime = performance.now();
    const update = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying) {
        // High-speed rotor rotation scale
        const angularVelocity = (motorRPM / 60) * Math.PI * 2 * 0.08 * speed;
        setRotationAngle((prev) => (prev + dt * angularVelocity) % (Math.PI * 2));
      }
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed, motorRPM]);

  // Two-stage compound helical reduction gear specifications:
  // Stage 1: Motor Pinion Z1 = 18 teeth, Intermediate Gear Z2 = 54 teeth -> i1 = 3.0:1
  // Stage 2: Intermediate Pinion Z3 = 20 teeth, Final Ring Bull Gear Z4 = 60 teeth -> i2 = 3.0:1
  // Total Fixed Reduction Ratio: i_total = i1 * i2 = 3.0 * 3.0 = 9.0:1
  const totalReductionRatio = 9.0;
  const wheelRPM = Math.round(motorRPM / totalReductionRatio);
  const motorNominalTorque = 320; // N·m
  const wheelTorque = Math.round(motorNominalTorque * totalReductionRatio * 0.984); // 98.4% efficiency
  const vehicleSpeedKmh = Math.round((wheelRPM * 60 * (Math.PI * 0.65)) / 1000); // 0.65m tire diameter

  // Rotation angles:
  // Motor shaft = rotationAngle
  // Countershaft = -rotationAngle / 3.0
  // Final drive differential bull gear = rotationAngle / 9.0
  const isRegen = operatingMode === 'regen';
  const effectiveDirection = isRegen ? -1 : 1;
  const motorAngle = rotationAngle * effectiveDirection;
  const counterAngle = -motorAngle / 3.0;
  const diffAngle = motorAngle / totalReductionRatio;

  // Wheel angles during cornering mode:
  // Left inner wheel is 0.7x speed, Right outer wheel is 1.3x speed
  const isCornering = operatingMode === 'cornering';
  const leftWheelAngle = isCornering ? diffAngle * 0.7 : diffAngle;
  const rightWheelAngle = isCornering ? diffAngle * 1.3 : diffAngle;

  const modeDescriptions: Record<
    'accel' | 'cruise' | 'regen' | 'cornering',
    { title: string; desc: { en: string; ru: string; hy: string }; badge: string; color: string }
  > = {
    accel: {
      title: 'Launch & Acceleration (Тяговый разгон)',
      badge: 'HIGH TORQUE LAUNCH',
      color: '#38bdf8',
      desc: {
        en: 'Electric motor delivers 100% peak torque instantaneously from 0 RPM. The 9:1 single-speed reduction multiplies 320 N·m of motor torque into 2,834 N·m at the drive wheels.',
        ru: 'Электромотор развивает пиковый крутящий момент прямо с 0 об/мин. Двухступенчатый редуктор 9:1 умножает 320 Н·м момента электромотора до 2834 Н·м на колесах.',
        hy: 'Էլեկտրաշարժիչը 0 պտույտից ապահովում է առավելագույն մոմենտ: 9:1 ռեդուկտորը 320 Ն·մ մոմենտը բազմապատկում է մինչև 2834 Ն·մ անիվների վրա:',
      },
    },
    cruise: {
      title: 'High-Speed Highway Cruise (Трассовый круиз)',
      badge: '98.4% HIGH SPEED EFFICIENCY',
      color: '#34d399',
      desc: {
        en: 'At highway speeds, the electric motor spins smoothly at up to 16,000–18,000 RPM. Single-speed reduction operates with virtually zero hydraulic drag and >98% mechanical efficiency.',
        ru: 'На трассе электромотор раскручивается до 16 000–18 000 об/мин. Одноступенчатый редуктор работает с минимальными потерями на трение без гидравлических насосов.',
        hy: 'Մայրուղում շարժիչը պտտվում է մինչև 16000–18000 պտ/ր: Ռեդուկտորը գործում է 98%-ից բարձր մեխանիկական օգտակար գործողության գործակցով:',
      },
    },
    regen: {
      title: 'Regenerative Braking (Рекуперативное торможение)',
      badge: 'REVERSE KINETIC ENERGY FLOW',
      color: '#10b981',
      desc: {
        en: 'Vehicle momentum drives the road wheels back through the reducer, spinning the electric motor as a generator and converting kinetic energy into battery recharge current.',
        ru: 'Инерция автомобиля вращает колеса, через редуктор раскручивая электромотор. Мотор работает в режиме 3-фазного генератора, заряжая тяговую батарею.',
        hy: 'Ավտոմեքենայի իներցիան պտտում է անիվները՝ ռեդուկտորի միջոցով շարժիչը վերածելով գեներատորի և լիցքավորելով մարտկոցը:',
      },
    },
    cornering: {
      title: 'Cornering Differential Action (Дифференциал в повороте)',
      badge: 'TORQUE SPLIT WITHOUT BINDING',
      color: '#a855f7',
      desc: {
        en: 'Integrated open bevel differential allows the outer drive wheel to spin faster than the inner wheel around curves while maintaining smooth, continuous torque delivery.',
        ru: 'Встроенный конический дифференциал позволяет внешнему колесу вращаться быстрее внутреннего в повороте без паразитных механических нагрузок в приводе.',
        hy: 'Ինտեգրված կոնական դիֆերենցիալը թույլ է տալիս արտաքին անիվին պտտվել ավելի արագ, քան ներքին անիվը՝ առանց քարշուժի կորստի:',
      },
    },
  };

  const currentMode = modeDescriptions[operatingMode];

  return (
    <div className="w-full space-y-6">
      {/* 1. Technical SVG Visualization */}
      <div className="relative w-full h-[450px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center p-3 select-none">
        <svg viewBox="0 0 760 410" className="w-full h-full max-w-4xl">
          <defs>
            <linearGradient id="evMotorGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <radialGradient id="helicalPinionGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </radialGradient>
            <radialGradient id="bullGearGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </radialGradient>
            <filter id="regenGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#10b981" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Background Technical Grid */}
          <g stroke="#1e293b" strokeWidth="0.5" opacity="0.6">
            {Array.from({ length: 19 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="410" />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 40} x2="760" y2={i * 40} />
            ))}
          </g>

          {/* Housing Boundary */}
          <rect x="30" y="30" width="700" height="345" rx="18" fill="none" stroke="#334155" strokeWidth="2.5" strokeDasharray="8,6" />
          <text x="50" y="55" fill="#64748b" fontSize="11" fontFamily="monospace" fontWeight="bold">
            INTEGRATED EV DRIVE UNIT: MOTOR + 9:1 SINGLE-SPEED REDUCER + DIFFERENTIAL
          </text>

          {/* ========================================================================= */}
          {/* SECTION 1: ELECTRIC TRACTION MOTOR (LEFT, X = 130, Y = 145) */}
          {/* ========================================================================= */}
          <g transform="translate(130, 145)">
            {/* Ribbed Motor Housing */}
            <rect x="-80" y="-85" width="160" height="170" rx="14" fill="url(#evMotorGrad)" stroke="#38bdf8" strokeWidth="2.5" />
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1="-70 + i * 20" y1="-85" x2="-70 + i * 20" y2="85" stroke="#0284c7" strokeWidth="2" opacity="0.5" />
            ))}

            {/* High-Voltage Cable Connectors (Orange 400V/800V) */}
            <path d="M -50 -85 L -50 -115 L -20 -115" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
            <path d="M -30 -85 L -30 -115 L 0 -115" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
            <path d="M -10 -85 L -10 -115 L 20 -115" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />

            {/* High-Speed Motor Rotor Shaft & Input Pinion Z1 = 18 */}
            <g transform={`rotate(${(motorAngle * 180) / Math.PI})`}>
              <circle r="42" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
              {/* Helical teeth on input pinion */}
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1="-36"
                  x2="0"
                  y2="-48"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  transform={`rotate(${(i * 360) / 12})`}
                />
              ))}
              <circle cx="0" cy="0" r="16" fill="#0284c7" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke="#ffffff" strokeWidth="2.5" />
            </g>

            <text x="0" y="105" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
              ROTOR PINION (Z=18)
            </text>
            <text x="0" y="120" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">
              UP TO 18,000 RPM
            </text>
          </g>

          {/* ========================================================================= */}
          {/* SECTION 2: INTERMEDIATE COUNTERSHAFT REDUCTION PAIR (X = 275, Y = 220) */}
          {/* ========================================================================= */}
          <g transform="translate(275, 220)">
            {/* Intermediate Driven Gear Z2 = 54 (Meshes with motor pinion Z1, Radius R = 64) */}
            <g transform={`rotate(${(counterAngle * 180) / Math.PI})`}>
              <circle r="64" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1="-58"
                  x2="0"
                  y2="-70"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  transform={`rotate(${(i * 360) / 24})`}
                />
              ))}

              {/* Smaller Intermediate Pinion Z3 = 20 (Coaxial on same countershaft, R = 32) */}
              <circle r="32" fill="url(#helicalPinionGrad)" stroke="#f59e0b" strokeWidth="2.5" />
              {Array.from({ length: 14 }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1="-28"
                  x2="0"
                  y2="-38"
                  stroke="#fef08a"
                  strokeWidth="2.5"
                  transform={`rotate(${(i * 360) / 14})`}
                />
              ))}
              <circle cx="0" cy="0" r="10" fill="#0f172a" />
            </g>

            <text x="0" y="86" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
              INTERMEDIATE GEAR (Z=54)
            </text>
            <text x="0" y="100" fill="#f59e0b" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
              PINION (Z=20) • 3.0:1 STEP 1
            </text>
          </g>

          {/* ========================================================================= */}
          {/* SECTION 3: FINAL DRIVE HELICAL BULL GEAR & DIFFERENTIAL (X = 490, Y = 220) */}
          {/* ========================================================================= */}
          <g transform="translate(490, 220)">
            {/* Bull Ring Gear Z4 = 60 (Meshes with intermediate pinion Z3, Radius R = 85) */}
            <g transform={`rotate(${(diffAngle * 180) / Math.PI})`}>
              <circle r="88" fill="#1e293b" stroke="#f59e0b" strokeWidth="4" />
              {Array.from({ length: 30 }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1="-80"
                  x2="0"
                  y2="-94"
                  stroke="#fbbf24"
                  strokeWidth="3.5"
                  transform={`rotate(${(i * 360) / 30})`}
                />
              ))}

              {/* Open Bevel Differential Carrier Window */}
              <circle r="52" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2.5" />
              {/* Spider Bevel Pinions inside diff */}
              <circle cx="0" cy="-32" r="14" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="0" cy="32" r="14" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="-32" cy="0" r="14" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="32" cy="0" r="14" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
            </g>

            <text x="0" y="115" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
              FINAL BULL GEAR (Z=60)
            </text>
            <text x="0" y="130" fill="#34d399" fontSize="9" textAnchor="middle" fontFamily="monospace">
              TOTAL RATIO: 9.00:1 (OVERALL)
            </text>

            {/* Left Axle Output (Upwards to Left Road Wheel) */}
            <g transform="translate(0, -115)">
              <rect x="-8" y="-45" width="16" height="45" fill="#334155" stroke="#38bdf8" strokeWidth="2" />
              {/* Left Road Wheel & Tire */}
              <rect x="-24" y="-85" width="48" height="40" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="3" />
              <g transform={`rotate(${(leftWheelAngle * 180) / Math.PI})`}>
                <line x1="0" y1="-75" x2="0" y2="-55" stroke="#38bdf8" strokeWidth="3" />
              </g>
              <text x="-32" y="-62" fill="#38bdf8" fontSize="9" textAnchor="end" fontWeight="bold">
                LEFT WHEEL {isCornering && '(INNER)'}
              </text>
            </g>

            {/* Right Axle Output (Downwards to Right Road Wheel) */}
            <g transform="translate(0, 115)">
              <rect x="-8" y="0" width="16" height="45" fill="#334155" stroke="#f97316" strokeWidth="2" />
              {/* Right Road Wheel & Tire */}
              <rect x="-24" y="45" width="48" height="40" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="3" />
              <g transform={`rotate(${(rightWheelAngle * 180) / Math.PI})`}>
                <line x1="0" y1="55" x2="0" y2="75" stroke="#f97316" strokeWidth="3" />
              </g>
              <text x="32" y="68" fill="#f97316" fontSize="9" textAnchor="start" fontWeight="bold">
                RIGHT WHEEL {isCornering && '(OUTER)'}
              </text>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* SECTION 4: POWER & FLUX FLOW DIRECTION ARROWS */}
          {/* ========================================================================= */}
          {isPlaying && (
            <path
              d={
                isRegen
                  ? 'M 490 320 L 490 220 L 275 220 L 130 145'
                  : 'M 130 145 L 275 220 L 490 220 L 490 320'
              }
              fill="none"
              stroke={isRegen ? '#10b981' : '#38bdf8'}
              strokeWidth="4"
              strokeDasharray="8,6"
              strokeLinecap="round"
              filter={isRegen ? 'url(#regenGlow)' : undefined}
              className="animate-pulse"
            />
          )}

          {/* Fixed Ratio Telemetry Badge on SVG */}
          <rect x="50" y="325" width="220" height="34" rx="8" fill="#0f172a" stroke="#334155" />
          <text x="62" y="347" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
            RATIO: 9.00:1 (FIXED)
          </text>
        </svg>
      </div>

      {/* 2. Real-time Engineering Telemetry Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            EV Motor Rotor RPM
          </span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400">
              {motorRPM}
            </span>
            <span className="text-xs text-slate-400">RPM</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            {motorRPM > 12000 ? 'Высокооборотный режим' : 'Номинальная скорость'}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Wheel Hub Speed
          </span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xl font-extrabold text-amber-500">
              {wheelRPM}
            </span>
            <span className="text-xs text-slate-400">RPM</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            Скорость: ~{vehicleSpeedKmh} км/ч
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Wheel Output Torque
          </span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xl font-extrabold text-emerald-500">
              {wheelTorque}
            </span>
            <span className="text-xs text-slate-400">N·m</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            Тяга умножена в 9.0×
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Mechanical Efficiency
          </span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400">
              98.4%
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            Без гидравлических потерь
          </span>
        </div>
      </div>

      {/* 3. EV Operating Modes Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase font-bold text-slate-400 mr-2">
            Режимы работы электропривода:
          </span>
          {(['accel', 'cruise', 'regen', 'cornering'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setOperatingMode(m)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shadow-sm ${
                operatingMode === m
                  ? 'bg-cyan-500 text-white shadow-cyan-500/25 ring-2 ring-cyan-500/50 scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {m === 'accel' ? 'Launch (Разгон)' : m === 'cruise' ? 'Highway (Круиз)' : m === 'regen' ? 'Regen (Рекуперация)' : 'Diff Cornering (Поворот)'}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {currentMode.badge}
        </span>
      </div>

      {/* 4. Motor RPM Slider */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-bold font-mono text-slate-700 dark:text-slate-300">
          <span>Частота вращения ротора электромотора (Motor RPM):</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-extrabold">{motorRPM} RPM</span>
        </div>
        <input
          type="range"
          min="1000"
          max="18000"
          step="200"
          value={motorRPM}
          onChange={(e) => setMotorRPM(Number(e.target.value))}
          className="w-full accent-cyan-500"
        />
      </div>

      {/* Animation Controller */}
      <AnimationController
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onReset={() => {
          setRotationAngle(0);
          setIsPlaying(false);
        }}
        speed={speed}
        onSpeedChange={setSpeed}
        captionTitle={currentMode.title}
        captionDescription={currentMode.desc[language] || currentMode.desc.en}
      />

      {/* 5. Comprehensive Technical Explanation Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold font-mono text-xs uppercase tracking-wider">
          <Zap className="w-4 h-4" />
          <span>Почему электромобилям не нужна многоступенчатая коробка передач?</span>
        </div>

        <p>
          <strong className="text-slate-900 dark:text-white">Широкий диапазон тяги и оборотов электромотора:</strong> Двигатель внутреннего сгорания выдает максимальный момент только в узком диапазоне (например, от 2500 до 4500 об/мин), поэтому ему необходимо 6–10 передач. Тяговый электромотор (PMSM/AC-Induction), напротив, генерирует 100% крутящего момента прямо с 0 об/мин и эффективно крутится вплоть до 18 000–20 000 об/мин.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400">
              Компактный двухступенчатый редуктор 9:1
            </h4>
            <p className="text-xs">
              Вместо сотен подвижных деталей сложной КПП используется простая пара косозубых шестерен. Фиксированное передаточное число ~9:1 умножает скромные 300 Н·м мотора до внушительных 2700 Н·м на осях колес, обеспечивая разгон до 100 км/ч за 3–5 секунд.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs font-mono uppercase text-emerald-500">
              КПД выше 98% и двусторонняя передача энергии
            </h4>
            <p className="text-xs">
              В редукторе электрокара нет фрикционов в масляной ванне, гидротрансформаторов и насосов высокого давления. При торможении кинетическая энергия колес свободно течет в обратную сторону, превращая электромотор в генератор (рекуперация).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
