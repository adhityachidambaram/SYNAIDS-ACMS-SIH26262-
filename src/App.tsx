import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { RoleSwitcherBanner } from './components/common/RoleSwitcherBanner';
import { ToastContainer } from './components/common/Toast';

// Pages
import { PublicLanding } from './pages/PublicLanding';
import { Dashboard } from './pages/Dashboard';
import { ApplicationsList } from './pages/ApplicationsList';
import { NewApplicationWizard } from './pages/NewApplicationWizard';
import { ScrutinyWorkspace } from './pages/ScrutinyWorkspace';
import { DeficienciesPage } from './pages/DeficienciesPage';
import { EvcManagement } from './pages/EvcManagement';
import { ApprovalsPage } from './pages/ApprovalsPage';
import { CompliancePage } from './pages/CompliancePage';
import { RoegGraphPage } from './pages/RoegGraphPage';
import { IncrementalRescrutinyPage } from './pages/IncrementalRescrutinyPage';
import { RegulatoryRulesPage } from './pages/RegulatoryRulesPage';
import { InstitutionsDirectory } from './pages/InstitutionsDirectory';
import { ReportsPage } from './pages/ReportsPage';
import { AuditTrailPage } from './pages/AuditTrailPage';
import { UserManagementPage } from './pages/UserManagementPage';
import { UserRole } from './types';

const MainLayout: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('/app/dashboard');
  const { setRole } = useApp();

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnterFromPublic = (role?: UserRole) => {
    if (role) {
      setRole(role);
    }
    setCurrentRoute('/app/dashboard');
  };

  // If on public portal landing
  if (currentRoute === '/public') {
    return (
      <div className="min-h-screen bg-[#F4F7FC]">
        <PublicLanding onEnterApp={handleEnterFromPublic} />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex flex-col font-sans">
      {/* 1. Evaluation Role Switcher & Demo Tour Bar */}
      <RoleSwitcherBanner onNavigate={handleNavigate} />

      {/* 2. Top Header matching reference image */}
      <Header onNavigate={handleNavigate} />

      {/* 3. Main Workspace with Persistent Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar currentRoute={currentRoute} onNavigate={handleNavigate} />

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto min-w-0 bg-[#F4F7FC]">
          {currentRoute === '/app/dashboard' && <Dashboard onNavigate={handleNavigate} />}
          {currentRoute === '/app/applications' && <ApplicationsList onNavigate={handleNavigate} />}
          {currentRoute === '/app/new-application' && <NewApplicationWizard onNavigate={handleNavigate} />}
          {currentRoute === '/app/documents-ocr' && <NewApplicationWizard onNavigate={handleNavigate} />}
          {currentRoute === '/app/scrutiny' && <ScrutinyWorkspace onNavigate={handleNavigate} />}
          {currentRoute === '/app/deficiencies' && <DeficienciesPage onNavigate={handleNavigate} />}
          {currentRoute === '/app/evc' && <EvcManagement onNavigate={handleNavigate} />}
          {currentRoute === '/app/approvals' && <ApprovalsPage onNavigate={handleNavigate} />}
          {currentRoute === '/app/compliance' && <CompliancePage onNavigate={handleNavigate} />}
          {currentRoute === '/app/roeg-graph' && <RoegGraphPage onNavigate={handleNavigate} />}
          {currentRoute === '/app/rescrutiny' && <IncrementalRescrutinyPage onNavigate={handleNavigate} />}
          {currentRoute === '/app/regulatory-rules' && <RegulatoryRulesPage onNavigate={handleNavigate} />}
          {currentRoute === '/app/institutions' && <InstitutionsDirectory onNavigate={handleNavigate} />}
          {currentRoute === '/app/reports' && <ReportsPage onNavigate={handleNavigate} />}
          {currentRoute === '/app/audit-trail' && <AuditTrailPage onNavigate={handleNavigate} />}
          {currentRoute === '/app/users' && <UserManagementPage onNavigate={handleNavigate} />}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
