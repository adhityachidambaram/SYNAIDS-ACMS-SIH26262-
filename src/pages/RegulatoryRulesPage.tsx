import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  GitCompare, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

export const RegulatoryRulesPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { rules } = useApp();
  const [selectedRuleId, setSelectedRuleId] = useState<string>(rules[0]?.id || 'rule-aph-2024-v2.2');
  const [showDiffModal, setShowDiffModal] = useState(false);

  const selectedRule = rules.find((r) => r.id === selectedRuleId) || rules[0];

  const ruleRequirements = [
    { code: 'APH Clause 1.4', name: 'Land Ownership & Contiguity', standard: '5.0 Acres (Metro/Mega) or 7.5 Acres (Rural/Urban)', status: 'Active' },
    { code: 'APH Clause 2.3', name: 'Instructional Built-up Carpet Area', standard: 'Minimum 11,200 sq.m for 360 seat engineering intake', status: 'Active' },
    { code: 'APH Clause 3.2', name: 'Computer Center Bandwidth & Lab Workstations', standard: '1:4 Student-Computer Ratio with 1 Gbps Leased Line', status: 'Active' },
    { code: 'APH Clause 5.6', name: 'Barrier-Free Divyangjan Accessibility', standard: 'Wheelchair ramps, Braille lift signage, and dedicated restrooms', status: 'Active' },
    { code: 'APH Clause 7.1', name: 'Faculty Cadre Ratio', standard: '1 Professor : 2 Associate Professors : 6 Assistant Professors', status: 'Active' },
    { code: 'APH Clause 10.4', name: 'Mandatory Disclosure & Fee Regulations', standard: 'Public fee disclosure; zero capitation fees', status: 'Active' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E1E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider">
              Statutory Norms Register
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-600">Approval Process Handbook (APH)</span>
          </div>
          <h1 className="text-2xl font-black text-[#0B1F43] mt-1 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <span>Regulatory Rule &amp; Handbook Versioning</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            All verification checks and scrutiny determinations are bound to immutable, versioned regulatory rule definitions. When handbook clauses amend, the incremental re-scrutiny engine pinpoints dependent checks across all active applications.
          </p>
        </div>

        <button
          onClick={() => setShowDiffModal(true)}
          className="px-4 py-2 bg-[#1769E0] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
        >
          <GitCompare className="w-4 h-4" />
          <span>Compare APH v2.2 vs v2.1</span>
        </button>
      </div>

      {/* Rules Selector Pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {rules.map((rule) => {
          const isSelected = selectedRule.id === rule.id;
          return (
            <button
              key={rule.id}
              onClick={() => setSelectedRuleId(rule.id)}
              className={`px-4 py-2.5 rounded-xl text-left border-2 transition-all shrink-0 ${
                isSelected
                  ? 'border-[#1769E0] bg-blue-50/60 shadow-xs ring-2 ring-blue-100'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0B1F43]">{rule.code}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  rule.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {rule.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">{rule.handbookVersion}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Rule Specifications */}
      <div className="bg-white rounded-xl p-6 border border-[#E1E8F0] shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#1769E0]">{selectedRule.code}</span>
            <span className="text-xs text-slate-400">Effective from: {selectedRule.effectiveDate}</span>
          </div>
          <h2 className="text-lg font-bold text-[#0B1F43] mt-1">{selectedRule.title}</h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{selectedRule.description}</p>
        </div>

        {/* Requirements Table */}
        <div>
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#0B1F43] mb-3">
            Statutory Norms &amp; Requirement Clauses ({ruleRequirements.length})
          </h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F4F7FC] text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Clause Reference</th>
                  <th className="py-3 px-4">Requirement Area</th>
                  <th className="py-3 px-4">Prescribed Standard Norm</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ruleRequirements.map((req, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-[#1769E0]">{req.code}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{req.name}</td>
                    <td className="py-3 px-4 text-slate-600">{req.standard}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Handbook Diff Modal */}
      {showDiffModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-[#1769E0]" />
                <h3 className="font-bold text-base text-[#0B1F43]">APH Handbook Version Comparison (Diff)</h3>
              </div>
              <button
                onClick={() => setShowDiffModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs max-h-[60vh] overflow-y-auto pr-1">
              <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200 space-y-2">
                <span className="font-bold text-[#1769E0] block">Amendment 1: Hybrid EVC Inspections (Clause 8.3)</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 bg-white rounded border border-rose-200 text-slate-600">
                    <span className="text-[10px] font-bold text-rose-700 block uppercase">v2.1 Previous:</span>
                    Mandatory physical on-site inspection for all extension of approval (EoA) cases regardless of NIRF ranking.
                  </div>
                  <div className="p-2 bg-white rounded border border-emerald-200 text-slate-800 font-medium">
                    <span className="text-[10px] font-bold text-emerald-700 block uppercase">v2.2 Current:</span>
                    Autonomous institutions with NAAC A++ / NIRF Top 100 eligible for digital hybrid document scrutiny.
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200 space-y-2">
                <span className="font-bold text-[#1769E0] block">Amendment 2: Flexible Emerging Areas Intake (Clause 4.7)</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 bg-white rounded border border-rose-200 text-slate-600">
                    <span className="text-[10px] font-bold text-rose-700 block uppercase">v2.1 Previous:</span>
                    Hard cap of 60 seats for introduction of new AI/ML or Cyber Security specializations.
                  </div>
                  <div className="p-2 bg-white rounded border border-emerald-200 text-slate-800 font-medium">
                    <span className="text-[10px] font-bold text-emerald-700 block uppercase">v2.2 Current:</span>
                    Intake expandable up to 180 seats subject to verified 1:15 faculty ratio and 1 Gbps dedicated pipe.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowDiffModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
