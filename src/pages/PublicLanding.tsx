import React from 'react';
import { AicteEmblem, NationalEmblemIndia } from '../components/common/AicteLogo';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Search, 
  AlertCircle, 
  Layers, 
  Network, 
  RefreshCw, 
  History, 
  Lock, 
  Users, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { UserRole } from '../types';

interface PublicLandingProps {
  onEnterApp: (role?: UserRole) => void;
}

export const PublicLanding: React.FC<PublicLandingProps> = ({ onEnterApp }) => {
  const workflowSteps = [
    { num: 1, title: 'Institution Submission', desc: '5-step structured application with program intake and legal declarations.' },
    { num: 2, title: 'Completeness Checks', desc: 'Automated OCR tokenization, revenue deed parsing, and format validation.' },
    { num: 3, title: 'Officer Scrutiny', desc: 'Three-column workspace comparing extracted evidence against APH 2024-27 norms.' },
    { num: 4, title: 'Deficiency Resolution', desc: 'Direct issue logging and replacement evidence re-scrutiny.' },
    { num: 5, title: 'EVC On-Site Audit', desc: 'Peer visiting committee physical infrastructure & lab bandwidth evaluation.' },
    { num: 6, title: 'Authorized Decision', desc: 'Regional approving officer generates official digital approval orders.' },
    { num: 7, title: 'Continuous Compliance', desc: 'Post-clearance tracking of mandatory disclosures and faculty audits.' }
  ];

  const features = [
    { title: 'Application Lifecycle Management', icon: FileText, desc: 'Centralized submission tracking across New Institutes, EoA, and intake enhancements.' },
    { title: 'Document Verification Assistance', icon: Search, desc: 'Deterministic OCR metadata extraction for land titles, CMDA plans, and affidavits.' },
    { title: 'Deficiency Tracking & Resolution', icon: AlertCircle, desc: 'Defect notice issuance with institution response and replacement evidence resubmission.' },
    { title: 'EVC Peer Coordination', icon: Layers, desc: 'On-site committee scheduling, checklists, observation records, and formal reporting.' },
    { title: 'ROEG Evidence Graph', icon: Network, desc: 'Semantic provenance graph linking regulatory rules, evidence documents, and checks.' },
    { title: 'Incremental Re-Scrutiny Engine', icon: RefreshCw, desc: 'DAG-based dependency engine rerunning only affected checks on document updates.' },
    { title: 'Continuous Compliance', icon: ShieldCheck, desc: 'Post-approval monitoring of faculty biometric audits, anti-ragging, and disclosures.' },
    { title: 'Tamper-Evident Audit Trails', icon: History, desc: 'Immutable SHA-256 cryptographic chaining of all administrative and executive events.' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#152544] flex flex-col">
      {/* Top Government Navigation Header */}
      <header className="bg-white border-b border-[#E1E8F0] sticky top-0 z-50 px-6 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NationalEmblemIndia size={38} />
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <AicteEmblem size={38} />
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-extrabold text-base tracking-tight text-[#0B1F43]">ACMS</span>
                <span className="text-xs text-slate-500 font-medium hidden md:inline">
                  AICTE Approval &amp; Compliance Management System
                </span>
              </div>
              <p className="text-[10px] text-[#1769E0] font-bold tracking-wide">
                Quality Education • Transparent Approvals • Stronger Institutions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onEnterApp('SCRUTINY_OFFICER')}
              className="px-4 py-2 bg-[#1769E0] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Explore Prototype Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-[#F4F7FC] pt-16 pb-20 px-6 border-b border-[#E1E8F0]">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-[#1769E0] text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart India Hackathon (SIH) Prototype Proposal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-[#0B1F43] tracking-tight leading-[1.15]">
            One Platform. Transparent Approvals.<br />Continuous Compliance.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            ACMS brings application scrutiny, document verification, deficiency resolution, approval tracking, and post-approval compliance into one traceable digital workflow.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onEnterApp('SCRUTINY_OFFICER')}
              className="px-6 py-3.5 rounded-xl bg-[#0B1F43] hover:bg-slate-900 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <span>Launch Officer Dashboard</span>
              <ArrowRight className="w-4 h-4 text-cyan-300" />
            </button>
            <button
              onClick={() => onEnterApp('INSTITUTION_ADMIN')}
              className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-[#1769E0] hover:bg-blue-50/50 text-[#0B1F43] text-xs font-bold transition-all shadow-xs flex items-center gap-2"
            >
              <span>Institution Portal</span>
              <ExternalLink className="w-4 h-4 text-[#1769E0]" />
            </button>
          </div>

          {/* Quick Role Direct Access Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Instant Role Access:</span>
            <button
              onClick={() => onEnterApp('INSTITUTION_ADMIN')}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-[#1769E0] font-semibold text-[11px]"
            >
              🏫 Institution Admin
            </button>
            <button
              onClick={() => onEnterApp('SCRUTINY_OFFICER')}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-[#1769E0] font-semibold text-[11px]"
            >
              📋 Scrutiny Officer
            </button>
            <button
              onClick={() => onEnterApp('EVC_MEMBER')}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-[#1769E0] font-semibold text-[11px]"
            >
              🔍 EVC Committee
            </button>
            <button
              onClick={() => onEnterApp('APPROVING_OFFICIAL')}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-[#1769E0] font-semibold text-[11px]"
            >
              🏛️ Approving Authority
            </button>
          </div>
        </div>
      </section>

      {/* Visual Workflow Pipeline Section */}
      <section className="py-16 px-6 bg-white border-b border-[#E1E8F0]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1769E0] bg-blue-50 px-2.5 py-1 rounded-full">
              End-to-End Governance
            </span>
            <h2 className="text-2xl font-black text-[#0B1F43]">The Unified ACMS Regulatory Pipeline</h2>
            <p className="text-xs text-slate-500">
              Traceable flow from applicant submission to post-clearance monitoring with human-in-the-loop executive sign-off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.slice(0, 4).map((s) => (
              <div key={s.num} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 relative">
                <span className="w-7 h-7 rounded-full bg-[#1769E0] text-white flex items-center justify-center text-xs font-bold">
                  {s.num}
                </span>
                <h3 className="font-bold text-sm text-[#0B1F43] mt-2">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {workflowSteps.slice(4).map((s) => (
              <div key={s.num} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="w-7 h-7 rounded-full bg-[#0B1F43] text-white flex items-center justify-center text-xs font-bold">
                  {s.num}
                </span>
                <h3 className="font-bold text-sm text-[#0B1F43] mt-2">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Innovation & Feature Cards */}
      <section className="py-16 px-6 bg-[#F4F7FC]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-[#0B1F43]">Core Architectural Pillars</h2>
            <p className="text-xs text-slate-500">
              Engineered to replace fragmented portals with a high-integrity, automated evidence-driven architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center mb-3">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-[#0B1F43]">{f.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mandatory Prototype Disclaimer Footer */}
      <footer className="mt-auto bg-[#0B1F43] text-white pt-12 pb-8 px-6 border-t border-[#1769E0]/20">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <AicteEmblem size={40} />
              <div>
                <h4 className="text-base font-bold text-white">ACMS</h4>
                <p className="text-xs text-slate-300">AICTE Approval &amp; Compliance Management System</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
              <button onClick={() => onEnterApp('SCRUTINY_OFFICER')} className="hover:text-white transition-colors">
                Dashboard
              </button>
              <button onClick={() => onEnterApp('INSTITUTION_ADMIN')} className="hover:text-white transition-colors">
                Applications
              </button>
              <button onClick={() => onEnterApp('APPROVING_OFFICIAL')} className="hover:text-white transition-colors">
                Decisions
              </button>
            </div>
          </div>

          {/* Prompt Mandatory Disclaimer Box */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed text-center max-w-4xl mx-auto">
            <p className="font-semibold text-cyan-300 mb-1">Prototype Evaluation Disclaimer:</p>
            <p>
              “ACMS is a proposed demonstration platform developed for academic and hackathon evaluation. It is not an official AICTE portal and does not represent an authorized integration with AICTE systems.”
            </p>
          </div>

          <div className="text-center text-[11px] text-slate-400">
            Smart India Hackathon Prototype • Developed with high-fidelity React, TypeScript &amp; Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
};
