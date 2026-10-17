import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.js';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.js';
import { historyData, TimelineEvent, CountryPhilosophy } from '../data/historyData.js';
import {
  History,
  Calendar,
  Flame,
  Zap,
  Globe,
  Award,
  TrendingUp,
  Building2,
  Sparkles,
  Bot,
  Car,
  Factory,
  CheckCircle2,
  ArrowRight,
  Filter,
  Layers,
  BatteryCharging,
  Cpu,
  MapPin,
  Clock,
  Shield,
  Gauge,
} from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const { t, localize } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'timeline' | 'countries' | 'eraz' | 'stats'>('timeline');
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'ice' | 'ev' | 'both'>('all');
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);

  const { timelineEvents, countries, erazStory, statistics } = historyData;

  const filteredEvents = timelineEvents.filter((event) => {
    if (timelineFilter === 'all') return true;
    if (timelineFilter === 'ice') return event.category === 'ice';
    if (timelineFilter === 'ev') return event.category === 'ev';
    if (timelineFilter === 'both') return event.category === 'both';
    return true;
  });

  const handleAskAIAboutHistory = (topic?: string) => {
    const prompt = topic
      ? `Расскажи подробно и простым языком о теме: ${topic}. Какие исторические и инженерные детали здесь самые важные?`
      : 'Расскажи кратко и емко ключевые вехи развития автомобилестроения: от Бенца и Форда до советского ЕрАЗ-762ВЭ и современных электрокаров.';
    navigate(`/assistant?q=${encodeURIComponent(prompt)}&ctx=Automotive History & Statistics`);
  };

  return (
    <div className="space-y-8 pb-20">
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Hero */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
              <History className="w-3.5 h-3.5" />
              <span>{t.historyPage.badge}</span>
            </div>

            <button
              onClick={() => handleAskAIAboutHistory()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
            >
              <Bot className="w-4 h-4" />
              <span>{t.historyPage.askAiPrompt}</span>
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.historyPage.title}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed">
            {t.historyPage.subtitle}
          </p>

          {/* Quick Summary Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-sm">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block">1886: ICE Genesis</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">Benz Patent-Motor</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold text-sm">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block">1900: Peak EV</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">38% US Fleet Was EV</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block">1970s: ErAZ Yerevan</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">Electric Vans & Motors</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-sm">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block">Today: Global Scale</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">93M+ Cars / Year</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'timeline'
                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{t.historyPage.tabTimeline}</span>
          </button>

          <button
            onClick={() => setActiveTab('countries')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'countries'
                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>{t.historyPage.tabCountries}</span>
          </button>

          <button
            onClick={() => setActiveTab('eraz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'eraz'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{t.historyPage.tabEraz}</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'stats'
                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{t.historyPage.tabStats}</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: HISTORICAL TIMELINE */}
        {/* ========================================================================= */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                <button
                  onClick={() => setTimelineFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    timelineFilter === 'all'
                      ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t.historyPage.filterAll}
                </button>
                <button
                  onClick={() => setTimelineFilter('ice')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                    timelineFilter === 'ice'
                      ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.historyPage.filterIce}</span>
                </button>
                <button
                  onClick={() => setTimelineFilter('ev')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                    timelineFilter === 'ev'
                      ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.historyPage.filterEv}</span>
                </button>
                <button
                  onClick={() => setTimelineFilter('both')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                    timelineFilter === 'both'
                      ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.historyPage.filterBoth}</span>
                </button>
              </div>

              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Showing {filteredEvents.length} landmark milestones
              </span>
            </div>

            {/* Timeline Events Feed */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
              {filteredEvents.map((event) => {
                const isIce = event.category === 'ice';
                const isEv = event.category === 'ev';

                return (
                  <div key={event.id} className="relative group">
                    {/* Circle marker on line */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 rounded-full border-4 border-white dark:border-slate-950 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110 ${
                        isIce
                          ? 'bg-amber-500'
                          : isEv
                          ? 'bg-cyan-500'
                          : 'bg-emerald-500'
                      }`}
                    >
                      {isIce ? (
                        <Flame className="w-3 h-3" />
                      ) : isEv ? (
                        <Zap className="w-3 h-3" />
                      ) : (
                        <Layers className="w-3 h-3" />
                      )}
                    </div>

                    {/* Card container */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-cyan-500/50 hover:shadow-md transition-all space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-extrabold px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                            {event.year}
                          </span>
                          <span
                            className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md ${
                              isIce
                                ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                                : isEv
                                ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300'
                                : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            }`}
                          >
                            {localize(event.impactBadge)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{localize(event.location)}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {localize(event.title)}
                      </h3>

                      <div className="text-xs text-cyan-600 dark:text-cyan-400 font-medium flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        <span>Pioneers: {localize(event.pioneers)}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {localize(event.description)}
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-slate-900 dark:text-white">Key Significance: </strong>
                          <span>{localize(event.highlight)}</span>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => handleAskAIAboutHistory(localize(event.title))}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                        >
                          <span>Ask AI Tutor about this milestone</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: COUNTRY PHILOSOPHIES & ICONIC BRANDS */}
        {/* ========================================================================= */}
        {activeTab === 'countries' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-xs text-cyan-900 dark:text-cyan-200 flex items-start gap-3">
              <Globe className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Automotive Cultural Philosophy: </strong>
                Каждая страна формировала свои автомобили под воздействием своей географии, дорог, законодательства и инженерных традиций — от немецких автобанов и японского кайдзен до американских хайвеев и итальянской страсти.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {countries.map((country) => {
                const isSelected = selectedCountryId === country.id;

                return (
                  <div
                    key={country.id}
                    onClick={() => setSelectedCountryId(isSelected ? null : country.id)}
                    className={`cursor-pointer p-6 rounded-2xl bg-white dark:bg-slate-900 border transition-all space-y-4 ${
                      isSelected
                        ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-lg'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl leading-none">{country.flag}</span>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            {localize(country.countryName)}
                          </h3>
                          <span className="text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400">
                            {localize(country.coreFocus)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-1.5">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
                        {localize(country.philosophyTitle)}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {localize(country.philosophyDescription)}
                      </p>
                    </div>

                    {/* Famous for bullet list */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
                        Чем славится в автомире:
                      </span>
                      <ul className="space-y-1">
                        {country.famousFor.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                            <span>{localize(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Iconic Brands Badges */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block mb-2">
                        {t.historyPage.notableBrands}:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {country.iconicBrands.map((brand) => (
                          <span
                            key={brand}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Heritage Footnote */}
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                      {localize(country.engineeringHeritage)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ERAZ & ARMENIAN ELECTRIC MOTOR INNOVATION */}
        {/* ========================================================================= */}
        {activeTab === 'eraz' && (
          <div className="space-y-8">
            {/* Banner card */}
            <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-slate-900/40 border border-amber-500/30 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-mono font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.historyPage.erazBadge}</span>
                </span>
                <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold">
                  Основан в {erazStory.foundedYear} г. • {localize(erazStory.city)}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {localize(erazStory.title)}
              </h2>
              <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                {localize(erazStory.subtitle)}
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border border-amber-200 dark:border-amber-900/50 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {localize(erazStory.description)}
              </div>
            </div>

            {/* 1970s EV Electric Motor Breakthrough */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                  <BatteryCharging className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {localize(erazStory.evInnovationTitle)}
                  </h3>
                  <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                    Опытные электромобили ЕрАЗ-762ВЭ и завод «Армэлектромаш»
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {localize(erazStory.evInnovationStory)}
              </p>

              {/* 4 Technical Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {erazStory.technicalHighlights.map((hl, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold font-mono text-xs flex items-center justify-center">
                        {i + 1}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {localize(hl.label)}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {localize(hl.detail)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Legacy summary box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Историческое наследие: </strong>
                  <span>{localize(erazStory.historicalLegacy)}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleAskAIAboutHistory('Электромобили ЕрАЗ-762ВЭ и завод Армэлектромаш в 1970-х')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
                >
                  <Bot className="w-4 h-4 text-cyan-500" />
                  <span>Спросить AI об истории ЕрАЗа и электромоторов</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: GLOBAL STATISTICS & SALES LEADERS */}
        {/* ========================================================================= */}
        {activeTab === 'stats' && (
          <div className="space-y-10">
            {/* 1. Annual Production Leaders */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Factory className="w-5 h-5 text-cyan-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.historyPage.statsHeadingOutput}
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Годовые объемы выпуска легковых и коммерческих автомобилей по странам (по данным OICA & автопромышленных ассоциаций):
                </p>

                <div className="space-y-4">
                  {statistics.annualProductionLeaders.map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                          <span className="text-lg">{item.flag}</span>
                          <span>{localize(item.country)}</span>
                          <span className="text-[11px] font-normal text-slate-400 font-mono">
                            ({item.topBrands})
                          </span>
                        </div>
                        <div className="flex items-center gap-3 font-mono font-bold">
                          <span className="text-cyan-600 dark:text-cyan-400">{item.annualVolume} авто/год</span>
                          <span className="text-slate-400">({item.sharePercent}%)</span>
                        </div>
                      </div>

                      {/* Percentage visual bar */}
                      <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                          style={{ width: `${item.sharePercent * 2.8}%` }}
                        />
                      </div>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {localize(item.specialization)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. Top Global Manufacturers */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.historyPage.statsHeadingMfrs}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {statistics.topManufacturers.map((mfr) => (
                  <div
                    key={mfr.rank}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold font-mono text-xs flex items-center justify-center">
                          #{mfr.rank}
                        </span>
                        <span className="text-lg">{mfr.flag}</span>
                      </div>
                      <span className="font-mono text-sm font-extrabold text-cyan-600 dark:text-cyan-400">
                        {mfr.annualSales} авто
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {mfr.name}
                    </h3>
                    <div className="text-[11px] text-slate-400 font-mono">
                      HQ: {mfr.headquarters}
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                        Ключевые бренды:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {mfr.notableBrands.map((b) => (
                          <span
                            key={b}
                            className="px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 pt-1">
                      {localize(mfr.keyStrength)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Global Output Evolution Milestones */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.historyPage.statsHeadingMilestones}
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                      <th className="pb-3 font-semibold">{t.historyPage.year}</th>
                      <th className="pb-3 font-semibold">Мировой выпуск</th>
                      <th className="pb-3 font-semibold">Доля EV</th>
                      <th className="pb-3 font-semibold">Ключевая веха эпохи</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {statistics.productionMilestones.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-3 font-bold font-mono text-cyan-600 dark:text-cyan-400 text-sm">
                          {m.year}
                        </td>
                        <td className="py-3 font-mono font-bold text-slate-900 dark:text-white">
                          {m.globalOutput}
                        </td>
                        <td className="py-3 font-mono font-bold text-slate-700 dark:text-slate-300">
                          {m.evShare}
                        </td>
                        <td className="py-3 text-slate-600 dark:text-slate-300 max-w-md">
                          {localize(m.keyTrend)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. EV Adoption Exponential Curve */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.historyPage.statsHeadingEvGrowth}
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Доля чистых электромобилей (BEV) и заряжаемых гибридов (PHEV) в мировых продажах новых автомобилей:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {statistics.evGrowthTrend.map((g, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-1.5"
                    >
                      <span className="text-xs font-mono text-slate-400 font-bold block">{g.year}</span>
                      <span className="text-lg font-extrabold font-mono text-cyan-600 dark:text-cyan-400 block">
                        {g.label}
                      </span>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-amber-500 rounded-full"
                          style={{ width: `${Math.min(100, g.share * 4)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
