import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.js';
import { systemsData } from '../../data/systemsData.js';
import { glossaryTerms } from '../../data/glossaryData.js';
import { masterQuizQuestions } from '../../data/quizData.js';
import { historyData } from '../../data/historyData.js';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResultItem {
  id: string;
  type: 'system' | 'component' | 'glossary' | 'quiz' | 'history';
  title: string;
  snippet: string;
  link: string;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const { localize, t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.trim().toLowerCase();
  const results: SearchResultItem[] = [];

  if (normalizedQuery.length >= 1) {
    // 1. Search Systems
    Object.values(systemsData).forEach((sys) => {
      const name = localize(sys.name);
      const intro = localize(sys.introduction);
      if (
        name.toLowerCase().includes(normalizedQuery) ||
        intro.toLowerCase().includes(normalizedQuery)
      ) {
        results.push({
          id: `sys-${sys.id}`,
          type: 'system',
          title: name,
          snippet: intro.slice(0, 110) + '...',
          link: `/systems/${sys.id}`,
        });
      }

      // 2. Search Components inside system
      sys.components.forEach((comp) => {
        const compName = localize(comp.name);
        const compFunc = localize(comp.function);
        if (
          compName.toLowerCase().includes(normalizedQuery) ||
          compFunc.toLowerCase().includes(normalizedQuery)
        ) {
          results.push({
            id: `comp-${comp.id}`,
            type: 'component',
            title: `${compName} (${name})`,
            snippet: compFunc.slice(0, 110) + '...',
            link: `/systems/${sys.id}`,
          });
        }
      });
    });

    // 3. Search Glossary
    glossaryTerms.forEach((g) => {
      const termName = localize(g.term);
      const def = localize(g.definition);
      if (
        termName.toLowerCase().includes(normalizedQuery) ||
        def.toLowerCase().includes(normalizedQuery)
      ) {
        results.push({
          id: `gloss-${g.id}`,
          type: 'glossary',
          title: termName,
          snippet: def.slice(0, 110) + '...',
          link: `/glossary?q=${encodeURIComponent(termName)}`,
        });
      }
    });

    // 4. Search Quizzes
    masterQuizQuestions.forEach((q) => {
      const qText = localize(q.question);
      if (qText.toLowerCase().includes(normalizedQuery)) {
        results.push({
          id: `quiz-${q.id}`,
          type: 'quiz',
          title: qText,
          snippet: localize(q.explanation).slice(0, 100) + '...',
          link: '/quiz',
        });
      }
    });

    // 5. Search History Milestones & ErAZ
    historyData.timelineEvents.forEach((ev) => {
      const title = localize(ev.title);
      const desc = localize(ev.description);
      const pion = localize(ev.pioneers);
      if (
        title.toLowerCase().includes(normalizedQuery) ||
        desc.toLowerCase().includes(normalizedQuery) ||
        pion.toLowerCase().includes(normalizedQuery) ||
        ev.year.includes(normalizedQuery)
      ) {
        results.push({
          id: `hist-${ev.id}`,
          type: 'history',
          title: `${ev.year} • ${title}`,
          snippet: desc.slice(0, 110) + '...',
          link: '/history',
        });
      }
    });

    // 6. Search Country Philosophies
    historyData.countries.forEach((c) => {
      const cName = localize(c.countryName);
      const phil = localize(c.philosophyDescription);
      const brands = c.iconicBrands.join(' ');
      if (
        cName.toLowerCase().includes(normalizedQuery) ||
        phil.toLowerCase().includes(normalizedQuery) ||
        brands.toLowerCase().includes(normalizedQuery)
      ) {
        results.push({
          id: `country-${c.id}`,
          type: 'history',
          title: `${c.flag} ${cName} — ${brands.slice(0, 30)}...`,
          snippet: phil.slice(0, 110) + '...',
          link: '/history',
        });
      }
    });
  }

  const handleSelect = (link: string) => {
    navigate(link);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-cyan-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.nav.search}
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline px-2 py-0.5 text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 rounded border border-slate-300 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {query.trim().length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <p>Type any component name, system, or technical concept in Armenian, English, or Russian.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Crankshaft', 'Ծնկաձև լիսեռ', 'ABS', 'Дифференциал', 'Ackermann', 'Inverter'].map((hint) => (
                  <button
                    key={hint}
                    onClick={() => setQuery(hint)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 hover:text-cyan-600 text-xs transition-colors"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-400">
              No matching automotive engineering records found for "{query}".
            </div>
          ) : (
            results.slice(0, 10).map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.link)}
                className="w-full text-left p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors flex items-start justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        item.type === 'system'
                          ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300'
                          : item.type === 'component'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300'
                          : item.type === 'glossary'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                          : item.type === 'history'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {item.snippet}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
