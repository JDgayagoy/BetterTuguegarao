import React from 'react';

interface StatCardProps {
  value: string;
  label: string;
  subtext: string;
  unit?: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, subtext, unit }) => {
  return (
    <div className="bg-white rounded-xl py-3 px-4 shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
      <div className="space-y-1">
        <h4 className="text-2xl font-black text-primary-900 tracking-tight">
          {value}
          {unit && (
            <span className="text-sm ml-1 font-bold text-gray-500 uppercase">
              {unit}
            </span>
          )}
        </h4>
        <p className="text-sm -mt-1 font-bold text-gray-800">{label}</p>
      </div>
      <p className="text-xs text-gray-400 mt-2 font-medium uppercase tracking-wider">
        {subtext}
      </p>
    </div>
  );
};

export default StatCard;
