import React, { useEffect, useState } from 'react';
import Unit3DViewer from '../../components/Unit3DViewer';
import PanoramaViewer from '../../components/PanoramaViewer';
import PropertyGallery from '../../components/PropertyGallery';
import PropertyMap from '../../components/PropertyMap';
import { useParams } from 'next/navigation';

interface Property {
  _id: string;
  name: string;
  lat: number;
  lng: number;
  price: string;
  status: string;
  images: string[];
  panorama?: string;
  model3d?: string;
}

export default function PropertyDetails() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/properties/${params.id}`);
        const data: Property = await res.json();
        setProperty(data || null);
      } catch {
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-blue-500">جاري التحميل...</div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center text-red-500">لم يتم العثور على الوحدة</div>;

  return (
    <main className="min-h-screen bg-white/40 dark:bg-gray-950/40 p-8 flex flex-col items-center backdrop-blur-xl">
      <h2 className="text-3xl font-bold mb-4 text-blue-700 dark:text-blue-300">{property.name}</h2>
      {property.model3d && <Unit3DViewer modelUrl={property.model3d} />}
      {property.panorama && <PanoramaViewer imageUrl={property.panorama} />}
      {property.images && property.images.length > 0 && <PropertyGallery images={property.images} />}
      <div className="mt-8 w-full max-w-2xl bg-white/60 dark:bg-gray-900/60 rounded-2xl p-6 shadow-2xl border border-white/30 dark:border-gray-800/40 backdrop-blur-xl">
        <h3 className="font-bold text-lg mb-2">معلومات الوحدة</h3>
        <ul className="text-gray-700 dark:text-gray-200 text-md space-y-2">
          <li>الموقع: ({property.lat}, {property.lng})</li>
          <li>الحالة: {property.status}</li>
          <li>السعر: {property.price}</li>
          <li>الشراء عبر NFT متاح قريبًا</li>
        </ul>
      </div>
      <div className="mt-8 w-full">
        <PropertyMap lat={property.lat} lng={property.lng} name={property.name} />
      </div>
    </main>
  );
}
