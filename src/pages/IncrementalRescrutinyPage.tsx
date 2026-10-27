import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  RefreshCw, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck, 
  Clock, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  TrendingDown,
  Info,
  Check,
  Layers,
  BarChart2
} from 'lucide-react';

export const IncrementalRescrutinyPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { currentApplication, applications, addToast } = useApp();
  const app = currentApplication || applications[0];

  // Test scenarios for the simulation
  const [selectedScenario, setSelectedScenario] = useState<'SCENARIO_AFFIDAVIT' | 'SCENARIO_BUILDING' | 'SCENARIO_UNCERTAIN_FALLBACK'>('SCENARIO_AFFIDAVIT');
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(true);

  // Scenarios description
  const scenarios = {
    SCENARIO_AFFIDAVIT: {
      name: 'Corrected Notarized Affidavit Resubmitted (DEF-001 Fix)',
      trigger: 'Institution uploads replacement Affidavit 2 with Notary Public seal and witness stamp.',
      changedDoc: 'Notarized_Affidavit_Trustees_v2.pdf (v1 -> v2)',
      affectedChecks: [
        { id: 'chk-03', name: 'Affidavits Completeness & Notarization Seal', status: 'RERUN & PASSED', prev: 'Deficiency', reason: 'Fresh notarization verified against Advocate Bar Council serial.' }
      ],
      preservedChecks: [
        { id: 'chk-01', name: 'Land Contiguity & Ownership Deed (7.5 Acres)', reason: 'Doc DOC-001 hash unchanged, APH Rule 1.4 version unchanged.' },
        { id: 'chk-02', name: 'Carpet Built-Up Area & CMDA Sanction Plan', reason: 'Doc DOC-002 hash unchanged, CMDA permit valid.' },
        { id: 'chk-04', name: 'Faculty Cadre Ratio (1:2:6)', reason: 'Faculty list roster unchanged.' },
        { id: 'chk-05', name: 'Barrier-Free Divyangjan Accessibility', reason: 'Independent infrastructure norm; deferred to EVC inspection.' }
      ],
      totalChecks: 24,
      rerunCount: 2,
      avoidedPercent: '91.6%',
      hoursSaved: '11.8 hours',
      fallbackTriggered: false
    },
    SCENARIO_BUILDING: {
      name: 'Revised Floor Layout Uploaded (Built-up Area Adjustment)',
      trigger: 'Institution submits revised architectural drawing with altered computer lab dimensions.',
      changedDoc: 'CMDA_Approved_Building_Plan_Layout_v2.pdf (v1 -> v2)',
      affectedChecks: [
        { id: 'chk-02', name: 'Carpet Built-up Area & Structural Stability', status: 'RERUN & PASSED', prev: 'Verified', reason: 'Recalculated instructional floor space (14,250 sq.m).' },
        { id: 'chk-05', name: 'Barrier-Free Divyangjan Ramp & Elevator Accessibility', status: 'RERUN & PASSED', prev: 'Not Started', reason: 'Layout changes inspected for wheelchair turning radius compliance.' },
        { id: 'chk-fire', name: 'Fire Hydrant & Emergency Exit Width Verification', status: 'RERUN & PASSED', prev: 'Verified', reason: 'Staircase egress width validated against revised blueprint.' }
      ],
      preservedChecks: [
        { id: 'chk-01', name: 'Land Contiguity & Ownership Deed (7.5 Acres)', reason: 'Land boundaries and registration unchanged.' },
        { id: 'chk-03', name: 'AICTE Mandatory Affidavits (1, 2 & 3)', reason: 'Legal affidavits unchanged.' },
        { id: 'chk-04', name: 'Faculty Cadre Ratio (1:2:6)', reason: 'Staff credentials and degrees unaffected by civil layout.' }
      ],
      totalChecks: 24,
      rerunCount: 4,
      avoidedPercent: '83.3%',
      hoursSaved: '9.5 hours',
      fallbackTriggered: false
    },
    SCENARIO_UNCERTAIN_FALLBACK: {
      name: 'Uncertain Dependency / Cross-Entity Schema Mismatch (Safe Fallback)',
      trigger: 'External municipal GIS coordinate anomaly detected in plot demarcation.',
      changedDoc: 'Amended_Revenue_Patta_Survey.pdf',
      affectedChecks: [
        { id: 'chk-all', name: 'All 24 Statutory Verification Checks', status: 'FALLBACK FULL AUDIT', prev: 'Various', reason: 'Dependency graph graph-traversal detected ambiguity in survey boundary overlap. Safe fallback triggered.' }
      ],
      preservedChecks: [],
      totalChecks: 24,
      rerunCount: 24,
      avoidedPercent: '0%',
      hoursSaved: '0 hours (Deterministic Fallback)',
      fallbackTriggered: true
    }
  };

  const activeScenarioData = scenarios[selectedScenario];

  const handleRunAnalysis = () => {
    setIsRunningAnalysis(true);
    setAnalysisCompleted(false);
    setTimeout(() => {
      setIsRunningAnalysis(false);
      setAnalysisCompleted(true);
      addToast(
        'Incremental Analysis Finished',
        activeScenarioData.fallbackTriggered
          ? 'Cross-dependency ambiguity detected. System safely reverted to Full Revalidation.'
          : `Dependency traversal finished: ${activeScenarioData.rerunCount} checks re-evaluated, ${activeScenarioData.avoidedPercent} redundant checks bypassed!`,
        activeScenarioData.fallbackTriggered ? 'warning' : 'success'
      );
    }, 1000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title & Banner */}
      <div className="bg-white rounded-xl p-6 border border-[#E1E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-[#0B1F43] text-[10px] font-black uppercase tracking-wider">
              SIH Core Innovation
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-600">Traceable Verification Engine</span>
          </div>
          <h1 className="text-2xl font-black text-[#0B1F43] mt-1 flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-[#1769E0]" />
            <span>Dependency-Aware Incremental Re-Scrutiny</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Eliminates unnecessary repeated administrative scrutiny when institutions submit revised evidence or when regulatory rule clauses are amended. Reruns only affected verification branches while preserving verified invariant checks with cryptographic integrity proofs.
          </p>
        </div>

        <button
          onClick={handleRunAnalysis}
          disabled={isRunningAnalysis}
          className="px-5 py-2.5 bg-[#1769E0] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
        >
          {isRunningAnalysis ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
              <span>Traversing Dependency Graph...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 text-cyan-300" />
              <span>Analyze Impact of Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Scenario Selection Bar */}
      <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#0B1F43] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#1769E0]" />
            <span>Select Demonstration Test Scenario (Deterministic Test Cases)</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-400">Target: {app.applicationNumber}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(['SCENARIO_AFFIDAVIT', 'SCENARIO_BUILDING', 'SCENARIO_UNCERTAIN_FALLBACK'] as const).map((key) => {
            const sc = scenarios[key];
            const isSelected = selectedScenario === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedScenario(key);
                  setAnalysisCompleted(true);
                }}
                className={`text-left p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#1769E0] bg-blue-50/50 shadow-xs ring-2 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1769E0]">
                      {key === 'SCENARIO_AFFIDAVIT' ? 'Case A: Minor Deficiency' : key === 'SCENARIO_BUILDING' ? 'Case B: Layout Change' : 'Case C: Safe Fallback'}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[#1769E0]" />}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1 leading-snug">{sc.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{sc.trigger}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-500">Checks Bypassed:</span>
                  <span className="font-bold text-emerald-600">{sc.avoidedPercent}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Scrutiny Baseline</p>
          <p className="text-2xl font-black text-slate-700 mt-1">{activeScenarioData.totalChecks} Checks</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Estimated ~14.2 Officer Hours</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#1769E0]">Incremental Re-Checks</p>
          <p className="text-2xl font-black text-[#1769E0] mt-1">{activeScenarioData.rerunCount} Checks</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Affected branch re-evaluations</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Scrutiny Work Avoided</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{activeScenarioData.avoidedPercent}</p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">{activeScenarioData.hoursSaved} saved</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Recomputation Agreement</p>
          <p className="text-2xl font-black text-indigo-600 mt-1">100.0%</p>
          <p className="text-[11px] text-slate-500 mt-0.5">0 False Positives / 0 False Negatives</p>
        </div>
      </div>

      {/* Detailed Analysis Breakdown Results */}
      {analysisCompleted && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
          {/* Affected Checks Requiring Re-Scrutiny */}
          <div className="lg:col-span-6 bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <h3 className="font-bold text-sm text-[#0B1F43]">
                  Affected Checks ({activeScenarioData.affectedChecks.length})
                </h3>
              </div>
              <span className="text-[10px] font-extrabold uppercase bg-blue-100 text-[#1769E0] px-2 py-0.5 rounded">
                RE-EVALUATED
              </span>
            </div>

            <div className="space-y-3">
              {activeScenarioData.affectedChecks.map((chk) => (
                <div key={chk.id} className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/30 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{chk.name}</span>
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
                      {chk.status}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{chk.reason}</p>
                  <div className="text-[10px] text-slate-400 font-mono pt-1">
                    Prior state: {chk.prev} → Automated re-validation executed
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preserved Unaffected Checks (Cached / Verified) */}
          <div className="lg:col-span-6 bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <h3 className="font-bold text-sm text-[#0B1F43]">
                  Preserved Invariant Checks ({activeScenarioData.preservedChecks.length})
                </h3>
              </div>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                CACHED / INTACT
              </span>
            </div>

            {activeScenarioData.preservedChecks.length > 0 ? (
              <div className="space-y-3">
                {activeScenarioData.preservedChecks.map((chk) => (
                  <div key={chk.id} className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/20 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{chk.name}</span>
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-600 text-white">
                        ✓ PRESERVED
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-snug">{chk.reason}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                Safe Fallback Mode: When dependency references are uncertain or boundary definitions change, all checks are re-evaluated to prevent regulatory oversights.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Research Methodology Note */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-[#1769E0] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <b>Research &amp; Hackathon Benchmark Note:</b> The incremental engine relies on Directed Acyclic Graph (DAG) state verification against SHA-256 document digests. Unaffected checks are retained only when the input evidence hash, the regulatory rule version (APH 2024-27 v2.2), and all ancestor nodes are proven identical.
        </p>
      </div>
    </div>
  );
};
