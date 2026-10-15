import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { systemsData } from '../data/systemsData.js';
import { useLanguage } from '../context/LanguageContext.js';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.js';
import { ErrorBoundary } from '../components/ui/ErrorBoundary.js';
import { VehicleExplorer } from '../components/vehicle/VehicleExplorer.js';
import { EngineCycleAnimation } from '../components/animations/EngineCycleAnimation.js';
import { TransmissionGearAnimation } from '../components/animations/TransmissionGearAnimation.js';
import { SuspensionAnimation } from '../components/animations/SuspensionAnimation.js';
import { BrakingAnimation } from '../components/animations/BrakingAnimation.js';
import { SteeringAnimation } from '../components/animations/SteeringAnimation.js';
import { ElectricalAnimation } from '../components/animations/ElectricalAnimation.js';
import { BodyStructureAnimation } from '../components/animations/BodyStructureAnimation.js';
import {
  Flame,
  Cog,
  Activity,
  Disc,
  Compass,
  Zap,
  Shield,
  Bot,
  Wrench,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  XCircle,
  ArrowRight,
  HelpCircle,
  Layers,
  Sparkles,
} from 'lucide-react';

export const SystemDetailPage: React.FC = () => {
  const { systemId } = useParams<{ systemId: string }>();
  const { t, localize } = useLanguage();
  const navigate = useNavigate();

  const [activeViewMode, setActiveViewMode] = useState<'simulation' | 'lab'>('simulation');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, boolean>>({});

  const system = systemId ? systemsData[systemId] : null;

  if (!system) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">System Not Found</h2>
        <p className="text-sm text-slate-500">The requested automotive subsystem does not exist.</p>
        <Link to="/" className="inline-block px-4 py-2 rounded-xl bg-cyan-500 text-white font-semibold text-xs">
          Return Home
        </Link>
      </div>
    );
  }

  const name = localize(system.name);
  const subtitle = localize(system.subtitle);
  const category = localize(system.category);
  const intro = localize(system.introduction);
  const purpose = localize(system.primaryPurpose);

  const operatingSequence = system.operatingSequence || [];
  const components = system.components || [];
  const engineeringConcepts = system.engineeringConcepts || [];
  const failureSymptoms = system.failureSymptoms || [];
  const maintenanceNotes = system.maintenanceNotes || [];
  const safetyNotes = system.safetyNotes || [];
  const quizQuestions = system.quizQuestions || [];
  const relatedSystems = system.relatedSystems || [];

  // Render the appropriate simulation component safely
  const renderAnimation = () => {
    switch (system.id) {
      case 'engine':
        return <EngineCycleAnimation />;
      case 'transmission':
        return <TransmissionGearAnimation />;
      case 'suspension':
        return <SuspensionAnimation />;
      case 'brakes':
        return <BrakingAnimation />;
      case 'steering':
        return <SteeringAnimation />;
      case 'electrical':
        return <ElectricalAnimation />;
      case 'body':
        return <BodyStructureAnimation />;
      default:
        return null;
    }
  };

  const handleSelectAnswer = (qId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    setRevealedQuestions((prev) => ({ ...prev, [qId]: true }));
  };

  const handleAskAITutor = () => {
    const prompt = `Can you explain the engineering principles, physical governing formulas, and common failure modes of the ${name}?`;
    navigate(`/assistant?q=${encodeURIComponent(prompt)}&ctx=${encodeURIComponent(name)}`);
  };

  return (
    <ErrorBoundary fallbackTitle={`Error Loading ${name} Subsystem`}>
      <div className="space-y-12 pb-20">
        <Breadcrumbs />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* 1. HEADER & INTRO */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
                {category} Subsystem
              </span>
              <button
                onClick={handleAskAITutor}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
              >
                <Bot className="w-4 h-4" />
                <span>{t.systemDetail.askAI}</span>
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              {name}
            </h1>
            <p className="text-base font-medium text-slate-600 dark:text-slate-300">
              {subtitle}
            </p>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm leading-relaxed text-slate-700 dark:text-slate-300 shadow-sm space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-cyan-600 dark:text-cyan-400">
                {t.systemDetail.overview}
              </h3>
              <p>{intro}</p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Primary Purpose: </span>
                <span className="text-slate-600 dark:text-slate-400">{purpose}</span>
              </div>
            </div>
          </div>

          {/* 2. INTERACTIVE TECHNICAL SIMULATION & LAB */}
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-500" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {t.systemDetail.animationTitle}
                </h2>
              </div>

              {/* View Mode Toggle: Mechanism Simulation vs Subsystem Vehicle Explorer */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                <button
                  onClick={() => setActiveViewMode('simulation')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    activeViewMode === 'simulation'
                      ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Thermodynamic Cycle</span>
                </button>
                <button
                  onClick={() => setActiveViewMode('lab')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    activeViewMode === 'lab'
                      ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Interactive Vehicle Lab</span>
                </button>
              </div>
            </div>

            <ErrorBoundary fallbackTitle="Error loading interactive view">
              {activeViewMode === 'simulation' ? (
                renderAnimation()
              ) : (
                <div className="pt-2">
                  <VehicleExplorer
                    initialSystem={system.id as any}
                    initialComponent={components[0]?.id || 'cylinder-block'}
                    onAskAI={(prompt, ctx) => {
                      navigate(`/assistant?q=${encodeURIComponent(prompt)}&ctx=${encodeURIComponent(ctx)}`);
                    }}
                  />
                </div>
              )}
            </ErrorBoundary>
          </section>

          {/* 3. OPERATING SEQUENCE */}
          {operatingSequence.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t.systemDetail.sequenceTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {operatingSequence.map((step) => (
                  <div
                    key={step.step}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center font-mono font-bold text-xs">
                        {step.step}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {localize(step.title)}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {localize(step.description)}
                    </p>
                    {step.keyPhysics && (
                      <span className="inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        Physics: {localize(step.keyPhysics)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 4. CORE ENGINEERING COMPONENTS */}
          {components.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t.systemDetail.componentsTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {components.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                  >
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {localize(comp.name)}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {localize(comp.function)}
                    </p>
                    {comp.material && (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                        <span className="font-semibold">Material: </span>
                        <span>{localize(comp.material)}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. GOVERNING ENGINEERING PRINCIPLES & FORMULAS */}
          {engineeringConcepts.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t.systemDetail.principlesTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {engineeringConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                  >
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {localize(concept.title)}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {localize(concept.explanation)}
                    </p>
                    {concept.formula && (
                      <div className="p-3 rounded-xl bg-slate-900 text-cyan-400 font-mono text-xs text-center border border-slate-800 shadow-inner">
                        {concept.formula}
                      </div>
                    )}
                    <p className="text-[11px] font-sans text-slate-500">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Automotive Relevance: </span>
                      {localize(concept.relevance)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 6. DIAGNOSTICS & SYMPTOMS */}
          {failureSymptoms.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t.systemDetail.diagnosticsTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {failureSymptoms.map((fail, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5"
                  >
                    <div className="flex items-start gap-2 text-rose-600 dark:text-rose-400 font-semibold text-xs">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{localize(fail.symptom)}</span>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-bold text-slate-900 dark:text-white">Probable Cause: </span>
                      {localize(fail.probableCause)}
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-cyan-600 dark:text-cyan-400 block mb-0.5">
                        Engineering Diagnostic Advice:
                      </span>
                      {localize(fail.diagnosticAdvice)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 7. PREVENTATIVE MAINTENANCE */}
          {maintenanceNotes.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t.systemDetail.maintenanceTitle}
              </h2>
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                {maintenanceNotes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                    <Wrench className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{localize(note)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 8. SAFETY ADVISORY */}
          {safetyNotes.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t.systemDetail.safetyTitle}
              </h2>
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 shadow-sm space-y-3">
                {safetyNotes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{localize(note)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 9. SYSTEM KNOWLEDGE CHECK QUIZ */}
          {quizQuestions.length > 0 && (
            <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t.systemDetail.quizTitle}
              </h2>

              <div className="space-y-6">
                {quizQuestions.map((q) => {
                  const isRevealed = revealedQuestions[q.id];
                  const userChoice = selectedAnswers[q.id];

                  return (
                    <div
                      key={q.id}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        Difficulty: {q.difficulty}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {localize(q.question)}
                      </h4>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = userChoice === optIdx;
                          let optionStyle =
                            'border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200';

                          if (isRevealed) {
                            if (opt.isCorrect) {
                              optionStyle =
                                'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-bold';
                            } else if (isSelected && !opt.isCorrect) {
                              optionStyle =
                                'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={isRevealed}
                              onClick={() => handleSelectAnswer(q.id, optIdx)}
                              className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optionStyle}`}
                            >
                              <span>{localize(opt.text)}</span>
                              {isRevealed && opt.isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                              )}
                              {isRevealed && isSelected && !opt.isCorrect && (
                                <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {isRevealed && (
                        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 space-y-1">
                          <span className="font-bold text-cyan-600 dark:text-cyan-400 block">
                            Technical Explanation:
                          </span>
                          <p className="leading-relaxed">{localize(q.explanation)}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* 10. RELATED SYSTEMS */}
          {relatedSystems.length > 0 && (
            <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t.systemDetail.relatedTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedSystems.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/systems/${rel.id}`}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 shadow-sm hover:shadow-md transition-all flex items-start justify-between gap-4 group"
                  >
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                        {localize(rel.name)}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {localize(rel.relationship)}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};
