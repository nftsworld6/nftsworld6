import React, { useState, useContext } from "react";
import PropertySearch from "./components/PropertySearch";
import MapView from "./components/MapView";
import { LocaleContext } from "./components/SmartChat";
import { uiTranslations } from "./i18n-ui";

interface Property {
  id: number;
  name: string;
  lat: number;
  lng: number;
  price: string;
  status: string;
  images: string[];
  panorama: string;
}

export default function Home() {
  const locale = useContext(LocaleContext);
  const t = uiTranslations[locale] || uiTranslations.en;
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [mapResults, setMapResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchResult(null);
    try {
      const res = await fetch(`/api/properties?q=${encodeURIComponent(query)}`);
      const data: Property[] = await res.json();
      setMapResults(data);
      setSearchResult(
        data.length
          ? `تم العثور على ${data.length} وحدة`
          : "لا توجد نتائج مطابقة"
      );
    } catch {
      setSearchResult("حدث خطأ أثناء البحث");
      setMapResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 text-blue-700 dark:text-blue-300 drop-shadow-lg">
        {t.title}
      </h1>
      <p className="text-lg md:text-2xl text-center mb-8 text-gray-700 dark:text-gray-200 max-w-2xl">
        {t.subtitle}
      </p>
      <PropertySearch
        onSearch={handleSearch}
        placeholder={t.searchPlaceholder}
        buttonLabel={t.search}
      />
      {loading && (
        <div className="mt-8 text-blue-500 animate-pulse">{t.loading}</div>
      )}
      {searchResult && (
        <div className="mt-8 p-6 bg-white/80 dark:bg-gray-900/80 rounded-lg shadow text-center text-lg text-blue-700 dark:text-blue-300">
          {searchResult}
        </div>
      )}
      {mapResults.length > 0 && <MapView results={mapResults} />}
      <div className="mt-10 text-center text-gray-500 dark:text-gray-400 text-sm">
        منصة مفتوحة المصدر | Powered by Next.js, UnoCSS, AI, Web3, 3D, VR
      </div>
    </main>
  );
}
