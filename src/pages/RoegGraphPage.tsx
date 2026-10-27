import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Network, 
  Layers, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Building2, 
  Search, 
  Filter, 
  ArrowRight,
  Info,
  Calendar,
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface RoegNode {
  id: string;
  type: 'RULE' | 'REQUIREMENT' | 'APPLICATION' | 'EVIDENCE' | 'CHECK' | 'DEFICIENCY' | 'EVC' | 'DECISION' | 'COMPLIANCE';
  label: string;
  sub: string;
  status: 'valid' | 'warning' | 'deficiency' | 'pending' | 'active';
  x: number;
  y: number;
  metadata: Record<string, string>;
  dependencies: string[]; // Connected Node IDs
}

export const RoegGraphPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { currentApplication, applications, setCurrentApplicationId } = useApp();
  const [selectedNode, setSelectedNode] = useState<RoegNode | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const app = currentApplication || applications[0];

  // Graph nodes mapped dynamically to the active application
  const nodes: RoegNode[] = [
    {
      id: 'node-rule-1',
      type: 'RULE',
      label: 'APH 2024–27 v2.2',
      sub: 'Statutory Norms Regulation',
      status: 'active',
      x: 60,
      y: 180,
      metadata: {
        'Gazette Ref': 'AICTE/REG/2024/APH-01',
        'Effective Date': '2024-11-01',
        'Enforcing Authority': 'AICTE Council',
        'Scope': 'Technical Institutes Nationwide'
      },
      dependencies: ['node-req-land', 'node-req-bld', 'node-req-fac']
    },
    {
      id: 'node-req-land',
      type: 'REQUIREMENT',
      label: 'Clause 1.4: Contiguous Land',
      sub: 'Minimum 5.0 Acres Metro/Mega',
      status: 'valid',
      x: 280,
      y: 80,
      metadata: {
        'Mandatory Area': '5.0 Acres (Contiguous)',
        'Permitted Tenure': 'Registered Ownership / 99-Yr Lease',
        'Encumbrance': 'Zero Non-Encumbrance Certificate Required'
      },
      dependencies: ['node-ev-land', 'node-chk-land']
    },
    {
      id: 'node-req-bld',
      type: 'REQUIREMENT',
      label: 'Clause 2.3: Built-Up Carpet',
      sub: 'Instructional & Amenities Area',
      status: 'valid',
      x: 280,
      y: 220,
      metadata: {
        'Sanction Authority': 'Competent Municipal / CMDA Authority',
        'Floor Space Index (FSI)': 'Compliant with TNCDBR 2019',
        'Structural Fitness': 'Registered Chartered Structural Engineer'
      },
      dependencies: ['node-ev-bld', 'node-chk-bld']
    },
    {
      id: 'node-req-fac',
      type: 'REQUIREMENT',
      label: 'Clause 7.1: Faculty Cadre Ratio',
      sub: 'Cadre 1:2:6 / Ratio 1:15',
      status: 'warning',
      x: 280,
      y: 360,
      metadata: {
        'Cadre Distribution': '1 Prof : 2 Assoc : 6 Asst Prof',
        'Qualification Norm': 'Ph.D for Professors / Associate Prof',
        'Selection Committee': 'AICTE Nominee Presence Mandated'
      },
      dependencies: ['node-ev-fac', 'node-chk-fac']
    },
    {
      id: 'node-ev-land',
      type: 'EVIDENCE',
      label: 'Land Ownership Deed v1',
      sub: 'Doc #DOC-001 (7.5 Acres)',
      status: 'valid',
      x: 520,
      y: 80,
      metadata: {
        'Issuing Authority': 'Sub-Registrar Chennai South',
        'Registered Book': 'Book 1, Volume 412, S.No 451/2A',
        'Hash Digest': 'e3b0c44298fc1c149afbf4c8996fb92427ae',
        'OCR Extraction': 'Confidence: 98%'
      },
      dependencies: ['node-chk-land']
    },
    {
      id: 'node-ev-bld',
      type: 'EVIDENCE',
      label: 'CMDA Building Plan v1',
      sub: 'Doc #DOC-002 (14,250 sq.m)',
      status: 'valid',
      x: 520,
      y: 220,
      metadata: {
        'Sanction Permit': 'CMDA/REG/2022/BLD/00918',
        'Total Built-Up Area': '14,250 sq. meters',
        'Structural Fitness': 'Valid',
        'OCR Extraction': 'Confidence: 96%'
      },
      dependencies: ['node-chk-bld']
    },
    {
      id: 'node-ev-fac',
      type: 'EVIDENCE',
      label: 'Notarized Affidavits (1, 2, 3)',
      sub: 'Doc #DOC-003 (Affidavit 2 Defect)',
      status: 'deficiency',
      x: 520,
      y: 360,
      metadata: {
        'Defect Notice': 'DEF-2025-001 Issued',
        'Reason': 'Notary seal faint; missing witness stamp on p.4',
        'Due Date': '2025-10-10'
      },
      dependencies: ['node-def-1', 'node-chk-fac']
    },
    {
      id: 'node-chk-land',
      type: 'CHECK',
      label: 'Automated Land Norm Check',
      sub: 'Status: PASS (7.5 > 5.0 Acres)',
      status: 'valid',
      x: 750,
      y: 80,
      metadata: {
        'Rule Evaluated': 'APH 2024-27 Clause 1.4',
        'Engine': 'Deterministic Semantic Verifier',
        'Execution Timestamp': '2025-09-14 11:10 AM'
      },
      dependencies: ['node-dec-app']
    },
    {
      id: 'node-chk-bld',
      type: 'CHECK',
      label: 'Carpet Area Compliance Check',
      sub: 'Status: PASS (14,250 sq.m)',
      status: 'valid',
      x: 750,
      y: 220,
      metadata: {
        'Rule Evaluated': 'APH 2024-27 Clause 2.3',
        'Instructional Ratio': 'Satisfies 360 seat requirement'
      },
      dependencies: ['node-evc-visit', 'node-dec-app']
    },
    {
      id: 'node-def-1',
      type: 'DEFICIENCY',
      label: 'DEF-001: Missing Notary Stamp',
      sub: 'Affidavit 2 Execution Block',
      status: 'deficiency',
      x: 750,
      y: 360,
      metadata: {
        'Severity': 'Major Regulatory Blunder',
        'Action Required': 'Upload re-executed affidavit by 10 Oct 2025',
        'Officer': 'Dr. R. Kumar'
      },
      dependencies: ['node-comp-post']
    },
    {
      id: 'node-evc-visit',
      type: 'EVC',
      label: 'EVC On-Site Inspection',
      sub: 'Expert Visiting Committee',
      status: 'pending',
      x: 980,
      y: 150,
      metadata: {
        'Committee Head': 'Prof. S. Sharma (IIT Delhi)',
        'Checklist Items': '12 Core Lab & Safety Norms',
        'Physical Verification': 'Campus infrastructure audit'
      },
      dependencies: ['node-dec-app']
    },
    {
      id: 'node-dec-app',
      type: 'DECISION',
      label: 'Authorized Approval Order',
      sub: 'Regional Officer Clearance',
      status: app.currentStage === 'Approved' ? 'valid' : 'pending',
      x: 1000,
      y: 300,
      metadata: {
        'Signatory': 'Member Secretary / Regional Officer',
        'Conditions': 'Satisfactory resolution of DEF-001 & EVC greenlight',
        'Order Format': 'Digital PKI Cryptographic Stamp'
      },
      dependencies: ['node-comp-post']
    },
    {
      id: 'node-comp-post',
      type: 'COMPLIANCE',
      label: 'Post-Approval Obligations',
      sub: 'Bi-Annual Faculty & Safety Disclosures',
      status: 'active',
      x: 1220,
      y: 240,
      metadata: {
        'Obligation 1': 'Annual Mandatory Disclosure on Portal',
        'Obligation 2': 'Anti-Ragging Squad Regular Filings',
        'Obligation 3': 'NBA Accreditation Roadmap Milestone'
      },
      dependencies: []
    }
  ];

  const filteredNodes = filterType === 'ALL' 
    ? nodes 
    : nodes.filter((n) => n.type === filterType);

  const getNodeColor = (node: RoegNode) => {
    switch (node.type) {
      case 'RULE': return 'border-purple-500 bg-purple-50 text-purple-900';
      case 'REQUIREMENT': return 'border-blue-500 bg-blue-50 text-blue-900';
      case 'EVIDENCE': return 'border-cyan-500 bg-cyan-50 text-cyan-900';
      case 'CHECK': return 'border-emerald-500 bg-emerald-50 text-emerald-900';
      case 'DEFICIENCY': return 'border-rose-500 bg-rose-50 text-rose-900';
      case 'EVC': return 'border-amber-500 bg-amber-50 text-amber-900';
      case 'DECISION': return 'border-indigo-500 bg-indigo-50 text-indigo-900';
      case 'COMPLIANCE': return 'border-teal-500 bg-teal-50 text-teal-900';
      default: return 'border-slate-300 bg-white text-slate-800';
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Header with Innovation Badge */}
      <div className="bg-white rounded-xl p-6 border border-[#E1E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1769E0] text-[10px] font-extrabold uppercase tracking-wider">
              SIH Core Innovation
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-600">Proposed Regulatory Architecture</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0B1F43] mt-1 flex items-center gap-2.5">
            <Network className="w-6 h-6 text-[#1769E0]" />
            <span>ROEG — Regulatory Obligation &amp; Evidence Graph</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Multi-layered semantic graph connecting versioned statutory rules, submitted evidence documents, automated verification checks, deficiency notices, EVC visit reports, and post-approval compliance obligations into an immutable provenance chain.
          </p>
        </div>

        {/* Application Selector */}
        <div className="flex items-center gap-3">
          <select
            value={app.id}
            onChange={(e) => setCurrentApplicationId(e.target.value)}
            className="text-xs font-bold bg-[#F4F7FC] border border-slate-300 rounded-lg px-3 py-2 text-[#0B1F43] outline-none"
          >
            {applications.map((a) => (
              <option key={a.id} value={a.id}>
                {a.applicationNumber} — {a.institutionName}
              </option>
            ))}
          </select>
          <button
            onClick={() => onNavigate('/app/rescrutiny')}
            className="px-3.5 py-2 bg-[#1769E0] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Incremental Engine</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3 rounded-xl border border-[#E1E8F0] shadow-xs text-xs">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="font-bold text-slate-400 uppercase text-[10px] mr-1">Filter Nodes:</span>
          {['ALL', 'RULE', 'REQUIREMENT', 'EVIDENCE', 'CHECK', 'DEFICIENCY', 'EVC', 'DECISION', 'COMPLIANCE'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition-colors ${
                filterType === t
                  ? 'bg-[#0B1F43] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-xs">Zoom:</span>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
            className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
          >
            -
          </button>
          <span className="font-mono text-xs text-slate-600">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
            className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
          >
            +
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-600 ml-1"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Graph Canvas Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Node Graph Panel */}
        <div className="lg:col-span-8 bg-[#0A1832] rounded-2xl p-6 border border-slate-800 shadow-xl relative min-h-[580px] overflow-hidden">
          {/* Subtle Grid Lines Background */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#28B8F2 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* SVG Connection Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#28B8F2" />
              </marker>
            </defs>
            {nodes.map((node) => {
              return node.dependencies.map((depId) => {
                const targetNode = nodes.find((n) => n.id === depId);
                if (!targetNode) return null;

                const isPathActive = selectedNode?.id === node.id || selectedNode?.id === targetNode.id;

                return (
                  <path
                    key={`${node.id}-${depId}`}
                    d={`M ${node.x * zoomLevel + 110 * zoomLevel} ${node.y * zoomLevel + 35 * zoomLevel} C ${(node.x + targetNode.x) / 2 * zoomLevel} ${node.y * zoomLevel + 35 * zoomLevel}, ${(node.x + targetNode.x) / 2 * zoomLevel} ${targetNode.y * zoomLevel + 35 * zoomLevel}, ${targetNode.x * zoomLevel} ${targetNode.y * zoomLevel + 35 * zoomLevel}`}
                    fill="none"
                    stroke={isPathActive ? '#28B8F2' : '#334155'}
                    strokeWidth={isPathActive ? '2.5' : '1.2'}
                    strokeDasharray={isPathActive ? 'none' : '4 4'}
                    markerEnd="url(#arrow)"
                  />
                );
              });
            })}
          </svg>

          {/* Render Graph Nodes */}
          <div className="relative w-full h-full min-h-[520px]">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{
                    position: 'absolute',
                    left: `${node.x * zoomLevel}px`,
                    top: `${node.y * zoomLevel}px`,
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top left'
                  }}
                  className={`w-52 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 backdrop-blur-md shadow-lg ${
                    isSelected
                      ? 'ring-4 ring-cyan-400 border-white bg-slate-900 text-white z-30'
                      : 'border-slate-700 bg-slate-900/90 text-slate-100 hover:border-cyan-400 z-10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-cyan-300">
                      {node.type}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${
                      node.status === 'valid' ? 'bg-emerald-400' :
                      node.status === 'deficiency' ? 'bg-rose-500 animate-ping' :
                      node.status === 'warning' ? 'bg-amber-400' : 'bg-cyan-400'
                    }`} />
                  </div>
                  <h4 className="text-xs font-bold leading-tight truncate">{node.label}</h4>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{node.sub}</p>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-4 left-6 text-slate-400 text-xs flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Deficiency Flag
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Evidence Node
            </span>
          </div>
        </div>

        {/* Right Side: Deep Node Inspector Drawer */}
        <div className="lg:col-span-4 bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs flex flex-col justify-between space-y-4">
          {selectedNode ? (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-[#1769E0]">
                    {selectedNode.type} NODE
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{selectedNode.id}</span>
                </div>
                <h3 className="text-base font-bold text-[#0B1F43] mt-1.5 leading-snug">
                  {selectedNode.label}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedNode.sub}</p>
              </div>

              {/* Metadata Fields */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Node Provenance Metadata
                </h4>
                <div className="space-y-2 text-xs">
                  {Object.entries(selectedNode.metadata).map(([key, val]) => (
                    <div key={key} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">{key}</span>
                      <span className="text-slate-800 font-medium mt-0.5 block">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outgoing Dependencies */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Downstream Connected Dependents ({selectedNode.dependencies.length})
                </h4>
                {selectedNode.dependencies.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.dependencies.map((depId) => (
                      <span
                        key={depId}
                        className="px-2 py-1 rounded bg-blue-50 text-[#1769E0] font-mono text-[10px] font-semibold border border-blue-200"
                      >
                        {depId}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Terminal node (No downstream dependents).</p>
                )}
              </div>
            </div>
          ) : (
            <div className="py-20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1769E0] flex items-center justify-center mx-auto">
                <Network className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#0B1F43]">Select Any ROEG Node</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Click on any regulatory rule, evidence document, check, or deficiency node on the graph to inspect its cryptographic provenance and dependency tree.
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-400">Application: {app.applicationNumber}</span>
            <button
              onClick={() => onNavigate('/app/scrutiny')}
              className="text-[#1769E0] font-bold hover:underline flex items-center gap-1"
            >
              <span>Back to Scrutiny</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
