// HospitalsMap — Leaflet + OpenStreetMap interactive map of hospitals in
// Tuguegarao City, Cagayan. Used on the Health Services page.
//
// Hospital coordinates are sourced from OpenStreetMap (Nominatim).
// Do not rely on these for emergency dispatch — always dial 911 first.

import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

import { HOSPITALS } from './hospitals';

const TUGUEGARAO_CENTER: [number, number] = [17.628, 121.728];

const HospitalsMap = () => {
  useEffect(() => {
    const t = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm shadow-gray-900/[0.04]">
      <MapContainer
        center={TUGUEGARAO_CENTER}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '460px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {HOSPITALS.map(h => (
          <Marker key={h.name} position={h.position}>
            <Popup>
              <div className="text-xs">
                <div className="font-semibold text-gray-900">{h.name}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wider text-primary-700">
                  {h.type}
                </div>
                {h.address && (
                  <div className="mt-1 text-gray-600">{h.address}</div>
                )}
                {h.phones && h.phones.length > 0 && (
                  <div className="mt-1 flex flex-col gap-0.5">
                    {h.phones.map(p => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\D/g, '')}`}
                        className="font-bold text-primary-700 hover:text-primary-800"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HospitalsMap;
