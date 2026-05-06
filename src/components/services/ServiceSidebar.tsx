import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Category, serviceCategories } from '../../data/yamlLoader';
import { PlusCircle } from 'lucide-react';

export const ServiceSidebar: React.FC<{
  selectedCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
}> = ({ selectedCategory, onCategoryChange }) => {
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as Record<string, unknown>)[
      iconName
    ] as React.ComponentType<{ size?: number; className?: string }>;
    return IconComponent ? <IconComponent size={18} /> : null;
  };

  return (
    <aside className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-6">
      {/* Categories Card */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
          <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Categories
          </h2>
        </div>

        <nav className="p-2 flex flex-col gap-1">
          <button
            onClick={() => onCategoryChange(null)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
              !selectedCategory
                ? 'bg-blue-50 text-blue-600 font-bold'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                !selectedCategory
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <LucideIcons.LayoutGrid size={16} />
            </div>
            <span className="text-sm">All Services</span>
          </button>

          {serviceCategories.categories.map((cat: Category) => (
            <button
              key={cat.slug}
              onClick={() => onCategoryChange(cat.slug)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                selectedCategory === cat.slug
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  selectedCategory === cat.slug
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-400 group-hover:bg-white group-hover:text-blue-600'
                }`}
              >
                {getIcon(cat.icon)}
              </div>
              <span className="text-sm line-clamp-1">{cat.category}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Suggest Service Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
            <PlusCircle size={18} />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">
            Missing a service?
          </h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-6">
          Better Tuguegarao is community-maintained. Help your fellow citizens
          by suggesting a new service directory.
        </p>
        <button className="w-full bg-[#f38d15] hover:bg-[#e07b0d] text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow-sm shadow-orange-500/20">
          Suggest New Service
        </button>
      </div>
    </aside>
  );
};
