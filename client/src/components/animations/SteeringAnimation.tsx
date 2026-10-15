import React, { useState, useEffect, useRef } from 'react';
import { AnimationController } from './AnimationController.js';
import { useLanguage } from '../../context/LanguageContext.js';

export const SteeringAnimation: React.FC = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [steerAngle, setSteerAngle] = useState(0); // -1 (full left) to +1 (full right)

  const requestRef = useRef<number>();

  useEffect(() => {
    let lastTime = performance.now();
    const update = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isPlaying) {
        setSteerAngle(Math.sin((now / 1000) * speed * 1.5));
      }
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed]);

  // Steering rack displacement (-40 to +40 px)
  const rackX = steerAngle * 45;

  // Steering wheel rotation angle in degrees (-180° to +180°)
  const wheelDeg = steerAngle * 180;

  // Ackermann Geometry:
  // When steering left (steerAngle < 0), inner wheel (left) turns sharper (~32°) than outer wheel (right) (~22°)
  // When steering right (steerAngle > 0), inner wheel (right) turns sharper (~32°) than outer wheel (left) (~22°)
  const leftWheelAngleDeg = steerAngle < 0 ? steerAngle * 32 : steerAngle * 22;
  const rightWheelAngleDeg = steerAngle > 0 ? steerAngle * 32 : steerAngle * 22;

  return (
    <div className="w-full space-y-4">
      {/* Visual Simulation Display */}
      <div className="relative w-full h-[400px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2 shadow-2xl">
        <svg viewBox="0 0 520 380" className="w-full h-full max-w-lg select-none">
          {/* Top-Down Vehicle Front-End Frame */}
          <path d="M 120 40 L 400 40 L 400 320 L 120 320 Z" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="4,4" />

          {/* Steering Wheel (Top Center) */}
          <g transform="translate(260, 75)">
            <g transform={`rotate(${wheelDeg})`}>
              {/* Outer Handwheel Rim */}
              <circle r="36" fill="none" stroke="#38bdf8" strokeWidth="6" />
              {/* 3-Spoke Hub */}
              <line x1="0" y1="0" x2="0" y2="-36" stroke="#38bdf8" strokeWidth="4" />
              <line x1="0" y1="0" x2="-31" y2="18" stroke="#38bdf8" strokeWidth="4" />
              <line x1="0" y1="0" x2="31" y2="18" stroke="#38bdf8" strokeWidth="4" />
              <circle r="8" fill="#0284c7" />
            </g>
            <text x="0" y="-48" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
              STEERING WHEEL: {Math.round(wheelDeg)}°
            </text>
          </g>

          {/* Steering Column Shaft & Universal Joint Linkage */}
          <line x1="260" y1="115" x2="260" y2="190" stroke="#64748b" strokeWidth="6" />
          <circle cx="260" cy="190" r="10" fill="#334155" stroke="#38bdf8" strokeWidth="2" />

          {/* Rack and Pinion Gear Mechanism */}
          <g transform="translate(260, 205)">
            {/* Stationary Pinion Housing */}
            <rect x="-16" y="-12" width="32" height="24" rx="3" fill="#0284c7" />

            {/* Sliding Toothed Rack Bar */}
            <g transform={`translate(${rackX}, 0)`}>
              <rect x="-130" y="-8" width="260" height="16" rx="3" fill="#334155" stroke="#38bdf8" strokeWidth="2" />
              {/* Teeth on top of rack */}
              {Array.from({ length: 18 }).map((_, i) => (
                <line key={i} x1={-90 + i * 10} y1="-8" x2={-90 + i * 10} y2="-4" stroke="#94a3b8" strokeWidth="2" />
              ))}
            </g>

            {/* Tie Rods connecting Rack to Steering Knuckles */}
            {/* Left Tie Rod */}
            <line x1={-130 + rackX} y1="0" x2="-140" y2="40" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" />
            {/* Right Tie Rod */}
            <line x1={130 + rackX} y1="0" x2="140" y2="40" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* Steerable Front Left Wheel Assembly */}
          <g transform="translate(120, 245)">
            <g transform={`rotate(${leftWheelAngleDeg})`}>
              {/* Rubber Tire Profile */}
              <rect x="-20" y="-45" width="40" height="90" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="3" />
              <line x1="0" y1="-45" x2="0" y2="45" stroke="#38bdf8" strokeWidth="2" />
            </g>
            <text x="-40" y="65" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
              LEFT: {Math.round(leftWheelAngleDeg)}°
            </text>
          </g>

          {/* Steerable Front Right Wheel Assembly */}
          <g transform="translate(400, 245)">
            <g transform={`rotate(${rightWheelAngleDeg})`}>
              {/* Rubber Tire Profile */}
              <rect x="-20" y="-45" width="40" height="90" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="3" />
              <line x1="0" y1="-45" x2="0" y2="45" stroke="#38bdf8" strokeWidth="2" />
            </g>
            <text x="40" y="65" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
              RIGHT: {Math.round(rightWheelAngleDeg)}°
            </text>
          </g>

          {/* Ackermann Turn Center Intersection lines */}
          {steerAngle !== 0 && (
            <g stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" opacity="0.4">
              <line x1="120" y1="245" x2={steerAngle < 0 ? -100 : 620} y2="350" />
              <line x1="400" y1="245" x2={steerAngle < 0 ? -100 : 620} y2="350" />
              <circle cx={steerAngle < 0 ? -100 : 620} cy="350" r="6" fill="#38bdf8" />
            </g>
          )}

          {/* Telemetry Display */}
          <text x="30" y="340" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
            ACKERMANN DELTA: {Math.abs(Math.round(leftWheelAngleDeg - rightWheelAngleDeg))}° DIFFERENTIAL
          </text>
        </svg>
      </div>

      {/* Manual Steer Slider */}
      <div className="flex items-center justify-center gap-4 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <span className="text-xs font-mono font-bold text-slate-500">Full Left</span>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.05"
          value={steerAngle}
          onChange={(e) => {
            setSteerAngle(parseFloat(e.target.value));
            setIsPlaying(false);
          }}
          className="w-48 accent-cyan-500 cursor-pointer"
        />
        <span className="text-xs font-mono font-bold text-slate-500">Full Right</span>
      </div>

      {/* Animation Controller */}
      <AnimationController
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onReset={() => {
          setSteerAngle(0);
          setIsPlaying(false);
        }}
        speed={speed}
        onSpeedChange={setSpeed}
        captionTitle={t.animations.steering.ackermann}
        captionDescription="Notice that when turning, the inside front wheel always steers to a sharper angle than the outside front wheel. This satisfies Ackermann geometry so both wheel spindles intersect at the center point of the turn."
      />
    </div>
  );
};
