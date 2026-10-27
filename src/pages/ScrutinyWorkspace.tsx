import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  FileCheck2, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Eye, 
  ExternalLink, 
  Send, 
  Save, 
  Layers, 
  ShieldCheck, 
  FileText, 
  ChevronRight,
  Filter,
  Sparkles
} from 'lucide-react';
import { VerificationCheck, EvidenceDocument } from '../types';

interface ScrutinyProps {
  onNavigate: (route: string) => void;
}

export const ScrutinyWorkspace: React.FC<ScrutinyProps> = ({ onNavigate }) => {
  const { 
    applications, 
    currentApplication, 
    setCurrentApplicationId, 
    updateVerificationCheck, 
    raiseDeficiency, 
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'Documents' | 'Overview' | 'Requirement Mapping' | 'Deficiencies' | 'EVC Report' | 'Approval'>('Documents');
  const [selectedCheck, setSelectedCheck] = useState<VerificationCheck | null>(null);
  const [deficiencyText, setDeficiencyText] = useState('');
  const [deficiencySeverity, setDeficiencySeverity] = useState<'Major' | 'Critical' | 'Minor'>('Major');
  const [internalNote, setInternalNote] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

  // Fallback to first app if none selected
  const app = currentApplication || applications[0];

  const handleUpdateCheckStatus = (checkId: string, status: VerificationCheck['status']) => {
    updateVerificationCheck(app.id, checkId, status, `Verified against APH norms by officer.`);
  };

  const handleSendDeficiency = () => {
    if (!deficiencyText.trim()) {
      addToast('Input Required', 'Please describe the deficiency before dispatching.', 'warning');
      return;
    }

    raiseDeficiency(app.id, {
      applicationId: app.id,
      applicationRef: app.applicationNumber,
      institutionName: app.institutionName,
      requirementName: selectedCheck ? selectedCheck.name : 'Affidavits & Statutory Documentation',
      severity: deficiencySeverity,
      description: deficiencyText,
      raisedBy: 'Dr. R. Kumar (Senior Scrutiny Officer)',
      dueDate: '2025-10-10'
    });

    setDeficiencyText('');
  };

  const handleSaveInternalNote = () => {
    if (!internalNote.trim()) return;
    addToast('Internal Note Saved', 'Note encrypted and appended to confidential scrutiny log.', 'info');
    setInternalNote('');
  };

  const getStatusBadge = (status: VerificationCheck['status']) => {
    switch (status) {
      case 'Verified':
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Verified</span>;
      case 'Deficiency':
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700">Deficiency</span>;
      case 'Under Review':
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1769E0]">Under Review</span>;
      default:
        return <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">Not Started</span>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Application Selector / Header matching sub-view 3 */}
      <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <select
                value={app.id}
                onChange={(e) => setCurrentApplicationId(e.target.value)}
                className="font-black text-base text-[#0B1F43] bg-transparent outline-none cursor-pointer hover:text-[#1769E0]"
              >
                {applications.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.applicationNumber} — {a.institutionName}
                  </option>
                ))}
              </select>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1769E0]">
                {app.currentStage}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {app.institutionType} • {app.district}, {app.state} • AY {app.academicYear}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('/app/rescrutiny')}
            className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0B1F43] text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Incremental Re-Scrutiny Engine</span>
          </button>
          <button
            onClick={() => addToast('Dossier Downloaded', `Full encrypted application PDF for ${app.applicationNumber} exported.`, 'info')}
            className="px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Application</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout matching sub-view 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Progress Timeline matching sub-view 3 */}
        <div className="lg:col-span-3 bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#0B1F43] pb-2 border-b border-slate-100">
            Workflow Progression
          </h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {/* Step 1: Submitted */}
            <div className="relative">
              <span className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-white">
                ✓
              </span>
              <div>
                <p className="text-xs font-bold text-slate-800">Submitted</p>
                <span className="text-[10px] text-slate-400">{app.submissionDate}</span>
              </div>
            </div>

            {/* Step 2: Under Scrutiny */}
            <div className="relative">
              <span className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-white ${
                app.currentStage === 'Under Scrutiny' || app.currentStage === 'Documents Verified'
                  ? 'bg-[#1769E0] text-white animate-pulse'
                  : 'bg-emerald-500 text-white'
              }`}>
                ●
              </span>
              <div>
                <p className="text-xs font-bold text-slate-800">Under Scrutiny</p>
                <span className="text-[10px] text-slate-400">Assigned: {app.assignedOfficer}</span>
              </div>
            </div>

            {/* Step 3: Deficiency */}
            <div className="relative">
              <span className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-white ${
                app.deficiencies?.some((d) => d.status === 'Open')
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-200 text-slate-500'
              }`}>
                !
              </span>
              <div>
                <p className="text-xs font-bold text-slate-800">Deficiency Raised</p>
                <span className="text-[10px] text-slate-400">
                  {app.deficiencies?.length ? `${app.deficiencies.length} items logged` : 'No deficiencies'}
                </span>
              </div>
            </div>

            {/* Step 4: EVC Visit */}
            <div className="relative">
              <span className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-white ${
                app.evcCase ? 'bg-[#1769E0] text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                🏛️
              </span>
              <div>
                <p className="text-xs font-bold text-slate-800">EVC Visit</p>
                <span className="text-[10px] text-slate-400">
                  {app.evcCase ? `${app.evcCase.scheduledDate}` : 'Pending scrutiny'}
                </span>
              </div>
            </div>

            {/* Step 5: Recommended */}
            <div className="relative">
              <span className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold ring-4 ring-white">
                ○
              </span>
              <div>
                <p className="text-xs font-bold text-slate-800">Recommended</p>
                <span className="text-[10px] text-slate-400">Regional Committee</span>
              </div>
            </div>

            {/* Step 6: Approved */}
            <div className="relative">
              <span className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-white ${
                app.currentStage === 'Approved' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                ✓
              </span>
              <div>
                <p className="text-xs font-bold text-slate-800">Approved</p>
                <span className="text-[10px] text-slate-400">
                  {app.decision ? `Order: ${app.decision.date}` : 'Pending final seal'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 9 Columns: Tabs + Verification Table + Action Forms matching sub-view 3 */}
        <div className="lg:col-span-9 space-y-6">
          {/* Tabs bar matching sub-view 3 */}
          <div className="bg-white rounded-xl border border-[#E1E8F0] shadow-xs px-4 pt-3 flex items-center justify-between overflow-x-auto">
            <div className="flex gap-2">
              {['Documents', 'Overview', 'Requirement Mapping', 'Deficiencies', 'EVC Report', 'Approval'].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                      isActive
                        ? 'border-[#1769E0] text-[#1769E0]'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <div className="pb-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs bg-[#F4F7FC] border border-slate-200 rounded-lg px-2.5 py-1 text-slate-600 outline-none font-medium"
              >
                <option value="All Categories">All Categories</option>
                <option value="Land">Land Norms</option>
                <option value="Building">Building & Carpet</option>
                <option value="Affidavit">Affidavits</option>
                <option value="Faculty">Faculty Ratio</option>
              </select>
            </div>
          </div>

          {/* TAB: Documents / Requirement Verification Table */}
          {activeTab === 'Documents' && (
            <div className="bg-white rounded-xl border border-[#E1E8F0] shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#0B1F43]">Requirement Verification</h3>
                  <p className="text-xs text-slate-500">Examine OCR fields and record compliance findings.</p>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {app.verificationChecks?.length || 5} Checks Enforced
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F4F7FC] text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-[#E1E8F0]">
                    <tr>
                      <th className="py-3 px-4 w-12">#</th>
                      <th className="py-3 px-4">Requirement</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Remarks</th>
                      <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(app.verificationChecks || []).map((chk, index) => (
                      <tr 
                        key={chk.id} 
                        className={`hover:bg-slate-50/70 transition-colors ${selectedCheck?.id === chk.id ? 'bg-blue-50/40' : ''}`}
                      >
                        <td className="py-3 px-4 font-bold text-slate-400">{index + 1}</td>
                        <td className="py-3 px-4">
                          <p className="font-bold text-[#0B1F43]">{chk.name}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{chk.ruleReference}</span>
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(chk.status)}</td>
                        <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{chk.remarks || '-'}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setSelectedCheck(chk)}
                              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-[#1769E0] text-slate-700 hover:text-white font-semibold text-[11px] transition-colors"
                            >
                              View / OCR
                            </button>
                            <button
                              onClick={() => handleUpdateCheckStatus(chk.id, 'Verified')}
                              className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-semibold text-[10px] transition-colors"
                              title="Mark as Verified"
                            >
                              ✓ Clear
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Selected Check Details & OCR Viewer Drawer */}
              {selectedCheck && (
                <div className="p-5 bg-blue-50/40 border-t border-blue-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#0B1F43] flex items-center gap-2">
                        <span>OCR Inspection: {selectedCheck.name}</span>
                        <span className="text-[10px] bg-blue-100 text-[#1769E0] px-2 py-0.5 rounded font-mono">
                          {selectedCheck.ruleReference}
                        </span>
                      </h4>
                    </div>
                    <button
                      onClick={() => setSelectedCheck(null)}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Extracted Metadata</p>
                      <p className="text-slate-700"><b>Current Status:</b> {selectedCheck.status}</p>
                      <p className="text-slate-700 mt-1"><b>Officer Remarks:</b> {selectedCheck.remarks}</p>
                      <p className="text-slate-700 mt-1"><b>Automated Pre-Check:</b> {selectedCheck.automatedResult ? 'Pass (Valid Format & Stamp)' : 'Failed (Discrepancy Detected)'}</p>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Set Check Verdict</p>
                        <p className="text-xs text-slate-500 mb-2">Change compliance outcome for this item:</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateCheckStatus(selectedCheck.id, 'Verified')}
                          className="flex-1 py-1 px-2 rounded bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                        >
                          Mark Verified
                        </button>
                        <button
                          onClick={() => handleUpdateCheckStatus(selectedCheck.id, 'Deficiency')}
                          className="flex-1 py-1 px-2 rounded bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors"
                        >
                          Mark Deficiency
                        </button>
                        <button
                          onClick={() => handleUpdateCheckStatus(selectedCheck.id, 'Under Review')}
                          className="flex-1 py-1 px-2 rounded bg-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-300 transition-colors"
                        >
                          Under Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: Overview / Programs */}
          {activeTab === 'Overview' && (
            <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-[#0B1F43]">Application Summary & Course Particulars</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Institution</span>
                  <p className="font-bold text-slate-800 text-sm">{app.institutionName}</p>
                  <p className="text-slate-600 mt-1">{app.address}</p>
                  <p className="text-slate-600 mt-1">AISHE: {app.aisheCode} | Type: {app.institutionType}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Officer Assignment</span>
                  <p className="font-bold text-slate-800 text-sm">{app.assignedOfficer}</p>
                  <p className="text-slate-600 mt-1">Academic Year: {app.academicYear}</p>
                  <p className="text-slate-600 mt-1">Submission Date: {app.submissionDate}</p>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="font-bold text-xs text-[#0B1F43] mb-2">Proposed Degree Programs</h4>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">Program</th>
                        <th className="p-2.5">Level</th>
                        <th className="p-2.5">Discipline</th>
                        <th className="p-2.5 text-right">Proposed Intake</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {app.programs.map((p) => (
                        <tr key={p.id}>
                          <td className="p-2.5 font-bold text-slate-800">{p.name}</td>
                          <td className="p-2.5">{p.level}</td>
                          <td className="p-2.5">{p.discipline}</td>
                          <td className="p-2.5 text-right font-bold text-[#1769E0]">{p.proposedIntake}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Deficiencies */}
          {activeTab === 'Deficiencies' && (
            <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-[#0B1F43]">Logged Deficiencies</h3>
              {app.deficiencies && app.deficiencies.length > 0 ? (
                <div className="space-y-3">
                  {app.deficiencies.map((def) => (
                    <div key={def.id} className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-700">{def.id} — {def.requirementName}</span>
                        <span className="px-2 py-0.5 rounded-full bg-rose-200 text-rose-800 font-bold text-[10px]">
                          {def.status}
                        </span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{def.description}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-rose-200/60">
                        <span>Raised by: {def.raisedBy}</span>
                        <span>Due: {def.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No deficiencies currently open for this application.</p>
              )}
            </div>
          )}

          {/* Bottom Action Boxes matching sub-view 3 exactly: Add Deficiency + Internal Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Box 1: Add Deficiency matching mockup */}
            <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs font-bold text-[#0B1F43] flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Add Deficiency</span>
                  </h4>
                  <select
                    value={deficiencySeverity}
                    onChange={(e) => setDeficiencySeverity(e.target.value as any)}
                    className="text-[10px] font-semibold bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5"
                  >
                    <option value="Major">Major</option>
                    <option value="Critical">Critical</option>
                    <option value="Minor">Minor</option>
                  </select>
                </div>
                <textarea
                  rows={3}
                  value={deficiencyText}
                  onChange={(e) => setDeficiencyText(e.target.value)}
                  placeholder="Enter deficiency details..."
                  className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-rose-500 text-xs p-3 rounded-lg outline-none transition-all resize-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSendDeficiency}
                  className="px-4 py-2 bg-[#DC3545] hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to Institution</span>
                </button>
              </div>
            </div>

            {/* Box 2: Internal Notes matching mockup */}
            <div className="bg-white rounded-xl p-4 border border-[#E1E8F0] shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <h4 className="text-xs font-bold text-[#0B1F43] mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-600" />
                  <span>Internal Notes</span>
                </h4>
                <textarea
                  rows={3}
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder="Add internal notes (not visible to institution)..."
                  className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-[#1769E0] text-xs p-3 rounded-lg outline-none transition-all resize-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSaveInternalNote}
                  className="px-4 py-2 bg-[#1769E0] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Note</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
