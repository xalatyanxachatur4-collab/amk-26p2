import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChatInterface } from '../components/chatbot/ChatInterface.js';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.js';
import { Bot, Sparkles, ShieldAlert, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.js';

export const AIAssistantPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();

  const initialContext = searchParams.get('ctx') || '';
  const initialQuery = searchParams.get('q') || '';

  return (
    <div className="space-y-6 pb-20">
      <Breadcrumbs />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider font-bold mb-1">
            <Bot className="w-4 h-4" />
            <span>Digital Engineering Tutor</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.aiChat.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {t.aiChat.subtitle}
          </p>
        </div>

        {/* Dedicated Chat Container */}
        <div className="h-[680px] w-full">
          <ChatInterface initialSystemContext={initialContext} />
        </div>

        {/* Guidelines Note */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">
            AI Assistant Engineering Guidelines:
          </span>
          <p>
            The assistant provides physical, thermodynamic, and mechanical explanations in Armenian, English, and Russian. It does not replace certified factory repair manuals. Safety-critical brake, steering, airbag, and high-voltage EV battery maintenance should always be referred to certified automotive technicians.
          </p>
        </div>
      </div>
    </div>
  );
};
