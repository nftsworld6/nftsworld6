import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-6 px-8 text-center text-gray-500 dark:text-gray-400 text-sm mt-20 backdrop-blur-xl bg-white/40 dark:bg-gray-950/40 border-t border-white/30 dark:border-gray-800/40 shadow-2xl" style={{boxShadow:'0 8px 32px 0 rgba(31,38,135,0.10)',backdropFilter:'blur(16px) saturate(180%)'}}>
      منصة عقارات العالم © {new Date().getFullYear()} | مفتوحة المصدر | Powered by Next.js, UnoCSS, AI, Web3, 3D, VR
    </footer>
  );
}
