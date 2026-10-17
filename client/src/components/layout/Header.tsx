import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass,
  Sun,
  Moon,
  Globe,
  Search,
  Menu,
  X,
  ChevronDown,
  Layers,
  GraduationCap,
  Bot,
  BookOpen,
  Info,
  Car,
  Activity,
  Zap,
  Disc,
  Cog,
  Shield,
  Flame,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.js';
import { useTheme } from '../../context/ThemeContext.js';
import { SUPPORTED_LANGUAGES } from '../../types/i18n.js';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSystemsDropdownOpen, setIsSystemsDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const systemsMenu = [
    { id: 'engine', name: t.nav.engine, icon: Flame, color: 'text-amber-500' },
    { id: 'transmission', name: t.nav.transmission, icon: Cog, color: 'text-blue-500' },
    { id: 'suspension', name: t.nav.suspension, icon: Activity, color: 'text-emerald-500' },
    { id: 'brakes', name: t.nav.brakes, icon: Disc, color: 'text-rose-500' },
    { id: 'steering', name: t.nav.steering, icon: Compass, color: 'text-cyan-500' },
    { id: 'electrical', name: t.nav.electrical, icon: Zap, color: 'text-yellow-500' },
    { id: 'body', name: t.nav.body, icon: Shield, color: 'text-indigo-500' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-bold tracking-tight text-slate-900 dark:text-white group flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
            <Car className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold leading-none tracking-tight font-sans">
              Auto<span className="text-cyan-500">Eng</span> Explorer
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">
              Digital Laboratory
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              isActive('/')
                ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.nav.home}
          </Link>

          {/* Systems Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSystemsDropdownOpen(!isSystemsDropdownOpen)}
              onMouseEnter={() => setIsSystemsDropdownOpen(true)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
                location.pathname.startsWith('/systems')
                  ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{t.nav.systems}</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
            </button>

            {isSystemsDropdownOpen && (
              <div
                onMouseLeave={() => setIsSystemsDropdownOpen(false)}
                className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 py-2 grid gap-1 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                {systemsMenu.map((sys) => {
                  const Icon = sys.icon;
                  return (
                    <Link
                      key={sys.id}
                      to={`/systems/${sys.id}`}
                      onClick={() => setIsSystemsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Icon className={`w-4 h-4 ${sys.color}`} />
                      <span>{sys.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            to="/systems-together"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              isActive('/systems-together')
                ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.nav.systemsTogether}
          </Link>

          <Link
            to="/learning"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              isActive('/learning')
                ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.nav.learning}
          </Link>

          <Link
            to="/history"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              isActive('/history')
                ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.nav.history}
          </Link>

          <Link
            to="/quiz"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              isActive('/quiz')
                ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.nav.quiz}
          </Link>

          <Link
            to="/assistant"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              isActive('/assistant')
                ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.nav.assistant}
          </Link>

          <Link
            to="/glossary"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              isActive('/glossary')
                ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.nav.glossary}
          </Link>
        </nav>

        {/* Right actions: Search, Language, Theme, Launch Explorer Button */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 hover:border-cyan-500/50 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            title="Search (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-mono">Search...</span>
            <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-semibold hover:border-cyan-500 transition-colors"
              aria-label={t.nav.languageSelect}
            >
              <span>{SUPPORTED_LANGUAGES.find((l) => l.code === language)?.flag}</span>
              <span className="uppercase font-mono text-[11px] hidden sm:inline">{language}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isLangDropdownOpen && (
              <div
                onMouseLeave={() => setIsLangDropdownOpen(false)}
                className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      language === l.code
                        ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{l.flag}</span>
                      <span>{l.nativeName}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            aria-label={t.nav.themeToggle}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Prominent Launch 3D Explorer Button */}
          <Link
            to="/explore"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition-all duration-150"
          >
            <Layers className="w-4 h-4" />
            <span>{t.hero.exploreCta}</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            aria-label="Toggle Navigation Drawer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <Link
            to="/explore"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-md"
          >
            <Layers className="w-4 h-4" />
            <span>{t.hero.exploreCta}</span>
          </Link>

          <div className="grid grid-cols-2 gap-1 pt-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.nav.home}
            </Link>
            <Link
              to="/systems-together"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.nav.systemsTogether}
            </Link>
            <Link
              to="/learning"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.nav.learning}
            </Link>
            <Link
              to="/history"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.nav.history}
            </Link>
            <Link
              to="/quiz"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.nav.quiz}
            </Link>
            <Link
              to="/assistant"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.nav.assistant}
            </Link>
            <Link
              to="/glossary"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.nav.glossary}
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.nav.about}
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              {t.nav.systems}
            </span>
            <div className="grid grid-cols-1 gap-1 mt-1">
              {systemsMenu.map((sys) => {
                const Icon = sys.icon;
                return (
                  <Link
                    key={sys.id}
                    to={`/systems/${sys.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Icon className={`w-3.5 h-3.5 ${sys.color}`} />
                    <span>{sys.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
