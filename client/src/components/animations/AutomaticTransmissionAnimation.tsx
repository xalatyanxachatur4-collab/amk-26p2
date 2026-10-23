import React, { useState, useEffect, useRef } from 'react';
import { AnimationController } from './AnimationController.js';
import { useLanguage } from '../../context/LanguageContext.js';
import { Cog, Droplets, Gauge, Shield, Layers, ArrowRight, Activity, Zap } from 'lucide-react';

export const AutomaticTransmissionAnimation: React.FC = () => {
  const { language } = useLanguage();

  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [engineRPM, setEngineRPM] = useState(2200);
  const [selectedGear, setSelectedGear] = useState<'1st' | '2nd' | 'Direct' | 'OD' | 'R'>('1st');
  const [lockupEnabled, setLockupEnabled] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const requestRef = useRef<number>();

  useEffect(() => {
    let lastTime = performance.now();
    const update = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying) {
        const angularVelocity = (engineRPM / 60) * Math.PI * 2 * 0.12 * speed;
        setRotationAngle((prev) => (prev + dt * angularVelocity) % (Math.PI * 2));
      }
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed, engineRPM]);

  // Gearbox planetary characteristics:
  // Sun gear teeth Z_s = 28, Ring gear teeth Z_r = 72
  // 1st Gear (Underdrive): Sun driven, Ring held -> i = 1 + (72 / 28) = 3.57
  // 2nd Gear: Ring driven, Sun held -> i = 1 + (28 / 72) = 1.39
  // Direct: Sun & Ring locked together -> i = 1.00
  // Overdrive: Carrier driven, Sun held -> i = 1 / (1 + 28/72) = 0.72
  // Reverse: Carrier held, Sun driven -> i = - (72 / 28) = -2.57
  const gearProfiles: Record<
    '1st' | '2nd' | 'Direct' | 'OD' | 'R',
    {
      ratio: number;
      label: string;
      heldComponent: string;
      drivenComponent: string;
      desc: { en: string; ru: string; hy: string };
      color: string;
    }
  > = {
    '1st': {
      ratio: 3.57,
      label: '1st Gear (Понижающая / Тормоз коронной шестерни)',
      heldComponent: 'Коронная шестерня (зажата тормозной лентой B1)',
      drivenComponent: 'Солнечная шестерня (вращается от турбины)',
      desc: {
        en: 'Sun gear driven, Ring gear held stationary by brake band. Planet carrier rotates at 3.57x reduction, multiplying torque for launching.',
        ru: 'Солнечная шестерня приводится во вращение, коронная шестерня остановлена тормозной лентой. Водило вращается с замедлением в 3.57 раза, умножая тягу.',
        hy: 'Արևային ատամնանիվը պտտվում է, պսակաձևն անշարժ է: Սատելիտների լծակը պտտվում է 3.57 անգամ ցածր արագությամբ՝ բազմապատկելով մոմենտը:',
      },
      color: '#38bdf8',
    },
    '2nd': {
      ratio: 1.39,
      label: '2nd Gear (Промежуточная / Тормоз солнечной шестерни)',
      heldComponent: 'Солнечная шестерня (зажата лентой B2)',
      drivenComponent: 'Коронная шестерня (вращается от входного вала)',
      desc: {
        en: 'Ring gear driven, Sun gear held by brake band. Planet pinions walk around stationary sun, driving carrier at 1.39:1 ratio.',
        ru: 'Коронная шестерня приводится от мотора, солнечная заблокирована. Сателлиты обкатывают солнце, вращая водило с передаточным числом 1.39:1.',
        hy: 'Պսակաձև ատամնանիվը շարժվում է շարժիչից, արևայինն արգելակված է: Փոխանցման թիվը՝ 1.39:1:',
      },
      color: '#60a5fa',
    },
    Direct: {
      ratio: 1.0,
      label: '3rd Gear (Прямая передача 1:1 / Блокировка фрикциона C1)',
      heldComponent: 'Ничего не заблокировано',
      drivenComponent: 'Солнце и Корона заблокированы между собой фрикционом',
      desc: {
        en: 'Multi-plate clutch C1 locks Sun and Ring together. Entire planetary gearset rotates as one solid flywheel with zero relative tooth wear and 100% mechanical efficiency.',
        ru: 'Фрикционная муфта сжимает солнце и коронную шестерню. Весь планетарный ряд вращается как единый монолит без потерь.',
        hy: 'Ֆրիկցիոն կցորդիչը միացնում է արևային և պսակաձև ատամնանիվները. ամբողջ մեխանիզմը պտտվում է որպես մեկ միասնական մարմին (1:1):',
      },
      color: '#34d399',
    },
    OD: {
      ratio: 0.72,
      label: '4th Gear (Повышающая / Overdrive)',
      heldComponent: 'Солнечная шестерня (зажата тормозом)',
      drivenComponent: 'Водило сателлитов (приводится на вход)',
      desc: {
        en: 'Carrier is driven, Sun is held. Ring gear is forced to rotate 1.39x faster than carrier (0.72:1 ratio), providing high-speed highway economy.',
        ru: 'Водило является ведущим, солнечная шестерня зажата тормозом. Коронная шестерня вращается быстрее мотора (0.72:1), снижая обороты на трассе.',
        hy: 'Սատելիտների լծակն է առաջատար, արևայինն արգելակված է: Պսակաձև ատամնանիվը պտտվում է ավելի արագ (Overdrive 0.72:1):',
      },
      color: '#f59e0b',
    },
    R: {
      ratio: -2.57,
      label: 'Reverse (Задний ход / Тормоз водила)',
      heldComponent: 'Водило сателлитов (жестко заблокировано тормозом)',
      drivenComponent: 'Солнечная шестерня (вращается вперед)',
      desc: {
        en: 'Carrier held stationary by brake band. Planet pinions spin in place like idler gears, rotating the Ring gear in reverse direction (-2.57:1).',
        ru: 'Водило заблокировано тормозом. Сателлиты вращаются на неподвижных осях как паразитные шестерни, заставляя коронную шестерню вращаться назад (-2.57:1).',
        hy: 'Սատելիտների լծակն անշարժ է: Սատելիտները պտտում են պսակաձև ատամնանիվը հակառակ ուղղությամբ (-2.57:1):',
      },
      color: '#f43f5e',
    },
  };

  const currentProfile = gearProfiles[selectedGear];

  // Torque converter physics
  // Fluid coupling torque multiplication: K_tc is up to 2.1x at low turbine speeds, 1.0x when locked up
  const tcMultiplier = lockupEnabled ? 1.0 : selectedGear === '1st' ? 2.1 : 1.3;
  const turbineRPM = lockupEnabled ? engineRPM : Math.round(engineRPM * 0.92);
  const outputRPM = Math.round(turbineRPM / Math.abs(currentProfile.ratio));
  const engineNominalTorque = 300; // N·m
  const outputTorque = Math.round(engineNominalTorque * tcMultiplier * Math.abs(currentProfile.ratio) * 0.94);

  // Rotation angles for planetary components
  const sunAngle = rotationAngle;
  let ringAngle = 0;
  let carrierAngle = 0;

  if (selectedGear === '1st') {
    ringAngle = 0; // Held
    carrierAngle = sunAngle / currentProfile.ratio;
  } else if (selectedGear === '2nd') {
    carrierAngle = sunAngle / currentProfile.ratio;
    ringAngle = sunAngle;
  } else if (selectedGear === 'Direct') {
    carrierAngle = sunAngle;
    ringAngle = sunAngle;
  } else if (selectedGear === 'OD') {
    carrierAngle = sunAngle;
    ringAngle = sunAngle / currentProfile.ratio;
  } else if (selectedGear === 'R') {
    carrierAngle = 0; // Held
    ringAngle = -sunAngle / Math.abs(currentProfile.ratio);
  }

  return (
    <div className="w-full space-y-6">
      {/* 1. Technical SVG Visualization */}
      <div className="relative w-full h-[450px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center p-3 select-none">
        <svg viewBox="0 0 760 410" className="w-full h-full max-w-4xl">
          <defs>
            <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#ca8a04" />
            </radialGradient>
            <radialGradient id="planetGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0891b2" />
            </radialGradient>
            <filter id="fluidGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f43f5e" floodOpacity="0.4" />
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

          {/* ========================================================================= */}
          {/* SECTION 1: HYDRODYNAMIC TORQUE CONVERTER (LEFT, Center X = 180, Y = 205) */}
          {/* ========================================================================= */}
          <g transform="translate(180, 205)">
            {/* Outer Rounded Converter Housing */}
            <path
              d="M -110 -110 C -40 -120 40 -120 110 -110 C 130 -40 130 40 110 110 C 40 120 -40 120 -110 110 C -130 40 -130 -40 -110 -110 Z"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="2.5"
            />

            <text x="0" y="-125" fill="#64748b" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
              TORQUE CONVERTER (ГИДРОТРАНСФОРМАТОР)
            </text>

            {/* Impeller Pump (Left Half - Connected to Engine) */}
            <path
              d="M -90 -85 C -40 -95 -20 -85 -10 -60 L -10 60 C -20 85 -40 95 -90 85 Z"
              fill="#1e293b"
              stroke="#ef4444"
              strokeWidth="2"
            />
            {/* Rotating Impeller Vanes */}
            <g transform={`rotate(${(rotationAngle * 180) / Math.PI * 0.8})`}>
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={i}
                  x1="-50"
                  y1="-60"
                  x2="-35"
                  y2="-35"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  transform={`rotate(${(i * 360) / 8})`}
                />
              ))}
            </g>
            <text x="-55" y="105" fill="#ef4444" fontSize="9" textAnchor="middle" fontWeight="bold">
              IMPELLER (PUMP)
            </text>

            {/* Turbine Wheel (Right Half - Connected to Transmission Input Shaft) */}
            <path
              d="M 90 -85 C 40 -95 20 -85 10 -60 L 10 60 C 20 85 40 95 90 85 Z"
              fill="#1e293b"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            {/* Rotating Turbine Vanes */}
            <g transform={`rotate(${(rotationAngle * (lockupEnabled ? 0.8 : 0.72) * 180) / Math.PI})`}>
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="-60"
                  x2="35"
                  y2="-35"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  transform={`rotate(${(i * 360) / 8})`}
                />
              ))}
            </g>
            <text x="55" y="105" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">
              TURBINE
            </text>

            {/* Central Stator with One-Way Sprag Clutch */}
            <g transform="translate(0, 0)">
              <circle r="22" fill="#0f172a" stroke="#ca8a04" strokeWidth="2.5" />
              <path d="M -8 -8 L 8 0 L -8 8 Z" fill="#eab308" />
              <text x="0" y="36" fill="#eab308" fontSize="8" textAnchor="middle" fontWeight="bold">
                STATOR (РЕАКТОР)
              </text>
            </g>

            {/* Lock-up Clutch Plate (Active or Disengaged) */}
            <g transform="translate(-85, 0)">
              <line
                x1={lockupEnabled ? "10" : "0"}
                y1="-60"
                x2={lockupEnabled ? "10" : "0"}
                y2="60"
                stroke={lockupEnabled ? "#34d399" : "#64748b"}
                strokeWidth={lockupEnabled ? "4" : "2"}
                strokeDasharray={lockupEnabled ? "none" : "4,3"}
              />
              <text x={lockupEnabled ? "10" : "0"} y="-70" fill={lockupEnabled ? "#34d399" : "#64748b"} fontSize="8" textAnchor="middle" fontWeight="bold">
                LOCK-UP CLUTCH
              </text>
            </g>

            {/* Circulating ATF Fluid Particle Vortex */}
            {!lockupEnabled && isPlaying && (
              <g filter="url(#fluidGlow)">
                <circle cx="-30" cy="-40" r="3.5" fill="#f43f5e" className="animate-ping" />
                <circle cx="30" cy="-40" r="3.5" fill="#f43f5e" className="animate-ping" />
                <circle cx="30" cy="40" r="3.5" fill="#f43f5e" className="animate-ping" />
                <circle cx="-30" cy="40" r="3.5" fill="#f43f5e" className="animate-ping" />
              </g>
            )}

            {/* Dynamic Status badge */}
            <rect x="-90" y="130" width="180" height="24" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="0" y="146" fill={lockupEnabled ? "#34d399" : "#fbbf24"} fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
              {lockupEnabled ? '100% DIRECT LOCK-UP' : `FLUID TORQUE MULT: ${tcMultiplier.toFixed(1)}x`}
            </text>
          </g>

          {/* ========================================================================= */}
          {/* SECTION 2: EPICYCLIC PLANETARY GEARSET (RIGHT, Center X = 540, Y = 205) */}
          {/* ========================================================================= */}
          <g transform="translate(540, 205)">
            <text x="0" y="-140" fill="#64748b" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
              PLANETARY (EPICYCLIC) GEARSET (ПЛАНЕТАРНЫЙ РЯД)
            </text>

            {/* Outer Ring Gear / Annulus (Z = 72) */}
            <g transform={`rotate(${(ringAngle * 180) / Math.PI})`}>
              <circle r="120" fill="none" stroke={selectedGear === '1st' ? '#ef4444' : '#818cf8'} strokeWidth="10" />
              {/* Internal Inverted Ring Teeth */}
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1="115"
                  x2="0"
                  y2="125"
                  stroke={selectedGear === '1st' ? '#ef4444' : '#c7d2fe'}
                  strokeWidth="2.5"
                  transform={`rotate(${(i * 360) / 24})`}
                />
              ))}
            </g>

            {/* Ring Gear Brake Band (Clamping when 1st gear) */}
            <path
              d="M -132 -70 A 134 134 0 0 1 132 -70"
              fill="none"
              stroke={selectedGear === '1st' ? '#f43f5e' : '#475569'}
              strokeWidth={selectedGear === '1st' ? 7 : 3}
            />
            <text x="0" y="-125" fill={selectedGear === '1st' ? '#f43f5e' : '#64748b'} fontSize="9" textAnchor="middle" fontWeight="bold">
              BRAKE BAND B1: {selectedGear === '1st' ? 'CLAMPED (RING HELD)' : 'RELEASED'}
            </text>

            {/* Planet Carrier (Arm connecting 4 Planet Pinions) */}
            <g transform={`rotate(${(carrierAngle * 180) / Math.PI})`}>
              {/* Carrier Spider Cross */}
              <circle r="75" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="8,6" opacity="0.8" />
              <line x1="0" y1="-75" x2="0" y2="75" stroke="#10b981" strokeWidth="4" />
              <line x1="-75" y1="0" x2="75" y2="0" stroke="#10b981" strokeWidth="4" />

              {/* 4 Planet Pinion Gears (Mounted on carrier at radius R = 75, each radius r = 32) */}
              {[
                { cx: 0, cy: -75 },
                { cx: 75, cy: 0 },
                { cx: 0, cy: 75 },
                { cx: -75, cy: 0 },
              ].map((p, idx) => (
                <g key={idx} transform={`translate(${p.cx}, ${p.cy})`}>
                  <circle r="32" fill="url(#planetGrad)" stroke="#38bdf8" strokeWidth="2.5" />
                  {/* Planet gear rotation */}
                  <g transform={`rotate(${((sunAngle - carrierAngle) * (28 / 22) * 180) / Math.PI})`}>
                    <line x1="0" y1="-28" x2="0" y2="28" stroke="#ffffff" strokeWidth="2" />
                    <line x1="-28" y1="0" x2="28" y2="0" stroke="#ffffff" strokeWidth="2" />
                  </g>
                  <circle cx="0" cy="0" r="6" fill="#0f172a" />
                </g>
              ))}
            </g>

            {/* Central Sun Gear (Z = 28, Center R = 43) */}
            <g transform={`rotate(${(sunAngle * 180) / Math.PI})`}>
              <circle r="43" fill="url(#sunGrad)" stroke="#eab308" strokeWidth="3" />
              {/* Sun Gear Teeth */}
              {Array.from({ length: 14 }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1="-38"
                  x2="0"
                  y2="-48"
                  stroke="#fef08a"
                  strokeWidth="2.5"
                  transform={`rotate(${(i * 360) / 14})`}
                />
              ))}
              <circle cx="0" cy="0" r="14" fill="#0f172a" stroke="#ca8a04" strokeWidth="2" />
            </g>

            {/* Sun Gear Label */}
            <text x="0" y="4" fill="#0f172a" fontSize="9" textAnchor="middle" fontWeight="bold">
              SUN
            </text>

            {/* Output Shaft Extension to the right */}
            <g transform="translate(135, 0)">
              <rect x="0" y="-8" width="45" height="16" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <path
                d="M 20 -15 L 35 0 L 20 15"
                fill="none"
                stroke={currentProfile.ratio > 0 ? '#34d399' : '#f43f5e'}
                strokeWidth="3"
              />
              <text x="50" y="4" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">
                DRIVESHAFT
              </text>
            </g>

            {/* Planetary Ratio Badge */}
            <rect x="-90" y="145" width="180" height="24" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="0" y="161" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
              PLANETARY RATIO: {currentProfile.ratio.toFixed(2)}:1
            </text>
          </g>
        </svg>
      </div>

      {/* 2. Real-time Engineering Telemetry */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Engine Crankshaft RPM
          </span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400">
              {engineRPM}
            </span>
            <span className="text-xs text-slate-400">RPM</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            {lockupEnabled ? 'Механическая блокировка 100%' : 'Гидродинамическое скольжение'}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Turbine Input RPM
          </span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xl font-extrabold text-blue-500">
              {turbineRPM}
            </span>
            <span className="text-xs text-slate-400">RPM</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            Коэффициент трансформации: ×{tcMultiplier.toFixed(1)}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Output Driveshaft RPM
          </span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xl font-extrabold text-amber-500">
              {outputRPM}
            </span>
            <span className="text-xs text-slate-400">RPM</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            Передаточное число: {currentProfile.ratio.toFixed(2)}:1
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Wheel Output Torque
          </span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xl font-extrabold text-emerald-500">
              {outputTorque}
            </span>
            <span className="text-xs text-slate-400">N·m</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            {outputTorque > 1000 ? 'Высокая стартовая тяга' : 'Экономичный круиз'}
          </span>
        </div>
      </div>

      {/* 3. Automatic Gear Shift Selector Controls & Lock-up */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase font-bold text-slate-400 mr-2">
            Режимы АКПП (PRND):
          </span>
          {(['1st', '2nd', 'Direct', 'OD', 'R'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGear(g)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shadow-sm ${
                selectedGear === g
                  ? 'bg-cyan-500 text-white shadow-cyan-500/25 ring-2 ring-cyan-500/50 scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {g === 'Direct' ? 'Direct (1:1)' : g === 'OD' ? 'Overdrive (0.72)' : g === 'R' ? 'Reverse (R)' : `${g} Gear`}
            </button>
          ))}
        </div>

        {/* Lockup Toggle Button */}
        <button
          onClick={() => setLockupEnabled(!lockupEnabled)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
            lockupEnabled
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{lockupEnabled ? 'Lock-Up Active (Заблокирован)' : 'Lock-Up Off (Гидромуфта)'}</span>
        </button>
      </div>

      {/* 4. Engine RPM Slider */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-bold font-mono text-slate-700 dark:text-slate-300">
          <span>Обороты двигателя (Engine RPM):</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-extrabold">{engineRPM} RPM</span>
        </div>
        <input
          type="range"
          min="800"
          max="6000"
          step="100"
          value={engineRPM}
          onChange={(e) => setEngineRPM(Number(e.target.value))}
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
        captionTitle={currentProfile.label}
        captionDescription={currentProfile.desc[language] || currentProfile.desc.en}
      />

      {/* 5. Comprehensive Technical Explanation Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold font-mono text-xs uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Принцип работы гидромеханической автоматической КПП (АКПП)</span>
        </div>

        <p>
          <strong className="text-slate-900 dark:text-white">Непрерывное зацепление без разрыва потока мощности:</strong> В классической АКПП переключение передач осуществляется не перемещением зубчатых шестерен, а изменением того, какие элементы планетарного ряда (Солнце, Водило или Коронная шестерня) заторможены гидравлическими тормозными лентами или соединены мокрыми фрикционными пакетами сцепления. Это позволяет передавать крутящий момент плавно и без рывков.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400">
              Гидротрансформатор и умножение крутящего момента
            </h4>
            <p className="text-xs">
              Насосное колесо разгоняет жидкость ATF и направляет её на турбину. Реактор со встроенной муфтой свободного хода изменяет траекторию потока, создавая дополнительный гидродинамический подпор и умножая крутящий момент мотора до 2.2 раз при старте с места.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs font-mono uppercase text-emerald-500">
              Блокировочная муфта (Lock-Up) для экономии топлива
            </h4>
            <p className="text-xs">
              При выходе на стабильную крейсерскую скорость электронный блок управления задействует гидравлический поршень блокировки, жестко соединяя насос с турбиной. Это исключает гидравлические потери на скольжение, поднимая КПД до 100%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
