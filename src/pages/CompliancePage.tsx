import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  UploadCloud, 
  FileText, 
  Calendar, 
  Filter, 
  ChevronRight,
  ExternalLink,
  Plus
} from 'lucide-react';
import { ComplianceObligation } from '../types';

export const CompliancePage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { complianceList, submitComplianceEvidence, addToast } = useApp();
  const [filter, setFilter] = useState<string>('ALL');
  const [selectedObligation, setSelectedObligation] = useState<ComplianceObligation | null>(null);
  const [uploadFileName, setUploadFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const filtered = filter === 'ALL' 
    ? complianceList 
    : complianceList.filter((c) => c.status === filter);

  const getStatusBadge = (status: ComplianceObligation['status']) => {
    switch (status) {
      case 'Completed':
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Completed</span>;
      case 'Due Soon':
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">Due Soon</span>;
      case 'Overdue':
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">Overdue</span>;
      case 'Awaiting Review':
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1769E0]">Awaiting Review</span>;
      default:
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">Pending</span>;
    }
  };

  const handleSimulateUpload = () => {
    if (!selectedObligation) return;
    setIsUploading(true);
    setTimeout(() => {
      submitComplianceEvidence(
        selectedObligation.id,
        `${selectedObligation.title.slice(0, 15).replace(/\s+/g, '_')}_Evidence_2026.pdf`
      );
      setIsUploading(false);
      setSelectedObligation(null);
    }, 700);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E1E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-black uppercase tracking-wider">
              Continuous Governance
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-600">Post-Approval Regulatory Lifecycle</span>
          </div>
          <h1 className="text-2xl font-black text-[#0B1F43] mt-1 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-teal-600" />
            <span>Post-Approval Compliance Register</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Approval is not a one-time event. ACMS continuously tracks post-clearance statutory obligations including annual mandatory disclosures, faculty salary bank audits, and accreditation milestones.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/app/roeg-graph')}
          className="px-4 py-2 bg-[#1769E0] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
        >
          <span>View on ROEG Graph</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Obligations</p>
          <p className="text-2xl font-black text-[#0B1F43] mt-1">{complianceList.length}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Statutory monitoring active</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Completed &amp; Cleared</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {complianceList.filter((c) => c.status === 'Completed').length}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Valid evidentiary proofs</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Due Within 30 Days</p>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {complianceList.filter((c) => c.status === 'Due Soon').length}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Reminders dispatched</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Overdue Obligations</p>
          <p className="text-2xl font-black text-rose-600 mt-1">
            {complianceList.filter((c) => c.status === 'Overdue').length}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Subject to penalty clauses</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
        <span className="font-bold text-slate-400 uppercase text-[10px] mr-1">Filter By:</span>
        {['ALL', 'Due Soon', 'Pending', 'Completed', 'Awaiting Review'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              filter === status
                ? 'bg-[#0B1F43] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Obligation Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-5 border border-[#E1E8F0] hover:border-slate-300 shadow-xs transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold text-slate-400">{item.id}</span>
                {getStatusBadge(item.status)}
              </div>
              <h3 className="font-bold text-sm text-[#0B1F43] mt-1.5 leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{item.institutionName}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold text-[10px] uppercase">Statutory Rule:</span>
                <span className="font-mono text-slate-700 font-semibold text-[11px]">{item.ruleClause}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold text-[10px] uppercase">Assigned Owner:</span>
                <span className="text-slate-700 font-medium">{item.assignedOwner}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold text-[10px] uppercase">Statutory Deadline:</span>
                <span className="font-bold text-rose-600">{item.dueDate}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">Ref: {item.applicationRef}</span>
              {item.status !== 'Completed' ? (
                <button
                  onClick={() => setSelectedObligation(item)}
                  className="px-3 py-1.5 bg-[#1769E0] hover:bg-blue-700 text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1 shadow-xs"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload Compliance Evidence</span>
                </button>
              ) : (
                <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Proof Verified</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Upload Evidence Modal */}
      {selectedObligation && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-[#0B1F43]">Submit Statutory Compliance Evidence</h3>
                <p className="text-xs text-slate-500">{selectedObligation.title}</p>
              </div>
              <button
                onClick={() => setSelectedObligation(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl text-center bg-slate-50/60">
              <UploadCloud className="w-8 h-8 text-[#1769E0] mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800">Attach certified report / audited roster PDF</p>
              <p className="text-[10px] text-slate-400 mt-1">Supported: PDF up to 15 MB</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedObligation(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSimulateUpload}
                disabled={isUploading}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isUploading ? 'Validating Hash...' : 'Upload & Certify'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
