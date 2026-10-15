import React from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Gauge } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.js';

interface AnimationControllerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  onPrevStep?: () => void;
  onNextStep?: () => void;
  currentStep?: number;
  totalSteps?: number;
  stepLabels?: string[];
  speed?: number;
  onSpeedChange?: (speed: number) => void;
  captionTitle?: string;
  captionDescription?: string;
}

export const AnimationController: React.FC<AnimationControllerProps> = ({
  isPlaying,
  onTogglePlay,
  onReset,
  onPrevStep,
  onNextStep,
  currentStep = 0,
  totalSteps = 4,
  stepLabels = [],
  speed = 1,
  onSpeedChange,
  captionTitle,
  captionDescription,
}) => {
  const { t } = useLanguage();

  return (
    <div className="w-full space-y-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
      {/* Top Bar: Playback Controls & Speed */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Play / Pause */}
          <button
            onClick={onTogglePlay}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
            title={isPlaying ? t.animations.pause : t.animations.play}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? t.animations.pause : t.animations.play}</span>
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors"
            title={t.animations.reset}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Step Back / Forward if supported */}
          {onPrevStep && onNextStep && (
            <div className="flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-2">
              <button
                onClick={onPrevStep}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                title={t.animations.stepBack}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={onNextStep}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                title={t.animations.stepForward}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Speed / RPM slider */}
        {onSpeedChange && (
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
            <Gauge className="w-4 h-4 text-cyan-500" />
            <span>{t.animations.speed}:</span>
            <input
              type="range"
              min="0.25"
              max="2.5"
              step="0.25"
              value={speed}
              onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
              className="w-24 accent-cyan-500 cursor-pointer"
            />
            <span className="w-8 font-semibold">{speed}x</span>
          </div>
        )}
      </div>

      {/* Step Indicators / Stepper */}
      {stepLabels.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
          {stepLabels.map((label, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-xl text-center border transition-all ${
                currentStep === idx
                  ? 'bg-cyan-500 text-white border-cyan-500 font-bold shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-500 text-xs font-medium'
              }`}
            >
              <span className="block text-[10px] font-mono uppercase tracking-wider opacity-80">
                Step {idx + 1}
              </span>
              <span className="text-xs truncate block">{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Synchronized Caption Card */}
      {captionTitle && (
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            {captionTitle}
          </h4>
          {captionDescription && (
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              {captionDescription}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
