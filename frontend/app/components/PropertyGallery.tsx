import React from 'react';

// مكون معرض صور للوحدة العقارية
export default function PropertyGallery({ images }: { images: string[] }) {
  if (!images || images.length === 0) {
    return <div className="w-full text-center text-gray-400 mt-8">لا توجد صور متاحة بعد</div>;
  }
  return (
    <div className="w-full flex flex-wrap gap-4 justify-center mt-8">
      {images.map((img, i) => (
        <img key={i} src={img} alt={`صورة ${i + 1}`} className="w-40 h-32 object-cover rounded-lg shadow" />
      ))}
    </div>
  );
}
