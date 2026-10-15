import React, { useState, useEffect, useRef } from 'react';
import { AnimationController } from './AnimationController.js';
import { useLanguage } from '../../context/LanguageContext.js';

export const BrakingAnimation: React.FC = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [isABSActive, setIsABSActive] = useState(false);
  const [pedalPressed, setPedalPressed] = useState(true);
  const [rotorRotation, setRotorRotation] = useState(0);

  const requestRef = useRef<number>();

  useEffect(() => {
    let lastTime = performance.now();
    const update = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isPlaying) {
        // Rotor deceleration rate depends on pedal and ABS state
        const spinSpeed = pedalPressed ? (isABSActive ? 3 : 0.8) : 8;
        setRotorRotation((prev) => (prev + dt * speed * spinSpeed) % (Math.PI * 2));
      }
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed, pedalPressed, isABSActive]);

  // ABS Rapid Pulse simulation
  const [absPulse, setAbsPulse] = useState(false);
  useEffect(() => {
    if (!isABSActive || !pedalPressed) return;
    const interval = setInterval(() => {
      setAbsPulse((prev) => !prev);
    }, 120);
    return () => clearInterval(interval);
  }, [isABSActive, pedalPressed]);

  // Caliper clamping distance (clamped when pedal pressed, modulated if ABS)
  const isClamped = pedalPressed && (!isABSActive || absPulse);
  const padOffset = isClamped ? 0 : 6;

  return (
    <div className="w-full space-y-4">
      {/* Visual Simulation Display */}
      <div className="relative w-full h-[400px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2 shadow-2xl">
        <svg viewBox="0 0 520 380" className="w-full h-full max-w-lg select-none">
          {/* Pedal & Vacuum Booster Assembly (Left) */}
          <g transform="translate(40, 160)">
            {/* Brake Pedal Lever */}
            <line x1="0" y1="-80" x2={pedalPressed ? 18 : 0} y2="50" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
            <rect x={pedalPressed ? 10 : -8} y="45" width="22" height="12" rx="2" fill="#334155" />
            <text x="0" y="80" fill="#94a3b8" fontSize="10" fontFamily="monospace">PEDAL</text>

            {/* Vacuum Booster Canister */}
            <ellipse cx="65" cy="-20" rx="25" ry="35" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <text x="65" y="-60" fill="#64748b" fontSize="9" textAnchor="middle" fontFamily="monospace">BOOSTER</text>

            {/* Tandem Master Cylinder */}
            <rect x="90" y="-30" width="55" height="22" rx="2" fill="#334155" stroke="#64748b" />
            {/* Brake Fluid Reservoir (Yellow translucent fluid) */}
            <rect x="100" y="-55" width="35" height="25" rx="3" fill="#eab308" opacity="0.6" stroke="#ca8a04" strokeWidth="1.5" />
          </g>

          {/* Hydraulic Brake Steel Line with Fluid Pulse */}
          <path
            d="M 185 150 L 240 150 L 240 190 L 320 190"
            fill="none"
            stroke={pedalPressed ? '#ef4444' : '#38bdf8'}
            strokeWidth={pedalPressed ? '5' : '3'}
            strokeDasharray={isABSActive && absPulse ? '8,4' : undefined}
          />
          <text x="240" y="140" fill={pedalPressed ? '#ef4444' : '#38bdf8'} fontSize="10" fontFamily="monospace" textAnchor="middle">
            {pedalPressed ? (isABSActive ? 'ABS MODULATING (80-120 BAR)' : 'HYDRAULIC PRESSURE (140 BAR)') : 'BASELINE PRESSURE'}
          </text>

          {/* Disc Brake Assembly (Right) */}
          <g transform="translate(390, 200)">
            {/* Spinning Vented Cast Iron Rotor */}
            <g transform={`rotate(${(rotorRotation * 180) / Math.PI})`}>
              <circle r="90" fill="#334155" stroke="#cbd5e1" strokeWidth="3" />
              <circle r="40" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
              {/* Cooling Vane Slots */}
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1="45"
                  x2="0"
                  y2="85"
                  stroke="#475569"
                  strokeWidth="3"
                  transform={`rotate(${(i * 360) / 8})`}
                />
              ))}
              {/* Wheel Lug Studs */}
              {Array.from({ length: 5 }).map((_, i) => (
                <circle
                  key={i}
                  cx="0"
                  cy="25"
                  r="4"
                  fill="#94a3b8"
                  transform={`rotate(${(i * 360) / 5})`}
                />
              ))}
            </g>

            {/* Thermal Glowing Halo on Rotor when Hard Braking */}
            {pedalPressed && !isABSActive && (
              <circle r="88" fill="none" stroke="#f97316" strokeWidth="8" opacity="0.6" className="animate-pulse" />
            )}

            {/* Hydraulic Brake Caliper Housing */}
            <g transform="translate(-75, -50)">
              {/* Caliper Body (Red Performance Brembo-style) */}
              <path d="M 0 0 L 50 0 L 50 100 L 0 100 Z" fill="#dc2626" rx="4" />
              <text x="25" y="55" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="monospace" transform="rotate(-90, 25, 55)">
                CALIPER
              </text>

              {/* Friction Pad (Left - movable) */}
              <rect x={35 + padOffset} y="20" width="10" height="60" rx="1" fill="#78716c" stroke="#44403c" />
            </g>
          </g>

          {/* Telemetry Display */}
          <text x="30" y="35" fill="#ef4444" fontSize="12" fontFamily="monospace" fontWeight="bold">
            PEDAL EFFORT: {pedalPressed ? '650 N (ACTIVE)' : '0 N (RELEASED)'}
          </text>
          <text x="30" y="55" fill="#38bdf8" fontSize="11" fontFamily="monospace">
            ABS SLIP CONTROL: {isABSActive ? 'ACTIVE (PULSING)' : 'STANDBY'}
          </text>
        </svg>
      </div>

      {/* Mode Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setPedalPressed(!pedalPressed)}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            pedalPressed
              ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          {pedalPressed ? 'Brake Pedal Pressed' : 'Brake Pedal Released'}
        </button>

        <button
          onClick={() => setIsABSActive(!isABSActive)}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            isABSActive
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          {isABSActive ? 'ABS Pulse Active (Anti-Lock)' : 'Enable ABS Demonstration'}
        </button>
      </div>

      {/* Animation Controller */}
      <AnimationController
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onReset={() => {
          setPedalPressed(true);
          setIsABSActive(false);
          setIsPlaying(false);
        }}
        speed={speed}
        onSpeedChange={setSpeed}
        captionTitle={isABSActive ? t.animations.brakes.absModulation : t.animations.brakes.fluidPressure}
        captionDescription={
          isABSActive
            ? 'When wheel slip exceeds the optimal 15-20% threshold, the ABS electro-hydraulic modulator pulses hydraulic pressure 15 times/sec, preventing 100% wheel lockup so the front tires maintain lateral steering grip.'
            : 'Driver foot force is amplified by the vacuum booster into 120+ bar hydraulic pressure, clamping the caliper pads against the spinning disc and converting kinetic energy into friction heat.'
        }
      />
    </div>
  );
};
