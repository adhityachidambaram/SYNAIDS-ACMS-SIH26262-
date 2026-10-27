import React from 'react';
import { useApp } from '../../context/AppContext';
import { AicteEmblem } from './AicteLogo';
import { 
  LayoutDashboard, 
  FileText, 
  FileCheck2, 
  AlertCircle, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  Building, 
  BarChart3, 
  BookOpen, 
  Users, 
  Network, 
  RefreshCw, 
  History, 
  PlusCircle, 
  UploadCloud,
  ExternalLink,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentRoute, onNavigate }) => {
  const { currentUser, applications } = useApp();

  // Calculate open deficiencies count
  const openDeficienciesCount = applications.reduce(
    (acc, app) => acc + (app.deficiencies?.filter((d) => d.status === 'Open').length || 0),
    0
  );

  const isOfficer = currentUser.role !== 'INSTITUTION_ADMIN';

  const officerNavItems = [
    { id: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: '/app/applications', label: 'Applications', icon: FileText, badge: `${applications.length}` },
    { id: '/app/scrutiny', label: 'Scrutiny & Verification', icon: FileCheck2 },
    { id: '/app/deficiencies', label: 'Deficiencies', icon: AlertCircle, badge: openDeficienciesCount > 0 ? `${openDeficienciesCount}` : undefined, badgeColor: 'bg-rose-500' },
    { id: '/app/evc', label: 'EVC Management', icon: Layers },
    { id: '/app/approvals', label: 'Approvals', icon: CheckCircle2 },
    { id: '/app/compliance', label: 'Compliance', icon: ShieldCheck },
    { id: '/app/institutions', label: 'Institutions', icon: Building },
    { id: '/app/reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: '/app/regulatory-rules', label: 'Regulatory Rules', icon: BookOpen },
    { id: '/app/users', label: 'User Management', icon: Users },
  ];

  const innovationItems = [
    { id: '/app/roeg-graph', label: 'ROEG Evidence Graph', icon: Network, highlight: true, tag: 'INNOVATION' },
    { id: '/app/rescrutiny', label: 'Incremental Re-Scrutiny', icon: RefreshCw, highlight: true, tag: 'PROPOSED' },
    { id: '/app/audit-trail', label: 'Audit Trail & Integrity', icon: History }
  ];

  const institutionNavItems = [
    { id: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: '/app/new-application', label: 'New Application Wizard', icon: PlusCircle, highlight: true },
    { id: '/app/documents-ocr', label: 'Document Upload & OCR', icon: UploadCloud },
    { id: '/app/deficiencies', label: 'Deficiency Responses', icon: AlertCircle, badge: openDeficienciesCount > 0 ? `${openDeficienciesCount}` : undefined, badgeColor: 'bg-rose-500' },
    { id: '/app/applications', label: 'My Applications', icon: FileText },
    { id: '/app/compliance', label: 'Post-Approval Compliance', icon: ShieldCheck },
    { id: '/app/roeg-graph', label: 'ROEG Obligation Graph', icon: Network, tag: 'ROEG' },
  ];

  const currentNavList = isOfficer ? officerNavItems : institutionNavItems;

  return (
    <aside className="w-64 bg-white border-r border-[#E1E8F0] flex flex-col shrink-0 min-h-[calc(100vh-61px)] shadow-[1px_0_4px_rgba(0,0,0,0.02)]">
      {/* Top Branding Section matching reference screenshot */}
      <div className="px-5 py-4 border-b border-[#E1E8F0] flex items-center gap-3">
        <AicteEmblem size={40} />
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xl tracking-tight text-[#0B1F43]">ACMS</span>
            <span className="text-[10px] bg-blue-100 text-[#1769E0] font-bold px-1.5 py-0.5 rounded">v2.4</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
            AICTE Approval System
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {isOfficer ? 'Administrative Portal' : 'Institution Portal'}
          </p>
        </div>

        {currentNavList.map((item) => {
          const isActive = currentRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-[#1769E0] text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 hover:text-[#0B1F43] hover:bg-[#F4F7FC]'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#1769E0]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.badgeColor 
                      ? `${item.badgeColor} text-white` 
                      : isActive 
                        ? 'bg-blue-400/40 text-white' 
                        : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* SIH Research & Workflow Innovations */}
        {isOfficer && (
          <div className="pt-4 mt-3 border-t border-slate-100 space-y-1">
            <div className="px-3 mb-2 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#1769E0] flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> SIH Core Innovations
              </p>
            </div>
            {innovationItems.map((item) => {
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-[#0B1F43] text-white shadow-sm'
                      : 'text-slate-700 hover:text-[#0B1F43] hover:bg-blue-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-[#1769E0]'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.tag && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-100 text-[#1769E0]">
                      {item.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Info Card: Approval Process Handbook & Support */}
      <div className="p-3 border-t border-[#E1E8F0] bg-slate-50/70">
        <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#0B1F43]">
            <span>APH Handbook 2024–27</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 leading-snug">
            Rev 2.2 Active • All statutory requirements enforced
          </p>
          <button 
            onClick={() => onNavigate('/app/regulatory-rules')}
            className="mt-2 text-[11px] text-[#1769E0] hover:underline font-semibold flex items-center gap-1"
          >
            <span>View Rule Matrix</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
