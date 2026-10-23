import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.js';
import { ManualTransmissionAnimation } from './ManualTransmissionAnimation.js';
import { AutomaticTransmissionAnimation } from './AutomaticTransmissionAnimation.js';
import { EVReducerAnimation } from './EVReducerAnimation.js';
import { Cog, Layers, Zap } from 'lucide-react';

interface TransmissionGearAnimationProps {
  initialMode?: 'manual' | 'automatic' | 'ev';
}

export const TransmissionGearAnimation: React.FC<TransmissionGearAnimationProps> = ({
  initialMode = 'manual',
}) => {
  const { t } = useLanguage();
  const [transMode, setTransMode] = useState<'manual' | 'automatic' | 'ev'>(initialMode);

  return (
    <div className="w-full space-y-6">
      {/* Sub-mode switcher inside Transmission simulation */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setTransMode('manual')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              transMode === 'manual'
                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Cog className="w-4 h-4 text-cyan-500" />
            <span>{t.systemDetail.manualTransTab || 'Manual (МКПП)'}</span>
          </button>

          <button
            onClick={() => setTransMode('automatic')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              transMode === 'automatic'
                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-500" />
            <span>{t.systemDetail.automaticTransTab || 'Automatic (АКПП)'}</span>
          </button>

          <button
            onClick={() => setTransMode('ev')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              transMode === 'ev'
                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-500" />
            <span>{t.systemDetail.evReducerTab || 'EV Reducer (Редуктор)'}</span>
          </button>
        </div>

        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 px-2">
          {transMode === 'manual'
            ? '3-Shaft Synchromesh'
            : transMode === 'automatic'
            ? 'Planetary & Torque Converter'
            : 'Single-Speed 9:1 Reduction'}
        </span>
      </div>

      {/* Render selected simulation */}
      {transMode === 'manual' && <ManualTransmissionAnimation />}
      {transMode === 'automatic' && <AutomaticTransmissionAnimation />}
      {transMode === 'ev' && <EVReducerAnimation />}
    </div>
  );
};
