import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-8 fixed top-0 left-0 z-50 backdrop-blur-xl bg-white/40 dark:bg-gray-950/40 border-b border-white/30 dark:border-gray-800/40 shadow-2xl" style={{boxShadow:'0 8px 32px 0 rgba(31,38,135,0.10)',backdropFilter:'blur(16px) saturate(180%)'}}>
      <div className="font-bold text-2xl text-blue-700 dark:text-blue-300 select-none" style={{textShadow:'0 1px 8px #fff8,0 1px 1px #0002'}}>عقارات العالم</div>
      <div className="flex gap-4 text-lg">
        <Link href="/" className="px-4 py-2 rounded-xl bg-blue-700/20 hover:bg-blue-700/40 text-blue-900 dark:text-blue-200 font-semibold shadow border border-blue-700/10 transition-all backdrop-blur-md">الرئيسية</Link>
        <Link href="/dashboard" className="px-4 py-2 rounded-xl bg-blue-700/20 hover:bg-blue-700/40 text-blue-900 dark:text-blue-200 font-semibold shadow border border-blue-700/10 transition-all backdrop-blur-md">لوحة التحكم</Link>
        <a href="#" className="px-4 py-2 rounded-xl bg-gray-400/10 text-gray-400 cursor-not-allowed font-semibold border border-gray-300/10 shadow backdrop-blur-md">VR/3D</a>
        <a href="#" className="px-4 py-2 rounded-xl bg-green-400/10 text-green-600 dark:text-green-300 cursor-not-allowed font-semibold border border-green-300/10 shadow backdrop-blur-md">الدردشة الذكية</a>
      </div>
    </nav>
  );
}
