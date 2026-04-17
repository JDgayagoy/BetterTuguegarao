import { useTranslation } from 'react-i18next';
import { ArrowRight, Users, Search, Bug } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { serviceCategories } from '../../data/yamlLoader';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { t } = useTranslation();
  const govName = import.meta.env.VITE_GOVERNMENT_NAME || 'BetterCity.Org';

  // Extract city name for "Better[City].org" style
  // Assuming format "BetterTuguegarao.Org"
  const cityMatch = govName.match(/Better(.*?)\./i);
  const cityNameOnly = cityMatch ? cityMatch[1] : 'City';
  const displayCity =
    cityNameOnly.charAt(0).toUpperCase() + cityNameOnly.slice(1);
  const province = import.meta.env.VITE_PROVINCE || 'Cagayan Valley';

  // Get top 6 categories from YAML
  const topCategories = serviceCategories.categories.slice(0, 6);

  const getIcon = (iconName: string, className: string) => {
    const IconComponent = LucideIcons[
      iconName as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>;
    return IconComponent ? (
      <IconComponent className={className} />
    ) : (
      <Bug className={className} />
    );
  };

  return (
    <div className="relative bg-primary-800 bg-dot-pattern text-white py-10 md:py-14 overflow-hidden h-auto">
      {/* Decorative elements */}
      <div className="container mx-auto px-4 relative md:gap-4 sm:gap-3 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center">
          {/* Left Column: Branding & Intro */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 animate-fade-in">
            <div className="space-y-1">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-white/80 uppercase tracking-[0.2em] text-xs font-medium">
                <span>{t('hero.welcome')}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-white text-wrap">
                {t('hero.name_prefix')}
                {displayCity}
                {t('hero.name_suffix')}
              </h1>
            </div>

            <p className="text-base md:text-lg text-white/90 max-w-lg leading-relaxed font-light">
              {t('hero.subtitle', { city: cityNameOnly, province: province })}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-white text-primary-800 px-6 py-3 rounded-xl font-bold hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                <ArrowRight className="h-5 w-5" />
                {t('hero.browse_services')}
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/40 bg-white/5 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all active:scale-95"
              >
                <Users className="h-5 w-5 text-white" />
                {t('hero.contact_us')}
              </Link>
            </div>
          </div>

          {/* Right Column: Search Card */}
          <div className="animate-slide-in flex">
            <div className="bg-white rounded-3xl w-full max-w-xl p-5 md:p-6 shadow-2xl text-gray-900 overflow-hidden relative group transition-all duration-500">
              <div className="absolute -top-24 -right-24 w-24 h-24 bg-primary-100/50 blur-3xl rounded-full group-hover:bg-accent-100/50 transition-colors duration-700"></div>

              <div className="relative z-10 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold tracking-tight text-gray-900">
                    {t('hero.search_title')}
                  </h2>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                    <input
                      type="text"
                      placeholder={t('hero.search_placeholder')}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-11 pr-4 focus:ring-4 focus:ring-primary-500/5 focus:border-primary-200 focus:bg-white outline-none transition-all text-sm placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] w-auto">
                    {t('hero.popular_services')}
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {topCategories.map(category => (
                      <Link
                        key={category.slug}
                        to={`/services/${category.slug}`}
                        className="group/item flex flex-col items-center justify-center p-2 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all hover:scale-105 h-18 text-center"
                      >
                        <div className="mb-3 p-1 rounded-xl bg-gray-50 transition-all flex items-center justify-center">
                          {getIcon(category.icon, 'h-5 w-5 text-primary-600')}
                        </div>
                        <span className="text-[10px] font-semibold text-gray-600 group-hover/item:text-primary-800 transition-colors line-clamp-2 leading-tight">
                          {category.category}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
