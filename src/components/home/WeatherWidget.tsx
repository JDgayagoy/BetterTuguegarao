import React from 'react';
import { Sun, Wind, Droplets, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface WeatherWidgetProps {
  city: string;
  province: string;
  lat: number;
  lng: number;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  city,
  province,
  lat,
  lng,
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden rounded-3xl h-full bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 text-white p-6 shadow-lg group">
      {/* Decorative sun element in background */}
      <div className="absolute top-10 right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
        <Sun size={200} />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sun className="h-6 w-6 text-accent-200" />
            <span className="font-bold tracking-wider uppercase text-xs">
              {t('glance.weather')}
            </span>
          </div>

          <div className="space-y-0.5">
            <h4 className="text-sm font-bold opacity-90">
              {city}, {province}
            </h4>
            <div className="flex items-center gap-1 text-[10px] opacity-70">
              <MapPin className="h-3 w-3" />
              <span>
                {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-baseline gap-2">
          <h2 className="text-6xl font-black leading-none tracking-tighter">
            32°C
          </h2>
          <p className="text-lg font-bold opacity-90">Clear Sky</p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 flex gap-6">
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-accent-100" />
            <div className="text-[10px]">
              <p className="opacity-70 uppercase tracking-tighter font-medium">
                {t('glance.wind')}
              </p>
              <p className="font-bold">12 km/h</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-primary-100" />
            <div className="text-[10px]">
              <p className="opacity-70 uppercase tracking-tighter font-medium">
                {t('glance.humidity')}
              </p>
              <p className="font-bold">64%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
