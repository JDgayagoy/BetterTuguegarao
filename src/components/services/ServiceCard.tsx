import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Subcategory } from '../../data/yamlLoader';

interface ServiceCardProps {
  service: Subcategory;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const {
    id,
    name,
    description,
    source,
    type,
    categoryName,
    categorySlug,
    slug,
  } = service;

  return (
    <Link
      to={`/services/${categorySlug}/${slug}`}
      className="group block bg-white border border-gray-100 rounded-xl hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden"
    >
      <div className="p-5 flex flex-col h-full">
        {/* Header: ID/Icon & Badges */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <FileText size={20} />
            </div>
            {id && (
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Service No. {id}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 justify-end">
            {source && (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide border ${
                  source === 'Official'
                    ? 'bg-green-50 text-green-600 border-green-100'
                    : 'bg-orange-50 text-orange-600 border-orange-100'
                }`}
              >
                {source}
              </span>
            )}
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-50 text-gray-500 border border-gray-100 uppercase tracking-wide">
              Walk-in
            </span>
          </div>
        </div>

        {/* Body: Title & Category */}
        <div className="flex-1">
          <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-1 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-3">
            {categoryName}
          </p>
          {description && (
            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
              {description}
            </p>
          )}
        </div>

        {/* Footer: Status & Link */}
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-green-600">
            <CheckCircle2 size={14} />
            <span className="text-[11px] font-bold uppercase tracking-wide">
              Official Data
            </span>
          </div>

          <div className="flex items-center gap-1 text-blue-600 text-xs font-bold group-hover:gap-2 transition-all">
            <span>View</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>

      {/* Conditional bottom label for Type */}
      {type && (
        <div className="px-5 py-2 bg-gray-50/50 border-t border-gray-50">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {type} Transaction
          </span>
        </div>
      )}
    </Link>
  );
};
