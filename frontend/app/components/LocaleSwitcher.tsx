import React, { useState } from 'react';

const locales = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
];

export default function LocaleSwitcher({ locale, onChange }: { locale: string; onChange: (locale: string) => void }) {
  const [open, setOpen] = useState(false);
  const current = locales.find(l => l.code === locale) || locales[0];
  return (
    <div className="relative flex justify-end mb-4 z-50">
      <button
        className="px-4 py-2 rounded-xl bg-blue-700/30 hover:bg-blue-700/50 text-white font-bold shadow-lg border border-blue-700/20 backdrop-blur-md transition-all"
        onClick={() => setOpen(o => !o)}
        aria-label="Change language"
        style={{boxShadow:'0 2px 8px 0 #3b82f640'}}
      >
        {current.label} <span className="ml-2">▼</span>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white/80 dark:bg-gray-900/80 border border-gray-200/40 dark:border-gray-800/40 rounded-xl shadow-2xl min-w-[140px] backdrop-blur-xl z-50" style={{boxShadow:'0 4px 16px 0 #0002'}}>
          {locales.map(l => (
            <button
              key={l.code}
              className={`w-full text-right px-4 py-2 hover:bg-blue-50/60 dark:hover:bg-gray-800/60 rounded-xl transition-all ${locale === l.code ? 'font-bold text-blue-700 dark:text-blue-300' : ''}`}
              onClick={() => { onChange(l.code); setOpen(false); }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
