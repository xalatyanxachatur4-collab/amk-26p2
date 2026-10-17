import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  Flame,
  Cog,
  Activity,
  Disc,
  Compass,
  Zap,
  Shield,
  Bot,
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Workflow,
  Cpu,
  History,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.js';
import { systemsData } from '../data/systemsData.js';
import { VehicleExplorer } from '../components/vehicle/VehicleExplorer.js';

export const HomePage: React.FC = () => {
  const { t, localize } = useLanguage();

  const systemCards = [
    { id: 'engine', data: systemsData.engine, icon: Flame, color: 'from-amber-500/20 to-orange-500/10 border-orange-500/30 text-orange-500' },
    { id: 'transmission', data: systemsData.transmission, icon: Cog, color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-500' },
    { id: 'suspension', data: systemsData.suspension, icon: Activity, color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-500' },
    { id: 'brakes', data: systemsData.brakes, icon: Disc, color: 'from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-500' },
    { id: 'steering', data: systemsData.steering, icon: Compass, color: 'from-cyan-500/20 to-sky-500/10 border-cyan-500/30 text-cyan-500' },
    { id: 'electrical', data: systemsData.electrical, icon: Zap, color: 'from-yellow-500/20 to-amber-500/10 border-yellow-500/30 text-yellow-500' },
    { id: 'body', data: systemsData.body, icon: Shield, color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-500' },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {t.hero.title}
            </h1>

            {/* Professional Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              {t.hero.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/explore"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 active:scale-95 transition-all"
              >
                <Layers className="w-4 h-4" />
                <span>{t.hero.exploreCta}</span>
              </Link>

              <Link
                to="/systems/engine"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-cyan-500 font-bold text-sm shadow-sm transition-all"
              >
                <span>{t.hero.systemsCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200 dark:border-slate-800/80">
              {Object.entries(t.hero.stats).map(([key, label]) => (
                <div key={key} className="text-center p-2 rounded-xl bg-slate-100/60 dark:bg-slate-900/40">
                  <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED INTERACTIVE VEHICLE LAB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold block mb-1">
              Digital Testing Ground
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t.vehicleViewer.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.vehicleViewer.subtitle}
            </p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>Open Fullscreen Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <VehicleExplorer />
      </section>

      {/* 3. EXPLORE BY SYSTEM (The 7 Core Systems) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
            Subsystem Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.homeSections.systemsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.homeSections.systemsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {systemCards.map((item) => {
            const Icon = item.icon;
            const name = localize(item.data.name);
            const purpose = localize(item.data.primaryPurpose);
            const category = localize(item.data.category);

            return (
              <Link
                key={item.id}
                to={`/systems/${item.id}`}
                className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/60 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center border shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                      {category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                    {name}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {purpose}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  <span>Explore System</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. HOW A CAR WORKS: ENERGY TRANSFER CHAIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white shadow-2xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Kinematics & Thermodynamics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.homeSections.howItWorksTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.homeSections.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-xs font-mono font-bold text-orange-400 uppercase">
                {t.homeSections.step1Title}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.homeSections.step1Desc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase">
                {t.homeSections.step2Title}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.homeSections.step2Desc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                {t.homeSections.step3Title}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.homeSections.step3Desc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                {t.homeSections.step4Title}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.homeSections.step4Desc}
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Link
              to="/systems-together"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-md transition-all"
            >
              <Workflow className="w-4 h-4" />
              <span>Explore Interactive Powertrain Synergy</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. HISTORY & STATS FEATURE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider">
              <History className="w-3.5 h-3.5" />
              <span>{t.nav.history}</span>
            </div>
            <h3 className="text-2xl font-bold">
              {t.historyPage.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.historyPage.subtitle}
            </p>
          </div>

          <Link
            to="/history"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
          >
            <span>{t.nav.history}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. AI TUTOR & LEARNING CENTER DUAL PROMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Assistant Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.homeSections.aiPreviewTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.homeSections.aiPreviewSubtitle}
            </p>
          </div>

          <Link
            to="/assistant"
            className="inline-flex items-center justify-between p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold transition-colors"
          >
            <span>Launch AI Assistant</span>
            <ArrowRight className="w-4 h-4 text-cyan-500" />
          </Link>
        </div>

        {/* Learning Center Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.homeSections.learningPreviewTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.homeSections.learningPreviewSubtitle}
            </p>
          </div>

          <Link
            to="/learning"
            className="inline-flex items-center justify-between p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold transition-colors"
          >
            <span>{t.homeSections.takeQuiz}</span>
            <ArrowRight className="w-4 h-4 text-emerald-500" />
          </Link>
        </div>
      </section>
    </div>
  );
};
