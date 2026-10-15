import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ShieldAlert, Cpu, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.js';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const systems = [
    { id: 'engine', name: t.nav.engine },
    { id: 'transmission', name: t.nav.transmission },
    { id: 'suspension', name: t.nav.suspension },
    { id: 'brakes', name: t.nav.brakes },
    { id: 'steering', name: t.nav.steering },
    { id: 'electrical', name: t.nav.electrical },
    { id: 'body', name: t.nav.body },
  ];

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <Car className="w-4 h-4" />
              </div>
              <span>Automotive Engineering Explorer</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {t.footer.description}
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-cyan-600 dark:text-cyan-400">
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" />
                Three.js / WebGL
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                STEM Education
              </span>
            </div>
          </div>

          {/* Col 2: Subsystems */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-900 dark:text-slate-200 mb-3">
              {t.footer.systems}
            </h4>
            <ul className="space-y-1.5 text-xs">
              {systems.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/systems/${s.id}`}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-900 dark:text-slate-200 mb-3">
              {t.footer.resources}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/explore" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  {t.nav.explore}
                </Link>
              </li>
              <li>
                <Link to="/systems-together" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  {t.nav.systemsTogether}
                </Link>
              </li>
              <li>
                <Link to="/learning" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  {t.nav.learning}
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  {t.nav.quiz}
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  {t.nav.assistant}
                </Link>
              </li>
              <li>
                <Link to="/glossary" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  {t.nav.glossary}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Safety & Disclaimer */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{t.about.disclaimerTitle}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              {t.about.disclaimerText}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px]">EN • HY • RU</span>
            <span>•</span>
            <span className="font-mono text-[11px]">ISO / SAE Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
