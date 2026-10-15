import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  RotateCcw,
  Copy,
  Check,
  Bot,
  User,
  Sparkles,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Info,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.js';

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  provider?: string;
}

interface ChatInterfaceProps {
  initialSystemContext?: string;
  isFloating?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  initialSystemContext = '',
  isFloating = false,
}) => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessageItem[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        language === 'hy'
          ? 'Ողջույն: Ես **Automotive Engineering Explorer**-ի ինժեներական AI օգնականն եմ: Պատրաստ եմ բացատրել ավտոմեքենայի ցանկացած համակարգի (շարժիչ, փոխանցման տուփ, կախոց, արգելակներ, ղեկային կառավարում, էլեկտրոնիկա կամ թափք) ֆիզիկական և տեխնիկական սկզբունքները:'
          : language === 'ru'
          ? 'Здравствуйте! Я инженерный ассистент **Automotive Engineering Explorer**. Я помогу вам разобраться в устройстве и принципах работы автомобильных систем: ДВС, трансмиссии, подвески, тормозов, рулевого управления, электроники и кузова.'
          : 'Welcome! I am the **Automotive Engineering Explorer AI Tutor**. Ask me anything about engine thermodynamics, gear ratios, hydraulic suspension damping, ABS kinematics, Ackermann steering geometry, CAN-bus communications, or vehicle safety architectures.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [systemContext, setSystemContext] = useState(initialSystemContext);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const suggestedQuestions = [
    language === 'hy' ? 'Ինչպե՞ս է աշխատում քառատակտ շարժիչը:' : language === 'ru' ? 'Как работает четырехтактный двигатель?' : 'How does a four-stroke engine work?',
    language === 'hy' ? 'Ի՞նչ տարբերություն կա ոլորող մոմենտի և հզորության միջև:' : language === 'ru' ? 'В чем разница между моментом и мощностью?' : 'What is the difference between torque and power?',
    language === 'hy' ? 'Ինչպե՞ս է դիֆերենցիալը աշխատում շրջադարձերում:' : language === 'ru' ? 'Как работает дифференциал в повороте?' : 'How does an open differential work?',
    language === 'hy' ? 'Ինչպե՞ս է ABS-ը կանխում անիվների սահքը:' : language === 'ru' ? 'Как ABS предотвращает блокировку колес?' : 'How does ABS prevent wheel lockup?',
    language === 'hy' ? 'Ինչպե՞ս է էլեկտրաշարժիչը տարբերվում ՆԱՇ-ից:' : language === 'ru' ? 'Чем электромотор отличается от ДВС?' : 'How does an electric motor differ from an ICE?',
  ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    setError(null);
    const userMsg: ChatMessageItem = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          language,
          systemContext: systemContext || undefined,
          userLevel: 'intermediate',
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const assistantMsg: ChatMessageItem = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        provider: data.provider,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err.message || 'Failed to reach AI assistant service.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-slate-900 ${isFloating ? 'text-xs' : 'text-sm'} rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden`}>
      {/* Top Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-sm">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white leading-tight">
              {t.aiChat.title}
            </h3>
            <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 block">
              Multi-lingual Automotive Engineering AI
            </span>
          </div>
        </div>

        {/* Clear Conversation */}
        <button
          onClick={handleClear}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors"
          title={t.aiChat.clear}
        >
          <RotateCcw className="w-3 h-3" />
          <span>{t.aiChat.clear}</span>
        </button>
      </div>

      {/* Optional Context Badge */}
      {systemContext && (
        <div className="px-4 py-1.5 bg-cyan-50 dark:bg-cyan-950/40 border-b border-cyan-100 dark:border-cyan-900 flex items-center justify-between text-xs">
          <span className="text-cyan-800 dark:text-cyan-300 font-medium flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>{t.aiChat.contextBadge}: {systemContext}</span>
          </span>
          <button
            onClick={() => setSystemContext('')}
            className="text-cyan-600 dark:text-cyan-400 hover:underline text-[10px]"
          >
            Clear context
          </button>
        </div>
      )}

      {/* Message History Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-white ${
                  isUser
                    ? 'bg-slate-700 dark:bg-slate-600'
                    : 'bg-cyan-600 dark:bg-cyan-500'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] rounded-2xl p-3.5 space-y-1 shadow-sm ${
                isUser
                  ? 'bg-cyan-500 text-white rounded-tr-none'
                  : 'bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-slate-700/60'
              }`}>
                {/* Markdown text rendered cleanly */}
                <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {msg.content}
                </div>

                {/* Footer with timestamp and copy button */}
                <div className={`flex items-center justify-between pt-1 text-[10px] ${isUser ? 'text-cyan-100' : 'text-slate-400'}`}>
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors ml-2"
                      title={t.aiChat.copy}
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
            <Bot className="w-4 h-4 text-cyan-500 animate-spin" />
            <span className="font-mono">Analyzing engineering telemetry...</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => handleSend()}
              className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-200 font-bold hover:underline"
            >
              {t.aiChat.retry}
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      <div className="p-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/50">
        <span className="text-[10px] font-mono text-slate-400 block px-2 mb-1">
          {t.aiChat.suggestedTitle}
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="flex-shrink-0 text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="relative flex items-end gap-2">
          <textarea
            ref={textareaRef}
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.aiChat.inputPlaceholder}
            className="w-full resize-none p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs sm:text-sm"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="h-10 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-white font-semibold flex items-center justify-center transition-all shadow-md shadow-cyan-500/20 active:scale-95"
            title={t.aiChat.send}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
