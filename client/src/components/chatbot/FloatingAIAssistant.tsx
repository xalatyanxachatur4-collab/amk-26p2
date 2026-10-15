import React, { useState } from 'react';
import { Bot, X, MessageSquare, Sparkles } from 'lucide-react';
import { ChatInterface } from './ChatInterface.js';
import { useLanguage } from '../../context/LanguageContext.js';

interface FloatingAIAssistantProps {
  systemContext?: string;
}

export const FloatingAIAssistant: React.FC<FloatingAIAssistantProps> = ({ systemContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Chat Panel */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-[420px] h-[550px] max-h-[80vh] animate-in slide-in-from-bottom-6 duration-200">
          <ChatInterface initialSystemContext={systemContext} isFloating={true} />
        </div>
      )}

      {/* Floating Action Pill / Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-full font-bold text-sm text-white shadow-2xl transition-all duration-200 active:scale-95 ${
            isOpen
              ? 'bg-slate-800 hover:bg-slate-700'
              : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-cyan-500/30'
          }`}
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? (
            <>
              <X className="w-5 h-5" />
              <span>Close AI</span>
            </>
          ) : (
            <>
              <Bot className="w-5 h-5 animate-bounce" />
              <span>{t.hero.askAICta}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
