import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import StatCard from './StatCard';
import WeatherWidget from './WeatherWidget';
import MapWidget from './MapWidget';
import { cityStats } from '../../data/yamlLoader';

export default function GlanceSection() {
  const { t } = useTranslation();
  const govName = import.meta.env.VITE_GOVERNMENT_NAME || 'BetterCity.Org';
  const province = import.meta.env.VITE_PROVINCE || 'Cagayan Valley';

  // Extract city name
  const cityMatch = govName.match(/Better(.*?)\./i);
  const cityNameOnly = cityMatch ? cityMatch[1] : 'City';
  const displayCity =
    cityNameOnly.charAt(0).toUpperCase() + cityNameOnly.slice(1);

  const { stats, coordinates } = cityStats;

  return (
    <section className="py-12 mb-20 md:py-16 px-4 max-w-7xl mx-auto">
      <div className="container mx-auto px-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
            {t('glance.title', { city: displayCity })}
          </h2>
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-colors text-sm"
          >
            {t('glance.view_profile')}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatCard
            value={stats.residents.value}
            label={t('glance.residents')}
            subtext={stats.residents.subtext}
          />
          <StatCard
            value={stats.barangays.value}
            label={t('glance.barangays')}
            subtext={stats.barangays.subtext}
          />
          <StatCard
            value={stats.classification.value}
            label={t('glance.classification')}
            subtext={stats.classification.subtext}
          />
          <StatCard
            value={stats.land_area.value}
            label={t('glance.land_area')}
            unit={stats.land_area.unit}
            subtext={stats.land_area.subtext}
          />
        </div>

        {/* Bottom row: Weather & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 h-[200px] lg:h-[200px]">
          <div className="lg:col-span-2">
            <WeatherWidget
              city={displayCity}
              province={province}
              lat={coordinates.lat}
              lng={coordinates.lng}
            />
          </div>
          <div className="lg:col-span-3">
            <MapWidget
              lat={coordinates.lat}
              lng={coordinates.lng}
              zoom={coordinates.zoom}
              city={displayCity}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
