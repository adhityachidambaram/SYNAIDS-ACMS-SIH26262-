import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  FileText, 
  Building2, 
  Award, 
  Calendar, 
  UserCheck, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { AicteEmblem } from '../components/common/AicteLogo';

export const ApprovalsPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { applications, recordDecision, currentApplication, setCurrentApplicationId, addToast } = useApp();

  const app = currentApplication || applications[0];
  const [decisionType, setDecisionType] = useState<'Approved' | 'Rejected' | 'Returned for Correction'>('Approved');
  const [reason, setReason] = useState(
    'Based on satisfactory Scrutiny Report, 100% verification of statutory land & infrastructure norms, resolution of deficiency DEF-001, and favorable EVC peer committee recommendation.'
  );
  const [confirmed, setConfirmed] = useState(false);

  const handleExecuteDecision = () => {
    if (!confirmed) {
      addToast('Confirmation Required', 'Please check the statutory confirmation box to record this decision.', 'warning');
      return;
    }

    recordDecision(app.id, decisionType, reason);
    onNavigate('/app/compliance');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E1E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
              Statutory Authority
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-600">Final Regulatory Clearance</span>
          </div>
          <h1 className="text-2xl font-black text-[#0B1F43] mt-1 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <span>Authorized Decision &amp; Approval Order Bureau</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Authorized regional officers and member secretaries review comprehensive scrutiny findings, EVC inspection reports, and resolved deficiencies before executing formal statutory orders.
          </p>
        </div>

        {/* Application Selector */}
        <select
          value={app.id}
          onChange={(e) => setCurrentApplicationId(e.target.value)}
          className="text-xs font-bold bg-[#F4F7FC] border border-slate-300 rounded-lg px-3 py-2 text-[#0B1F43] outline-none"
        >
          {applications.map((a) => (
            <option key={a.id} value={a.id}>
              {a.applicationNumber} — {a.institutionName} ({a.currentStage})
            </option>
          ))}
        </select>
      </div>

      {/* Dossier Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Scrutiny Outcome */}
        <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-[#0B1F43]">1. Scrutiny Bureau Verdict</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <p className="text-xs text-slate-600">
            Assigned Officer: <b>{app.assignedOfficer}</b>
          </p>
          <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200 text-xs text-emerald-900">
            ✓ 5 of 5 Required documents uploaded and verified against APH 2024-27 norms.
          </div>
        </div>

        {/* EVC Inspection */}
        <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-[#0B1F43]">2. EVC Peer Inspection</span>
            <span className="w-2 h-2 rounded-full bg-blue-500" />
          </div>
          <p className="text-xs text-slate-600">
            Committee Head: <b>Prof. S. Sharma (IIT Delhi)</b>
          </p>
          <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-200 text-xs text-blue-900">
            ✓ Physical infrastructure, computer labs, and safety compliance recommended.
          </div>
        </div>

        {/* Deficiencies Status */}
        <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-[#0B1F43]">3. Deficiency Notices</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </div>
          <p className="text-xs text-slate-600">
            Open Deficiencies: <b>{app.deficiencies?.filter((d) => d.status === 'Open').length || 0}</b>
          </p>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
            All procedural deficiencies marked as resolved with replacement evidence.
          </div>
        </div>
      </div>

      {/* Decision Recording Console */}
      <div className="bg-white rounded-xl p-7 border border-[#E1E8F0] shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0B1F43]">Record Statutory Clearance Decision</h2>
            <p className="text-xs text-slate-500">This action writes an immutable audit record and triggers digital order generation.</p>
          </div>
          <span className="text-xs font-bold text-slate-400">Target: {app.applicationNumber}</span>
        </div>

        {/* Decision Radio Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setDecisionType('Approved')}
            className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
              decisionType === 'Approved'
                ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-100'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900">Grant Approval (EoA / New)</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Issues 3-year approval order and activates compliance monitoring.</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setDecisionType('Returned for Correction')}
            className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
              decisionType === 'Returned for Correction'
                ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-100'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <RotateCcw className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900">Return for Correction</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Permits institution 14 days to submit amended evidence.</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setDecisionType('Rejected')}
            className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
              decisionType === 'Rejected'
                ? 'border-rose-600 bg-rose-50/40 ring-2 ring-rose-100'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900">Reject Application</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Statutory rejection with detailed legal grounds.</p>
            </div>
          </button>
        </div>

        {/* Reason / Executive Order Notes */}
        <div>
          <label className="block text-xs font-bold text-[#0B1F43] mb-1">
            Recorded Grounds &amp; Executive Rationale <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-[#1769E0] text-xs p-3.5 rounded-lg outline-none resize-none leading-relaxed"
          />
        </div>

        {/* Digital Signature Confirmation */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 rounded text-[#1769E0]"
            />
            <span className="text-slate-700 leading-relaxed">
              <b>Statutory Sign-Off:</b> I, Dr. V. Nair (Regional Officer &amp; Member Secretary), certify that the complete application dossier, automated verification checks, and EVC findings have been examined according to the AICTE Act 1987. I hereby affix my authorized electronic signature to this decision.
            </span>
          </label>
        </div>

        {/* Submit */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            SIH Demonstration Prototype • Cryptographically Linked
          </span>
          <button
            onClick={handleExecuteDecision}
            className={`px-7 py-3 rounded-xl text-xs font-bold text-white transition-all shadow-md flex items-center gap-2 ${
              decisionType === 'Approved'
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : decisionType === 'Rejected'
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Execute Statutory Order ({decisionType})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
