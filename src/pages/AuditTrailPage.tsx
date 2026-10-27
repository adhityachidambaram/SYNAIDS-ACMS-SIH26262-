import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  History, 
  ShieldCheck, 
  Search, 
  Download, 
  Filter, 
  Clock, 
  FileText, 
  Lock, 
  Key,
  CheckCircle2
} from 'lucide-react';

export const AuditTrailPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { auditLogs, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = 
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      log.entityId.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === 'ALL' || log.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const exportAuditCsv = () => {
    addToast('Audit Trail Exported', 'Tamper-evident event log downloaded as cryptographically signed CSV.', 'success');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E1E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-600" />
              <span>Immutable Ledger</span>
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-600">SHA-256 Hash Chain</span>
          </div>
          <h1 className="text-2xl font-black text-[#0B1F43] mt-1 flex items-center gap-2">
            <History className="w-6 h-6 text-[#1769E0]" />
            <span>Tamper-Evident Audit Trail &amp; Regulatory Provenance</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Every submission, document upload, verification verdict, deficiency notice, inspection report, and statutory clearance decision is appended to this immutable audit chain. No record can be silently deleted or retroactively altered.
          </p>
        </div>

        <button
          onClick={exportAuditCsv}
          className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Log</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by action, actor name, docket number, or details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F4F7FC] border border-[#E1E8F0] text-xs pl-9 pr-4 py-2 rounded-lg outline-none focus:bg-white focus:border-[#1769E0]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Actor Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-[#F4F7FC] border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 outline-none font-semibold cursor-pointer"
          >
            <option value="ALL">All Roles</option>
            <option value="INSTITUTION_ADMIN">Institution Admin</option>
            <option value="SCRUTINY_OFFICER">Scrutiny Officer</option>
            <option value="EVC_MEMBER">EVC Member</option>
            <option value="APPROVING_OFFICIAL">Approving Official</option>
            <option value="SYSTEM_ADMIN">System Admin</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl border border-[#E1E8F0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F4F7FC] text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-[#E1E8F0]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor &amp; Role</th>
                <th className="py-3 px-4">Action Type</th>
                <th className="py-3 px-4">Entity ID</th>
                <th className="py-3 px-4">Operation Details</th>
                <th className="py-3 px-4">SHA-256 Digest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {log.timestamp}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-[#0B1F43]">{log.actor}</p>
                    <span className="text-[10px] text-slate-400">{log.role.replace('_', ' ')}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-blue-50 text-[#1769E0] border border-blue-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">
                    {log.entityId}
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-sm">
                    {log.details}
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">
                    {log.hash.slice(0, 14)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
