import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Building2, 
  FileCheck2, 
  Layers, 
  ShieldCheck, 
  Settings, 
  Sparkles, 
  RotateCcw,
  Check,
  ChevronRight,
  Info,
  Compass
} from 'lucide-react';

interface RoleSwitcherBannerProps {
  onNavigate: (route: string) => void;
}

export const RoleSwitcherBanner: React.FC<RoleSwitcherBannerProps> = ({ onNavigate }) => {
  const { currentUser, setRole, resetAllDemoData } = useApp();
  const [showTourModal, setShowTourModal] = useState(false);

  const roles: { role: UserRole; label: string; icon: any; color: string }[] = [
    { role: 'INSTITUTION_ADMIN', label: '1. Institution Admin', icon: Building2, color: 'text-sky-600' },
    { role: 'SCRUTINY_OFFICER', label: '2. Scrutiny Officer', icon: FileCheck2, color: 'text-indigo-600' },
    { role: 'EVC_MEMBER', label: '3. EVC Committee', icon: Layers, color: 'text-amber-600' },
    { role: 'APPROVING_OFFICIAL', label: '4. Approving Authority', icon: ShieldCheck, color: 'text-emerald-600' },
    { role: 'SYSTEM_ADMIN', label: '5. System Admin', icon: Settings, color: 'text-purple-600' },
  ];

  const tourSteps = [
    {
      step: 1,
      role: 'INSTITUTION_ADMIN' as UserRole,
      title: 'Submit Application & Run OCR',
      route: '/app/new-application',
      description: 'Fill the 5-step form, upload sample Land & Building plans, and inspect real-time OCR metadata extraction.'
    },
    {
      step: 2,
      role: 'SCRUTINY_OFFICER' as UserRole,
      title: 'Scrutiny & Raise Deficiency',
      route: '/app/scrutiny',
      description: 'Review extracted OCR fields, verify against APH norms, and raise a deficiency on missing Notary witness seals.'
    },
    {
      step: 3,
      role: 'INSTITUTION_ADMIN' as UserRole,
      title: 'Resolve Deficiency & Resubmit',
      route: '/app/deficiencies',
      description: 'View deficiency notice DEF-001, upload corrected affidavit evidence, and submit response.'
    },
    {
      step: 4,
      role: 'SCRUTINY_OFFICER' as UserRole,
      title: 'Incremental Re-Scrutiny Engine',
      route: '/app/rescrutiny',
      description: 'Analyze impact: witness how unaffected checks (Land, CMDA layout) stay preserved/cached while only affected checks rerun.'
    },
    {
      step: 5,
      role: 'EVC_MEMBER' as UserRole,
      title: 'On-Site EVC Inspection',
      route: '/app/evc',
      description: 'Evaluate physical campus readiness, verify computer center bandwidth, and submit EVC report.'
    },
    {
      step: 6,
      role: 'APPROVING_OFFICIAL' as UserRole,
      title: 'Grant Authorized Approval Decision',
      route: '/app/approvals',
      description: 'Review unified dossier, scrutiny sign-offs, and generate official digital AICTE approval order.'
    },
    {
      step: 7,
      role: 'INSTITUTION_ADMIN' as UserRole,
      title: 'Post-Approval Continuous Compliance',
      route: '/app/compliance',
      description: 'Track bi-annual disclosures, faculty roster audits, and anti-ragging commitments.'
    },
    {
      step: 8,
      role: 'SCRUTINY_OFFICER' as UserRole,
      title: 'ROEG Evidence & Obligation Graph',
      route: '/app/roeg-graph',
      description: 'Explore the full interactive dependency network connecting rules, evidence, checks, and decisions.'
    }
  ];

  return (
    <>
      <div className="bg-[#0B1F43] text-white px-4 py-2 border-b border-[#1769E0]/30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Label */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-bold tracking-wide text-cyan-300 uppercase text-[10px] flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> SIH Evaluation Control:
            </span>
            <span className="text-slate-300 hidden sm:inline text-[11px]">
              Switch role to experience complete multi-actor regulatory lifecycle:
            </span>
          </div>

          {/* Role pills */}
          <div className="flex items-center flex-wrap gap-1.5">
            {roles.map((item) => {
              const isSelected = currentUser.role === item.role;
              return (
                <button
                  key={item.role}
                  onClick={() => setRole(item.role)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#1769E0] text-white ring-2 ring-cyan-400/50 shadow-sm'
                      : 'bg-white/10 hover:bg-white/20 text-slate-200'
                  }`}
                >
                  <item.icon className="w-3 h-3" />
                  <span>{item.label}</span>
                  {isSelected && <Check className="w-3 h-3 text-cyan-300" />}
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTourModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-500 hover:bg-cyan-400 text-[#0B1F43] font-bold text-[11px] transition-colors shadow-xs"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Demo Tour</span>
            </button>
            <button
              onClick={resetAllDemoData}
              title="Reset sample applications to initial state"
              className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Demo Tour Guide Modal */}
      {showTourModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#1769E0] flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1F43]">ACMS SIH Evaluation Journey</h3>
                  <p className="text-xs text-slate-500">End-to-End regulatory approval & compliance lifecycle</p>
                </div>
              </div>
              <button
                onClick={() => setShowTourModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {tourSteps.map((s) => (
                <div
                  key={s.step}
                  className="p-3 rounded-xl border border-slate-200 hover:border-[#1769E0] hover:bg-blue-50/40 transition-all flex items-start justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#0B1F43] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {s.step}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#1769E0] transition-colors">
                          {s.title}
                        </h4>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                          {s.role.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">{s.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setRole(s.role);
                      onNavigate(s.route);
                      setShowTourModal(false);
                    }}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-[#1769E0] text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <span>Jump</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-blue-500" />
                All changes persist to localStorage throughout the session.
              </span>
              <button
                onClick={() => setShowTourModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
