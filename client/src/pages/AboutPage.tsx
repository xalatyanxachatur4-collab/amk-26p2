import React from 'react';
import { useLanguage } from '../context/LanguageContext.js';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.js';
import { Info, CheckCircle2, ShieldAlert, Cpu, Heart, Code2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 pb-20">
      <Breadcrumbs />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider font-bold mb-1">
            <Info className="w-4 h-4" />
            <span>Project Architecture</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.about.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.about.subtitle}
          </p>
        </div>

        {/* 1. Educational Mission */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.about.missionTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            {t.about.missionDesc}
          </p>
        </section>

        {/* 2. Core Principles */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.about.principlesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold font-mono text-sm">
                01
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.about.p1}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold font-mono text-sm">
                02
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.about.p2}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold font-mono text-sm">
                03
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.about.p3}
              </p>
            </div>
          </div>
        </section>

        {/* 3. Tech Stack */}
        <section className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-500" />
            <span>{t.about.techTitle}</span>
          </h3>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {['React 18', 'TypeScript', 'Vite', 'Three.js / R3F / Drei', 'Tailwind CSS', 'Lucide React', 'Express Node.js', 'Zod', 'Vitest', 'Multi-Lingual i18n'].map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* 4. Safety Disclaimer */}
        <section className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{t.about.disclaimerTitle}</span>
          </div>
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            {t.about.disclaimerText}
          </p>
        </section>
      </div>
    </div>
  );
};
