import React from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// fallback بسيط في حال لم يتم تثبيت react-leaflet بعد
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer).catch(() => (props: any) => <div className="flex items-center justify-center h-full text-gray-400">Map not available</div>), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer).catch(() => () => null), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker).catch(() => () => null), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup).catch(() => () => null), { ssr: false });

export default function PropertyMap({ lat, lng, name }: { lat: number; lng: number; name: string }) {
  if (!lat || !lng) return null;
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow">
      <MapContainer center={[lat, lng]} zoom={15} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        <Marker position={[lat, lng]}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
