import React from 'react';

// مكون عرض بانورامي للصور (سيتم ربطه لاحقًا بمكتبة بانوراما مفتوحة المصدر)
export default function PanoramaViewer({ imageUrl }: { imageUrl?: string }) {
  return (
    <div className="w-full h-72 bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-600 rounded-lg shadow flex items-center justify-center mt-6">
      <span className="text-gray-500 dark:text-gray-400 text-lg">عرض بانورامي للوحدة سيظهر هنا قريبًا</span>
    </div>
  );
}
