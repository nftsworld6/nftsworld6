import React, { useState } from 'react';

export default function PropertySearch({ onSearch, placeholder, buttonLabel }: { onSearch: (query: string) => void, placeholder?: string, buttonLabel?: string }) {
  const [query, setQuery] = useState('');

  return (
    <form
      className="flex flex-col md:flex-row gap-4 w-full max-w-xl mx-auto mt-8 backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 border border-white/30 dark:border-gray-800/40 shadow-2xl rounded-2xl p-4"
      style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)', backdropFilter: 'blur(16px) saturate(180%)' }}
      onSubmit={e => {
        e.preventDefault();
        onSearch(query);
      }}
    >
      <input
        type="text"
        placeholder={placeholder || "ابحث عن شقة، فيلا، أو كلمة مفتاحية..."}
        className="flex-1 rounded-xl border-none px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 backdrop-blur-md"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ boxShadow: '0 1px 4px 0 #0001' }}
      />
      <button
        type="submit"
        className="bg-blue-700/60 hover:bg-blue-800/70 text-white font-bold py-3 px-8 rounded-xl text-lg transition shadow-lg border-none backdrop-blur-md"
        style={{ background: 'linear-gradient(120deg,rgba(59,130,246,0.7),rgba(255,255,255,0.15))', boxShadow: '0 2px 8px 0 rgba(59,130,246,0.10)', border: '1px solid #3b82f640', textShadow: '0 1px 8px #fff8,0 1px 1px #0002' }}
      >
        {buttonLabel || "بحث"}
      </button>
    </form>
  );
}
