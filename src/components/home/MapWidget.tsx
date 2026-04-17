import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Leaflet + React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

interface DefaultIconPrototype {
  _getIconUrl?: string;
}

delete (L.Icon.Default.prototype as L.Icon.Default & DefaultIconPrototype)
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapWidgetProps {
  lat: number;
  lng: number;
  zoom: number;
  city: string;
}

const MapWidget: React.FC<MapWidgetProps> = ({ lat, lng, zoom, city }) => {
  return (
    <div className="h-full w-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm z-0">
      <MapContainer center={[lat, lng]} zoom={zoom} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>{city} City</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapWidget;
