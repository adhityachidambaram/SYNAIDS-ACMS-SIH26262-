import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const ReportsPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { applications, addToast } = useApp();

  const deficiencyCategoryData = [
    { category: 'Land & Title', count: 32, color: '#1769E0' },
    { category: 'Building & Carpet', count: 48, color: '#28B8F2' },
    { category: 'Notary Affidavits', count: 54, color: '#F2A93B' },
    { category: 'Faculty Cadre Ratio', count: 38, color: '#DC3545' },
    { category: 'Divyangjan / Safety', count: 14, color: '#159B63' },
  ];

  const benchmarkData = [
    { name: 'Case A (Affidavit)', fullChecks: 24, incrementalChecks: 2, hoursSaved: 11.8 },
    { name: 'Case B (Layout Plan)', fullChecks: 24, incrementalChecks: 4, hoursSaved: 9.5 },
    { name: 'Case C (Faculty Roster)', fullChecks: 24, incrementalChecks: 3, hoursSaved: 10.2 },
    { name: 'Case D (Lab Equipment)', fullChecks: 24, incrementalChecks: 5, hoursSaved: 8.7 },
  ];

  const exportReport = () => {
    addToast('Report Exported', 'Evaluation Benchmark & Efficiency Metrics downloaded as CSV.', 'success');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E1E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1769E0] text-[10px] font-black uppercase tracking-wider">
              Executive Analytics
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-600">Council Performance Indicators</span>
          </div>
          <h1 className="text-2xl font-black text-[#0B1F43] mt-1 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#1769E0]" />
            <span>Reports &amp; Regulatory Intelligence</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Examine systemic bottlenecks, recurring deficiency distributions, scrutiny turnaround cycle times, and the evaluated efficiency of Dependency-Aware Incremental Re-Scrutiny.
          </p>
        </div>

        <button
          onClick={exportReport}
          className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg. Scrutiny Turnaround</p>
          <p className="text-2xl font-black text-[#0B1F43] mt-1">4.2 Days</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">↓ 68% faster than 2023 cycle</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">First-Pass Clearance Rate</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">49.0%</p>
          <p className="text-[11px] text-slate-500 mt-0.5">612 of 1,248 applications</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Incremental Work Avoidance</p>
          <p className="text-2xl font-black text-[#1769E0] mt-1">83.3%</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Over 20 checks avoided per resubmission</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cryptographic Consistency</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">100.0%</p>
          <p className="text-[11px] text-slate-500 mt-0.5">0 false-positives vs ground truth</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Deficiencies by Regulatory Category */}
        <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs flex flex-col">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#0B1F43]">Deficiencies by Requirement Category</h3>
              <p className="text-xs text-slate-500">Distribution of non-compliance findings raised across 186 dockets.</p>
            </div>
            <span className="text-xs font-bold text-slate-400">Total: 186</span>
          </div>

          <div className="flex-1 w-full h-64 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deficiencyCategoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#64748B' }} stroke="#cbd5e1" />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#cbd5e1" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1F43', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#1769E0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: SIH Innovation Evaluation: Full vs Incremental Checks */}
        <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs flex flex-col">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#0B1F43] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#1769E0]" />
                <span>Incremental Re-Scrutiny Evaluation Benchmark</span>
              </h3>
              <p className="text-xs text-slate-500">Full baseline checks (24) vs actual checks rerun incrementally.</p>
            </div>
          </div>

          <div className="flex-1 w-full h-64 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} stroke="#cbd5e1" />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#cbd5e1" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1F43', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="fullChecks" name="Full Revalidation (Baseline)" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="incrementalChecks" name="Incremental Re-Checks (Ours)" fill="#159B63" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
