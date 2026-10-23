import React, { useState, useEffect, useRef } from 'react';
import { AnimationController } from './AnimationController.js';
import { useLanguage } from '../../context/LanguageContext.js';
import { Cog, Gauge, ArrowRight, ShieldCheck, Zap, RotateCcw, Activity } from 'lucide-react';

export const ManualTransmissionAnimation: React.FC = () => {
  const { language } = useLanguage();

  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [engineRPM, setEngineRPM] = useState(2500);
  const [clutchEngaged, setClutchEngaged] = useState(true);
  const [selectedGear, setSelectedGear] = useState<'N' | '1st' | '2nd' | '3rd' | '4th' | '5th' | 'R'>('1st');
  const [shaftAngle, setShaftAngle] = useState(0);

  const requestRef = useRef<number>();

  useEffect(() => {
    let lastTime = performance.now();
    const update = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying) {
        // Base rotational velocity derived from engine RPM and simulation speed
        const angularVelocity = (engineRPM / 60) * Math.PI * 2 * 0.15 * speed;
        setShaftAngle((prev) => (prev + dt * angularVelocity) % (Math.PI * 2));
      }
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed, engineRPM]);

  // Gear specifications:
  // Ratio = Input teeth / Counter teeth * Output teeth / Counter output teeth
  const gearData: Record<
    'N' | '1st' | '2nd' | '3rd' | '4th' | '5th' | 'R',
    { ratio: number; label: string; desc: { en: string; ru: string; hy: string }; color: string }
  > = {
    N: {
      ratio: 0,
      label: 'Neutral (Свободный ход)',
      desc: {
        en: 'Clutch packs disengaged from all gears. Input shaft spins freely while output shaft remains stationary.',
        ru: 'Муфты синхронизаторов находятся в нейтральном положении. Первичный вал вращается вхолостую, выходной вал неподвижен.',
        hy: 'Սինխրոնիզատորների կցորդիչները չեզոք դիրքում են: Առաջնային լիսեռը պտտվում է պարապուրդով, ելքային լիսեռը մնում է անշարժ:',
      },
      color: '#94a3b8',
    },
    '1st': {
      ratio: 3.62,
      label: '1st Gear (Максимальный момент)',
      desc: {
        en: 'Largest gear ratio (3.62:1). Multiplies engine torque by 3.6x to overcome vehicle inertia from a dead stop.',
        ru: '1-я передача (3.62:1). Максимальное умножение крутящего момента в 3.6 раза для уверенного старта с места.',
        hy: '1-ին փոխանցում (3.62:1): Ոլորող մոմենտի բազմապատկում 3.6 անգամ՝ տեղից շարժվելու համար:',
      },
      color: '#38bdf8',
    },
    '2nd': {
      ratio: 2.15,
      label: '2nd Gear (Разгон)',
      desc: {
        en: 'Moderate reduction (2.15:1). Balances acceleration with higher vehicle speed in city traffic.',
        ru: '2-я передача (2.15:1). Оптимальный баланс между тягой и набором скорости в городском потоке.',
        hy: '2-րդ փոխանցում (2.15:1): Քարշուժի և արագացման հավասարակշռություն քաղաքային պայմաններում:',
      },
      color: '#60a5fa',
    },
    '3rd': {
      ratio: 1.45,
      label: '3rd Gear (Средняя скорость)',
      desc: {
        en: 'Light reduction (1.45:1). Smooth power delivery for overtaking and dynamic cruising.',
        ru: '3-я передача (1.45:1). Умеренная редукция для динамичного движения и обгонов.',
        hy: '3-րդ փոխանցում (1.45:1): Չափավոր փոխանցման թիվ դինամիկ վազանցների համար:',
      },
      color: '#818cf8',
    },
    '4th': {
      ratio: 1.0,
      label: '4th Gear (Прямая передача 1:1)',
      desc: {
        en: 'Direct drive (1.00:1). Input shaft locks directly to output shaft with 100% mechanical efficiency.',
        ru: '4-я передача (1.00:1). Прямое соединение первичного и вторичного валов, минимальные потери на трение.',
        hy: '4-րդ փոխանցում (1.00:1): Ուղիղ միացում առաջնային և երկրորդային լիսեռների միջև:',
      },
      color: '#34d399',
    },
    '5th': {
      ratio: 0.76,
      label: '5th Gear (Повышающая / Overdrive)',
      desc: {
        en: 'Overdrive ratio (0.76:1). Output shaft spins faster than engine, allowing quiet low-RPM highway cruising.',
        ru: '5-я передача (0.76:1, Overdrive). Вторичный вал вращается быстрее двигателя, снижая расход топлива на трассе.',
        hy: '5-րդ փոխանցում (0.76:1, Overdrive): Ելքային լիսեռն ավելի արագ է պտտվում, քան շարժիչը:',
      },
      color: '#f59e0b',
    },
    R: {
      ratio: -3.42,
      label: 'Reverse (Задний ход)',
      desc: {
        en: 'Reverse idler gear reverses output shaft direction. Allows vehicle to back up with high starting torque.',
        ru: 'Задний ход (-3.42:1). Промежуточная паразитная шестерня меняет направление вращения вторичного вала на обратное.',
        hy: 'Հետընթաց փոխանցում (-3.42:1): Միջանկյալ ատամնանիվը փոխում է պտտման ուղղությունը հակառակ:',
      },
      color: '#f43f5e',
    },
  };

  const currentGear = gearData[selectedGear];
  const effectiveClutch = clutchEngaged ? 1 : 0;
  const inputRPM = engineRPM * effectiveClutch;
  const outputRPM = currentGear.ratio !== 0 ? Math.round(inputRPM / Math.abs(currentGear.ratio)) : 0;
  const nominalEngineTorque = 280; // N·m
  const outputTorque = currentGear.ratio !== 0 && clutchEngaged
    ? Math.round(nominalEngineTorque * Math.abs(currentGear.ratio) * 0.96)
    : 0;

  // Angular rotations
  const inputAngle = shaftAngle * effectiveClutch;
  const counterAngle = -inputAngle * 0.8;
  const outputAngle = currentGear.ratio !== 0
    ? currentGear.ratio > 0
      ? (inputAngle / currentGear.ratio)
      : -(inputAngle / Math.abs(currentGear.ratio))
    : 0;

  return (
    <div className="w-full space-y-6">
      {/* 1. Interactive Technical Animation Canvas */}
      <div className="relative w-full h-[440px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center p-3 select-none">
        <svg viewBox="0 0 760 400" className="w-full h-full max-w-4xl">
          <defs>
            <linearGradient id="clutchDiscGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="synchroGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <filter id="gearGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Background Grid */}
          <g stroke="#1e293b" strokeWidth="0.5" opacity="0.6">
            {Array.from({ length: 19 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="400" />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 40} x2="760" y2={i * 40} />
            ))}
          </g>

          {/* Housing Outline */}
          <rect x="50" y="35" width="670" height="325" rx="16" fill="none" stroke="#334155" strokeWidth="2.5" strokeDasharray="8,6" />
          <text x="70" y="60" fill="#64748b" fontSize="11" fontFamily="monospace" fontWeight="bold">
            MANUAL 5-SPEED SYNCHROMESH TRANSMISSION HOUSING
          </text>

          {/* ========================================================================= */}
          {/* SECTION A: CLUTCH & FLYWHEEL MECHANISM (LEFT) */}
          {/* ========================================================================= */}
          <g transform="translate(100, 140)">
            {/* Flywheel from Engine */}
            <rect x="-24" y="-70" width="16" height="140" rx="3" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
            <text x="-16" y="88" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">
              FLYWHEEL
            </text>

            {/* Friction Disc (Slides with pedal) */}
            <g transform={`translate(${clutchEngaged ? 0 : 14}, 0)`}>
              <rect x="-6" y="-60" width="10" height="120" rx="2" fill="url(#clutchDiscGrad)" stroke="#b45309" strokeWidth="1.5" />
              <line x1="-1" y1="-50" x2="-1" y2="50" stroke="#ffffff" strokeWidth="2" strokeDasharray="6,4" />
              <text x="-1" y="-66" fill="#f59e0b" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                CLUTCH DISC
              </text>
            </g>

            {/* Pressure Plate & Diaphragm Spring */}
            <rect x="8" y="-65" width="8" height="130" rx="2" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="16" y1="-45" x2="30" y2="-20" stroke="#cbd5e1" strokeWidth="3" />
            <line x1="16" y1="45" x2="30" y2="20" stroke="#cbd5e1" strokeWidth="3" />
            <rect x="30" y="-14" width="12" height="28" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="36" y="32" fill="#38bdf8" fontSize="8" textAnchor="middle" fontFamily="monospace">
              BEARING
            </text>
          </g>

          {/* ========================================================================= */}
          {/* SECTION B: SHAFTS & CONSTANT MESH GEARS */}
          {/* ========================================================================= */}
          {/* Top Mainshaft / Output Shaft (Y = 140) */}
          <g transform="translate(150, 140)">
            {/* Input Shaft stub */}
            <rect x="0" y="-7" width="80" height="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            {/* Input Gear (Drive pinion to countershaft) */}
            <rect x="55" y="-45" width="22" height="90" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Input Teeth */}
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={i} x1={57 + i * 3.2} y1="-45" x2={57 + i * 3.2} y2="45" stroke="#38bdf8" strokeWidth="1.2" opacity="0.6" />
            ))}

            {/* Main Output Shaft (Center axis) */}
            <rect x="90" y="-6" width="460" height="12" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Mainshaft Freewheeling Gears: 1st, 2nd, 3rd, 5th, Rev */}
            {/* 4th Gear is direct lockup with input gear at x=90 */}

            {/* 3rd Gear on Mainshaft (x=160, R=44) */}
            <g transform="translate(160, 0)">
              <rect x="-14" y="-44" width="28" height="88" rx="3" fill="#1e293b" stroke={selectedGear === '3rd' ? '#818cf8' : '#475569'} strokeWidth={selectedGear === '3rd' ? 3 : 2} />
              <text x="0" y="58" fill={selectedGear === '3rd' ? '#818cf8' : '#64748b'} fontSize="10" textAnchor="middle" fontWeight="bold">3rd</text>
            </g>

            {/* Synchro Hub 1 (Controls 4th / 3rd) at x=125 */}
            <g transform={`translate(${selectedGear === '4th' ? 95 : selectedGear === '3rd' ? 155 : 125}, 0)`}>
              <rect x="-8" y="-30" width="16" height="60" rx="3" fill="url(#synchroGrad)" stroke="#ca8a04" strokeWidth="1.5" />
              <line x1="0" y1="-30" x2="0" y2="30" stroke="#fef08a" strokeWidth="2" />
            </g>

            {/* 2nd Gear on Mainshaft (x=240, R=52) */}
            <g transform="translate(240, 0)">
              <rect x="-14" y="-52" width="28" height="104" rx="3" fill="#1e293b" stroke={selectedGear === '2nd' ? '#60a5fa' : '#475569'} strokeWidth={selectedGear === '2nd' ? 3 : 2} />
              <text x="0" y="66" fill={selectedGear === '2nd' ? '#60a5fa' : '#64748b'} fontSize="10" textAnchor="middle" fontWeight="bold">2nd</text>
            </g>

            {/* Synchro Hub 2 (Controls 2nd / 1st) at x=285 */}
            <g transform={`translate(${selectedGear === '2nd' ? 245 : selectedGear === '1st' ? 325 : 285}, 0)`}>
              <rect x="-8" y="-30" width="16" height="60" rx="3" fill="url(#synchroGrad)" stroke="#ca8a04" strokeWidth="1.5" />
              <line x1="0" y1="-30" x2="0" y2="30" stroke="#fef08a" strokeWidth="2" />
            </g>

            {/* 1st Gear on Mainshaft (x=330, R=65 - Largest driven gear) */}
            <g transform="translate(330, 0)">
              <rect x="-15" y="-65" width="30" height="130" rx="4" fill="#1e293b" stroke={selectedGear === '1st' ? '#38bdf8' : '#475569'} strokeWidth={selectedGear === '1st' ? 3.5 : 2} filter={selectedGear === '1st' ? 'url(#gearGlow)' : undefined} />
              <text x="0" y="78" fill={selectedGear === '1st' ? '#38bdf8' : '#64748b'} fontSize="11" textAnchor="middle" fontWeight="bold">1st</text>
            </g>

            {/* Reverse Gear on Mainshaft (x=410, R=58) */}
            <g transform="translate(410, 0)">
              <rect x="-13" y="-58" width="26" height="116" rx="3" fill="#1e293b" stroke={selectedGear === 'R' ? '#f43f5e' : '#475569'} strokeWidth={selectedGear === 'R' ? 3 : 2} />
              <text x="0" y="72" fill={selectedGear === 'R' ? '#f43f5e' : '#64748b'} fontSize="10" textAnchor="middle" fontWeight="bold">REV</text>
            </g>

            {/* Synchro Hub 3 (Controls Rev / 5th) at x=450 */}
            <g transform={`translate(${selectedGear === 'R' ? 415 : selectedGear === '5th' ? 485 : 450}, 0)`}>
              <rect x="-8" y="-30" width="16" height="60" rx="3" fill="url(#synchroGrad)" stroke="#ca8a04" strokeWidth="1.5" />
              <line x1="0" y1="-30" x2="0" y2="30" stroke="#fef08a" strokeWidth="2" />
            </g>

            {/* 5th Gear on Mainshaft (x=490, R=35 - Smallest driven gear for overdrive) */}
            <g transform="translate(490, 0)">
              <rect x="-14" y="-35" width="28" height="70" rx="3" fill="#1e293b" stroke={selectedGear === '5th' ? '#f59e0b' : '#475569'} strokeWidth={selectedGear === '5th' ? 3 : 2} />
              <text x="0" y="48" fill={selectedGear === '5th' ? '#f59e0b' : '#64748b'} fontSize="10" textAnchor="middle" fontWeight="bold">5th</text>
            </g>

            {/* Driveshaft Output Flange (Far Right) */}
            <g transform="translate(560, 0)">
              <rect x="0" y="-12" width="20" height="24" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="10" cy="0" r="18" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
              {/* Output Rotation Indicator Arrow */}
              {currentGear.ratio !== 0 && clutchEngaged && isPlaying && (
                <path
                  d="M 5 -12 A 12 12 0 0 1 18 0"
                  fill="none"
                  stroke={currentGear.ratio > 0 ? '#34d399' : '#f43f5e'}
                  strokeWidth="3"
                  markerEnd="url(#arrow)"
                />
              )}
              <text x="28" y="5" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                DRIVESHAFT
              </text>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* SECTION C: COUNTERSHAFT / LAYSHAFT (BOTTOM, Y = 270) */}
          {/* ========================================================================= */}
          <g transform="translate(150, 270)">
            {/* Solid Countershaft Body */}
            <rect x="40" y="-8" width="480" height="16" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
            <text x="48" y="24" fill="#64748b" fontSize="9" fontFamily="monospace">
              COUNTERSHAFT (LAYSHAFT)
            </text>

            {/* Countershaft Input Driven Gear (x=65, R=55 meshes with Input gear) */}
            <rect x="55" y="-55" width="22" height="110" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

            {/* Countershaft 3rd Drive Gear (x=160, R=44) */}
            <rect x="146" y="-44" width="28" height="88" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />

            {/* Countershaft 2nd Drive Gear (x=240, R=36) */}
            <rect x="226" y="-36" width="28" height="72" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />

            {/* Countershaft 1st Drive Pinion (x=330, R=24 - Smallest driver gear) */}
            <rect x="316" y="-24" width="28" height="48" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />

            {/* Reverse Idler Gear (Middle intermediate) */}
            <circle cx="410" cy="-65" r="16" fill="#334155" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="410" y="-62" fill="#f43f5e" fontSize="8" textAnchor="middle" fontWeight="bold">IDLER</text>
            <rect x="398" y="-24" width="24" height="48" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />

            {/* Countershaft 5th Drive Gear (x=490, R=56 - Large driver gear for Overdrive) */}
            <rect x="476" y="-56" width="28" height="112" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
          </g>

          {/* ========================================================================= */}
          {/* SECTION D: DYNAMIC ACTIVE POWER FLOW ARROW PATH */}
          {/* ========================================================================= */}
          {clutchEngaged && currentGear.ratio !== 0 && isPlaying && (
            <path
              d={
                selectedGear === '4th'
                  ? 'M 80 140 L 230 140 L 710 140'
                  : selectedGear === '1st'
                  ? 'M 80 140 L 215 140 L 215 270 L 480 270 L 480 140 L 710 140'
                  : selectedGear === '2nd'
                  ? 'M 80 140 L 215 140 L 215 270 L 390 270 L 390 140 L 710 140'
                  : selectedGear === '3rd'
                  ? 'M 80 140 L 215 140 L 215 270 L 310 270 L 310 140 L 710 140'
                  : selectedGear === '5th'
                  ? 'M 80 140 L 215 140 L 215 270 L 640 270 L 640 140 L 710 140'
                  : 'M 80 140 L 215 140 L 215 270 L 560 270 L 560 205 L 560 140 L 710 140'
              }
              fill="none"
              stroke="#fbbf24"
              strokeWidth="4"
              strokeDasharray="8,6"
              strokeLinecap="round"
              className="animate-pulse"
              opacity="0.85"
            />
          )}

          {/* Current Gear Ratio Display Badge */}
          <rect x="70" y="315" width="260" height="32" rx="8" fill="#0f172a" stroke="#334155" />
          <text x="82" y="336" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
            RATIO: {currentGear.ratio !== 0 ? `${currentGear.ratio.toFixed(2)}:1` : 'DISENGAGED (N)'}
          </text>
        </svg>
      </div>

      {/* 2. Real-time Engineering Telemetry Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Engine Input RPM
          </span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400">
              {inputRPM}
            </span>
            <span className="text-xs text-slate-400">RPM</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            {clutchEngaged ? 'Сцепление замкнуто' : 'Сцепление выжато (разомкнуто)'}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Driveshaft Output RPM
          </span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xl font-extrabold text-amber-500">
              {outputRPM}
            </span>
            <span className="text-xs text-slate-400">RPM</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            {currentGear.ratio > 1 ? 'Понижение скорости' : currentGear.ratio === 1 ? 'Прямой привод 1:1' : currentGear.ratio < 0 ? 'Обратное вращение' : currentGear.ratio > 0 ? 'Повышение (Overdrive)' : 'Нейтраль'}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Output Torque Multiplier
          </span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-xl font-extrabold text-emerald-500">
              {outputTorque}
            </span>
            <span className="text-xs text-slate-400">N·m</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            {currentGear.ratio !== 0 ? `×${Math.abs(currentGear.ratio).toFixed(2)} к тяге мотора` : '0 N·m (Нейтраль)'}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Clutch State (Сцепление)
          </span>
          <button
            onClick={() => setClutchEngaged(!clutchEngaged)}
            className={`w-full mt-0.5 py-1.5 px-2 rounded-xl text-xs font-bold font-mono transition-all ${
              clutchEngaged
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
            }`}
          >
            {clutchEngaged ? 'ENGAGED (ВКЛ)' : 'DISENGAGED (ВЫКЛ)'}
          </button>
          <span className="text-[10px] text-slate-400 block text-center">
            Нажмите для размыкания
          </span>
        </div>
      </div>

      {/* 3. Gear Shift Selector Controls */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase font-bold text-slate-400 block text-center">
          Кулиса переключения передач (Gearshift Selector):
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(['1st', '2nd', '3rd', '4th', '5th', 'N', 'R'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGear(g)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-sm ${
                selectedGear === g
                  ? 'bg-cyan-500 text-white shadow-cyan-500/25 ring-2 ring-cyan-500/50 scale-105'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50'
              }`}
            >
              {g === 'N' ? 'N (Neutral)' : g === 'R' ? 'R (Reverse)' : `${g} Gear`}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Engine RPM Slider & Controller */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-bold font-mono text-slate-700 dark:text-slate-300">
          <span>Обороты коленчатого вала ДВС:</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-extrabold">{engineRPM} RPM</span>
        </div>
        <input
          type="range"
          min="800"
          max="6500"
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
          setShaftAngle(0);
          setIsPlaying(false);
        }}
        speed={speed}
        onSpeedChange={setSpeed}
        captionTitle={currentGear.label}
        captionDescription={currentGear.desc[language] || currentGear.desc.en}
      />

      {/* 5. Comprehensive Technical Explanation Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold font-mono text-xs uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>Принцип работы механической коробки передач (МКПП)</span>
        </div>

        <p>
          <strong className="text-slate-900 dark:text-white">Трехвальная архитектура постоянного зацепления:</strong> В классической МКПП шестерни вторичного вала находятся в непрерывном зацеплении с шестернями промежуточного вала (layshaft), но свободно вращаются на игольчатых подшипниках. Передача крутящего момента происходит только тогда, когда скользящая зубчатая муфта (dog clutch) жестко соединяет выбранную шестерню с вторичным валом.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400">
              Синхронизаторы с блокирующим кольцом
            </h4>
            <p className="text-xs">
              Перед зацеплением зубьев латунное коническое кольцо синхронизатора прижимается к конусу шестерни. За счет трения скорости вала и шестерни выравниваются за доли секунды, предотвращая скрежет и поломку зубьев.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs font-mono uppercase text-amber-500">
              Трансформация момента и закон сохранения мощности
            </h4>
            <p className="text-xs">
              Согласно формуле \(P = T \cdot \omega\), при понижении оборотов в \(i\) раз крутящий момент на колесах возрастает ровно в \(i\) раз (за вычетом КПД \(\eta \approx 96\%\)). 1-я передача дает тягу для старта, а 5-я снижает обороты двигателя на трассе для экономии бензина.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
