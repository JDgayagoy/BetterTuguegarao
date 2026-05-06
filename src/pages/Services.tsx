import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Section from '../components/ui/Section';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import {
  serviceCategories,
  getAllServices,
  type Subcategory,
} from '../data/yamlLoader';
import { ServiceSidebar } from '../components/services/ServiceSidebar';
import { ServiceFilters } from '../components/services/ServiceFilters';
import { ServiceCard } from '../components/services/ServiceCard';

const Services: React.FC = () => {
  const { category: urlCategory } = useParams();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    urlCategory || null
  );
  const [allServices, setAllServices] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Update state when URL changes (deep linking)
  useEffect(() => {
    setSelectedCategory(urlCategory || null);
  }, [urlCategory]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getAllServices();
        setAllServices(data);
      } catch (error) {
        console.error('Failed to load services:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter logic
  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      // Category filter (from local state)
      if (selectedCategory && service.categorySlug !== selectedCategory)
        return false;

      // Search filter
      const searchMatch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchQuery.toLowerCase());
      if (!searchMatch) return false;

      // Source filter
      if (sourceFilter !== 'All' && service.source !== sourceFilter)
        return false;

      // Type filter
      if (typeFilter !== 'All' && service.type !== typeFilter) return false;

      return true;
    });
  }, [allServices, selectedCategory, searchQuery, sourceFilter, typeFilter]);

  const currentCategoryData = serviceCategories.categories.find(
    c => c.slug === selectedCategory
  );

  return (
    <>
      <SEO
        title={currentCategoryData?.category || 'Services'}
        description={`Find and access government services in ${import.meta.env.VITE_GOVERNMENT_NAME}.`}
      />

      <Section className="py-8 bg-gray-50/30 min-h-screen">
        <div className="container mx-auto px-4">
          <Breadcrumbs className="mb-8" />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <ServiceSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentCategoryData?.category || 'All Services'}
                </h1>
                <p className="text-gray-500 max-w-2xl">
                  {currentCategoryData?.description ||
                    'Browse through the complete directory of services provided by the local government unit.'}
                </p>
              </div>

              {/* Filters */}
              <ServiceFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sourceFilter={sourceFilter}
                setSourceFilter={setSourceFilter}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                resultsCount={filteredServices.length}
              />

              {/* Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-100 rounded-2xl h-64 shadow-sm"
                    />
                  ))}
                </div>
              ) : filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredServices.map(service => (
                    <ServiceCard
                      key={`${service.categorySlug}-${service.slug}`}
                      service={service}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <LucideIcons.Search size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    No services found
                  </h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    We couldn't find any services matching your current filters.
                    Try adjusting your search or category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Services;
