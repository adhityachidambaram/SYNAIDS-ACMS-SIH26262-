import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  UploadCloud, 
  Plus, 
  Trash2, 
  FileText, 
  AlertTriangle,
  Info,
  ShieldCheck,
  Eye,
  Sparkles
} from 'lucide-react';
import { ApplicationProgram, EvidenceDocument } from '../types';

interface WizardProps {
  onNavigate: (route: string) => void;
}

export const NewApplicationWizard: React.FC<WizardProps> = ({ onNavigate }) => {
  const { createNewApplication, addToast } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [applicationType, setApplicationType] = useState('New Institute / New Program');
  const [academicYear, setAcademicYear] = useState('2026 - 2027');
  const [state, setState] = useState('Tamil Nadu');
  const [institutionName, setInstitutionName] = useState('ABC Institute of Technology');
  const [institutionType, setInstitutionType] = useState('Private - Self Financing');
  const [aisheCode, setAisheCode] = useState('AISHE12345');
  const [address, setAddress] = useState('123, University Road, Chennai, Tamil Nadu - 6000XX');
  const [contactName, setContactName] = useState('Dr. S. Ramanathan');
  const [contactEmail, setContactEmail] = useState('registrar@abctech.edu.in');
  const [contactPhone, setContactPhone] = useState('+91 94441 23456');

  // Step 2 State
  const [landArea, setLandArea] = useState('7.5 Acres (Contiguous)');
  const [builtUpArea, setBuiltUpArea] = useState('14,250 sq. meters');
  const [trustName, setTrustName] = useState('ABC Educational & Charitable Trust');

  // Step 3 Programs
  const [programs, setPrograms] = useState<ApplicationProgram[]>([
    { id: 'p1', name: 'Computer Science & Engineering', level: 'UG', discipline: 'Engineering & Technology', existingIntake: 0, proposedIntake: 180, durationYears: 4 },
    { id: 'p2', name: 'Artificial Intelligence & Data Science', level: 'UG', discipline: 'Engineering & Technology', existingIntake: 0, proposedIntake: 60, durationYears: 4 },
    { id: 'p3', name: 'Electronics & Communication Engineering', level: 'UG', discipline: 'Engineering & Technology', existingIntake: 0, proposedIntake: 120, durationYears: 4 }
  ]);
  const [newProgName, setNewProgName] = useState('');
  const [newProgIntake, setNewProgIntake] = useState(60);

  // Step 4 Documents & OCR
  const [activeDocCategory, setActiveDocCategory] = useState('Land Documents');
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, { name: string; size: string; status: string; ocr: any }>>({
    'Land Documents': {
      name: 'Land_Ownership_Deed_SubRegistrar_Signed.pdf',
      size: '4.2 MB',
      status: 'Extracted',
      ocr: {
        documentType: 'Land Ownership Certificate',
        issueDate: '12-05-2018',
        validTill: 'Perpetual',
        issuingAuthority: 'Sub Registrar, Chennai'
      }
    },
    'Building Plan': {
      name: 'CMDA_Approved_Building_Plan_Layout.pdf',
      size: '8.7 MB',
      status: 'Extracted',
      ocr: {
        documentType: 'Approved Building Plan',
        issueDate: '24-01-2022',
        validTill: 'Perpetual',
        issuingAuthority: 'Chennai Metropolitan Development Authority (CMDA)'
      }
    }
  });
  const [showRawText, setShowRawText] = useState(false);
  const [isSimulatingOcr, setIsSimulatingOcr] = useState(false);

  // Step 5 Declaration
  const [declarationAgreed, setDeclarationAgreed] = useState(false);

  const steps = [
    { number: 1, title: 'Basic Details' },
    { number: 2, title: 'Institution Details' },
    { number: 3, title: 'Programs & Intake' },
    { number: 4, title: 'Document Upload' },
    { number: 5, title: 'Review & Submit' },
  ];

  const handleAddProgram = () => {
    if (!newProgName.trim()) return;
    const newProg: ApplicationProgram = {
      id: `prog-${Date.now()}`,
      name: newProgName,
      level: 'UG',
      discipline: 'Engineering & Technology',
      existingIntake: 0,
      proposedIntake: Number(newProgIntake),
      durationYears: 4
    };
    setPrograms([...programs, newProg]);
    setNewProgName('');
    addToast('Program Added', `${newProg.name} added to proposed intake list.`, 'success');
  };

  const handleRemoveProgram = (id: string) => {
    setPrograms(programs.filter((p) => p.id !== id));
  };

  const handleFileUploadSimulation = (category: string) => {
    setIsSimulatingOcr(true);
    setTimeout(() => {
      let docType = 'Certificate';
      let authority = 'Competent State Authority';
      if (category === 'Affidavits') {
        docType = 'AICTE Notarized Affidavit (1, 2 & 3)';
        authority = 'Notary Public, Govt of India';
      } else if (category === 'Faculty Details') {
        docType = 'Faculty Cadre & Bio-Data Matrix';
        authority = 'Governing Council & Selection Board';
      } else if (category === 'Infrastructure') {
        docType = 'Lab Equipment & Bandwidth Readiness';
        authority = 'Chartered Engineer Certified';
      }

      setUploadedFiles((prev) => ({
        ...prev,
        [category]: {
          name: `${category.replace(/\s+/g, '_')}_Official_2026.pdf`,
          size: '3.4 MB',
          status: 'Extracted',
          ocr: {
            documentType: docType,
            issueDate: '08-09-2025',
            validTill: '2026-27 Session',
            issuingAuthority: authority
          }
        }
      }));
      setIsSimulatingOcr(false);
      addToast('OCR Complete', `AICTE OCR engine parsed metadata for ${category}.`, 'success');
    }, 900);
  };

  const handleFinalSubmit = () => {
    if (!declarationAgreed) {
      addToast('Declaration Required', 'Please confirm the statutory declaration checkbox.', 'warning');
      return;
    }

    const createdId = createNewApplication({
      applicationType,
      academicYear,
      state,
      institutionName,
      institutionType,
      aisheCode,
      address,
      contactPerson: contactName,
      contactEmail,
      contactPhone,
      programs,
      currentStage: 'Submitted'
    });

    onNavigate('/app/scrutiny');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Breadcrumb matching sub-view 1 in screenshot */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="hover:underline cursor-pointer" onClick={() => onNavigate('/app/applications')}>Applications</span>
        <span>&gt;</span>
        <span className="text-[#0B1F43] font-bold">New Application</span>
      </div>

      {/* Stepper Header */}
      <div className="bg-white rounded-xl p-5 border border-[#E1E8F0] shadow-xs">
        <div className="flex items-center justify-between max-w-3xl mx-auto relative">
          {/* Connector Line */}
          <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />

          {steps.map((s) => {
            const isCompleted = currentStep > s.number;
            const isCurrent = currentStep === s.number;

            return (
              <div 
                key={s.number} 
                onClick={() => {
                  if (s.number < currentStep) setCurrentStep(s.number);
                }}
                className={`relative z-10 flex flex-col items-center cursor-pointer transition-all ${
                  isCurrent ? 'scale-105' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-[#1769E0] text-white ring-4 ring-blue-100'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? '✓' : s.number}
                </div>
                <span
                  className={`text-[11px] font-semibold mt-1.5 whitespace-nowrap ${
                    isCurrent ? 'text-[#1769E0]' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl p-7 border border-[#E1E8F0] shadow-xs">
        {/* STEP 1: Basic Details (matches mockup precisely) */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-[#0B1F43]">Basic Details</h2>
              <p className="text-xs text-slate-500">Enter applicant institutional credentials and statutory jurisdiction.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Application Type <span className="text-rose-500">*</span>
                </label>
                <select
                  value={applicationType}
                  onChange={(e) => setApplicationType(e.target.value)}
                  className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-[#1769E0] text-xs font-medium text-slate-800 px-3.5 py-2.5 rounded-lg outline-none transition-all"
                >
                  <option value="New Institute / New Program">New Institute / New Program</option>
                  <option value="Extension of Approval (EoA)">Extension of Approval (EoA)</option>
                  <option value="Increase in Intake / Additional Course">Increase in Intake / Additional Course</option>
                  <option value="Conversion of Women's Institution to Co-Ed">Conversion of Women's Institution to Co-Ed</option>
                  <option value="Change of Site / Location">Change of Site / Location</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Academic Year <span className="text-rose-500">*</span>
                </label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-[#1769E0] text-xs font-medium text-slate-800 px-3.5 py-2.5 rounded-lg outline-none transition-all"
                >
                  <option value="2026 - 2027">2026 - 2027</option>
                  <option value="2025 - 2026">2025 - 2026</option>
                  <option value="2024 - 2025">2024 - 2025</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  State <span className="text-rose-500">*</span>
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-[#1769E0] text-xs font-medium text-slate-800 px-3.5 py-2.5 rounded-lg outline-none transition-all"
                >
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gujarat">Gujarat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Name of the Institution <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-[#1769E0] text-xs font-medium text-slate-800 px-3.5 py-2.5 rounded-lg outline-none transition-all"
                  placeholder="e.g. ABC Institute of Technology"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Institution Type <span className="text-rose-500">*</span>
                </label>
                <select
                  value={institutionType}
                  onChange={(e) => setInstitutionType(e.target.value)}
                  className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-[#1769E0] text-xs font-medium text-slate-800 px-3.5 py-2.5 rounded-lg outline-none transition-all"
                >
                  <option value="Private - Self Financing">Private - Self Financing</option>
                  <option value="Govt. Aided Autonomous">Govt. Aided Autonomous</option>
                  <option value="Government Polytechnic / College">Government Polytechnic / College</option>
                  <option value="State University Campus">State University Campus</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  AISHE / UGC ID (if available)
                </label>
                <input
                  type="text"
                  value={aisheCode}
                  onChange={(e) => setAisheCode(e.target.value)}
                  className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-[#1769E0] text-xs font-medium text-slate-800 px-3.5 py-2.5 rounded-lg outline-none transition-all"
                  placeholder="AISHE12345"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Address <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-[#1769E0] text-xs font-medium text-slate-800 px-3.5 py-2.5 rounded-lg outline-none transition-all resize-none"
                placeholder="123, University Road, Chennai, Tamil Nadu - 6000XX"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Institution Details */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-[#0B1F43]">Institution & Land Details</h2>
              <p className="text-xs text-slate-500">Provide campus landholding and sponsoring Trust/Society particulars.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sponsoring Trust / Society Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={trustName}
                  onChange={(e) => setTrustName(e.target.value)}
                  className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-[#1769E0] text-xs font-medium text-slate-800 px-3.5 py-2.5 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contiguous Campus Land Area <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value)}
                  className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-[#1769E0] text-xs font-medium text-slate-800 px-3.5 py-2.5 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Total Approved Built-up Carpet Area <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={builtUpArea}
                  onChange={(e) => setBuiltUpArea(e.target.value)}
                  className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-[#1769E0] text-xs font-medium text-slate-800 px-3.5 py-2.5 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Authorized Signatory / Registrar Name
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-[#F4F7FC] border border-[#E1E8F0] focus:bg-white focus:border-[#1769E0] text-xs font-medium text-slate-800 px-3.5 py-2.5 rounded-lg outline-none"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#1769E0] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700">
                <p className="font-semibold text-[#0B1F43]">AICTE Norm Verification Note (Clause 1.4):</p>
                <p className="mt-0.5 text-slate-600">
                  Land must be registered in the name of the Trust/Society through a sale deed or registered lease for a minimum of 30 years (99 years for self-financing engineering colleges).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Programs & Intake */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#0B1F43]">Proposed Programs & Intake Capacity</h2>
                <p className="text-xs text-slate-500">Configure degree courses, AICTE discipline, and student seat capacity.</p>
              </div>
              <span className="text-xs font-bold text-[#1769E0] bg-blue-50 px-2.5 py-1 rounded-full">
                Total Proposed Seats: {programs.reduce((acc, p) => acc + p.proposedIntake, 0)}
              </span>
            </div>

            {/* Program Table */}
            <div className="overflow-x-auto border border-[#E1E8F0] rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F4F7FC] text-slate-600 uppercase font-semibold text-[10px] tracking-wider border-b border-[#E1E8F0]">
                  <tr>
                    <th className="py-3 px-4">Program Name</th>
                    <th className="py-3 px-4">Level</th>
                    <th className="py-3 px-4">Discipline</th>
                    <th className="py-3 px-4 text-center">Duration</th>
                    <th className="py-3 px-4 text-right">Proposed Intake</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {programs.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-[#0B1F43]">{p.name}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-semibold">{p.level}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{p.discipline}</td>
                      <td className="py-3 px-4 text-center text-slate-600">{p.durationYears} Years</td>
                      <td className="py-3 px-4 text-right font-bold text-[#1769E0]">{p.proposedIntake} seats</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleRemoveProgram(p.id)}
                          className="p-1 hover:bg-rose-50 rounded text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Program Bar */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="e.g. Mechanical & Automation Engineering"
                value={newProgName}
                onChange={(e) => setNewProgName(e.target.value)}
                className="flex-1 min-w-[200px] bg-white border border-slate-300 text-xs px-3 py-2 rounded-lg outline-none focus:border-[#1769E0]"
              />
              <select
                value={newProgIntake}
                onChange={(e) => setNewProgIntake(Number(e.target.value))}
                className="bg-white border border-slate-300 text-xs px-3 py-2 rounded-lg outline-none"
              >
                <option value={30}>30 Seats</option>
                <option value={60}>60 Seats</option>
                <option value={120}>120 Seats</option>
                <option value={180}>180 Seats</option>
              </select>
              <button
                onClick={handleAddProgram}
                className="px-4 py-2 bg-[#1769E0] text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Program</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Document Upload & OCR (matches sub-view 2 in mockup) */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#0B1F43]">Upload Required Documents</h2>
                <p className="text-xs text-slate-500">Documents undergo OCR verification and regulatory evidence matching.</p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                OCR Engine Active (Confidence &gt; 95%)
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Document Category Menu matching sub-view 2 */}
              <div className="lg:col-span-4 space-y-1">
                {[
                  'Land Documents',
                  'Building Plan',
                  'Affidavits',
                  'Faculty Details',
                  'Infrastructure',
                  'Other Documents'
                ].map((cat, idx) => {
                  const isSelected = activeDocCategory === cat;
                  const isUploaded = !!uploadedFiles[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveDocCategory(cat)}
                      className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-blue-50 text-[#1769E0] border border-blue-200 shadow-xs'
                          : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <span>{idx + 1}. {cat}</span>
                      {isUploaded ? (
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">✓</span>
                      ) : (
                        <span className="text-[10px] text-slate-400">Pending</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right: Drag & Drop Upload Zone + Extracted Information Card */}
              <div className="lg:col-span-8 space-y-5">
                <div className="border-2 border-dashed border-slate-300 hover:border-[#1769E0] rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-blue-50/20 transition-all flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1769E0] flex items-center justify-center mb-3">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-bold text-[#0B1F43]">
                    {activeDocCategory}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Drag &amp; drop your file here or{' '}
                    <span 
                      onClick={() => handleFileUploadSimulation(activeDocCategory)}
                      className="text-[#1769E0] font-bold hover:underline"
                    >
                      Browse Files
                    </span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2">
                    Supported formats: PDF, JPG, PNG (Max size: 10 MB)
                  </p>

                  <button
                    onClick={() => handleFileUploadSimulation(activeDocCategory)}
                    disabled={isSimulatingOcr}
                    className="mt-3 px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#1769E0] text-xs font-semibold text-slate-700 hover:text-[#1769E0] transition-colors shadow-xs"
                  >
                    {isSimulatingOcr ? 'Parsing OCR...' : `Simulate Upload & OCR (${activeDocCategory})`}
                  </button>
                </div>

                {/* Document Information (Extracted using OCR) Card matching mockup */}
                {uploadedFiles[activeDocCategory] ? (
                  <div className="bg-white rounded-xl p-4 border border-emerald-200/80 shadow-xs space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <h4 className="text-xs font-bold text-slate-900">
                          Document Information (Extracted using OCR)
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Information extracted successfully
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase">Document Type</span>
                        <p className="font-bold text-slate-800 mt-0.5">
                          {uploadedFiles[activeDocCategory].ocr.documentType}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase">Issue Date</span>
                        <p className="font-semibold text-slate-800 mt-0.5">
                          {uploadedFiles[activeDocCategory].ocr.issueDate}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase">Valid Till</span>
                        <p className="font-semibold text-slate-800 mt-0.5">
                          {uploadedFiles[activeDocCategory].ocr.validTill}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase">Issuing Authority</span>
                        <p className="font-semibold text-slate-800 mt-0.5">
                          {uploadedFiles[activeDocCategory].ocr.issuingAuthority}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium text-[11px]">
                        File: {uploadedFiles[activeDocCategory].name} ({uploadedFiles[activeDocCategory].size})
                      </span>
                      <button
                        onClick={() => setShowRawText(!showRawText)}
                        className="text-[#1769E0] font-bold hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{showRawText ? 'Hide Text' : 'View Extracted Text'}</span>
                      </button>
                    </div>

                    {showRawText && (
                      <div className="p-3 bg-slate-50 rounded-lg text-[11px] font-mono text-slate-700 border border-slate-200">
                        [OCR TOKEN STREAM: S.No 451/2A, Registration Deed Vol 412, Sub-Registrar South Chennai, Certified educational institutional zone, clear from encumbrances, dated 12-05-2018]
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-500">
                    No document uploaded yet for {activeDocCategory}. Click Browse Files or the simulation button above.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Review & Submit */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-[#0B1F43]">Review & Submit Application</h2>
              <p className="text-xs text-slate-500">Confirm all particulars before digital submission to the AICTE Scrutiny Bureau.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                <h4 className="font-bold text-[#0B1F43] uppercase text-[11px]">Institution Particulars</h4>
                <p><span className="text-slate-500">Institution:</span> <b>{institutionName}</b></p>
                <p><span className="text-slate-500">Type:</span> {institutionType}</p>
                <p><span className="text-slate-500">State / Region:</span> {state}</p>
                <p><span className="text-slate-500">AISHE ID:</span> {aisheCode}</p>
                <p><span className="text-slate-500">Contact:</span> {contactName} ({contactEmail})</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                <h4 className="font-bold text-[#0B1F43] uppercase text-[11px]">Programs & Documents</h4>
                <p><span className="text-slate-500">Proposed Programs:</span> <b>{programs.length} Courses</b></p>
                <p><span className="text-slate-500">Total Proposed Intake:</span> <b>{programs.reduce((acc, p) => acc + p.proposedIntake, 0)} Seats</b></p>
                <p><span className="text-slate-500">Evidence Uploads:</span> {Object.keys(uploadedFiles).length} Verified Categories</p>
                <p><span className="text-slate-500">Applicable Handbook:</span> APH 2024-2027 v2.2</p>
              </div>
            </div>

            {/* Statutory Declaration Checkbox */}
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={declarationAgreed}
                  onChange={(e) => setDeclarationAgreed(e.target.checked)}
                  className="mt-0.5 rounded text-[#1769E0] focus:ring-[#1769E0]"
                />
                <span className="text-slate-700 leading-relaxed">
                  <b>Statutory Undertaking:</b> I hereby solemnly affirm and declare that the information and documents uploaded herein are authentic, verified against original revenue and municipal records, and comply with the AICTE Approval Process Handbook (APH 2024-27). Any false statement shall attract immediate rejection and legal penalties.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Footer Action Buttons matching mockup */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => addToast('Draft Saved', 'Application draft saved to local registry.', 'info')}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save as Draft</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="px-5 py-2.5 bg-[#1769E0] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Submit Application to AICTE</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
