import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  AlertCircle, 
  CheckCircle2, 
  UploadCloud, 
  Send, 
  FileText, 
  Clock, 
  Building2, 
  ShieldAlert, 
  Calendar,
  Check,
  ChevronRight,
  Info
} from 'lucide-react';
import { DeficiencyItem } from '../types';

export const DeficienciesPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { applications, resolveDeficiency, addToast, currentUser } = useApp();
  const [selectedDef, setSelectedDef] = useState<DeficiencyItem | null>(null);
  const [responseNotes, setResponseNotes] = useState('');
  const [replacementFileName, setReplacementFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Consolidate all deficiencies across applications
  const allDeficiencies: DeficiencyItem[] = applications.flatMap((app) => app.deficiencies || []);
  const openDeficiencies = allDeficiencies.filter((d) => d.status === 'Open' || d.status === 'Response Submitted');
  const resolvedDeficiencies = allDeficiencies.filter((d) => d.status === 'Resolved' || d.status === 'Closed');

  const [activeTab, setActiveTab] = useState<'OPEN' | 'RESOLVED'>('OPEN');

  const handleSelectDef = (def: DeficiencyItem) => {
    setSelectedDef(def);
    setResponseNotes(def.institutionResponse || '');
    setReplacementFileName(def.resubmittedEvidenceName || '');
  };

  const handleSimulateAttachReplacement = () => {
    setIsUploading(true);
    setTimeout(() => {
      setReplacementFileName('Corrected_Notarized_Affidavit_Trustees_Seal_v2.pdf');
      setIsUploading(false);
      addToast('Replacement File Attached', 'Corrected evidence attached with valid Notary seal and biometric QR code.', 'success');
    }, 700);
  };

  const handleSubmitResponse = () => {
    if (!selectedDef) return;
    if (!responseNotes.trim()) {
      addToast('Input Required', 'Please enter institutional response justification.', 'warning');
      return;
    }

    resolveDeficiency(
      selectedDef.applicationId,
      selectedDef.id,
      responseNotes,
      replacementFileName || 'Corrected_Notarized_Affidavit_Trustees_Seal_v2.pdf'
    );

    setSelectedDef(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E1E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-black uppercase tracking-wider">
              Statutory Compliance Notices
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#0B1F43] mt-1 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-rose-600" />
            <span>Deficiency Tracking &amp; Resolution Workspace</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Review scrutiny observations, examine non-compliant clauses, upload corrective evidentiary documents, and track clearance status through the AICTE appellate and scrutiny workflow.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/app/rescrutiny')}
            className="px-4 py-2 bg-[#1769E0] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>Incremental Re-Scrutiny</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs">
        <button
          onClick={() => setActiveTab('OPEN')}
          className={`pb-3 px-4 font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'OPEN'
              ? 'border-rose-600 text-rose-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Open Deficiencies</span>
          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px]">
            {openDeficiencies.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('RESOLVED')}
          className={`pb-3 px-4 font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'RESOLVED'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Resolved / Closed Notices</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
            {resolvedDeficiencies.length}
          </span>
        </button>
      </div>

      {/* Grid: List on Left, Resolution Drawer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Deficiencies List */}
        <div className="lg:col-span-7 space-y-3">
          {(activeTab === 'OPEN' ? openDeficiencies : resolvedDeficiencies).length > 0 ? (
            (activeTab === 'OPEN' ? openDeficiencies : resolvedDeficiencies).map((def) => {
              const isSelected = selectedDef?.id === def.id;
              return (
                <div
                  key={def.id}
                  onClick={() => handleSelectDef(def)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer bg-white ${
                    isSelected
                      ? 'border-[#1769E0] ring-2 ring-blue-100 shadow-md'
                      : 'border-[#E1E8F0] hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs font-mono text-[#0B1F43]">{def.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          def.severity === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {def.severity} Severity
                        </span>
                        <span className="text-slate-400 text-xs">•</span>
                        <span className="text-xs font-semibold text-[#1769E0]">{def.applicationRef}</span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 mt-1">{def.requirementName}</h3>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">{def.institutionName}</p>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                      def.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {def.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100 leading-relaxed">
                    {def.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Raised: {def.raisedDate}
                    </span>
                    <span className="font-bold text-rose-600">
                      Due: {def.dueDate}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white p-10 rounded-xl border border-slate-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">No {activeTab.toLowerCase()} deficiencies</h4>
              <p className="text-xs text-slate-500">All statutory requirements for current active applications are satisfied.</p>
            </div>
          )}
        </div>

        {/* Right: Deficiency Response & Rectification Drawer */}
        <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs flex flex-col justify-between space-y-4">
          {selectedDef ? (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-rose-600">{selectedDef.id}</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                    Due: {selectedDef.dueDate}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#0B1F43] mt-1">{selectedDef.requirementName}</h3>
                <p className="text-xs text-slate-500">{selectedDef.institutionName}</p>
              </div>

              {/* Raised Officer Note */}
              <div className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-200 text-xs">
                <span className="font-bold text-rose-900 block mb-1">Scrutiny Officer Directive:</span>
                <p className="text-slate-700 leading-relaxed">{selectedDef.description}</p>
                <span className="text-[10px] text-slate-400 mt-2 block">Issued by: {selectedDef.raisedBy}</span>
              </div>

              {selectedDef.status !== 'Resolved' ? (
                <>
                  {/* Upload Replacement Evidence */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F43] mb-1">
                      Upload Corrected Evidence (v2 Replacement)
                    </label>
                    <div className="p-3.5 border-2 border-dashed border-slate-300 hover:border-[#1769E0] rounded-xl text-center bg-slate-50/50">
                      {replacementFileName ? (
                        <div className="flex items-center justify-between bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-xs">
                          <span className="font-bold text-emerald-800 truncate">{replacementFileName}</span>
                          <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold">Ready</span>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs text-slate-600 font-medium">Attach notarized affidavit / compliant layout</p>
                          <button
                            onClick={handleSimulateAttachReplacement}
                            disabled={isUploading}
                            className="mt-2 px-3 py-1 bg-white border border-slate-300 text-xs font-bold rounded-lg text-[#1769E0] hover:bg-blue-50 transition-colors shadow-xs"
                          >
                            {isUploading ? 'Validating...' : 'Browse / Attach Corrected File'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Institutional Justification */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F43] mb-1">
                      Institutional Response &amp; Rectification Statement <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={responseNotes}
                      onChange={(e) => setResponseNotes(e.target.value)}
                      placeholder="Explain corrective steps taken, witness details, and municipal verification references..."
                      className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-[#1769E0] text-xs p-3 rounded-lg outline-none resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSubmitResponse}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Rectification &amp; Request Clearance</span>
                  </button>
                </>
              ) : (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Resolved &amp; Cleared by Scrutiny Bureau</span>
                  </div>
                  <p className="text-slate-700"><b>Institution Response:</b> {selectedDef.institutionResponse}</p>
                  <p className="text-slate-700"><b>Evidence Attached:</b> {selectedDef.resubmittedEvidenceName}</p>
                  <p className="text-slate-600 text-[11px] pt-1">Resolved on {selectedDef.resolutionDate}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-24 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">Select a Deficiency Notice</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Choose any item from the left panel to review the scrutiny directive and upload compliance evidence.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
