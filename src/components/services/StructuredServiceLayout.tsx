import React, { useState } from 'react';
import { Card, CardContent } from '@bettergov/kapwa/card';
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  Users,
  FileText,
  ArrowRight,
  Edit3,
  ShieldCheck,
} from 'lucide-react';

export interface StructuredServiceData {
  title: string;
  categoryName: string;
  serviceNo?: string;
  transactionType?: string;
  officialData?: boolean;
  whoMayAvail: string;
  processingTime: string;
  whoCanApply: string;
  classification: string;
  dataIntegrity: {
    status: string;
    source: string;
  };
  responsibleOffices: {
    name: string;
    link?: string;
  }[];
  fees: {
    name: string;
    amount: string;
  }[];
  requirements: {
    name: string;
    whereToSecure: string;
  }[];
  steps: string[];
}

interface Props {
  data: StructuredServiceData;
}

export const StructuredServiceLayout: React.FC<Props> = ({ data }) => {
  const [feesExpanded, setFeesExpanded] = useState(true);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
      {/* Left Column */}
      <div className="flex-1 space-y-6 w-full">
        {/* Header Card */}
        <Card className="border border-emerald-100/50 shadow-sm overflow-hidden bg-white/70 backdrop-blur-md">
          <CardContent className="p-8">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wider">
                {data.categoryName}
              </span>
              {data.transactionType && (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1.5"></span>
                  {data.transactionType}
                </span>
              )}
              {data.officialData && (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1.5"></span>
                  OFFICIAL (CC)
                </span>
              )}
              {data.serviceNo && (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-50 text-gray-600 border border-gray-200 uppercase tracking-wider">
                  {data.serviceNo}
                </span>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {data.title}
            </h1>

            <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4 flex gap-3 text-sm">
              <span className="font-semibold text-blue-600 mt-0.5">
                Who may avail:
              </span>
              <span className="text-gray-700">{data.whoMayAvail}</span>
            </div>
          </CardContent>
        </Card>

        {/* 3 Small Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-gray-100 shadow-sm bg-white/70 backdrop-blur-md">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="mt-1 text-blue-500 bg-blue-50 p-2 rounded-lg">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                  Processing Time
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {data.processingTime}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 shadow-sm bg-white/70 backdrop-blur-md">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="mt-1 text-blue-500 bg-blue-50 p-2 rounded-lg">
                <Users size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                  Who can apply
                </p>
                <p className="text-sm font-bold text-gray-900 leading-snug">
                  {data.whoCanApply}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 shadow-sm bg-white/70 backdrop-blur-md">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="mt-1 text-blue-500 bg-blue-50 p-2 rounded-lg">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                  Classification
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {data.classification}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fees Section */}
        <Card className="border border-gray-100 shadow-sm overflow-hidden bg-white/70 backdrop-blur-md">
          <div
            className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50/50 transition-colors"
            onClick={() => setFeesExpanded(!feesExpanded)}
          >
            <div className="flex items-center gap-4">
              <div className="text-blue-500 bg-blue-50 p-2 rounded-lg">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M12 12h.01" />
                  <path d="M17 12h.01" />
                  <path d="M7 12h.01" />
                </svg>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                  Fees
                </p>
                {data.fees.length > 0 && (
                  <p className="text-sm font-bold text-gray-900">
                    {data.fees[0].amount}
                  </p>
                )}
              </div>
            </div>
            {feesExpanded ? (
              <ChevronUp className="text-gray-400" />
            ) : (
              <ChevronDown className="text-gray-400" />
            )}
          </div>

          {feesExpanded && (
            <div className="bg-gray-50/50 border-t border-gray-100 p-5 px-6">
              {data.fees.length > 0 ? (
                <ul className="space-y-3">
                  {data.fees.map((fee, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center text-sm border-b border-gray-200/50 pb-2 last:border-0 last:pb-0"
                    >
                      <span className="text-gray-600">{fee.name}</span>
                      <span className="font-bold text-gray-900">
                        {fee.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No fees required.
                </p>
              )}
            </div>
          )}
        </Card>

        {/* Requirements Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2 ml-1">
            <FileText size={18} className="text-blue-400" />
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold">
              Requirements
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.requirements.map((req, i) => (
              <Card
                key={i}
                className="border border-gray-100 shadow-sm bg-white/70 backdrop-blur-md"
              >
                <CardContent className="p-5 flex items-start gap-4 h-full">
                  <div className="mt-0.5 text-blue-500 opacity-60">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1 leading-snug">
                      {req.name}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      <span className="text-gray-400 mr-1">from:</span>
                      {req.whereToSecure}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How To Apply Section */}
        <div className="space-y-4 mt-8">
          <div className="flex items-center gap-3 mb-4 ml-1">
            <ShieldCheck size={18} className="text-blue-400" />
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold">
              How to Apply
            </h3>
          </div>

          <Card className="border border-gray-100 shadow-sm bg-white/70 backdrop-blur-md overflow-hidden">
            <div className="p-0">
              {data.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-blue-200 bg-blue-50 text-blue-600 font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="py-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Right Column / Sidebar */}
      <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
        {/* Data Integrity */}
        <Card className="border border-emerald-200 shadow-sm overflow-hidden bg-white">
          <div className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                Data Integrity
              </h3>
              <CheckCircle size={16} className="text-emerald-500" />
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-emerald-500">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  {data.dataIntegrity.status}
                </h4>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {data.dataIntegrity.source}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Responsible Offices */}
        <Card className="border border-gray-100 shadow-sm bg-white">
          <div className="p-5">
            <div className="flex gap-2 items-center mb-4 text-blue-500">
              <Users size={16} />
              <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">
                Responsible Offices
              </h3>
            </div>

            {data.responsibleOffices.map((office, idx) => (
              <div key={idx} className="mb-3 last:mb-0">
                <h4 className="text-sm font-bold text-gray-900 leading-snug mb-2">
                  {office.name}
                </h4>
                {office.link && (
                  <a
                    href={office.link}
                    className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wide"
                  >
                    View Profile <ArrowRight size={12} className="ml-1" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Help Data */}
        <Card className="border border-gray-100 shadow-sm bg-white">
          <div className="p-5">
            <div className="flex gap-3 items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900">
                Help improve this data
              </h3>
            </div>

            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Find an error or outdated info? Our community helps keep this
              portal accurate.
            </p>

            <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg transition-colors">
              <Edit3 size={14} /> Suggest an Edit
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
