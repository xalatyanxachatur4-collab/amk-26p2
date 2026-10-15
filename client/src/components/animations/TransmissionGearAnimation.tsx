import React, { useState, useEffect, useRef } from 'react';
import { AnimationController } from './AnimationController.js';
import { useLanguage } from '../../context/LanguageContext.js';

export const TransmissionGearAnimation: React.FC = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [activeGear, setActiveGear] = useState<'1st' | '3rd' | '5th' | 'diff'>('1st');
  const [rotationAngle, setRotationAngle] = useState(0);

  const requestRef = useRef<number>();

  useEffect(() => {
    let lastTime = performance.now();
    const update = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying) {
        setRotationAngle((prev) => (prev + dt * speed * 2.5) % (Math.PI * 2));
      }
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed]);

  // Gear ratio calculations:
  // 1st Gear: Input gear small (R=25), Output gear huge (R=75). Ratio 3.0:1 (Output 3x slower, 3x more torque)
  // 3rd Gear: Input gear R=45, Output gear R=45. Ratio 1.0:1 (Direct drive)
  // 5th Gear: Input gear huge (R=65), Output gear small (R=35). Ratio 0.54:1 (Overdrive, output spins 1.85x faster)
  let inputR = 28;
  let outputR = 80;
  let ratioText = '3.00:1 (Torque Multiplied 300%)';

  if (activeGear === '3rd') {
    inputR = 50;
    outputR = 50;
    ratioText = '1.00:1 (Direct 1:1 Drive)';
  } else if (activeGear === '5th') {
    inputR = 70;
    outputR = 36;
    ratioText = '0.51:1 (Overdrive Cruise, 1.95x Speed)';
  }

  const gearRatio = outputR / inputR;
  const inputAngle = rotationAngle;
  const outputAngle = -rotationAngle / gearRatio;

  // Differential cornering speeds:
  // When cornering left: Inner wheel is 0.5x speed, Outer wheel is 1.5x speed
  const leftWheelAngle = -rotationAngle * 0.6;
  const rightWheelAngle = -rotationAngle * 1.4;

  const captions: Record<string, { title: string; desc: string }> = {
    '1st': {
      title: t.animations.gears.gear1,
      desc: 'Small drive gear turns large driven gear. Output speed decreases by 3x while output torque is multiplied 3x to overcome static vehicle inertia.',
    },
    '3rd': {
      title: t.animations.gears.gear3,
      desc: 'Balanced 1:1 direct ratio. Input engine RPM equals driveshaft speed with zero torque multiplication.',
    },
    '5th': {
      title: t.animations.gears.gear5,
      desc: 'Large drive gear turns smaller driven gear. Driveshaft spins nearly twice as fast as the engine, allowing low-RPM highway cruising.',
    },
    diff: {
      title: t.animations.gears.differential,
      desc: t.animations.gears.diffDesc,
    },
  };

  return (
    <div className="w-full space-y-4">
      {/* Visual Simulation Display */}
      <div className="relative w-full h-[400px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2 shadow-2xl">
        <svg viewBox="0 0 500 380" className="w-full h-full max-w-lg select-none">
          {activeGear !== 'diff' ? (
            /* GEAR TRAIN SIMULATION */
            <g transform="translate(250, 190)">
              {/* Shaft connecting lines */}
              <line x1="-120" y1="0" x2="120" y2="0" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />

              {/* Input Drive Gear (Left) */}
              <g transform="translate(-80, 0)">
                <circle r={inputR} fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
                {/* Teeth markers rotating */}
                <g transform={`rotate(${(inputAngle * 180) / Math.PI})`}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={-inputR + 6}
                      x2="0"
                      y2={-inputR - 6}
                      stroke="#38bdf8"
                      strokeWidth="3.5"
                      transform={`rotate(${(i * 360) / 12})`}
                    />
                  ))}
                  <circle cx="0" cy="0" r="8" fill="#0284c7" />
                  <line x1="0" y1="0" x2="0" y2={-inputR + 5} stroke="#ffffff" strokeWidth="2" />
                </g>
                <text x="0" y={inputR + 25} fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                  INPUT (ENGINE)
                </text>
              </g>

              {/* Output Driven Gear (Right) */}
              <g transform="translate(90, 0)">
                <circle r={outputR} fill="#1e293b" stroke="#f97316" strokeWidth="3" />
                {/* Teeth markers rotating inversely */}
                <g transform={`rotate(${(outputAngle * 180) / Math.PI})`}>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={-outputR + 6}
                      x2="0"
                      y2={-outputR - 6}
                      stroke="#f97316"
                      strokeWidth="3.5"
                      transform={`rotate(${(i * 360) / 20})`}
                    />
                  ))}
                  <circle cx="0" cy="0" r="10" fill="#ea580c" />
                  <line x1="0" y1="0" x2="0" y2={-outputR + 5} stroke="#ffffff" strokeWidth="2" />
                </g>
                <text x="0" y={outputR + 25} fill="#f97316" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                  OUTPUT (WHEELS)
                </text>
              </g>

              {/* Pitch Point Contact indicator */}
              <circle cx="0" cy="0" r="4" fill="#fbbf24" className="animate-ping" />
            </g>
          ) : (
            /* DIFFERENTIAL CORNERING SIMULATION */
            <g transform="translate(250, 190)">
              {/* Ring Gear Carrier (Blue outer circle) */}
              <circle r="75" fill="#1e293b" stroke="#2563eb" strokeWidth="4" />
              {/* Sun gear Left (Inner wheel, slow) */}
              <g transform="translate(-45, 0)">
                <circle r="25" fill="#334155" stroke="#38bdf8" strokeWidth="2" />
                <g transform={`rotate(${(leftWheelAngle * 180) / Math.PI})`}>
                  <line x1="0" y1="-20" x2="0" y2="20" stroke="#38bdf8" strokeWidth="2" />
                </g>
                <line x1="-25" y1="0" x2="-120" y2="0" stroke="#60a5fa" strokeWidth="5" />
                <rect x="-145" y="-30" width="25" height="60" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="-132" y="45" fill="#38bdf8" fontSize="10" textAnchor="middle" fontFamily="monospace">INNER (SLOW)</text>
              </g>

              {/* Sun gear Right (Outer wheel, fast) */}
              <g transform="translate(45, 0)">
                <circle r="25" fill="#334155" stroke="#f97316" strokeWidth="2" />
                <g transform={`rotate(${(rightWheelAngle * 180) / Math.PI})`}>
                  <line x1="0" y1="-20" x2="0" y2="20" stroke="#f97316" strokeWidth="2" />
                </g>
                <line x1="25" y1="0" x2="120" y2="0" stroke="#fb923c" strokeWidth="5" />
                <rect x="120" y="-30" width="25" height="60" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="132" y="45" fill="#f97316" fontSize="10" textAnchor="middle" fontFamily="monospace">OUTER (FAST)</text>
              </g>

              {/* Pinion spider bevel gears (Top and Bottom) */}
              <circle cx="0" cy="-45" r="16" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
              <circle cx="0" cy="45" r="16" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />

              <text x="0" y="-95" fill="#93c5fd" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                DIFFERENTIAL OPEN CORNERING MODE
              </text>
            </g>
          )}

          {/* Ratio overlay */}
          <text x="30" y="35" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
            RATIO: {ratioText}
          </text>
        </svg>
      </div>

      {/* Mode Selectors */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(['1st', '3rd', '5th', 'diff'] as const).map((gear) => (
          <button
            key={gear}
            onClick={() => setActiveGear(gear)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeGear === gear
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {gear === 'diff' ? 'Differential Mode' : `${gear} Gear`}
          </button>
        ))}
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
        captionTitle={captions[activeGear].title}
        captionDescription={captions[activeGear].desc}
      />
    </div>
  );
};
