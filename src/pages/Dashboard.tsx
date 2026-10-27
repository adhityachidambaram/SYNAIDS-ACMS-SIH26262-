import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Building2, 
  Clock, 
  Calendar, 
  Bell, 
  FileCheck, 
  CheckCircle, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { UPCOMING_TASKS_DATA, ANNOUNCEMENTS_DATA } from '../data/mockData';

interface DashboardProps {
  onNavigate: (route: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { applications, setCurrentApplicationId, academicYear } = useApp();
  const [trendPeriod, setTrendPeriod] = useState<'This Year' | 'Last 6 Months'>('This Year');

  // Trend data for the line chart
  const trendData = [
    { month: 'Jan', count: 48 },
    { month: 'Feb', count: 75 },
    { month: 'Mar', count: 120 },
    { month: 'Apr', count: 115 },
    { month: 'May', count: 130 },
    { month: 'Jun', count: 165 },
  ];

  // Donut chart status breakdown matching mockup
  const pieData = [
    { name: 'Approved', value: 612, color: '#159B63', percentage: '49%' },
    { name: 'Under Scrutiny', value: 342, color: '#1769E0', percentage: '27%' },
    { name: 'Deficiencies', value: 186, color: '#F2A93B', percentage: '15%' },
    { name: 'Rejected', value: 108, color: '#DC3545', percentage: '9%' },
  ];

  const getStatusBadge = (stage: string) => {
    switch (stage) {
      case 'Under Scrutiny':
        return <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1769E0]">Under Scrutiny</span>;
      case 'Documents Verified':
        return <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-700">Documents Verified</span>;
      case 'Deficiency Raised':
        return <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700">Deficiency Raised</span>;
      case 'Approved':
        return <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Approved</span>;
      case 'Ready for Decision':
        return <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700">Ready for Decision</span>;
      default:
        return <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">{stage}</span>;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* 1. Hero Banner matching reference image */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B1F43] via-[#10326A] to-[#1769E0] text-white p-7 shadow-lg border border-white/10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-medium text-cyan-200 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>AICTE Approval & Compliance Management System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            ACMS
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-200 mt-1">
            AICTE Approval & Compliance Management System
          </p>
          <p className="text-xs sm:text-sm text-cyan-100/90 mt-2 font-medium flex flex-wrap items-center gap-2">
            <span>Streamlining Approvals</span>
            <span>•</span>
            <span>Ensuring Compliance</span>
            <span>•</span>
            <span>Building Quality Education</span>
          </p>
        </div>

        {/* Backdrop Graphic / Building Stylized Silhouette */}
        <div className="absolute right-0 top-0 bottom-0 w-2/5 opacity-25 mix-blend-luminosity pointer-events-none hidden md:block">
          <svg viewBox="0 0 400 200" className="w-full h-full object-cover">
            <rect x="50" y="40" width="80" height="160" fill="#FFFFFF" />
            <rect x="140" y="20" width="120" height="180" fill="#E2E8F0" />
            <rect x="270" y="60" width="90" height="140" fill="#FFFFFF" />
            {/* Windows */}
            {[0, 1, 2, 3].map((row) => (
              <g key={row}>
                <rect x="70" y={60 + row * 25} width="15" height="15" fill="#0B1F43" />
                <rect x="160" y={40 + row * 25} width="20" height="15" fill="#0B1F43" />
                <rect x="200" y={40 + row * 25} width="20" height="15" fill="#0B1F43" />
                <rect x="290" y={80 + row * 25} width="15" height="15" fill="#0B1F43" />
              </g>
            ))}
            {/* Pillars */}
            <circle cx="200" cy="18" r="10" fill="#F59E0B" />
          </svg>
        </div>
      </div>

      {/* 2. Four Stat Cards matching reference image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Applications */}
        <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              12% This Year
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Total Applications</p>
            <p className="text-2xl font-bold text-[#0B1F43] mt-0.5">1,248</p>
          </div>
        </div>

        {/* Card 2: Under Scrutiny */}
        <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              8% This Month
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Under Scrutiny</p>
            <p className="text-2xl font-bold text-[#0B1F43] mt-0.5">342</p>
          </div>
        </div>

        {/* Card 3: Deficiencies Raised */}
        <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              5% This Month
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Deficiencies Raised</p>
            <p className="text-2xl font-bold text-[#0B1F43] mt-0.5">186</p>
          </div>
        </div>

        {/* Card 4: Approved */}
        <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              15% This Year
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Approved</p>
            <p className="text-2xl font-bold text-[#0B1F43] mt-0.5">612</p>
          </div>
        </div>
      </div>

      {/* 3. Middle Grid: Charts and Recent Applications + Right Side Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Application Status Donut + Trend Line + Recent Applications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Application Status (2024-25) Donut */}
            <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-[#0B1F43]">Application Status (2024-25)</h3>
                <span className="text-[11px] font-semibold text-slate-400">Total: 1,248</span>
              </div>
              <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-4 py-4">
                <div className="relative w-44 h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={52}
                        outerRadius={74}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl font-black text-[#0B1F43]">1,248</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Total</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-slate-600 font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-slate-800">
                        {item.value} <span className="text-slate-400 font-normal">({item.percentage})</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Applications Trend */}
            <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-[#0B1F43]">Applications Trend</h3>
                <select
                  value={trendPeriod}
                  onChange={(e) => setTrendPeriod(e.target.value as any)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-600 outline-none font-medium cursor-pointer"
                >
                  <option value="This Year">This Year</option>
                  <option value="Last 6 Months">Last 6 Months</option>
                </select>
              </div>

              <div className="flex-1 w-full h-48 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#cbd5e1" />
                    <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#cbd5e1" domain={[0, 200]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B1F43', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                      itemStyle={{ color: '#28B8F2' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#1769E0"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#1769E0' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Applications Table matching reference mockup */}
          <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
              <h3 className="font-bold text-sm text-[#0B1F43]">Recent Applications</h3>
              <button
                onClick={() => onNavigate('/app/applications')}
                className="text-xs font-semibold text-[#1769E0] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {applications.slice(0, 4).map((app) => (
                <div
                  key={app.id}
                  onClick={() => {
                    setCurrentApplicationId(app.id);
                    onNavigate('/app/scrutiny');
                  }}
                  className="py-3 px-2 flex items-center justify-between hover:bg-slate-50/80 rounded-lg transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1769E0] flex items-center justify-center shrink-0 group-hover:bg-[#1769E0] group-hover:text-white transition-colors">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#0B1F43]">{app.applicationNumber}</span>
                        <span className="text-[11px] text-slate-400">• {app.applicationType.split('/')[0]}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">{app.institutionName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {getStatusBadge(app.currentStage)}
                    <span className="text-[11px] text-slate-400 hidden sm:inline">{app.lastUpdated}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#1769E0] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Tasks + Announcements matching mockup */}
        <div className="space-y-6">
          {/* Upcoming Tasks Panel */}
          <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-[#0B1F43]">Upcoming Tasks</h3>
              <button 
                onClick={() => onNavigate('/app/scrutiny')}
                className="text-xs font-semibold text-[#1769E0] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-3 space-y-3">
              {UPCOMING_TASKS_DATA.map((task) => (
                <div
                  key={task.id}
                  onClick={() => {
                    if (task.id === 't1') onNavigate('/app/evc');
                    else if (task.id === 't2') onNavigate('/app/deficiencies');
                    else if (task.id === 't3') onNavigate('/app/evc');
                    else onNavigate('/app/approvals');
                  }}
                  className="p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <FileCheck className={`w-4 h-4 ${task.iconColor}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate group-hover:text-[#1769E0] transition-colors">
                        {task.title}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{task.institution}</p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-bold shrink-0 ${
                    task.timing === 'Today' ? 'text-rose-600' : 'text-[#1769E0]'
                  }`}>
                    {task.timing}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements Panel matching mockup */}
          <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-[#0B1F43]">Announcements</h3>
              <button 
                onClick={() => onNavigate('/app/regulatory-rules')}
                className="text-xs font-semibold text-[#1769E0] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-3 space-y-3">
              {ANNOUNCEMENTS_DATA.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigate('/app/regulatory-rules')}
                  className="p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-slate-50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-[#1769E0] flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 leading-snug group-hover:text-[#1769E0] transition-colors">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIH Proposed Feature Highlights Callout */}
          <div className="bg-gradient-to-br from-blue-900 to-[#0B1F43] rounded-xl p-4 text-white shadow-sm border border-blue-400/20">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>ROEG & Rescrutiny Active</span>
            </div>
            <p className="text-[11px] text-slate-200 leading-relaxed">
              Dependency-aware incremental re-scrutiny analyzes evidence changes and reruns only affected verification checks.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => onNavigate('/app/roeg-graph')}
                className="flex-1 py-1.5 px-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B1F43] font-bold text-xs transition-colors text-center"
              >
                View ROEG Graph
              </button>
              <button
                onClick={() => onNavigate('/app/rescrutiny')}
                className="flex-1 py-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors text-center"
              >
                Impact Engine
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
