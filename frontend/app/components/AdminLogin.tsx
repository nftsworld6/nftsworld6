import React, { useState } from 'react';

export default function AdminLogin({ onLogin }: { onLogin: (user: any) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        onLogin(data.user);
      } else {
        setError(data.message || 'فشل تسجيل الدخول');
      }
    } catch {
      setError('حدث خطأ أثناء الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-20 p-8 rounded-2xl shadow-2xl flex flex-col gap-4 backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 border border-white/30 dark:border-gray-800/40" style={{boxShadow:'0 8px 32px 0 rgba(31,38,135,0.10)',backdropFilter:'blur(16px) saturate(180%)'}}>
      <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-300 mb-4" style={{textShadow:'0 1px 8px #fff8,0 1px 1px #0002'}}>تسجيل دخول الإدارة</h2>
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        className="rounded-xl border-none px-4 py-2 bg-white/60 dark:bg-gray-800/60 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 backdrop-blur-md"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{boxShadow:'0 1px 4px 0 #0001'}}
      />
      <input
        type="password"
        placeholder="كلمة المرور"
        className="rounded-xl border-none px-4 py-2 bg-white/60 dark:bg-gray-800/60 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 backdrop-blur-md"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{boxShadow:'0 1px 4px 0 #0001'}}
      />
      {error && <div className="text-red-500 text-center">{error}</div>}
      <button type="submit" className="bg-blue-700/60 hover:bg-blue-800/70 text-white font-bold py-2 rounded-xl shadow-lg border-none backdrop-blur-md transition-all" style={{background:'linear-gradient(120deg,rgba(59,130,246,0.7),rgba(255,255,255,0.15))',boxShadow:'0 2px 8px 0 rgba(59,130,246,0.10)',border:'1px solid #3b82f640',textShadow:'0 1px 8px #fff8,0 1px 1px #0002'}} disabled={loading}>
        {loading ? 'جاري الدخول...' : 'دخول'}
      </button>
    </form>
  );
}
