import React from 'react';
import { PowertrainType, SystemId } from '../../types/automotive.js';
import { useLanguage } from '../../context/LanguageContext.js';

interface Vehicle2DCutawayProps {
  powertrain: PowertrainType;
  selectedComponent: string | null;
  onSelectComponent: (componentId: string, systemId: SystemId) => void;
}

export const Vehicle2DCutaway: React.FC<Vehicle2DCutawayProps> = ({
  powertrain,
  selectedComponent,
  onSelectComponent,
}) => {
  const { t } = useLanguage();

  const hotspots = [
    {
      id: powertrain === 'ice' ? 'cylinder-block' : 'electric-motor',
      systemId: 'engine' as SystemId,
      name: powertrain === 'ice' ? 'Engine (V6 / 4-Cyl)' : 'Electric Traction Motor',
      cx: 240,
      cy: 220,
      color: '#ea580c',
    },
    {
      id: powertrain === 'ice' ? 'gearbox-geartrain' : 'ev-inverter',
      systemId: powertrain === 'ice' ? ('transmission' as SystemId) : ('electrical' as SystemId),
      name: powertrain === 'ice' ? 'Transmission Gearbox' : 'SiC Power Inverter',
      cx: 370,
      cy: 225,
      color: '#3b82f6',
    },
    {
      id: powertrain === 'ice' ? 'differential' : 'ev-battery',
      systemId: powertrain === 'ice' ? ('transmission' as SystemId) : ('electrical' as SystemId),
      name: powertrain === 'ice' ? 'Rear Differential' : '400V/800V Battery Pack',
      cx: 560,
      cy: 235,
      color: powertrain === 'ice' ? '#2563eb' : '#0284c7',
    },
    {
      id: 'springs',
      systemId: 'suspension' as SystemId,
      name: 'MacPherson Strut & Damper',
      cx: 200,
      cy: 260,
      color: '#10b981',
    },
    {
      id: 'brake-rotor',
      systemId: 'brakes' as SystemId,
      name: 'Vented Brake Rotors & Caliper',
      cx: 190,
      cy: 310,
      color: '#ef4444',
    },
    {
      id: 'rack-and-pinion',
      systemId: 'steering' as SystemId,
      name: 'Steering Rack & Pinion',
      cx: 270,
      cy: 270,
      color: '#06b6d4',
    },
    {
      id: 'safety-cell',
      systemId: 'body' as SystemId,
      name: 'Safety Cell (Boron Steel)',
      cx: 440,
      cy: 140,
      color: '#6366f1',
    },
  ];

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="px-3 py-1 rounded-md bg-cyan-950/80 text-cyan-400 border border-cyan-800 text-xs font-mono font-semibold">
          2D Technical Blueprint Cutaway
        </span>
      </div>

      <svg
        viewBox="0 0 800 450"
        className="w-full max-w-3xl h-auto drop-shadow-md select-none"
      >
        <defs>
          <linearGradient id="blueprintGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Blueprint background lines */}
        <rect width="800" height="450" fill="#090d16" />
        <line x1="50" y1="360" x2="750" y2="360" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6,4" opacity="0.3" />

        {/* Ground level */}
        <line x1="60" y1="370" x2="740" y2="370" stroke="#334155" strokeWidth="2" />

        {/* Wheels */}
        {/* Front Wheel */}
        <g transform="translate(190, 310)">
          <circle r="52" fill="#0f172a" stroke="#475569" strokeWidth="8" />
          <circle r="36" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
          <circle r="22" fill="#334155" />
          <circle r="7" fill="#64748b" />
        </g>
        {/* Rear Wheel */}
        <g transform="translate(610, 310)">
          <circle r="52" fill="#0f172a" stroke="#475569" strokeWidth="8" />
          <circle r="36" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
          <circle r="22" fill="#334155" />
          <circle r="7" fill="#64748b" />
        </g>

        {/* Unibody chassis floorpan */}
        <path
          d="M 120 310 L 250 310 L 270 290 L 530 290 L 550 310 L 680 310 L 680 270 L 120 270 Z"
          fill="#1e293b"
          stroke="#38bdf8"
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* Car Body Silhouette (Translucent Cutaway) */}
        <path
          d="M 100 270 C 100 250, 130 210, 180 200 L 290 190 L 370 120 L 540 120 L 630 180 L 700 200 C 720 220, 720 260, 700 270 Z"
          fill="none"
          stroke="#0284c7"
          strokeWidth="2"
          strokeDasharray="4,2"
          opacity="0.6"
        />

        {/* Passenger Safety Cell Cage */}
        <path
          d="M 290 270 L 365 125 L 535 125 L 610 270"
          fill="none"
          stroke="#6366f1"
          strokeWidth="3.5"
          opacity="0.75"
        />
        <line x1="365" y1="125" x2="535" y2="125" stroke="#6366f1" strokeWidth="4" />
        <line x1="450" y1="125" x2="450" y2="270" stroke="#6366f1" strokeWidth="3" />

        {/* Engine / Motor block */}
        {powertrain === 'ice' ? (
          <g transform="translate(200, 185)">
            <rect width="80" height="70" rx="6" fill="#ea580c" opacity="0.85" stroke="#f97316" strokeWidth="2" />
            <text x="40" y="42" fill="#fff" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">ICE V6</text>
          </g>
        ) : (
          <g transform="translate(200, 195)">
            <rect width="80" height="55" rx="6" fill="#06b6d4" opacity="0.85" stroke="#38bdf8" strokeWidth="2" />
            <text x="40" y="32" fill="#fff" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">AC MOTOR</text>
          </g>
        )}

        {/* Transmission / Inverter */}
        {powertrain === 'ice' ? (
          <g transform="translate(310, 200)">
            <rect width="70" height="50" rx="6" fill="#2563eb" opacity="0.85" stroke="#60a5fa" strokeWidth="2" />
            <text x="35" y="30" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">GEARBOX</text>
          </g>
        ) : (
          <g transform="translate(310, 200)">
            <rect width="70" height="45" rx="6" fill="#0284c7" opacity="0.85" stroke="#38bdf8" strokeWidth="2" />
            <text x="35" y="28" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">INVERTER</text>
          </g>
        )}

        {/* Driveline / Battery */}
        {powertrain === 'ice' ? (
          <>
            <line x1="380" y1="225" x2="550" y2="235" stroke="#93c5fd" strokeWidth="4" />
            <circle cx="560" cy="235" r="22" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2" />
            <text x="560" y="239" fill="#fff" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">DIFF</text>
          </>
        ) : (
          <g transform="translate(300, 260)">
            <rect width="250" height="24" rx="4" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
            <text x="125" y="16" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">400V TRACTION BATTERY</text>
          </g>
        )}

        {/* Interactive Hotspot Markers */}
        {hotspots.map((spot) => {
          const isSelected = selectedComponent === spot.id;
          return (
            <g
              key={spot.id}
              className="cursor-pointer group"
              onClick={() => onSelectComponent(spot.id, spot.systemId)}
            >
              <circle
                cx={spot.cx}
                cy={spot.cy}
                r={isSelected ? 14 : 9}
                fill={spot.color}
                stroke="#ffffff"
                strokeWidth={isSelected ? 3 : 2}
                className="transition-all duration-200 group-hover:scale-125"
                filter={isSelected ? 'url(#glow)' : undefined}
              />
              <circle
                cx={spot.cx}
                cy={spot.cy}
                r={isSelected ? 20 : 13}
                fill="none"
                stroke={spot.color}
                strokeWidth="1.5"
                opacity="0.6"
                className="animate-ping"
              />
              <text
                x={spot.cx}
                y={spot.cy - 16}
                fill="#ffffff"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
                className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none drop-shadow"
              >
                {spot.name}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs font-mono text-slate-400">
        {t.vehicleViewer.clickPartHint}
      </p>
    </div>
  );
};
