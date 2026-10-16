import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, BatteryCharging, Gauge, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.js';

type EVOperatingMode = 'drive' | 'cruise' | 'regen';

export const EVMotorAnimation: React.FC = () => {
  const { t, language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [mode, setMode] = useState<EVOperatingMode>('drive');
  const [angle, setAngle] = useState(0); // Electrical angle in radians

  const requestRef = useRef<number>();

  useEffect(() => {
    let lastTime = performance.now();
    const update = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying) {
        // In regen mode, rotor leads and drives stator; in drive mode, stator leads rotor
        const direction = mode === 'regen' ? -1 : 1;
        const spinSpeed = mode === 'cruise' ? 2.5 : mode === 'drive' ? 3.5 : 2.0;
        setAngle((prev) => (prev + direction * dt * speed * spinSpeed) % (Math.PI * 2));
      }
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed, mode]);

  const safeAngle = Number.isFinite(angle) ? angle : 0;
  const normalizedAngle = ((safeAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

  // Torque angle delta:
  // Drive mode: Stator magnetic field leads rotor by ~45 degrees
  // Cruise mode: Stator and rotor are synchronous (~5 degrees)
  // Regen mode: Rotor leads stator (negative torque angle)
  const torqueAngle = mode === 'drive' ? 0.75 : mode === 'cruise' ? 0.1 : -0.75;
  const statorFluxAngle = normalizedAngle + torqueAngle;
  const rotorAngle = normalizedAngle;

  // 3-Phase instantaneous AC currents:
  // Phase U: sin(statorFluxAngle)
  // Phase V: sin(statorFluxAngle - 2*PI/3)
  // Phase W: sin(statorFluxAngle - 4*PI/3)
  const currentU = Math.sin(statorFluxAngle);
  const currentV = Math.sin(statorFluxAngle - (2 * Math.PI) / 3);
  const currentW = Math.sin(statorFluxAngle - (4 * Math.PI) / 3);

  // Stator coil coordinates (6 pairs / 12 coils around radius 140)
  const statorRadius = 135;
  const statorCoils = Array.from({ length: 12 }).map((_, i) => {
    const coilAngle = (i * Math.PI) / 6;
    const phaseIndex = i % 3; // 0 = U, 1 = V, 2 = W
    const phaseName = phaseIndex === 0 ? 'U' : phaseIndex === 1 ? 'V' : 'W';
    const current = phaseIndex === 0 ? currentU : phaseIndex === 1 ? currentV : currentW;
    const isNorth = current > 0;
    const intensity = Math.abs(current);

    return {
      x: 250 + statorRadius * Math.sin(coilAngle),
      y: 200 - statorRadius * Math.cos(coilAngle),
      angle: coilAngle,
      phaseName,
      phaseIndex,
      intensity,
      isNorth,
    };
  });

  // Rotor pole count = 8 poles (4 pairs of N-S permanent magnets)
  const rotorRadius = 85;
  const rotorPoles = Array.from({ length: 8 }).map((_, i) => {
    const poleAngle = (i * Math.PI) / 4 + rotorAngle;
    const isNorth = i % 2 === 0;
    return {
      x: 250 + (rotorRadius - 18) * Math.sin(poleAngle),
      y: 200 - (rotorRadius - 18) * Math.cos(poleAngle),
      angle: poleAngle,
      isNorth,
      label: isNorth ? 'N' : 'S',
    };
  });

  // Multilingual mode text
  const labels = {
    en: {
      title: 'EV Permanent Magnet Synchronous Motor (PMSM) & Inverter',
      subtitle: '3-Phase Rotating Magnetic Field (RMF) Electrodynamics & Energy Flow',
      drive: '1. Acceleration / Torque Drive',
      cruise: '2. Synchronous Cruise',
      regen: '3. Regenerative Braking',
      driveDesc: 'Inverter converts HV battery DC into 3-phase sinusoidal AC. The rotating stator magnetic field leads the rotor magnets, exerting Lorentz torque to accelerate the vehicle.',
      cruiseDesc: 'The rotor is locked synchronously to the rotating magnetic field with minimal slip. System achieves peak electromagnetic efficiency exceeding 96%.',
      regenDesc: 'Driver lifts throttle or presses brake. Vehicle momentum spins the rotor through stator coils, inducing counter-electromotive force (Back-EMF). Inverter rectifies AC to DC to recharge the battery.',
      powerFlow: 'Power Flow:',
      batteryToWheels: 'Battery Pack (400V DC) → Inverter (3-Phase AC) → Stator RMF → Rotor Torque → Wheels',
      wheelsToBattery: 'Wheels Kinetic Inertia → Rotor Generator → Stator Coils (AC) → Inverter (Rectifier) → Battery Recharge',
      statorFlux: 'Stator Flux Vector (RMF)',
      rotorPolesLabel: 'Permanent Magnet Rotor',
      phaseScope: 'Real-Time 3-Phase Sinusoidal Waveforms (120° Phase Shift)',
      telemetry: 'Motor Telemetry & Physics Metrics',
      voltage: 'DC Bus Voltage',
      current: 'RMS Inverter Current',
      efficiency: 'Drive Efficiency',
      torque: 'Electromagnetic Torque',
      backEmf: 'Back-EMF Voltage',
    },
    hy: {
      title: 'Էլեկտրամոբիլի սինխրոն շարժիչ (PMSM) և ինվերտոր',
      subtitle: 'Եռաֆազ պտտվող մագնիսական դաշտի էլեկտրադինամիկա և էներգիայի հոսք',
      drive: '1. Քարշային ռեժիմ (Արագացում)',
      cruise: '2. Համաժամանակյա կրուիզ',
      regen: '3. Ռեգեներատիվ արգելակում',
      driveDesc: 'Ինվերտորը մարտկոցի հաստատուն հոսանքը վերածում է եռաֆազ փոփոխականի: Ստատորի պտտվող մագնիսական դաշտն առաջ է ընկնում ռոտորից՝ առաջացնելով ակնթարթային ոլորող մոմենտ:',
      cruiseDesc: 'Ռոտորը պտտվում է ստատորի դաշտի հետ կատարյալ համաժամանակյա: Շարժիչի օգտակար գործողության գործակիցը (ՕԳԳ) գերազանցում է 96%-ը:',
      regenDesc: 'Մեքենայի իներցիան պտտում է ռոտորը, որը գործում է որպես գեներատոր: Գեներացված հոսանքը ինվերտորով վերածվում է հաստատունի և լիցքավորում մարտկոցը:',
      powerFlow: 'Էներգիայի հոսք:',
      batteryToWheels: 'Մարտկոց (400V DC) → Ինվերտոր (եռաֆազ AC) → Ստատորի դաշտ → Ռոտորի մոմենտ → Անիվներ',
      wheelsToBattery: 'Անիվների կինետիկ էներգիա → Ռոտոր-գեներատոր → Ստատոր (AC) → Ինվերտոր (ուղղիչ) → Մարտկոցի լիցքավորում',
      statorFlux: 'Ստատորի պտտվող մագնիսական վեկտոր',
      rotorPolesLabel: 'Մշտական մագնիսներով ռոտոր',
      phaseScope: 'Եռաֆազ սինուսոիդալ հոսանքներ (120° փուլային շեղում)',
      telemetry: 'Շարժիչի հիմնական պարամետրեր',
      voltage: 'Մարտկոցի լարում',
      current: 'Ինվերտորի հոսանք',
      efficiency: 'ՕԳԳ (Էֆեկտիվություն)',
      torque: 'Ոլորող մոմենտ',
      backEmf: 'Հակա-ԷԼՇ լարում',
    },
    ru: {
      title: 'Синхронный тяговый электромотор (PMSM) и инвертор',
      subtitle: 'Электродинамика 3-фазного вращающегося магнитного поля и рекуперация',
      drive: '1. Тяговый режим (Разгон)',
      cruise: '2. Синхронный круиз',
      regen: '3. Рекуперативное торможение',
      driveDesc: 'Инвертор преобразует DC напряжение высоковольтной батареи в 3-фазный синусоидальный AC ток. Вращающееся поле статора опережает ротор, создавая максимальный крутящий момент с 0 об/мин.',
      cruiseDesc: 'Ротор вращается строго синхронно с полем статора с нулевым скольжением. Электромагнитный КПД силовой установки превышает 96%.',
      regenDesc: 'При торможении инерция автомобиля крутит ротор, превращая мотор в генератор. Наводимая противо-ЭДС выпрямляется инвертором и возвращает киловатты обратно в тяговую батарею.',
      powerFlow: 'Поток энергии:',
      batteryToWheels: 'Тяговая батарея (400В DC) → Инвертор (3-фазный AC) → Поле статора → Момент ротора → Колеса',
      wheelsToBattery: 'Кинетическая энергия колес → Ротор-генератор → Статор (AC) → Инвертор (выпрямитель) → Зарядка батареи',
      statorFlux: 'Вектор поля статора (ВМП)',
      rotorPolesLabel: 'Ротор с постоянными магнитами NdFeB',
      phaseScope: 'Осциллограмма 3-фазного тока (сдвиг фаз 120°)',
      telemetry: 'Телеметрия и физические показатели',
      voltage: 'Напряжение DC шины',
      current: 'Фазный ток инвертора',
      efficiency: 'Электромагнитный КПД',
      torque: 'Крутящий момент',
      backEmf: 'Противо-ЭДС генератора',
    },
  };

  const text = labels[language as keyof typeof labels] || labels.en;

  const currentCaption =
    mode === 'drive' ? text.driveDesc : mode === 'cruise' ? text.cruiseDesc : text.regenDesc;

  return (
    <div className="w-full space-y-4">
      {/* Operating Mode Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
          <button
            onClick={() => setMode('drive')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'drive'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{text.drive}</span>
          </button>

          <button
            onClick={() => setMode('cruise')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'cruise'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{text.cruise}</span>
          </button>

          <button
            onClick={() => setMode('regen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'regen'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BatteryCharging className="w-3.5 h-3.5" />
            <span>{text.regen}</span>
          </button>
        </div>

        {/* Playback Controls & Speed Slider */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={() => {
              setAngle(0);
              setIsPlaying(false);
            }}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
            <Gauge className="w-4 h-4 text-cyan-500" />
            <input
              type="range"
              min="0.25"
              max="2.5"
              step="0.25"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-20 accent-cyan-500 cursor-pointer"
            />
            <span className="w-8 font-semibold">{speed}x</span>
          </div>
        </div>
      </div>

      {/* Main 2D Technical SVG Simulation Stage */}
      <div className="relative w-full h-[440px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2 shadow-2xl">
        <svg viewBox="0 0 500 400" className="w-full h-full max-w-xl select-none">
          <defs>
            {/* Stator Core Radial Gradient */}
            <radialGradient id="statorGrad" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#1e293b" />
              <stop offset="85%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
            </radialGradient>
            {/* Rotor Core Radial Gradient */}
            <radialGradient id="rotorGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="70%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </radialGradient>
            {/* Magnetic Flux Glow */}
            <filter id="fluxGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Grid Pattern */}
          <line x1="250" y1="20" x2="250" y2="380" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="70" y1="200" x2="430" y2="200" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4" />

          {/* 1. OUTER STATOR LAMINATED RING */}
          <circle cx="250" cy="200" r="165" fill="none" stroke="#334155" strokeWidth="2" />
          <circle cx="250" cy="200" r="150" fill="url(#statorGrad)" stroke="#475569" strokeWidth="2.5" />
          <circle cx="250" cy="200" r="110" fill="#090d16" stroke="#334155" strokeWidth="1.5" />

          {/* Stator Slot Teeth & Copper Coils */}
          {statorCoils.map((coil, idx) => {
            const phaseColor =
              coil.phaseIndex === 0 ? '#ef4444' : coil.phaseIndex === 1 ? '#10b981' : '#3b82f6';

            return (
              <g key={idx} transform={`translate(${coil.x}, ${coil.y}) rotate(${(coil.angle * 180) / Math.PI})`}>
                {/* Copper Coil Tooth */}
                <rect
                  x="-9"
                  y="-12"
                  width="18"
                  height="24"
                  rx="4"
                  fill={phaseColor}
                  opacity={0.35 + coil.intensity * 0.65}
                  stroke={coil.intensity > 0.6 ? '#ffffff' : phaseColor}
                  strokeWidth={coil.intensity > 0.6 ? 2 : 1}
                  filter={coil.intensity > 0.7 ? 'url(#fluxGlow)' : undefined}
                />
                {/* Phase Identification Label */}
                <text
                  x="0"
                  y="4"
                  fill="#ffffff"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {coil.phaseName}
                </text>
              </g>
            );
          })}

          {/* 2. DYNAMIC ROTATING MAGNETIC FIELD FLUX VECTOR (Stator) */}
          <g transform={`translate(250, 200) rotate(${(statorFluxAngle * 180) / Math.PI})`}>
            {/* Magnetic Field Line Ellipse */}
            <ellipse
              cx="0"
              cy="0"
              rx="95"
              ry="45"
              fill="none"
              stroke={mode === 'regen' ? '#f59e0b' : '#38bdf8'}
              strokeWidth="2"
              strokeDasharray="6,4"
              opacity="0.75"
            />
            {/* Vector Arrow pointing North of Stator Flux */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-102"
              stroke={mode === 'regen' ? '#f59e0b' : '#38bdf8'}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <polygon
              points="0,-115 -8,-100 8,-100"
              fill={mode === 'regen' ? '#f59e0b' : '#38bdf8'}
            />
          </g>

          {/* 3. INTERIOR PERMANENT MAGNET (IPM) ROTOR */}
          <g transform={`translate(250, 200) rotate(${(rotorAngle * 180) / Math.PI})`}>
            {/* Rotor Electrical Steel Laminate Core */}
            <circle cx="0" cy="0" r={rotorRadius} fill="url(#rotorGrad)" stroke="#64748b" strokeWidth="2" />

            {/* Embedded V-Shape Neodymium Magnets */}
            {Array.from({ length: 8 }).map((_, i) => {
              const pAngle = (i * Math.PI) / 4;
              const isNorth = i % 2 === 0;
              return (
                <g key={i} transform={`rotate(${(pAngle * 180) / Math.PI}) translate(0, -60)`}>
                  <rect
                    x="-14"
                    y="-8"
                    width="28"
                    height="16"
                    rx="3"
                    fill={isNorth ? '#dc2626' : '#2563eb'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <text
                    x="0"
                    y="4"
                    fill="#ffffff"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="extrabold"
                    textAnchor="middle"
                  >
                    {isNorth ? 'N' : 'S'}
                  </text>
                </g>
              );
            })}

            {/* Rotor Center Driveshaft */}
            <circle cx="0" cy="0" r="28" fill="#0f172a" stroke="#0ea5e9" strokeWidth="3" />
            {/* Spline Keyways */}
            <circle cx="0" cy="0" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="0" y1="-28" x2="0" y2="28" stroke="#38bdf8" strokeWidth="2.5" />
            <line x1="-28" y1="0" x2="28" y2="0" stroke="#38bdf8" strokeWidth="2.5" />
          </g>

          {/* 4. REAL-TIME TECHNICAL LABELS & VECTOR CALLOUTS */}
          <text x="25" y="32" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
            MODE: {mode.toUpperCase()}
          </text>
          <text x="25" y="50" fill="#94a3b8" fontSize="11" fontFamily="monospace">
            ROTOR SPEED: {Math.round(speed * (mode === 'drive' ? 8400 : mode === 'cruise' ? 5200 : 3800))} RPM
          </text>
          <text x="25" y="68" fill={mode === 'regen' ? '#f59e0b' : '#38bdf8'} fontSize="11" fontFamily="monospace">
            TORQUE ANGLE (δ): {Math.round((torqueAngle * 180) / Math.PI)}°
          </text>

          {/* Inverter Connection Legend (Bottom Right) */}
          <g transform="translate(320, 290)">
            <rect x="0" y="0" width="165" height="95" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <text x="12" y="20" fill="#e2e8f0" fontSize="10" fontFamily="monospace" fontWeight="bold">
              INVERTER STAGE (SiC)
            </text>
            <text x="12" y="38" fill="#ef4444" fontSize="9" fontFamily="monospace">
              • Phase U: {(currentU * 280).toFixed(0)} A
            </text>
            <text x="12" y="54" fill="#10b981" fontSize="9" fontFamily="monospace">
              • Phase V: {(currentV * 280).toFixed(0)} A
            </text>
            <text x="12" y="70" fill="#3b82f6" fontSize="9" fontFamily="monospace">
              • Phase W: {(currentW * 280).toFixed(0)} A
            </text>
            <text x="12" y="86" fill={mode === 'regen' ? '#f59e0b' : '#06b6d4'} fontSize="9" fontFamily="monospace" fontWeight="bold">
              {mode === 'regen' ? '◄ CHARGING BATTERY' : '► MOTORING DRIVE'}
            </text>
          </g>
        </svg>
      </div>

      {/* Synchronized Explanation & Energy Flow Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-500" />
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
            {text.title}
          </h4>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
          {currentCaption}
        </p>

        {/* Real-time Energy Flow Strip */}
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 text-[11px] font-mono flex items-center gap-2">
          <span className="font-bold text-cyan-600 dark:text-cyan-400 whitespace-nowrap">
            {text.powerFlow}
          </span>
          <span className="text-slate-700 dark:text-slate-300">
            {mode === 'regen' ? text.wheelsToBattery : text.batteryToWheels}
          </span>
        </div>
      </div>

      {/* Real-Time Telemetry & Engineering Physics Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">{text.voltage}</span>
          <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">
            {mode === 'regen' ? '418 V (Charging)' : '392 V (Under Load)'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">{text.torque}</span>
          <span className="text-sm font-mono font-bold text-cyan-600 dark:text-cyan-400">
            {mode === 'drive' ? '380 N·m (Peak)' : mode === 'cruise' ? '85 N·m (Steady)' : '-190 N·m (Regen)'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">{text.efficiency}</span>
          <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">
            {mode === 'cruise' ? '97.2%' : mode === 'drive' ? '94.8%' : '91.5%'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">{text.backEmf}</span>
          <span className="text-sm font-mono font-bold text-amber-600 dark:text-amber-400">
            {mode === 'regen' ? '385 V AC' : '310 V AC'}
          </span>
        </div>
      </div>
    </div>
  );
};
