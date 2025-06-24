import React, { useState, useContext, createContext } from 'react';
import { translations } from '../i18n';

export type Locale = 'en' | 'ar' | 'fr' | 'es' | 'de';
export const LocaleContext = createContext<Locale>('en');

export default function SmartChat() {
  const locale = useContext(LocaleContext);
  const t = translations[locale as Locale] || translations.en;
  const [messages, setMessages] = useState<{ from: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = { from: 'user' as const, text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { from: 'ai', text: data.reply }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { from: 'ai', text: t['thinking'] + ' (error)' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 w-full max-w-xs z-50 backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 border border-white/30 dark:border-gray-800/40 shadow-2xl rounded-2xl"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)', backdropFilter: 'blur(16px) saturate(180%)' }}
    >
      <div className="p-4 border-b border-white/20 dark:border-gray-800/40 font-bold text-blue-700 dark:text-blue-200 text-lg tracking-wide select-none" style={{textShadow:'0 1px 8px #fff8,0 1px 1px #0002'}}>{t.smartChat}</div>
      <div className="p-4 h-48 overflow-y-auto flex flex-col gap-2 text-sm scrollbar-thin scrollbar-thumb-blue-200/40 scrollbar-track-transparent">
        {messages.length === 0 && !loading && <div className="text-gray-400 text-center">{t.startChat}</div>}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              (msg.from === 'user'
                ? 'text-right text-blue-800 dark:text-blue-200'
                : 'text-left text-green-700 dark:text-green-300') +
              ' px-2 py-1 rounded-xl bg-white/60 dark:bg-gray-800/60 shadow-sm backdrop-blur-sm mb-1 max-w-[90%] inline-block'
            }
            style={{
              alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
              background: msg.from === 'user'
                ? 'linear-gradient(120deg,rgba(59,130,246,0.12),rgba(255,255,255,0.4))'
                : 'linear-gradient(120deg,rgba(16,185,129,0.10),rgba(255,255,255,0.3))',
              border: msg.from === 'user' ? '1px solid #3b82f640' : '1px solid #10b98130',
              boxShadow: '0 2px 8px 0 rgba(31,38,135,0.10)'
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-center text-blue-400 animate-pulse">{t.thinking}</div>}
      </div>
      <form onSubmit={sendMessage} className="flex border-t border-white/20 dark:border-gray-800/40 bg-transparent">
        <input
          className="flex-1 px-3 py-2 bg-white/30 dark:bg-gray-800/30 rounded-bl-2xl focus:outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 backdrop-blur-md border-none"
          placeholder={t.placeholder}
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
          style={{boxShadow:'0 1px 4px 0 #0001'}}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600/60 hover:bg-blue-700/70 text-white font-semibold rounded-br-2xl transition-all duration-200 shadow-lg border-none backdrop-blur-md"
          style={{
            background: 'linear-gradient(120deg,rgba(59,130,246,0.7),rgba(255,255,255,0.15))',
            boxShadow: '0 2px 8px 0 rgba(59,130,246,0.10)',
            border: '1px solid #3b82f640',
            textShadow: '0 1px 8px #fff8,0 1px 1px #0002'
          }}
          disabled={loading || !input.trim()}
        >
          {t.send}
        </button>
      </form>
    </div>
  );
}
