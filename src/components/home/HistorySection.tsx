import React, { useState } from 'react';
import { cityHistory } from '../../data/yamlLoader';
import { ChevronDown, ChevronUp, History, Flag } from 'lucide-react';

const TimelineEvent: React.FC<{
  event: { year: string; title: string; content: string; details?: string };
  isLast: boolean;
}> = ({ event, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative pl-8 pb-12 group">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gray-200 group-last:hidden" />
      )}

      {/* Timeline Dot */}
      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white bg-primary-600 shadow-sm z-10" />

      {/* Content Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold tracking-wider uppercase">
            {event.year}
          </span>
          <h3 className="text-xl font-black text-gray-900 leading-tight">
            {event.title}
          </h3>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm">{event.content}</p>

        {event.details && (
          <div className="mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-800 transition-colors text-xs"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Read More
                </>
              )}
            </button>

            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
                <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                  {event.details}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function HistorySection() {
  const { affiliations, timeline } = cityHistory;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Timeline Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 rounded-2xl bg-primary-100 text-primary-600">
                <History className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                Brief History
              </h2>
            </div>

            <div className="mt-8">
              {timeline.map((event, index) => (
                <TimelineEvent
                  key={index}
                  event={event}
                  isLast={index === timeline.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Side Info Column */}
          <div className="space-y-8">
            {/* Historical Affiliations Card */}
            <div className="bg-primary-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Flag size={200} />
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                  <Flag className="h-5 w-5 text-accent-400" />
                  Historical Affiliations
                </h3>

                <div className="space-y-4">
                  {affiliations.map((aff, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-white/10 last:border-0"
                    >
                      <span className="font-bold text-sm text-white/90">
                        {aff.label}
                      </span>
                      <span className="text-xs font-medium text-white/50 bg-white/5 px-2 py-1 rounded">
                        {aff.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote or Badge */}
            <div className="bg-gray-50 rounded-3xl p-8 text-center border border-gray-100">
              <p className="italic text-gray-500 text-sm leading-relaxed mb-4">
                "Cagayan Valley's center of gravity—a city forged by missions,
                trade, and resilience."
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 text-xs font-black text-primary-700 uppercase tracking-widest shadow-sm">
                Established 1604
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
