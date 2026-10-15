import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.js';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.js';
import { componentMatchingItems } from '../data/quizData.js';
import {
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LearningCenterPage: React.FC = () => {
  const { t, localize } = useLanguage();

  // Component Matching Challenge state
  const [selectedCompId, setSelectedCompId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // compId -> funcId
  const [matchingCompleted, setMatchingCompleted] = useState(false);

  const pathways = [
    {
      id: 'p1',
      title: t.learningCenter.pathBeginner,
      level: 'Beginner',
      topics: [
        'Otto 4-Stroke Cycle (Intake, Compression, Power, Exhaust)',
        'Torque vs. Horsepower fundamentals',
        'Hydraulic Pascal\'s law in braking systems',
        'Rigid passenger safety cages & crumple zones',
      ],
      systemLink: '/systems/engine',
    },
    {
      id: 'p2',
      title: t.learningCenter.pathIntermediate,
      level: 'Intermediate',
      topics: [
        'Open & limited-slip differential planetary bevel gears',
        'Ackermann steering geometry & turn centers',
        'Hooke\'s law spring compliance & viscous damping',
        'ABS wheel-slip pulse modulation algorithms',
      ],
      systemLink: '/systems/transmission',
    },
    {
      id: 'p3',
      title: t.learningCenter.pathAdvanced,
      level: 'Advanced',
      topics: [
        'High-voltage 400V/800V EV battery & SiC inverter architectures',
        'CAN-bus differential message arbitration',
        'Closed-loop lambda oxygen sensor ECU PID trimming',
        'Atkinson thermodynamic cycle & hybrid power split',
      ],
      systemLink: '/systems/electrical',
    },
  ];

  const handleSelectComponent = (id: string) => {
    setSelectedCompId(id);
  };

  const handleSelectFunction = (funcId: string) => {
    if (!selectedCompId) return;
    const newMatches = { ...matches, [selectedCompId]: funcId };
    setMatches(newMatches);
    setSelectedCompId(null);

    if (Object.keys(newMatches).length === componentMatchingItems.length) {
      setMatchingCompleted(true);
    }
  };

  const handleResetMatching = () => {
    setMatches({});
    setSelectedCompId(null);
    setMatchingCompleted(false);
  };

  // Calculate score in matching
  const correctMatchesCount = Object.entries(matches).filter(([cId, fId]) => cId === fId).length;

  return (
    <div className="space-y-12 pb-20">
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs uppercase tracking-wider font-bold mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Interactive Curriculum</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.learningCenter.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
            {t.learningCenter.subtitle}
          </p>
        </div>

        {/* 1. LEARNING PATHWAYS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Structured Engineering Pathways
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pathways.map((path) => (
              <div
                key={path.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {path.level}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {path.title}
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {path.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={path.systemLink}
                  className="inline-flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-900 dark:text-white transition-colors"
                >
                  <span>Start Pathway</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 2. COMPONENT IDENTIFICATION MATCHING EXERCISE */}
        <section className="space-y-6 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-cyan-600 dark:text-cyan-400 block mb-1">
                Practical Workshop
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t.learningCenter.matchingTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t.learningCenter.matchingSubtitle} Click a component on the left, then click its matching function on the right.
              </p>
            </div>

            <button
              onClick={handleResetMatching}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Challenge</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Left: Components */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase font-semibold text-slate-400 block mb-2">
                Step 1: Select Component
              </span>
              {componentMatchingItems.map((item) => {
                const isSelected = selectedCompId === item.id;
                const isMatched = matches[item.id] !== undefined;
                const isCorrect = matches[item.id] === item.id;

                let cardStyle =
                  'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-cyan-500';
                if (isSelected) {
                  cardStyle = 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-300 font-bold shadow-md';
                } else if (isMatched) {
                  cardStyle = isCorrect
                    ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                    : 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300';
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectComponent(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${cardStyle}`}
                  >
                    <span>{localize(item.component)}</span>
                    {isMatched && (
                      isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      )
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: Functions */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase font-semibold text-slate-400 block mb-2">
                Step 2: Match Function
              </span>
              {componentMatchingItems.map((item) => {
                const isAssigned = Object.values(matches).includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectFunction(item.id)}
                    disabled={!selectedCompId}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all ${
                      isAssigned
                        ? 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/40 text-slate-400 cursor-default'
                        : selectedCompId
                        ? 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-cyan-500 cursor-pointer'
                        : 'border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {localize(item.function)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results feedback banner */}
          {matchingCompleted && (
            <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-center space-y-2 animate-in fade-in">
              <h4 className="font-bold text-cyan-800 dark:text-cyan-200 text-sm">
                Challenge Complete: {correctMatchesCount} / {componentMatchingItems.length} Correct Matches!
              </h4>
              <p className="text-xs text-cyan-700 dark:text-cyan-400">
                {correctMatchesCount === componentMatchingItems.length
                  ? 'Outstanding! You have mastered these fundamental mechanical component roles.'
                  : 'Good effort! Review the highlighted red items and click Reset to try again.'}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
