import React, { useState, useEffect } from 'react';
import { AnimationController } from './AnimationController.js';
import { useLanguage } from '../../context/LanguageContext.js';
import { ShieldAlert, Cpu, CheckCircle2, Zap } from 'lucide-react';

export const ElectricalAnimation: React.FC = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [mode, setMode] = useState<'start' | 'loop'>('start');
  const [stage, setStage] = useState(0); // 0 to 3 for start sequence or control loop

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 2000 / speed);
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const startStages = [
    {
      title: '1. Start Authentication Request',
      desc: 'Driver presses Start Engine button. Smart key sends encrypted RF challenge response to Body Control Module (BCM).',
    },
    {
      title: '2. Immobilizer & Interlock Verification',
      desc: 'BCM verifies cryptographic signature and checks safety interlocks (brake pedal depressed, transmission in Park/Neutral).',
    },
    {
      title: '3. Starter Relay / High-Voltage Contactor Close',
      desc: 'ECU triggers starter solenoid relay to spin flywheel, or in an EV, pre-charge resistor and main DC contactors snap closed with audible thunk.',
    },
    {
      title: '4. Systems Online & Telemetry Broadcast',
      desc: 'Engine fires up and idles smoothly; high-speed CAN bus broadcasts engine RPM, oil pressure, and alternator/BMS state to instrument cluster.',
    },
  ];

  const loopStages = [
    {
      title: '1. Sensor Acquisition (Exhaust O2 / MAF)',
      desc: 'Heated zirconia oxygen sensor generates 0.1V–0.9V analog voltage signaling lean or rich combustion exhaust mixture.',
    },
    {
      title: '2. ECU Real-Time Processing (PID Algorithm)',
      desc: 'Engine Control Unit compares lambda reading against target 14.7:1 stoichiometric ratio, calculating microsecond fuel trim offset.',
    },
    {
      title: '3. Actuator Output Execution',
      desc: 'ECU fires high-pressure piezo direct fuel injector solenoid, adjusting fuel mass delivery into the cylinder bore.',
    },
    {
      title: '4. Changed Physical Condition & Feedback',
      desc: 'Exhaust stoichiometry shifts back to ideal lambda = 1.00; O2 sensor instantly reports adjusted voltage back to ECU.',
    },
  ];

  const currentStages = mode === 'start' ? startStages : loopStages;

  return (
    <div className="w-full space-y-4">
      {/* Mode Switcher */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => {
            setMode('start');
            setStage(0);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            mode === 'start'
              ? 'bg-cyan-500 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          {t.animations.electrical.ignitionStep}
        </button>

        <button
          onClick={() => {
            setMode('loop');
            setStage(0);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            mode === 'loop'
              ? 'bg-cyan-500 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          {t.animations.electrical.closedLoopStep}
        </button>
      </div>

      {/* Visual Simulation Display */}
      <div className="relative w-full h-[400px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2 shadow-2xl">
        <svg viewBox="0 0 520 380" className="w-full h-full max-w-lg select-none">
          {mode === 'start' ? (
            /* STARTING SEQUENCE DIAGRAM */
            <g transform="translate(40, 60)">
              {/* Step 1: Start Button */}
              <g transform="translate(40, 80)">
                <circle r="30" fill={stage >= 0 ? '#0284c7' : '#1e293b'} stroke="#38bdf8" strokeWidth="2.5" />
                <text x="0" y="4" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  START
                </text>
                <text x="0" y="48" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                  1. REQUEST
                </text>
              </g>

              {/* Step 2: BCM / Immobilizer */}
              <g transform="translate(160, 80)">
                <rect x="-35" y="-30" width="70" height="60" rx="8" fill={stage >= 1 ? '#0369a1' : '#1e293b'} stroke="#38bdf8" strokeWidth="2" />
                <Cpu className="w-6 h-6 text-cyan-400 mx-auto" />
                <text x="0" y="4" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  BCM / ECU
                </text>
                <text x="0" y="48" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                  2. AUTH
                </text>
              </g>

              {/* Step 3: Starter Motor / HV Relays */}
              <g transform="translate(280, 80)">
                <circle r="30" fill={stage >= 2 ? '#ea580c' : '#1e293b'} stroke="#f97316" strokeWidth="2.5" />
                <text x="0" y="4" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  STARTER
                </text>
                <text x="0" y="48" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                  3. CRANK
                </text>
              </g>

              {/* Step 4: Engine / EV Running */}
              <g transform="translate(400, 80)">
                <circle r="30" fill={stage >= 3 ? '#16a34a' : '#1e293b'} stroke="#22c55e" strokeWidth="2.5" />
                <text x="0" y="4" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  RUNNING
                </text>
                <text x="0" y="48" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                  4. ONLINE
                </text>
              </g>

              {/* Connecting Bus Lines with Signal Flow */}
              <line x1="70" y1="80" x2="125" y2="80" stroke={stage >= 1 ? '#38bdf8' : '#334155'} strokeWidth="4" />
              <line x1="195" y1="80" x2="250" y2="80" stroke={stage >= 2 ? '#f97316' : '#334155'} strokeWidth="4" />
              <line x1="310" y1="80" x2="370" y2="80" stroke={stage >= 3 ? '#22c55e' : '#334155'} strokeWidth="4" />
            </g>
          ) : (
            /* CLOSED-LOOP CONTROL DIAGRAM */
            <g transform="translate(260, 180)">
              {/* Center ECU */}
              <rect x="-55" y="-35" width="110" height="70" rx="8" fill="#0369a1" stroke="#38bdf8" strokeWidth="3" />
              <text x="0" y="-5" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                ECU CORE
              </text>
              <text x="0" y="15" fill="#bae6fd" fontSize="9" textAnchor="middle" fontFamily="monospace">
                PID CALCULATION
              </text>

              {/* Sensor Node (Left) */}
              <g transform="translate(-150, 0)">
                <circle r="34" fill={stage === 0 || stage === 3 ? '#0284c7' : '#1e293b'} stroke="#38bdf8" strokeWidth="2" />
                <text x="0" y="4" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  O2 SENSOR
                </text>
                <text x="0" y="48" fill="#38bdf8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                  FEEDBACK
                </text>
              </g>

              {/* Actuator Node (Right) */}
              <g transform="translate(150, 0)">
                <circle r="34" fill={stage === 2 ? '#ea580c' : '#1e293b'} stroke="#f97316" strokeWidth="2" />
                <text x="0" y="4" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  INJECTOR
                </text>
                <text x="0" y="48" fill="#f97316" fontSize="10" textAnchor="middle" fontFamily="monospace">
                  ACTUATOR
                </text>
              </g>

              {/* Flow Arrows */}
              {/* Sensor to ECU */}
              <path d="M -115 0 L -55 0" stroke="#38bdf8" strokeWidth="4" markerEnd="url(#arrow)" />
              {/* ECU to Actuator */}
              <path d="M 55 0 L 115 0" stroke="#f97316" strokeWidth="4" />
              {/* Actuator feedback curve back to sensor */}
              <path
                d="M 150 35 C 150 120, -150 120, -150 35"
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                strokeDasharray="6,4"
              />
              <text x="0" y="105" fill="#22c55e" fontSize="10" textAnchor="middle" fontFamily="monospace">
                EXHAUST STOICHIOMETRY FEEDBACK LOOP
              </text>
            </g>
          )}

          {/* Telemetry info */}
          <text x="30" y="340" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
            STAGE {stage + 1}/4: {currentStages[stage].title.toUpperCase()}
          </text>
        </svg>
      </div>

      {/* High-Voltage EV Safety Advisory Banner */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400">
        <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <span className="font-bold block uppercase font-mono tracking-wider">
            High-Voltage Electrical Safety Warning (400V–800V DC)
          </span>
          <p className="leading-relaxed opacity-90">
            Never attempt to probe, unbolt, or service orange high-voltage electric vehicle cabling or traction battery packs without certified high-voltage technician credentials, calibrated insulation safety gear, and lock-out/tag-out procedures.
          </p>
        </div>
      </div>

      {/* Animation Controller */}
      <AnimationController
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onReset={() => {
          setStage(0);
          setIsPlaying(false);
        }}
        onPrevStep={() => {
          setStage((prev) => (prev + 3) % 4);
          setIsPlaying(false);
        }}
        onNextStep={() => {
          setStage((prev) => (prev + 1) % 4);
          setIsPlaying(false);
        }}
        currentStep={stage}
        totalSteps={4}
        stepLabels={currentStages.map((s) => s.title.split('. ')[1])}
        speed={speed}
        onSpeedChange={setSpeed}
        captionTitle={currentStages[stage].title}
        captionDescription={currentStages[stage].desc}
      />
    </div>
  );
};
