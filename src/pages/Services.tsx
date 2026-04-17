import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router-dom';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import {
  serviceCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import * as LucideIcons from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import ServicesSection from '../components/home/ServicesSection';
import SEO from '../components/SEO';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';

const ACCENT_COLORS = [
  { bar: '#5DCAA5', iconBg: '#E1F5EE', iconColor: '#0F6E56' },
  { bar: '#D4537E', iconBg: '#FBEAF0', iconColor: '#993556' },
  { bar: '#378ADD', iconBg: '#E6F1FB', iconColor: '#185FA5' },
  { bar: '#639922', iconBg: '#EAF3DE', iconColor: '#3B6D11' },
  { bar: '#BA7517', iconBg: '#FAEEDA', iconColor: '#854F0B' },
  { bar: '#7F77DD', iconBg: '#EEEDFE', iconColor: '#3C3489' },
  { bar: '#D85A30', iconBg: '#FAECE7', iconColor: '#993C1D' },
  { bar: '#888780', iconBg: '#F1EFE8', iconColor: '#444441' },
];

// Pick a stable accent for this category based on its slug index
function getCategoryAccent(slug: string) {
  const categories = serviceCategories.categories;
  const idx = categories.findIndex(c => c.slug === slug);
  return ACCENT_COLORS[(idx >= 0 ? idx : 0) % ACCENT_COLORS.length];
}

const Services: React.FC = () => {
  const { category } = useParams();
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    layout: 'list',
    pages: [],
  });
  const [loading, setLoading] = useState(false);
  const subcategories: Subcategory[] = categoryIndex.pages;

  const categoryData = serviceCategories.categories.find(
    c => c.slug === category
  );
  const accent = category ? getCategoryAccent(category) : ACCENT_COLORS[0];

  const Icon = LucideIcons[
    categoryData?.icon as keyof typeof LucideIcons
  ] as React.ComponentType<{ style?: React.CSSProperties }>;

  useEffect(() => {
    if (category && categoryData) {
      setLoading(true);
      getCategorySubcategories(category)
        .then(setCategoryIndex)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [category, categoryData]);

  // ── All services (no category param) ──────────────────────────────────────
  if (!category) {
    return (
      <>
        <SEO
          title="Services"
          description={`All services provided by the ${import.meta.env.VITE_GOVERNMENT_NAME} government. Find what you need for citizenship, business, education, and more.`}
          keywords="government services, public services, local government, civic services"
        />
        <ServicesSection
          title="All local government services"
          description={`All services provided by the ${import.meta.env.VITE_GOVERNMENT_NAME} government. Find what you need for citizenship, business, education, and more.`}
        />
      </>
    );
  }

  // ── Category not found ────────────────────────────────────────────────────
  if (!categoryData) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Banner
          type="error"
          title="Category not found"
          description="The category you are looking for does not exist."
          icon
        />
      </Section>
    );
  }

  // ── Category page ─────────────────────────────────────────────────────────
  return (
    <>
      <SEO
        title={categoryData.category || category}
        description={categoryData.description}
        keywords={`${categoryData.category}, government services, public services, local government`}
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />

        {/* Category header */}
        <div className="mb-8">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
            style={{ background: accent.iconBg, color: accent.iconColor }}
          >
            {Icon && <Icon style={{ width: 20, height: 20 }} />}
          </div>

          <Heading>{categoryData.category || category}</Heading>
          <Text className="text-gray-500 mt-1">{categoryData.description}</Text>
        </div>

        {/* Divider */}
        <div
          className="h-[2px] w-12 rounded-full mb-8"
          style={{ background: accent.bar }}
        />

        {/* Sub-heading from index */}
        {categoryIndex.title && (
          <p className="text-base font-semibold text-gray-800 mb-1">
            {categoryIndex.title}
          </p>
        )}
        {categoryIndex.description && (
          <Text className="text-gray-500 mb-6">
            {categoryIndex.description}
          </Text>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div
              className="w-6 h-6 rounded-full border-2 border-gray-200 animate-spin"
              style={{ borderTopColor: accent.bar }}
            />
          </div>
        )}

        {/* Grid layout */}
        {!loading && categoryIndex.layout === 'grid' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {subcategories.map((subcategory, i) => {
              const subAccent = ACCENT_COLORS[i % ACCENT_COLORS.length];
              return (
                <Link
                  key={subcategory.slug}
                  to={`/services/${category}/${subcategory.slug}`}
                  className="group block rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all duration-200 overflow-hidden"
                >
                  <div
                    className="h-[3px] w-full"
                    style={{ background: subAccent.bar }}
                  />
                  <div className="p-5">
                    <h4 className="text-sm font-semibold text-gray-900 leading-snug mb-1.5">
                      {subcategory.name}
                    </h4>
                    {subcategory.description && (
                      <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3">
                        {subcategory.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span
                        className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                          background: subAccent.iconBg,
                          color: subAccent.iconColor,
                        }}
                      >
                        {categoryData.category}
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
        )}

        {/* List layout */}
        {!loading && categoryIndex.layout === 'list' && (
          <div className="flex flex-col gap-2">
            {subcategories.map(subcategory => (
              <Link
                key={subcategory.slug}
                to={`/services/${category}/${subcategory.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all duration-200 px-5 py-4 overflow-hidden"
              >
                {/* Left accent line */}
                <div
                  className="w-[3px] h-8 rounded-full flex-shrink-0"
                  style={{ background: accent.bar }}
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 leading-snug">
                    {subcategory.name}
                  </h4>
                  {subcategory.description && (
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                      {subcategory.description}
                    </p>
                  )}
                </div>

                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 hidden sm:inline-block"
                  style={{ background: accent.iconBg, color: accent.iconColor }}
                >
                  {categoryData.category}
                </span>

                <span
                  className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all text-sm flex-shrink-0"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
};

export default Services;
