import React from 'react';
import Link from 'next/link';

// مكون خريطة تفاعلية (سيتم ربطه لاحقًا ببيانات حقيقية وAPI مفتوح المصدر)
export default function MapView({ results }: { results: any[] }) {
  return (
    <div className="w-full mt-8">
      <div className="mb-4 text-lg font-bold text-blue-700 dark:text-blue-300">نتائج البحث على الخريطة (تجريبي):</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((item: any) => (
          <Link key={item.id} href={`/property/${item.id}`} className="block bg-white dark:bg-gray-900 rounded-lg shadow p-4 hover:bg-blue-50 dark:hover:bg-gray-800 transition">
            <div className="font-bold text-blue-700 dark:text-blue-300 mb-2">{item.name}</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm mb-1">الموقع: ({item.lat}, {item.lng})</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm mb-1">الحالة: {item.status}</div>
            <div className="text-gray-800 dark:text-gray-100 text-md">السعر: {item.price}</div>
          </Link>
        ))}
      </div>
      <div className="mt-6 w-full h-96 bg-gray-200 dark:bg-gray-800 rounded-lg shadow flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400 text-lg">خريطة تفاعلية حقيقية ستظهر هنا قريبًا (MapLibre GL JS)</span>
      </div>
    </div>
  );
}
