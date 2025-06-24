import React, { useEffect, useState, useContext } from 'react';
import AdminLogin from '../components/AdminLogin';
import { LocaleContext } from '../components/SmartChat';
import { uiTranslations } from '../i18n-ui';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Transaction {
  _id: string;
  property: string;
  user: string;
  amount: string;
  status: string;
}

interface Property {
  _id: string;
  name: string;
  status: string;
  images: string[];
  panorama?: string;
  model3d?: string;
}

export default function Dashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const locale = useContext(LocaleContext);
  const t = uiTranslations[locale] || uiTranslations.en;
  const [stats, setStats] = useState({ properties: 0, users: 0, transactions: 0 });
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب إحصائيات العقارات والمستخدمين والمعاملات من API الحقيقية
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:4000/api/properties');
        const data = await res.json();
        setProperties(data);
        const resUsers = await fetch('http://localhost:4000/api/users');
        const usersData = await resUsers.json();
        const resTrans = await fetch('http://localhost:4000/api/transactions');
        const transData = await resTrans.json();
        setStats({ properties: data.length, users: usersData.length, transactions: transData.length });
        setUsers(usersData);
        setTransactions(transData);
      } catch {
        setStats({ properties: 0, users: 0, transactions: 0 });
        setUsers([]);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // واجهة رفع الملفات للعقارات
  const handleFileUpload = async (propertyId: string, files: { images?: FileList, panorama?: FileList, model3d?: FileList }) => {
    const formData = new FormData();
    if (files.images) Array.from(files.images).forEach(f => formData.append('images', f));
    if (files.panorama) formData.append('panorama', files.panorama[0]);
    if (files.model3d) formData.append('model3d', files.model3d[0]);
    const res = await fetch('http://localhost:4000/api/properties/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    // تحديث العقار في قاعدة البيانات
    await fetch(`http://localhost:4000/api/properties/${propertyId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...(data.images.length ? { images: data.images } : {}),
        ...(data.panorama ? { panorama: data.panorama } : {}),
        ...(data.model3d ? { model3d: data.model3d } : {})
      })
    });
    // تحديث الواجهة
    const res2 = await fetch('http://localhost:4000/api/properties');
    setProperties(await res2.json());
  };

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <main className="min-h-screen bg-white/40 dark:bg-gray-950/40 p-8 backdrop-blur-xl" style={{boxShadow:'0 8px 32px 0 rgba(31,38,135,0.10)',backdropFilter:'blur(16px) saturate(180%)'}}>
      <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300 select-none" style={{textShadow:'0 1px 8px #fff8,0 1px 1px #0002'}}>{t.dashboard}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl p-6 shadow-2xl bg-white/60 dark:bg-gray-900/60 border border-white/30 dark:border-gray-800/40 backdrop-blur-xl flex flex-col items-center" style={{boxShadow:'0 4px 16px 0 #3b82f640'}}>
          <h3 className="font-bold text-lg mb-2">{t.stats} {t.results}</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{loading ? '...' : stats.properties}</p>
        </div>
        <div className="rounded-2xl p-6 shadow-2xl bg-white/60 dark:bg-gray-900/60 border border-white/30 dark:border-gray-800/40 backdrop-blur-xl flex flex-col items-center" style={{boxShadow:'0 4px 16px 0 #3b82f640'}}>
          <h3 className="font-bold text-lg mb-2">{t.users}</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{loading ? '...' : stats.users}</p>
        </div>
        <div className="rounded-2xl p-6 shadow-2xl bg-white/60 dark:bg-gray-900/60 border border-white/30 dark:border-gray-800/40 backdrop-blur-xl flex flex-col items-center" style={{boxShadow:'0 4px 16px 0 #3b82f640'}}>
          <h3 className="font-bold text-lg mb-2">{t.transactions}</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{loading ? '...' : stats.transactions}</p>
        </div>
      </div>
      <div className="mt-10 text-gray-500 dark:text-gray-400 text-sm">
        سيتم ربط البيانات الحية قريبًا...
      </div>
      <div className="mt-12">
        <h3 className="font-bold text-lg mb-4 text-blue-700 dark:text-blue-300">{t.users}</h3>
        <div className="overflow-x-auto mb-12 rounded-2xl shadow-2xl bg-white/60 dark:bg-gray-900/60 border border-white/30 dark:border-gray-800/40 backdrop-blur-xl" style={{boxShadow:'0 4px 16px 0 #3b82f640'}}>
          <table className="min-w-full rounded-2xl text-right">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">{t.users}</th>
                <th className="py-2 px-4 border-b">{t.email}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-blue-50/60 dark:hover:bg-gray-800/60 transition">
                  <td className="py-2 px-4 border-b">{user._id}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                </tr>
              ))}
              {users.length === 0 && !loading && (
                <tr><td colSpan={3} className="text-center text-gray-400 py-4">{t.notFound}</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <h3 className="font-bold text-lg mb-4 text-blue-700 dark:text-blue-300">{t.transactions}</h3>
        <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white/60 dark:bg-gray-900/60 border border-white/30 dark:border-gray-800/40 backdrop-blur-xl" style={{boxShadow:'0 4px 16px 0 #3b82f640'}}>
          <table className="min-w-full rounded-2xl text-right">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">{t.results}</th>
                <th className="py-2 px-4 border-b">{t.users}</th>
                <th className="py-2 px-4 border-b">{t.stats}</th>
                <th className="py-2 px-4 border-b">{t.transactions}</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tr) => (
                <tr key={tr._id} className="hover:bg-blue-50/60 dark:hover:bg-gray-800/60 transition">
                  <td className="py-2 px-4 border-b">{tr._id}</td>
                  <td className="py-2 px-4 border-b">{tr.property}</td>
                  <td className="py-2 px-4 border-b">{tr.user}</td>
                  <td className="py-2 px-4 border-b">{tr.amount}</td>
                  <td className="py-2 px-4 border-b">{tr.status}</td>
                </tr>
              ))}
              {transactions.length === 0 && !loading && (
                <tr><td colSpan={5} className="text-center text-gray-400 py-4">{t.notFound}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-12">
        <h3 className="font-bold text-lg mb-4 text-blue-700 dark:text-blue-300">إدارة العقارات ورفع الملفات</h3>
        <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white/60 dark:bg-gray-900/60 border border-white/30 dark:border-gray-800/40 backdrop-blur-xl mb-12" style={{boxShadow:'0 4px 16px 0 #3b82f640'}}>
          <table className="min-w-full rounded-2xl text-right">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">الاسم</th>
                <th className="py-2 px-4 border-b">الحالة</th>
                <th className="py-2 px-4 border-b">صور</th>
                <th className="py-2 px-4 border-b">بانوراما</th>
                <th className="py-2 px-4 border-b">3D</th>
                <th className="py-2 px-4 border-b">رفع ملفات</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p._id} className="hover:bg-blue-50/60 dark:hover:bg-gray-800/60 transition">
                  <td className="py-2 px-4 border-b">{p._id}</td>
                  <td className="py-2 px-4 border-b">{p.name}</td>
                  <td className="py-2 px-4 border-b">{p.status}</td>
                  <td className="py-2 px-4 border-b">
                    {p.images && p.images.length > 0 ? p.images.map((img, i) => <img key={i} src={img} alt="img" className="inline-block w-10 h-10 rounded shadow mr-1" />) : <span className="text-gray-400">لا يوجد</span>}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {p.panorama ? <img src={p.panorama} alt="panorama" className="inline-block w-10 h-10 rounded shadow" /> : <span className="text-gray-400">لا يوجد</span>}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {p.model3d ? <span className="text-green-600">تم الرفع</span> : <span className="text-gray-400">لا يوجد</span>}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <form onSubmit={e => { e.preventDefault(); const f = e.currentTarget; handleFileUpload(p._id, { images: f.images.files, panorama: f.panorama.files, model3d: f.model3d.files }); f.reset(); }} className="flex flex-col gap-1 items-end">
                      <input type="file" name="images" accept="image/*" multiple className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-xl file:border-0 file:bg-blue-700/30 file:text-white file:shadow file:backdrop-blur-md" />
                      <input type="file" name="panorama" accept="image/*" className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-xl file:border-0 file:bg-green-700/30 file:text-white file:shadow file:backdrop-blur-md" />
                      <input type="file" name="model3d" accept=".glb,.gltf,model/gltf-binary,model/gltf+json" className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-xl file:border-0 file:bg-purple-700/30 file:text-white file:shadow file:backdrop-blur-md" />
                      <button type="submit" className="mt-1 px-3 py-1 rounded-xl bg-blue-700/60 hover:bg-blue-800/70 text-white font-bold shadow border-none backdrop-blur-md transition-all text-xs">رفع</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
