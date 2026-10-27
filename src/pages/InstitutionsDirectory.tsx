import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Search, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  Phone,
  Mail,
  GraduationCap
} from 'lucide-react';

export const InstitutionsDirectory: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { applications, setCurrentApplicationId } = useApp();
  const [search, setSearch] = useState('');

  const institutes = [
    {
      id: 'inst-001',
      name: 'ABC Institute of Technology',
      type: 'Private - Self Financing',
      state: 'Tamil Nadu',
      district: 'Chennai',
      aishe: 'C-24589',
      address: '123, University Road, Chennai, Tamil Nadu - 600025',
      contactPerson: 'Dr. S. Ramanathan (Registrar)',
      email: 'registrar@abctech.edu.in',
      phone: '+91 94441 23456',
      totalSeats: 360,
      activeApplication: 'APP-2025-00124',
      status: 'Under Scrutiny'
    },
    {
      id: 'inst-002',
      name: 'XYZ Engineering College',
      type: 'Govt. Aided Autonomous',
      state: 'Maharashtra',
      district: 'Pune',
      aishe: 'C-18402',
      address: 'Sector 4, Hinjawadi Tech Park, Pune - 411057',
      contactPerson: 'Dr. M. P. Joshi (Principal)',
      email: 'principal@xyzpune.ac.in',
      phone: '+91 98220 98765',
      totalSeats: 480,
      activeApplication: 'APP-2025-00123',
      status: 'Documents Verified'
    },
    {
      id: 'inst-003',
      name: 'LMN Polytechnic Institute',
      type: 'Private - Self Financing',
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      aishe: 'C-31908',
      address: 'Outer Ring Road, Marathahalli, Bengaluru - 560037',
      contactPerson: 'Prof. K. Venkatesh (Director)',
      email: 'director@lmnpoly.edu.in',
      phone: '+91 99000 11223',
      totalSeats: 240,
      activeApplication: 'APP-2025-00122',
      status: 'Deficiency Raised'
    },
    {
      id: 'inst-004',
      name: 'PQR University School of Technology',
      type: 'State Private University',
      state: 'Telangana',
      district: 'Hyderabad',
      aishe: 'U-0512',
      address: 'Knowledge City, Gachibowli, Hyderabad - 500032',
      contactPerson: 'Dr. C. H. Reddy (Vice Chancellor)',
      email: 'vc@pqruniv.ac.in',
      phone: '+91 97000 44556',
      totalSeats: 600,
      activeApplication: 'APP-2025-00121',
      status: 'Approved'
    }
  ];

  const filtered = institutes.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.state.toLowerCase().includes(search.toLowerCase()) ||
      i.district.toLowerCase().includes(search.toLowerCase()) ||
      i.aishe.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E1E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0B1F43] flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#1769E0]" />
            <span>Technical Institutions Directory</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered technical institutes, polytechnics, and engineering faculties across all regional councils.
          </p>
        </div>

        <div className="w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search institution, state, or AISHE ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F4F7FC] border border-[#E1E8F0] text-xs pl-9 pr-4 py-2 rounded-lg outline-none focus:bg-white focus:border-[#1769E0]"
          />
        </div>
      </div>

      {/* Grid of Institution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((inst) => (
          <div
            key={inst.id}
            className="bg-white rounded-xl p-5 border border-[#E1E8F0] hover:border-slate-300 shadow-xs transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[10px] font-bold text-slate-400">AISHE: {inst.aishe}</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#1769E0] text-[10px] font-bold">
                  {inst.status}
                </span>
              </div>
              <h3 className="font-bold text-base text-[#0B1F43] mt-1">{inst.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{inst.district}, {inst.state}</span>
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1.5 border border-slate-100">
              <p className="text-slate-700"><b>Category:</b> {inst.type}</p>
              <p className="text-slate-700"><b>Key Contact:</b> {inst.contactPerson}</p>
              <p className="text-slate-600 flex items-center gap-3 text-[11px] pt-1">
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {inst.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {inst.phone}</span>
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <GraduationCap className="w-4 h-4 text-[#1769E0]" />
                <span>{inst.totalSeats} Sanctioned Intake</span>
              </span>

              <button
                onClick={() => {
                  const targetApp = applications.find((a) => a.institutionName.includes(inst.name.split(' ')[0]));
                  if (targetApp) {
                    setCurrentApplicationId(targetApp.id);
                    onNavigate('/app/scrutiny');
                  }
                }}
                className="text-[#1769E0] font-bold hover:underline flex items-center gap-1"
              >
                <span>View Dossier</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
