import React, { useState, useEffect } from 'react';
import { AnimationController } from './AnimationController.js';
import { useLanguage } from '../../context/LanguageContext.js';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export const BodyStructureAnimation: React.FC = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [impactStage, setImpactStage] = useState(0); // 0 (normal), 1 (impact start), 2 (peak crumple), 3 (residual rest)

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setImpactStage((prev) => (prev + 1) % 4);
    }, 2200 / speed);
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const stages = [
    {
      title: '1. Pre-Crash Structural Architecture',
      desc: 'Rigid boron steel passenger safety cell surrounded by uncrushed front accordion longitudinal crumple frame rails and bumper crash bar.',
      crumpleX: 0,
    },
    {
      title: '2. Impact Initiation (0–30 ms)',
      desc: 'Bumper beam engages obstacle. Airbag squibs fire; longitudinal steel rails begin controlled progressive plastic buckling.',
      crumpleX: 18,
    },
    {
      title: '3. Peak Energy Absorption (30–70 ms)',
      desc: 'Crumple rails collapse in progressive accordion folds, converting mega-joules of kinetic impact energy into plastic deformation work (F = m·dv/dt).',
      crumpleX: 42,
    },
    {
      title: '4. Survival Space Preserved (70–120 ms)',
      desc: 'The passenger safety cell remains completely rigid and undeformed. Cabin survival volume is preserved and doors remain operable.',
      crumpleX: 45,
    },
  ];

  const current = stages[impactStage];

  return (
    <div className="w-full space-y-4">
      {/* Visual Simulation Display */}
      <div className="relative w-full h-[400px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2 shadow-2xl">
        <svg viewBox="0 0 520 380" className="w-full h-full max-w-lg select-none">
          {/* Rigid Obstacle / Barrier (Left) */}
          <rect x="25" y="100" width="25" height="200" fill="#dc2626" stroke="#f87171" strokeWidth="2" />
          <line x1="25" y1="100" x2="25" y2="300" stroke="#fecaca" strokeWidth="4" />
          <text x="37" y="210" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="monospace" transform="rotate(-90, 37, 210)">
            BARRIER
          </text>

          {/* Vehicle Body Side Structure */}
          <g transform={`translate(${140 - current.crumpleX}, 140)`}>
            {/* Front Crumple Zone Frame Rails (Green/Yellow accordion) */}
            <path
              d={`M ${-50 + current.crumpleX} 70 L 60 70`}
              stroke="#eab308"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={impactStage > 0 ? '6,3' : undefined}
            />
            {/* Front Bumper Beam */}
            <rect x={-55 + current.crumpleX} y="45" width="12" height="50" rx="3" fill="#ca8a04" stroke="#fef08a" />

            {/* Rigid Passenger Safety Cage (Boron / Ultra-High Strength Steel) */}
            {/* Floor Sill Beam */}
            <rect x="60" y="65" width="220" height="15" rx="3" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
            {/* A-Pillar (Angled) */}
            <line x1="90" y1="65" x2="135" y2="-40" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" />
            {/* B-Pillar (Vertical) */}
            <line x1="175" y1="65" x2="175" y2="-40" stroke="#2563eb" strokeWidth="10" strokeLinecap="round" />
            {/* C-Pillar (Rear angled) */}
            <line x1="260" y1="65" x2="225" y2="-40" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" />
            {/* Roof Longitudinal Rails */}
            <line x1="130" y1="-40" x2="230" y2="-40" stroke="#1d4ed8" strokeWidth="8" strokeLinecap="round" />

            {/* Rear Crumple Zone Frame */}
            <line x1="280" y1="70" x2="350" y2="70" stroke="#eab308" strokeWidth="14" strokeLinecap="round" />
            <rect x="350" y="48" width="10" height="45" rx="2" fill="#ca8a04" />

            {/* Occupant Silhouette Inside Preserved Cabin */}
            <g transform="translate(140, 0)">
              <circle cx="10" cy="5" r="12" fill="#38bdf8" />
              <path d="M 10 18 L 10 50 L -5 65" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
              <line x1="10" y1="30" x2="25" y2="45" stroke="#38bdf8" strokeWidth="4" />
            </g>

            {/* Labels */}
            <text x="175" y="-55" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              RIGID BORON SAFETY CAGE
            </text>
            <text x={current.crumpleX / 2} y="105" fill="#facc15" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              CRUMPLE ZONE
            </text>
          </g>

          {/* Telemetry info */}
          <text x="30" y="40" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
            STAGE: {current.title.toUpperCase()}
          </text>
          <text x="30" y="60" fill="#facc15" fontSize="11" fontFamily="monospace">
            CRUMPLE DEFORMATION DISPLACEMENT: {current.crumpleX * 10} mm
          </text>
        </svg>
      </div>

      {/* Safety & Educational Disclaimer */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
        <ShieldCheck className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <span className="font-bold block uppercase font-mono tracking-wider">
            Conceptual Structural Safety Visualization
          </span>
          <p className="leading-relaxed opacity-90">
            This animation represents an idealized educational model demonstrating how crumple zones extend deceleration time (Δt) to reduce impact G-forces. Real crashworthiness requires complex nonlinear finite element analysis (FEA) and physical barrier testing.
          </p>
        </div>
      </div>

      {/* Animation Controller */}
      <AnimationController
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onReset={() => {
          setImpactStage(0);
          setIsPlaying(false);
        }}
        onPrevStep={() => {
          setImpactStage((prev) => (prev + 3) % 4);
          setIsPlaying(false);
        }}
        onNextStep={() => {
          setImpactStage((prev) => (prev + 1) % 4);
          setIsPlaying(false);
        }}
        currentStep={impactStage}
        totalSteps={4}
        stepLabels={stages.map((s) => s.title.split('. ')[1])}
        speed={speed}
        onSpeedChange={setSpeed}
        captionTitle={current.title}
        captionDescription={current.desc}
      />
    </div>
  );
};
