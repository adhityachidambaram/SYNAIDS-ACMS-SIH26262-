import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Layers, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  Send, 
  Check, 
  X, 
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import { EvcCase } from '../types';

export const EvcManagement: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { applications, submitEvcReport, addToast } = useApp();

  // Find apps with EVC cases or prepare default EVC case for XYZ College / ABC Tech
  const appWithEvc = applications.find((a) => a.evcCase) || applications[1];
  const evc = appWithEvc.evcCase || {
    id: 'evc-demo',
    applicationId: appWithEvc.id,
    applicationRef: appWithEvc.applicationNumber,
    institutionName: appWithEvc.institutionName,
    address: appWithEvc.address,
    scheduledDate: '2025-09-28',
    scheduledTime: '10:00 AM IST',
    mode: 'Physical On-Site',
    coordinatorName: 'Prof. S. Sharma',
    committeeMembers: [
      { name: 'Prof. S. Sharma', role: 'Chairman', institution: 'IIT Delhi' },
      { name: 'Prof. Anjali Deshmukh', role: 'Subject Expert (IT)', institution: 'COEP Tech University' },
      { name: 'Er. R. K. Patwardhan', role: 'Architect Expert', institution: 'Council of Architecture Nominee' }
    ],
    status: 'Scheduled',
    checklist: [
      { id: 'c1', category: 'Physical Infrastructure', item: 'Verification of Additional Computer Labs (120 terminals)', compliant: true, observations: 'Pre-check completed; cabling and air-conditioning verified.' },
      { id: 'c2', category: 'Library & Learning Resources', item: 'IEEE Xplore / ScienceDirect Digital Subscriptions', compliant: true, observations: 'Active institutional IP subscription confirmed.' },
      { id: 'c3', category: 'Safety & Environment', item: 'Fire Hydrant Coverage & Municipal NOC', compliant: null, observations: 'Pending on-site pump discharge test.' },
      { id: 'c4', category: 'Divyangjan Facilities', item: 'Braille Signage & Elevator Accessibility', compliant: null, observations: 'To be physically inspected on visit day.' }
    ]
  };

  const [checklist, setChecklist] = useState(evc.checklist);
  const [recommendation, setRecommendation] = useState(
    'The Expert Visit Committee, upon physical verification of the instructional area, computer laboratories, and faculty documentation, recommends grant of approval subject to standard APH 2024-27 norms.'
  );
  const [outcomeVerdict, setOutcomeVerdict] = useState<'RECOMMENDED' | 'CONDITIONAL' | 'DEFICIENT'>('RECOMMENDED');

  const handleToggleCheck = (id: string, compliantVal: boolean) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, compliant: compliantVal } : item))
    );
  };

  const handleObservationChange = (id: string, obs: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, observations: obs } : item))
    );
  };

  const handleSubmitEvc = () => {
    submitEvcReport(evc.id, checklist, recommendation);
    onNavigate('/app/approvals');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E1E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1769E0] text-[10px] font-black uppercase tracking-wider">
              On-Site Regulatory Verification
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-600">Physical Campus Audit</span>
          </div>
          <h1 className="text-2xl font-black text-[#0B1F43] mt-1 flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#1769E0]" />
            <span>Expert Visit Committee (EVC) Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Coordinate peer inspection teams, record verifiable laboratory and safety observations, evaluate Divyangjan infrastructure, and submit cryptographically sealed EVC reports directly to the Regional Approval Committee.
          </p>
        </div>

        <button
          onClick={handleSubmitEvc}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Sign &amp; Submit EVC Report</span>
        </button>
      </div>

      {/* Case Overview Card */}
      <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-[10px] font-bold uppercase text-slate-400">Target Institution</span>
            <p className="font-bold text-sm text-[#0B1F43] mt-0.5">{evc.institutionName}</p>
            <p className="text-slate-500 mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{evc.address}</span>
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-[10px] font-bold uppercase text-slate-400">Scheduled Visit</span>
            <p className="font-bold text-sm text-slate-800 mt-0.5">{evc.scheduledDate}</p>
            <p className="text-slate-500 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{evc.scheduledTime} ({evc.mode})</span>
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-[10px] font-bold uppercase text-slate-400">Committee Chairman</span>
            <p className="font-bold text-sm text-slate-800 mt-0.5">{evc.coordinatorName}</p>
            <p className="text-slate-500 mt-1">Professor &amp; Dean, IIT Delhi</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-[10px] font-bold uppercase text-slate-400">EVC Report Status</span>
            <p className="font-bold text-sm text-[#1769E0] mt-0.5">{evc.status}</p>
            <p className="text-slate-500 mt-1">{evc.checklist.length} Checkpoints Assigned</p>
          </div>
        </div>

        {/* Assigned Committee Members */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-4 flex-wrap text-xs">
          <span className="font-bold text-slate-400 uppercase text-[10px]">EVC Delegation:</span>
          {evc.committeeMembers.map((m, idx) => (
            <div key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-blue-50/60 rounded-full text-slate-700 font-medium">
              <Users className="w-3 h-3 text-[#1769E0]" />
              <span className="font-bold text-[#0B1F43]">{m.name}</span>
              <span className="text-[11px] text-slate-500">({m.role} • {m.institution})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive 4-12 point Inspection Checklist */}
      <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-sm text-[#0B1F43]">Standard EVC Inspection Checklist (APH 2024-27)</h3>
            <p className="text-xs text-slate-500">Record verification findings on physical infrastructure and statutory equipment.</p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            {checklist.filter((c) => c.compliant === true).length} of {checklist.length} Verified Compliant
          </span>
        </div>

        <div className="space-y-3">
          {checklist.map((item, index) => (
            <div key={item.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-200 transition-all bg-slate-50/30 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1769E0]">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 mt-0.5">{item.item}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleCheck(item.id, true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      item.compliant === true
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Compliant</span>
                  </button>
                  <button
                    onClick={() => handleToggleCheck(item.id, false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      item.compliant === false
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Deficient</span>
                  </button>
                </div>
              </div>

              {/* Committee Observations */}
              <div className="pl-9">
                <input
                  type="text"
                  placeholder="Record on-site observations, equipment serials, and bandwidth speed-test logs..."
                  value={item.observations}
                  onChange={(e) => handleObservationChange(item.id, e.target.value)}
                  className="w-full bg-white border border-slate-200 text-xs px-3 py-1.5 rounded-lg outline-none focus:border-[#1769E0]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Committee Formal Recommendation Box */}
      <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[#0B1F43]">EVC Formal Recommendation &amp; Conclusion</h3>

        <div className="flex items-center gap-3">
          {(['RECOMMENDED', 'CONDITIONAL', 'DEFICIENT'] as const).map((verdict) => (
            <button
              key={verdict}
              onClick={() => setOutcomeVerdict(verdict)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                outcomeVerdict === verdict
                  ? verdict === 'RECOMMENDED'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : verdict === 'CONDITIONAL'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {verdict === 'RECOMMENDED' ? '✓ Recommended for Approval' : verdict === 'CONDITIONAL' ? '⚠️ Conditional Clearance' : '✕ Rejection Recommended'}
            </button>
          ))}
        </div>

        <textarea
          rows={3}
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value)}
          className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-[#1769E0] text-xs p-3 rounded-lg outline-none resize-none"
        />

        <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-500" />
            Report submission automatically notifies the Regional Approving Authority.
          </span>
          <button
            onClick={handleSubmitEvc}
            className="px-6 py-2.5 bg-[#1769E0] hover:bg-blue-700 text-white rounded-lg font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>Submit Report &amp; Advance Application</span>
          </button>
        </div>
      </div>
    </div>
  );
};
