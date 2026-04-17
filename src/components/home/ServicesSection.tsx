import Section from '../ui/Section';
import * as LucideIcons from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from '../../hooks/useTranslation';
import { Link } from 'react-router-dom';
import { serviceCategories } from '../../data/yamlLoader';

interface Category {
  category: string;
  slug: string;
  description: string;
  icon: string;
}

// Cycles through a set of accent colors per card index
const ACCENT_COLORS = [
  { bar: '#5DCAA5', iconBg: '#E1F5EE', iconColor: '#0F6E56' }, // teal
  { bar: '#D4537E', iconBg: '#FBEAF0', iconColor: '#99355' }, // pink
  { bar: '#378ADD', iconBg: '#E6F1FB', iconColor: '#185FA5' }, // blue
  { bar: '#639922', iconBg: '#EAF3DE', iconColor: '#3B6D11' }, // green
  { bar: '#BA7517', iconBg: '#FAEEDA', iconColor: '#854F0B' }, // amber
  { bar: '#7F77DD', iconBg: '#EEEDFE', iconColor: '#3C3489' }, // purple
  { bar: '#D85A30', iconBg: '#FAECE7', iconColor: '#993C1D' }, // coral
  { bar: '#888780', iconBg: '#F1EFE8', iconColor: '#444441' }, // gray
];

export default function ServicesSection({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  const { t } = useTranslation();

  const getIcon = (iconName: string) => {
    const IconComponent = LucideIcons[
      iconName as keyof typeof LucideIcons
    ] as React.ComponentType<{
      className?: string;
      style?: React.CSSProperties;
    }>;
    return IconComponent ? (
      <IconComponent style={{ width: 18, height: 18 }} />
    ) : null;
  };

  const displayedCategories = serviceCategories.categories as Category[];

  return (
    <Section>
      <div>
        <Heading level={2}>{title || t('services.title')}</Heading>
        <Text className="text-gray-600 mb-6">
          {description || t('services.description')}
        </Text>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {displayedCategories.map((category, i) => {
          const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
          return (
            <Link
              key={category.slug}
              to={`/services/${category.slug}`}
              className="group block rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all duration-200 overflow-hidden"
            >
              {/* Top accent bar */}
              <div
                className="h-[3px] w-full"
                style={{ background: accent.bar }}
              />

              <div className="p-5">
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: accent.iconBg, color: accent.iconColor }}
                >
                  {getIcon(category.icon)}
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-gray-900 mb-1.5 leading-snug">
                  {t(
                    `services.categories.${category.slug}.name`,
                    category.category
                  )}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3">
                  {t(
                    `services.categories.${category.slug}.description`,
                    category.description
                  )}
                </p>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                    style={{
                      background: accent.iconBg,
                      color: accent.iconColor,
                    }}
                  >
                    View services
                  </span>
                  <span
                    className="text-gray-300 group-hover:text-gray-400 transition-colors text-sm"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
