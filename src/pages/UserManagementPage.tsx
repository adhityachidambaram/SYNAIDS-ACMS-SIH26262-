import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  ShieldCheck, 
  Search, 
  UserCheck, 
  Key, 
  CheckCircle2, 
  Building2,
  Mail,
  Lock
} from 'lucide-react';
import { INITIAL_PROFILES } from '../data/mockData';
import { UserRole } from '../types';

export const UserManagementPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { currentUser, setRole, addToast } = useApp();
  const [usersList, setUsersList] = useState(INITIAL_PROFILES);
  const [search, setSearch] = useState('');

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase()) ||
      (u.institutionName && u.institutionName.toLowerCase().includes(search.toLowerCase()))
  );

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    addToast('Role Permissions Updated', `User permissions updated to ${newRole}.`, 'success');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E1E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider">
              Access Control &amp; RBAC
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#0B1F43] mt-1 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#1769E0]" />
            <span>User Access &amp; Administrative Roles</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Role-Based Access Control (RBAC) enforces strict boundary isolation between institution applicants, scrutiny officers, EVC peer inspection teams, and regional approving authorities.
          </p>
        </div>

        <div className="w-64 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F4F7FC] border border-[#E1E8F0] text-xs pl-9 pr-4 py-2 rounded-lg outline-none focus:bg-white focus:border-[#1769E0]"
          />
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl border border-[#E1E8F0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F4F7FC] text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-[#E1E8F0]">
              <tr>
                <th className="py-3.5 px-4">Officer / User Name</th>
                <th className="py-3.5 px-4">Designation &amp; Organization</th>
                <th className="py-3.5 px-4">Active System Role</th>
                <th className="py-3.5 px-4">Scope &amp; Clearance</th>
                <th className="py-3.5 px-4 text-center">Simulate Session</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => {
                const isCurrent = currentUser.role === u.role;
                return (
                  <tr key={u.id} className={`hover:bg-slate-50 transition-colors ${isCurrent ? 'bg-blue-50/40' : ''}`}>
                    <td className="py-3.5 px-4 font-bold text-[#0B1F43]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                          {u.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p>{u.name}</p>
                          <span className="text-[10px] text-slate-400 font-normal">{u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">{u.designation}</p>
                      <p className="text-[11px] text-slate-500">{u.institutionName || 'AICTE Headquarters'}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        u.role === 'APPROVING_OFFICIAL' ? 'bg-purple-100 text-purple-800' :
                        u.role === 'SCRUTINY_OFFICER' ? 'bg-blue-100 text-[#1769E0]' :
                        u.role === 'EVC_MEMBER' ? 'bg-amber-100 text-amber-800' :
                        u.role === 'SYSTEM_ADMIN' ? 'bg-slate-800 text-white' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{u.role === 'INSTITUTION_ADMIN' ? 'Isolated to Single College' : 'Pan-India Scrutiny Authority'}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setRole(u.role)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          isCurrent
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-[#1769E0] hover:text-white'
                        }`}
                      >
                        {isCurrent ? '✓ Active Session' : 'Switch to Role'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
