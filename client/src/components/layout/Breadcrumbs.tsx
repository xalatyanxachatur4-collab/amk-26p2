import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.js';
import { systemsData } from '../../data/systemsData.js';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { t, localize } = useLanguage();

  const pathnames = location.pathname.split('/').filter((x) => x);
  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <ol className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t.nav.home}</span>
          </Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          let displayName = name;
          if (name === 'systems') {
            displayName = t.nav.systems;
          } else if (name === 'explore') {
            displayName = t.nav.explore;
          } else if (name === 'systems-together') {
            displayName = t.nav.systemsTogether;
          } else if (name === 'learning') {
            displayName = t.nav.learning;
          } else if (name === 'history') {
            displayName = t.nav.history;
          } else if (name === 'quiz') {
            displayName = t.nav.quiz;
          } else if (name === 'assistant') {
            displayName = t.nav.assistant;
          } else if (name === 'glossary') {
            displayName = t.nav.glossary;
          } else if (name === 'about') {
            displayName = t.nav.about;
          } else if (systemsData[name]) {
            displayName = localize(systemsData[name].name);
          }

          return (
            <li key={routeTo} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              {isLast ? (
                <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">
                  {displayName}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
