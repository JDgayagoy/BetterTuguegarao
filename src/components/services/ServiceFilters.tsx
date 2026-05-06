import React, { useState } from 'react';
import { Search, ChevronDown, Filter } from 'lucide-react';

interface ServiceFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sourceFilter: string;
  setSourceFilter: (filter: string) => void;
  typeFilter: string;
  setTypeFilter: (filter: string) => void;
  resultsCount: number;
}

export const ServiceFilters: React.FC<ServiceFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  sourceFilter,
  setSourceFilter,
  typeFilter,
  setTypeFilter,
  resultsCount,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all shadow-sm"
            placeholder="Search services..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 transition-all shadow-sm hover:bg-gray-50 ${isDropdownOpen ? 'ring-2 ring-blue-100 border-blue-200' : ''}`}
          >
            <Filter size={16} />
            <span>Filters</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-top-2">
              <div className="flex flex-col gap-5">
                {/* Source Filter */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                    Source
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Official', 'Community'].map(option => (
                      <button
                        key={option}
                        onClick={() => setSourceFilter(option)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          sourceFilter === option
                            ? 'bg-blue-50 border-blue-200 text-blue-600 font-bold'
                            : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                    Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Simple', 'Complex'].map(option => (
                      <button
                        key={option}
                        onClick={() => setTypeFilter(option)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          typeFilter === option
                            ? 'bg-blue-50 border-blue-200 text-blue-600 font-bold'
                            : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100/50 px-2 py-1 rounded">
          {resultsCount} Results
        </span>
      </div>
    </div>
  );
};
