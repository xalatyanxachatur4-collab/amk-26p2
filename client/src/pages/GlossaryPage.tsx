import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { glossaryTerms } from '../data/glossaryData.js';
import { useLanguage } from '../context/LanguageContext.js';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.js';
import { BookOpen, Search, ArrowRight, Tag } from 'lucide-react';

export const GlossaryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { t, localize } = useLanguage();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Unique categories
  const categories = Array.from(new Set(glossaryTerms.map((g) => localize(g.category))));

  const filteredTerms = glossaryTerms.filter((item) => {
    const term = localize(item.term).toLowerCase();
    const def = localize(item.definition).toLowerCase();
    const cat = localize(item.category);
    const q = searchQuery.toLowerCase().trim();

    const matchesQuery = !q || term.includes(q) || def.includes(q);
    const matchesCat = selectedCategory === 'all' || cat === selectedCategory;

    return matchesQuery && matchesCat;
  });

  return (
    <div className="space-y-8 pb-20">
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider font-bold mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Technical Encyclopedia</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.glossary.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {t.glossary.subtitle}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.glossary.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {t.glossary.allCategories}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Term Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTerms.map((item) => {
            const termName = localize(item.term);
            const termDef = localize(item.definition);
            const catName = localize(item.category);

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-cyan-500/50 transition-colors"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {catName}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {termName}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {termDef}
                  </p>
                </div>

                {item.systemId && (
                  <Link
                    to={`/systems/${item.systemId}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-800"
                  >
                    <span>{t.glossary.viewRelatedSystem}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {filteredTerms.length === 0 && (
          <div className="py-16 text-center text-slate-400">
            No terms found matching "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
};
