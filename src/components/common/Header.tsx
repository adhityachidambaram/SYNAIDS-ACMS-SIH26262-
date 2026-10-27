import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NationalEmblemIndia } from './AicteLogo';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  User, 
  ShieldCheck, 
  Building2, 
  FileCheck2, 
  Layers, 
  LogOut,
  ExternalLink,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../../types';

interface HeaderProps {
  onNavigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { 
    currentUser, 
    setRole, 
    notifications, 
    unreadNotificationCount, 
    markAllNotificationsRead,
    searchQuery,
    setSearchQuery,
    academicYear,
    setAcademicYear
  } = useApp();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target as Node)) {
        setShowRoleDropdown(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(e.target as Node)) {
        setShowNotificationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rolesConfig: { role: UserRole; label: string; sub: string; icon: any }[] = [
    { role: 'INSTITUTION_ADMIN', label: 'Institution Admin', sub: 'ABC Institute of Technology', icon: Building2 },
    { role: 'SCRUTINY_OFFICER', label: 'AICTE Official (Scrutiny)', sub: 'Dr. R. Kumar (Senior Officer)', icon: FileCheck2 },
    { role: 'EVC_MEMBER', label: 'EVC Committee Member', sub: 'Prof. S. Sharma (IIT Delhi)', icon: Layers },
    { role: 'APPROVING_OFFICIAL', label: 'Approving Authority', sub: 'Dr. V. Nair (Regional Officer)', icon: ShieldCheck },
    { role: 'SYSTEM_ADMIN', label: 'System Admin', sub: 'e-Governance Bureau', icon: ShieldCheck }
  ];

  return (
    <header className="bg-white border-b border-[#E1E8F0] sticky top-0 z-40 px-6 py-2.5 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {/* Left: Indian National Emblem + AICTE Bilingual Title */}
      <div className="flex items-center gap-3.5">
        <NationalEmblemIndia size={38} className="text-slate-800" />
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <h1 className="text-[15px] font-bold tracking-tight text-[#0B1F43] leading-snug">
              All India Council for Technical Education
            </h1>
            <span className="text-[12px] font-medium text-slate-500 hidden lg:inline">
              अखिल भारतीय तकनीकी शिक्षा परिषद
            </span>
          </div>
          <p className="text-[11px] font-semibold text-[#1769E0] tracking-wide flex items-center gap-1.5">
            <span>Quality Education</span>
            <span className="text-slate-300">•</span>
            <span>Transparent Approvals</span>
            <span className="text-slate-300">•</span>
            <span>Stronger Institutions</span>
          </p>
        </div>
      </div>

      {/* Center: Global Search Bar matching reference image */}
      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search application, institution, or reference no..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F4F7FC] border border-[#E1E8F0] hover:border-slate-300 focus:border-[#1769E0] focus:bg-white text-xs text-[#152544] placeholder-slate-400 pl-10 pr-4 py-2 rounded-lg outline-none transition-all"
          />
        </div>
      </div>

      {/* Right Controls: Academic Year, Notifications, User Role Dropdown */}
      <div className="flex items-center gap-4">
        {/* Academic Year Selector */}
        <div className="hidden xl:flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200">
          <span className="text-[11px] font-medium text-slate-500">AY:</span>
          <select 
            value={academicYear} 
            onChange={(e) => setAcademicYear(e.target.value)}
            className="bg-transparent text-xs font-semibold text-[#0B1F43] outline-none cursor-pointer"
          >
            <option value="2024-25">2024–2025</option>
            <option value="2025-26">2025–2026</option>
            <option value="2026-27">2026–2027</option>
          </select>
        </div>

        {/* Notifications with counter pill (matching red '5' in mockup) */}
        <div className="relative" ref={notifDropdownRef}>
          <button
            onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
            className="relative p-2 rounded-lg text-slate-600 hover:text-[#0B1F43] hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#DC3545] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 h-4 flex items-center justify-center shadow-sm animate-pulse">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotificationDropdown && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-[#0B1F43]">Notifications</span>
                  <span className="text-[11px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                    {unreadNotificationCount} unread
                  </span>
                </div>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs font-medium text-[#1769E0] hover:underline"
                >
                  Mark all as read
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div 
                    key={n.id} 
                    onClick={() => {
                      if (n.linkTarget) onNavigate(n.linkTarget);
                      setShowNotificationDropdown(false);
                    }}
                    className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${!n.read ? 'bg-sky-50/40' : ''}`}
                  >
                    <div className="mt-0.5">
                      {n.type === 'deficiency' ? (
                        <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">⚠️</div>
                      ) : n.type === 'approval' ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✓</div>
                      ) : n.type === 'evc' ? (
                        <div className="w-7 h-7 rounded-full bg-blue-100 text-[#1769E0] flex items-center justify-center text-xs">🏛️</div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs">📋</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-800 truncate">{n.title}</p>
                        <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5" /> {n.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug line-clamp-2">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Role Switcher */}
        <div className="relative" ref={roleDropdownRef}>
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2.5 p-1.5 pl-2 pr-2.5 rounded-lg border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0B1F43] to-[#1769E0] text-white flex items-center justify-center text-xs font-bold shadow-sm">
              {currentUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-[#0B1F43] leading-none flex items-center gap-1">
                {currentUser.role === 'INSTITUTION_ADMIN' ? 'Institution Admin' : 'AICTE Official'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                {currentUser.role === 'INSTITUTION_ADMIN' ? currentUser.institutionName?.split(' ')[0] : 'Scrutiny Officer'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {/* Role Switcher Menu */}
          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3.5 py-2 border-b border-slate-100 bg-slate-50/70">
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Signed In As</p>
                <p className="text-xs font-bold text-[#0B1F43] mt-0.5">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500">{currentUser.designation}</p>
              </div>

              <div className="px-3.5 py-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#1769E0] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Quick Role Switcher (SIH Demo)
                  </span>
                </div>
                <div className="space-y-1">
                  {rolesConfig.map((item) => {
                    const isSelected = currentUser.role === item.role;
                    return (
                      <button
                        key={item.role}
                        onClick={() => {
                          setRole(item.role);
                          setShowRoleDropdown(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors ${
                          isSelected 
                            ? 'bg-blue-50/80 text-[#1769E0] font-semibold border border-blue-200/60' 
                            : 'text-slate-700 hover:bg-slate-100/70'
                        }`}
                      >
                        <item.icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#1769E0]' : 'text-slate-400'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="truncate leading-tight">{item.label}</p>
                          <p className="text-[10px] text-slate-400 truncate">{item.sub}</p>
                        </div>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 text-[#1769E0] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-100 px-3.5 pt-2 mt-1 flex justify-between items-center text-xs">
                <button 
                  onClick={() => {
                    onNavigate('/public');
                    setShowRoleDropdown(false);
                  }}
                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1 py-1"
                >
                  <ExternalLink className="w-3 h-3" /> Public Portal
                </button>
                <button 
                  onClick={() => {
                    onNavigate('/public');
                    setShowRoleDropdown(false);
                  }}
                  className="text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 py-1"
                >
                  <LogOut className="w-3 h-3" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
