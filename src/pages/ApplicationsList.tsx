import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Search, 
  Download, 
  Plus, 
  Building2, 
  ChevronRight, 
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { ApplicationStatus } from '../types';

interface ApplicationsListProps {
  onNavigate: (route: string) => void;
}

export const ApplicationsList: React.FC<ApplicationsListProps> = ({ onNavigate }) => {
  const { applications, setCurrentApplicationId, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      app.applicationNumber.toLowerCase().includes(search.toLowerCase()) ||
      app.institutionName.toLowerCase().includes(search.toLowerCase()) ||
      app.district.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || app.currentStage === statusFilter;
    const matchesType = typeFilter === 'ALL' || app.applicationType.includes(typeFilter);

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (stage: ApplicationStatus) => {
    switch (stage) {
      case 'Under Scrutiny':
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1769E0]">Under Scrutiny</span>;
      case 'Documents Verified':
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">Documents Verified</span>;
      case 'Deficiency Raised':
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">Deficiency Raised</span>;
      case 'Approved':
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Approved</span>;
      case 'Ready for Decision':
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">Ready for Decision</span>;
      case 'EVC Scheduled':
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">EVC Scheduled</span>;
      default:
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">{stage}</span>;
    }
  };

  const exportCsv = () => {
    const headers = 'Application No,Institution,Type,State,Academic Year,Stage,Assigned Officer,Last Updated\n';
    const rows = filteredApplications.map(a => 
      `"${a.applicationNumber}","${a.institutionName}","${a.applicationType}","${a.state}","${a.academicYear}","${a.currentStage}","${a.assignedOfficer}","${a.lastUpdated}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ACMS_Applications_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    addToast('CSV Export Ready', `${filteredApplications.length} records exported successfully.`, 'success');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0B1F43]">Application Management Register</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track and process regulatory approval dockets across all AICTE technical disciplines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCsv}
            className="px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => onNavigate('/app/new-application')}
            className="px-4 py-2 bg-[#1769E0] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Application</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by application number, college name, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F4F7FC] border border-[#E1E8F0] text-xs pl-9 pr-4 py-2 rounded-lg outline-none focus:bg-white focus:border-[#1769E0]"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Stage:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#F4F7FC] border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 outline-none font-semibold cursor-pointer"
            >
              <option value="ALL">All Stages</option>
              <option value="Under Scrutiny">Under Scrutiny</option>
              <option value="Documents Verified">Documents Verified</option>
              <option value="Deficiency Raised">Deficiency Raised</option>
              <option value="Approved">Approved</option>
              <option value="Ready for Decision">Ready for Decision</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#F4F7FC] border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 outline-none font-semibold cursor-pointer"
            >
              <option value="ALL">All Types</option>
              <option value="New Institute">New Institute</option>
              <option value="Extension">Extension (EoA)</option>
              <option value="Increase">Increase in Intake</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Data Table */}
      <div className="bg-white rounded-xl border border-[#E1E8F0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F4F7FC] text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-[#E1E8F0]">
              <tr>
                <th className="py-3.5 px-4">Application ID</th>
                <th className="py-3.5 px-4">Institution Name</th>
                <th className="py-3.5 px-4">Type &amp; AY</th>
                <th className="py-3.5 px-4">Submission Date</th>
                <th className="py-3.5 px-4">Current Stage</th>
                <th className="py-3.5 px-4">Assigned Officer</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApplications.map((app) => (
                <tr 
                  key={app.id}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  onClick={() => {
                    setCurrentApplicationId(app.id);
                    onNavigate('/app/scrutiny');
                  }}
                >
                  <td className="py-3.5 px-4 font-bold text-[#0B1F43]">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#1769E0]" />
                      <span>{app.applicationNumber}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-800">{app.institutionName}</p>
                    <span className="text-[10px] text-slate-400">{app.district}, {app.state}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-slate-700">{app.applicationType.split('/')[0]}</p>
                    <span className="text-[10px] text-slate-400">AY: {app.academicYear}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    {app.submissionDate}
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(app.currentStage)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {app.assignedOfficer}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentApplicationId(app.id);
                        onNavigate('/app/scrutiny');
                      }}
                      className="px-3 py-1 bg-slate-100 hover:bg-[#1769E0] text-slate-700 hover:text-white rounded-md text-[11px] font-semibold transition-colors"
                    >
                      Open Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredApplications.length} of {applications.length} applications</span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-400 hover:text-slate-600 disabled:opacity-50" disabled>
              Previous
            </button>
            <span className="px-2.5 py-1 bg-blue-50 text-[#1769E0] font-bold rounded">1</span>
            <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
