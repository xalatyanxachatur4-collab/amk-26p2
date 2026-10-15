import React, { useState, useEffect, useRef } from 'react';
import { AnimationController } from './AnimationController.js';
import { useLanguage } from '../../context/LanguageContext.js';

export const EngineCycleAnimation: React.FC = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [angle, setAngle] = useState(0); // Crank angle in radians (0 to 4*PI for full 720° cycle)

  const requestRef = useRef<number>();

  useEffect(() => {
    let lastTime = performance.now();
    const update = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying) {
        setAngle((prev) => (prev + dt * speed * Math.PI * 1.5) % (Math.PI * 4));
      }
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed]);

  // Normalized angle in range [0, 4*PI) for the full 720° four-stroke cycle
  const safeAngle = Number.isFinite(angle) ? angle : 0;
  const normalizedAngle = ((safeAngle % (Math.PI * 4)) + Math.PI * 4) % (Math.PI * 4);

  // Determine which stroke we are in:
  // 0 to PI: Intake (0 to 180°)
  // PI to 2PI: Compression (180 to 360°)
  // 2PI to 3PI: Power / Combustion (360 to 540°)
  // 3PI to 4PI: Exhaust (540 to 720°)
  const currentStrokeIndex = Math.min(
    3,
    Math.max(0, Math.floor((normalizedAngle / (Math.PI * 4)) * 4))
  );

  const strokeLabels = [
    t.animations?.fourStroke?.intake || 'Intake Stroke',
    t.animations?.fourStroke?.compression || 'Compression Stroke',
    t.animations?.fourStroke?.power || 'Power Stroke (Combustion)',
    t.animations?.fourStroke?.exhaust || 'Exhaust Stroke',
  ];

  const strokeDescriptions = [
    t.animations?.fourStroke?.intakeDesc ||
      'Intake valve opens; descending piston draws air-fuel mixture into cylinder via manifold vacuum.',
    t.animations?.fourStroke?.compressionDesc ||
      'Both valves sealed; ascending piston compresses charge, increasing thermodynamic temperature and pressure.',
    t.animations?.fourStroke?.powerDesc ||
      'Spark plug ignites mixture; rapid deflagration produces high pressure driving piston downward to rotate crankshaft.',
    t.animations?.fourStroke?.exhaustDesc ||
      'Exhaust valve opens; ascending piston pushes spent exhaust gases through manifold to catalytic converter.',
  ];

  // Kinematic calculations for piston-crank mechanism:
  // Crank radius R, Rod length L
  const crankR = 50;
  const rodL = 130;
  const crankCenterX = 250;
  const crankCenterY = 320;

  // Crankpin coordinates
  const crankPinX = crankCenterX + crankR * Math.sin(normalizedAngle);
  const crankPinY = crankCenterY + crankR * Math.cos(normalizedAngle);

  // Piston pin (wrist pin) vertical position:
  // y = crankCenterY - (crankR*cos(angle) + sqrt(rodL^2 - (crankR*sin(angle))^2))
  const sinVal = crankR * Math.sin(normalizedAngle);
  const cosVal = crankR * Math.cos(normalizedAngle);
  const underRoot = Math.max(0, rodL * rodL - sinVal * sinVal);
  const pistonPinY = crankCenterY - (cosVal + Math.sqrt(underRoot));
  const pistonPinX = crankCenterX;

  // Valve lift calculations:
  // Intake valve opens during stroke 0 (0 to PI)
  const isIntakeOpen = currentStrokeIndex === 0;
  const intakeLift = isIntakeOpen ? Math.sin(normalizedAngle) * 16 : 0;

  // Exhaust valve opens during stroke 3 (3PI to 4PI)
  const isExhaustOpen = currentStrokeIndex === 3;
  const exhaustLift = isExhaustOpen ? Math.sin(normalizedAngle - Math.PI * 3) * 16 : 0;

  // Spark flash near TDC at end of compression (around 2*PI)
  const isSparkFiring = Math.abs(normalizedAngle - Math.PI * 2) < 0.25;

  // Chamber gas background color based on stroke
  let chamberFill = 'rgba(56, 189, 248, 0.15)'; // intake cool air
  if (currentStrokeIndex === 1) chamberFill = 'rgba(245, 158, 11, 0.3)'; // compression warm
  if (currentStrokeIndex === 2) chamberFill = 'rgba(239, 68, 68, 0.45)'; // combustion fire
  if (currentStrokeIndex === 3) chamberFill = 'rgba(100, 116, 139, 0.35)'; // exhaust smoke

  const handleReset = () => {
    setAngle(0);
    setIsPlaying(false);
  };

  const handleStepNext = () => {
    const nextStroke = (currentStrokeIndex + 1) % 4;
    setAngle(nextStroke * Math.PI + 0.1);
    setIsPlaying(false);
  };

  const handleStepPrev = () => {
    const prevStroke = (currentStrokeIndex + 3) % 4;
    setAngle(prevStroke * Math.PI + 0.1);
    setIsPlaying(false);
  };

  return (
    <div className="w-full space-y-4">
      {/* 2D Technical SVG Cylinder Cross-Section */}
      <div className="relative w-full h-[420px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2 shadow-2xl">
        <svg viewBox="0 0 500 420" className="w-full h-full max-w-lg select-none">
          <defs>
            {/* Spark Glow */}
            <radialGradient id="sparkGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffff00" stopOpacity="1" />
              <stop offset="50%" stopColor="#ff5722" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
            </radialGradient>
            {/* Combustion Fire Gradient */}
            <radialGradient id="flameGradient" cx="50%" cy="10%" r="90%">
              <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#f97316" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          {/* Engine Cylinder Block & Coolant Jacket */}
          <rect x="140" y="40" width="220" height="230" fill="#1e293b" rx="4" />
          {/* Coolant Passages (Blue) */}
          <rect x="150" y="70" width="20" height="150" rx="6" fill="#0284c7" opacity="0.4" />
          <rect x="330" y="70" width="20" height="150" rx="6" fill="#0284c7" opacity="0.4" />

          {/* Cylinder Bore (Honed Wall) */}
          <rect x="180" y="60" width="140" height="190" fill="#0f172a" stroke="#475569" strokeWidth="2" />

          {/* Dynamic Gas Fill in Combustion Chamber */}
          <rect
            x="181"
            y="60"
            width="138"
            height={Math.max(10, pistonPinY - 90)}
            fill={currentStrokeIndex === 2 ? 'url(#flameGradient)' : chamberFill}
            className="transition-colors duration-200"
          />

          {/* Intake Runner (Left) & Exhaust Runner (Right) */}
          <path d="M 120 70 Q 180 70 195 90" fill="none" stroke={isIntakeOpen ? '#38bdf8' : '#334155'} strokeWidth="18" strokeLinecap="round" />
          <path d="M 380 70 Q 320 70 305 90" fill="none" stroke={isExhaustOpen ? '#94a3b8' : '#334155'} strokeWidth="18" strokeLinecap="round" />

          {/* Intake Poppet Valve (Left) */}
          <g transform={`translate(0, ${intakeLift})`}>
            <line x1="205" y1="50" x2="205" y2="88" stroke="#cbd5e1" strokeWidth="4" />
            <polygon points="192,88 218,88 205,96" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1.5" />
          </g>

          {/* Exhaust Poppet Valve (Right) */}
          <g transform={`translate(0, ${exhaustLift})`}>
            <line x1="295" y1="50" x2="295" y2="88" stroke="#cbd5e1" strokeWidth="4" />
            <polygon points="282,88 308,88 295,96" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1.5" />
          </g>

          {/* Spark Plug (Center Top) */}
          <g transform="translate(250, 45)">
            <rect x="-6" y="0" width="12" height="18" fill="#e2e8f0" stroke="#64748b" />
            <rect x="-3" y="18" width="6" height="8" fill="#cbd5e1" />
            <line x1="0" y1="26" x2="0" y2="30" stroke="#f59e0b" strokeWidth="2" />
            {/* Spark Arc Flash when firing */}
            {isSparkFiring && (
              <circle cx="0" cy="30" r="24" fill="url(#sparkGradient)" className="animate-ping" />
            )}
          </g>

          {/* Piston Body with Piston Rings */}
          <g transform={`translate(182, ${pistonPinY - 35})`}>
            {/* Aluminum Piston Crown & Skirt */}
            <rect x="0" y="0" width="136" height="65" rx="3" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Ring Grooves */}
            <line x1="2" y1="8" x2="134" y2="8" stroke="#0f172a" strokeWidth="2" />
            <line x1="2" y1="16" x2="134" y2="16" stroke="#0f172a" strokeWidth="2" />
            <line x1="2" y1="24" x2="134" y2="24" stroke="#0f172a" strokeWidth="2" />
            {/* Wrist Pin (Gudgeon Pin) */}
            <circle cx="68" cy="35" r="9" fill="#334155" stroke="#cbd5e1" strokeWidth="2" />
          </g>

          {/* Connecting Rod (Forged Steel H-Beam) */}
          <line
            x1={pistonPinX}
            y1={pistonPinY}
            x2={crankPinX}
            y2={crankPinY}
            stroke="#94a3b8"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <line
            x1={pistonPinX}
            y1={pistonPinY}
            x2={crankPinX}
            y2={crankPinY}
            stroke="#475569"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Crankshaft Counterweight & Center Pin */}
          <g transform={`translate(${crankCenterX}, ${crankCenterY})`}>
            {/* Circular crankcase journal orbit */}
            <circle r={crankR} fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
            {/* Counterweight (positioned 180° opposite crankpin) */}
            <g transform={`rotate(${((normalizedAngle * 180) / Math.PI) + 180})`}>
              <path
                d="M -38 0 A 46 46 0 0 0 38 0 L 22 24 L -22 24 Z"
                fill="#475569"
                opacity="0.75"
                stroke="#64748b"
                strokeWidth="1.5"
              />
            </g>
            {/* Crankshaft Center Axis */}
            <circle cx="0" cy="0" r="14" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2.5" />
          </g>

          {/* Crankpin Rod Journal Bearing */}
          <circle cx={crankPinX} cy={crankPinY} r="10" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />

          {/* Real-time Engineering Annotations */}
          <text x="30" y="30" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
            CYCLE: {(strokeLabels[currentStrokeIndex] || 'CYCLE').toUpperCase()}
          </text>
          <text x="30" y="48" fill="#94a3b8" fontSize="11" fontFamily="monospace">
            CRANK ANGLE: {Math.round((normalizedAngle * 180) / Math.PI)}° / 720°
          </text>
          <text x="30" y="66" fill="#94a3b8" fontSize="11" fontFamily="monospace">
            VALVE STATE: {isIntakeOpen ? 'INTAKE OPEN' : isExhaustOpen ? 'EXHAUST OPEN' : 'BOTH SEALED'}
          </text>
        </svg>
      </div>

      {/* Animation Controller */}
      <AnimationController
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onReset={handleReset}
        onPrevStep={handleStepPrev}
        onNextStep={handleStepNext}
        currentStep={currentStrokeIndex}
        totalSteps={4}
        stepLabels={strokeLabels}
        speed={speed}
        onSpeedChange={setSpeed}
        captionTitle={strokeLabels[currentStrokeIndex] || ''}
        captionDescription={strokeDescriptions[currentStrokeIndex] || ''}
      />
    </div>
  );
};
