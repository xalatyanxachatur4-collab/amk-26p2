import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.js';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.js';
import { masterQuizQuestions } from '../data/quizData.js';
import { Award, CheckCircle2, XCircle, RotateCcw, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizPage: React.FC = () => {
  const { t, localize } = useLanguage();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (qId: string, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    masterQuizQuestions.forEach((q) => {
      const selectedIdx = selectedAnswers[q.id];
      if (selectedIdx !== undefined && q.options[selectedIdx]?.isCorrect) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    if (score >= masterQuizQuestions.length * 0.8) {
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } catch (e) {
        // ignore if canvas not supported
      }
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const score = calculateScore();
  const total = masterQuizQuestions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="space-y-8 pb-20">
      <Breadcrumbs />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider font-bold mb-1">
              <Award className="w-4 h-4" />
              <span>Assessment & Certification</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {t.nav.quiz}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Test your grasp of thermodynamic cycles, hydraulic amplification, planetary differentials, and crash energy management.
            </p>
          </div>

          {isSubmitted && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800">
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Result</span>
                <span className="text-lg font-black text-cyan-600 dark:text-cyan-400">
                  {score} / {total} ({Math.round((score / total) * 100)}%)
                </span>
              </div>
              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-500"
                title={t.learningCenter.retry}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {masterQuizQuestions.map((q, idx) => {
            const selectedIdx = selectedAnswers[q.id];

            return (
              <div
                key={q.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    Question {idx + 1} of {total}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {q.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {localize(q.question)}
                </h3>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedIdx === optIdx;

                    let btnStyle =
                      'border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200';

                    if (isSelected && !isSubmitted) {
                      btnStyle =
                        'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-300 font-bold';
                    }

                    if (isSubmitted) {
                      if (opt.isCorrect) {
                        btnStyle =
                          'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-bold';
                      } else if (isSelected && !opt.isCorrect) {
                        btnStyle =
                          'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{localize(opt.text)}</span>
                        {isSubmitted && opt.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        )}
                        {isSubmitted && isSelected && !opt.isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="font-bold text-cyan-600 dark:text-cyan-400 block">
                      Engineering Rationale:
                    </span>
                    <p className="leading-relaxed">{localize(q.explanation)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Action Bar */}
        {!isSubmitted && (
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSubmit}
              disabled={answeredCount === 0}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 active:scale-95 transition-all"
            >
              Submit Quiz ({answeredCount}/{total} Answered)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
