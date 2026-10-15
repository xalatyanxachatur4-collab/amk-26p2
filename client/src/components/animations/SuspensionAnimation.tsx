import React, { useState, useEffect, useRef } from 'react';
import { AnimationController } from './AnimationController.js';
import { useLanguage } from '../../context/LanguageContext.js';

export const SuspensionAnimation: React.FC = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [time, setTime] = useState(0);

  const requestRef = useRef<number>();

  useEffect(() => {
    let lastTime = performance.now();
    const update = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isPlaying) {
        setTime((prev) => prev + dt * speed * 2);
      }
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed]);

  // Road Bump Profile: moving sine/crest wave simulating driving over rough pavement
  // Wheel vertical displacement: unsprung mass responds quickly to road
  const roadDisplacement = Math.sin(time * 2.5) * 28;
  const wheelY = 280 - roadDisplacement;

  // Chassis / Body vertical displacement: sprung mass is heavily isolated by spring-damper (smaller amplitude and phase lag)
  const chassisY = 90 - Math.sin(time * 2.5 - 0.7) * 7;

  // Spring compression delta
  const springLength = wheelY - chassisY - 80;

  return (
    <div className="w-full space-y-4">
      {/* Visual Simulation Display */}
      <div className="relative w-full h-[400px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2 shadow-2xl">
        <svg viewBox="0 0 500 400" className="w-full h-full max-w-lg select-none">
          {/* Moving Road Profile under the wheel */}
          <path
            d={`M 50 ${350 + Math.sin(time * 2.5) * 28} Q 250 ${350 - roadDisplacement * 1.2} 450 ${350 + Math.sin(time * 2.5) * 28}`}
            fill="none"
            stroke="#475569"
            strokeWidth="8"
          />
          <line x1="50" y1="365" x2="450" y2="365" stroke="#334155" strokeWidth="2" strokeDasharray="6,4" />

          {/* Vehicle Body / Chassis Shell (Sprung Mass) */}
          <g transform={`translate(150, ${chassisY})`}>
            <rect x="0" y="0" width="200" height="45" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="100" y="27" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
              CHASSIS (SPRUNG MASS)
            </text>
            {/* Upper Strut Mounting Hat */}
            <circle cx="100" cy="45" r="8" fill="#64748b" />
          </g>

          {/* Suspension MacPherson Strut Assembly */}
          <g transform="translate(250, 0)">
            {/* Hydraulic Damper Outer Cylinder (Mounted to wheel knuckle) */}
            <rect
              x="-12"
              y={wheelY - 75}
              width="24"
              height="80"
              rx="4"
              fill="#0f766e"
              stroke="#2dd4bf"
              strokeWidth="2"
            />
            {/* Damper Inner Chrome Piston Rod (Connected to Chassis) */}
            <line
              x1="0"
              y1={chassisY + 45}
              x2="0"
              y2={wheelY - 20}
              stroke="#e2e8f0"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Coil Spring Wrapping around Strut (Hooke's Law visualization) */}
            {Array.from({ length: 6 }).map((_, i) => {
              const y1 = chassisY + 50 + (i * springLength) / 6;
              const y2 = chassisY + 50 + ((i + 1) * springLength) / 6;
              return (
                <path
                  key={i}
                  d={`M -25 ${y1} Q 25 ${(y1 + y2) / 2} -25 ${y2}`}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              );
            })}

            {/* Lower Control Wishbone Arm */}
            <line
              x1="-80"
              y1={chassisY + 120}
              x2="0"
              y2={wheelY}
              stroke="#475569"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </g>

          {/* Wheel & Tire (Unsprung Mass) */}
          <g transform={`translate(250, ${wheelY})`}>
            {/* Rubber Tire Profile */}
            <circle r="48" fill="#0f172a" stroke="#334155" strokeWidth="12" />
            {/* Alloy Wheel Rim */}
            <circle r="34" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
            <circle r="12" fill="#475569" />
            {/* Tire-Road Contact Patch Indicator */}
            <ellipse cx="0" cy="48" rx="20" ry="3" fill="#38bdf8" opacity="0.7" />
          </g>

          {/* Physics Telemetry */}
          <text x="30" y="35" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
            SPRING COMPRESSION: {Math.round(160 - springLength)} mm
          </text>
          <text x="30" y="55" fill="#10b981" fontSize="11" fontFamily="monospace">
            HOOKE'S LAW FORCE: F = -k·x
          </text>
          <text x="30" y="73" fill="#2dd4bf" fontSize="11" fontFamily="monospace">
            VISCOUS DAMPING: F = -c·(dx/dt)
          </text>
        </svg>
      </div>

      {/* Animation Controller */}
      <AnimationController
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onReset={() => {
          setTime(0);
          setIsPlaying(false);
        }}
        speed={speed}
        onSpeedChange={setSpeed}
        captionTitle={t.animations.suspension.bump}
        captionDescription="Notice how the wheel follows the undulating road profile dynamically (large displacement), while the chassis remains relatively stationary (isolated by spring compliance and damper velocity resistance)."
      />
    </div>
  );
};
