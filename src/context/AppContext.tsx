import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  UserProfile, 
  ApplicationRecord, 
  DeficiencyItem, 
  ComplianceObligation,
  RegulatoryRule,
  AuditLogEvent,
  VerificationCheck
} from '../types';
import { 
  INITIAL_PROFILES, 
  INITIAL_APPLICATIONS, 
  INITIAL_RULES, 
  INITIAL_COMPLIANCE_OBLIGATIONS, 
  INITIAL_AUDIT_LOGS 
} from '../data/mockData';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'deficiency' | 'approval' | 'evc' | 'submission' | 'info';
  linkTarget?: string;
}

interface AppContextType {
  currentUser: UserProfile;
  setRole: (role: UserRole) => void;
  applications: ApplicationRecord[];
  currentApplication: ApplicationRecord | null;
  setCurrentApplicationId: (id: string) => void;
  rules: RegulatoryRule[];
  complianceList: ComplianceObligation[];
  auditLogs: AuditLogEvent[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markAllNotificationsRead: () => void;
  academicYear: string;
  setAcademicYear: (year: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  // Workflow actions
  createNewApplication: (newApp: Partial<ApplicationRecord>) => string;
  updateApplicationStatus: (appId: string, newStatus: ApplicationRecord['currentStage'], remarks?: string) => void;
  raiseDeficiency: (appId: string, deficiency: Omit<DeficiencyItem, 'id' | 'raisedDate' | 'status'>) => void;
  resolveDeficiency: (appId: string, defId: string, response: string, newDocName?: string) => void;
  updateVerificationCheck: (appId: string, checkId: string, status: VerificationCheck['status'], remarks: string) => void;
  submitEvcReport: (evcId: string, checklist: any[], recommendation: string) => void;
  recordDecision: (appId: string, decisionType: 'Approved' | 'Rejected' | 'Returned for Correction', reason: string) => void;
  submitComplianceEvidence: (compObligationId: string, evidenceFileName: string) => void;
  addToast: (title: string, message: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
  toasts: Array<{ id: string; title: string; message: string; type: 'success' | 'warning' | 'error' | 'info' }>;
  removeToast: (id: string) => void;
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Deficiency Notice Issued',
    message: 'Scrutiny Officer raised DEF-001 on Affidavit 2 for APP-2025-00124.',
    timestamp: '2 hours ago',
    read: false,
    type: 'deficiency',
    linkTarget: '/app/deficiencies'
  },
  {
    id: 'notif-2',
    title: 'EVC Visit Scheduled',
    message: 'Expert Visiting Committee on-site visit confirmed for 28 Sep 2025.',
    timestamp: '5 hours ago',
    read: false,
    type: 'evc',
    linkTarget: '/app/evc'
  },
  {
    id: 'notif-3',
    title: 'Documents Verified',
    message: 'Land and CMDA Building Plans cleared by Scrutiny Bureau.',
    timestamp: '1 day ago',
    read: false,
    type: 'submission',
    linkTarget: '/app/scrutiny'
  },
  {
    id: 'notif-4',
    title: 'Approval Order Released',
    message: 'PQR University School of Tech granted 3-year EoA.',
    timestamp: '2 days ago',
    read: false,
    type: 'approval',
    linkTarget: '/app/approvals'
  },
  {
    id: 'notif-5',
    title: 'APH 2024-2027 Handbook Updated',
    message: 'Standing Committee published Revision v2.2 with hybrid inspection norms.',
    timestamp: '3 days ago',
    read: false,
    type: 'info',
    linkTarget: '/app/regulatory-rules'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_PROFILES[1]); // Default to Scrutiny Officer Dr. R. Kumar (like screenshot)
  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    const saved = localStorage.getItem('acms_apps');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });
  const [currentAppId, setCurrentAppId] = useState<string>('app-001');
  const [rules, setRules] = useState<RegulatoryRule[]>(INITIAL_RULES);
  const [complianceList, setComplianceList] = useState<ComplianceObligation[]>(INITIAL_COMPLIANCE_OBLIGATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEvent[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [academicYear, setAcademicYear] = useState<string>('2024-25');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; message: string; type: 'success' | 'warning' | 'error' | 'info' }>>([]);

  useEffect(() => {
    localStorage.setItem('acms_apps', JSON.stringify(applications));
  }, [applications]);

  const addToast = (title: string, message: string, type: 'success' | 'warning' | 'error' | 'info' = 'success') => {
    const id = 'toast-' + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setRole = (role: UserRole) => {
    const found = INITIAL_PROFILES.find((p) => p.role === role);
    if (found) {
      setCurrentUser(found);
      addToast('Role Switched', `Active session updated to ${found.name} (${found.designation})`, 'info');
    }
  };

  const currentApplication = applications.find((a) => a.id === currentAppId) || applications[0] || null;

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Notifications Cleared', 'All notifications marked as read', 'info');
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const createNewApplication = (data: Partial<ApplicationRecord>): string => {
    const newId = `app-${Date.now().toString().slice(-4)}`;
    const newAppNumber = `APP-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newRecord: ApplicationRecord = {
      id: newId,
      applicationNumber: newAppNumber,
      institutionId: currentUser.institutionId || 'inst-001',
      institutionName: data.institutionName || currentUser.institutionName || 'ABC Institute of Technology',
      institutionType: data.institutionType || 'Private - Self Financing',
      state: data.state || 'Tamil Nadu',
      district: data.district || 'Chennai',
      address: data.address || 'Campus Avenue, Knowledge City',
      contactPerson: data.contactPerson || currentUser.name,
      contactEmail: data.contactEmail || currentUser.email,
      contactPhone: data.contactPhone || '+91 98400 12345',
      aisheCode: data.aisheCode || 'C-49201',
      applicationType: data.applicationType || 'New Institute / New Program',
      academicYear: data.academicYear || '2026 - 2027',
      submissionDate: new Date().toLocaleString(),
      currentStage: 'Submitted',
      assignedOfficer: 'Dr. R. Kumar',
      lastUpdated: 'Just now',
      programs: data.programs || [
        { id: 'p1', name: 'Computer Science & Engineering', level: 'UG', discipline: 'Engineering & Technology', existingIntake: 0, proposedIntake: 120, durationYears: 4 }
      ],
      documents: data.documents || [],
      verificationChecks: [
        {
          id: `chk-land-${Date.now()}`,
          name: 'Land Contiguity & Title Ownership Verification',
          requirementId: 'REQ-LAND-01',
          ruleReference: 'APH 2024-27 Clause 1.4',
          status: 'Not Started',
          automatedResult: true,
          remarks: 'Pending scrutiny officer review',
          timestamp: new Date().toLocaleTimeString(),
          dependentDocumentId: 'doc-001'
        },
        {
          id: `chk-bld-${Date.now()}`,
          name: 'CMDA / Municipal Building Plan Approval Check',
          requirementId: 'REQ-BLD-02',
          ruleReference: 'APH 2024-27 Clause 2.3',
          status: 'Not Started',
          automatedResult: true,
          remarks: 'Pending scrutiny officer review',
          timestamp: new Date().toLocaleTimeString(),
          dependentDocumentId: 'doc-002'
        }
      ],
      deficiencies: []
    };

    setApplications((prev) => [newRecord, ...prev]);
    setCurrentAppId(newId);

    // Audit log
    const newAudit: AuditLogEvent = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      actor: currentUser.name,
      role: currentUser.role,
      action: 'APPLICATION_CREATED_AND_SUBMITTED',
      entityType: 'Application',
      entityId: newAppNumber,
      details: `New application created for ${newRecord.institutionName} with ${newRecord.programs.length} program(s).`,
      hash: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
    };
    setAuditLogs((prev) => [newAudit, ...prev]);
    addToast('Application Submitted', `Application ${newAppNumber} registered and queued for scrutiny.`, 'success');
    return newId;
  };

  const updateApplicationStatus = (appId: string, newStatus: ApplicationRecord['currentStage'], remarks?: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            currentStage: newStatus,
            lastUpdated: 'Just now'
          };
        }
        return app;
      })
    );

    const targetApp = applications.find((a) => a.id === appId);
    if (targetApp) {
      const newAudit: AuditLogEvent = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        actor: currentUser.name,
        role: currentUser.role,
        action: `STATUS_UPDATED_${newStatus.toUpperCase().replace(/\s+/g, '_')}`,
        entityType: 'Application',
        entityId: targetApp.applicationNumber,
        details: remarks || `Application stage progressed to ${newStatus}.`,
        hash: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
      };
      setAuditLogs((prev) => [newAudit, ...prev]);
    }

    addToast('Status Updated', `Application moved to ${newStatus}`, 'info');
  };

  const raiseDeficiency = (appId: string, deficiencyData: Omit<DeficiencyItem, 'id' | 'raisedDate' | 'status'>) => {
    const newDefId = `DEF-2025-${Math.floor(100 + Math.random() * 900)}`;
    const newDef: DeficiencyItem = {
      ...deficiencyData,
      id: newDefId,
      raisedDate: new Date().toLocaleString(),
      status: 'Open'
    };

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            currentStage: 'Deficiency Raised',
            lastUpdated: 'Just now',
            deficiencies: [newDef, ...(app.deficiencies || [])]
          };
        }
        return app;
      })
    );

    const targetApp = applications.find((a) => a.id === appId);
    if (targetApp) {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: `Deficiency Raised on ${targetApp.applicationNumber}`,
          message: `${deficiencyData.requirementName}: ${deficiencyData.description}`,
          timestamp: 'Just now',
          read: false,
          type: 'deficiency',
          linkTarget: '/app/deficiencies'
        },
        ...prev
      ]);

      const newAudit: AuditLogEvent = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        actor: currentUser.name,
        role: currentUser.role,
        action: 'DEFICIENCY_ISSUED',
        entityType: 'Deficiency',
        entityId: newDefId,
        details: `Deficiency issued for ${deficiencyData.requirementName}: "${deficiencyData.description}"`,
        hash: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
      };
      setAuditLogs((prev) => [newAudit, ...prev]);
    }

    addToast('Deficiency Issued', `Notice ${newDefId} dispatched to institution administrator.`, 'warning');
  };

  const resolveDeficiency = (appId: string, defId: string, response: string, newDocName?: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const updatedDefs = app.deficiencies.map((d) => {
            if (d.id === defId) {
              return {
                ...d,
                status: 'Resolved' as const,
                institutionResponse: response,
                resubmittedEvidenceName: newDocName || 'Corrected_Notarized_Affidavit_v2.pdf',
                resolutionDate: new Date().toLocaleString(),
                resolutionNotes: 'Verified and cleared by scrutiny bureau after re-examination.'
              };
            }
            return d;
          });

          // Check if any open deficiency remains
          const hasRemainingOpen = updatedDefs.some((d) => d.status === 'Open' || d.status === 'Response Submitted');

          return {
            ...app,
            currentStage: hasRemainingOpen ? 'Deficiency Raised' : 'Documents Verified',
            lastUpdated: 'Just now',
            deficiencies: updatedDefs
          };
        }
        return app;
      })
    );

    addToast('Deficiency Resolved', `Response submitted and verified. Status updated to Documents Verified.`, 'success');
  };

  const updateVerificationCheck = (appId: string, checkId: string, status: VerificationCheck['status'], remarks: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const updatedChecks = app.verificationChecks.map((chk) => {
            if (chk.id === checkId) {
              return {
                ...chk,
                status,
                remarks,
                reviewedBy: currentUser.name,
                timestamp: new Date().toLocaleTimeString()
              };
            }
            return chk;
          });
          return {
            ...app,
            verificationChecks: updatedChecks,
            lastUpdated: 'Just now'
          };
        }
        return app;
      })
    );

    addToast('Verification Updated', `Check marked as ${status}`, 'success');
  };

  const submitEvcReport = (evcId: string, checklist: any[], recommendation: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.evcCase && app.evcCase.id === evcId) {
          return {
            ...app,
            currentStage: 'Ready for Decision',
            lastUpdated: 'Just now',
            evcCase: {
              ...app.evcCase,
              status: 'Report Submitted',
              checklist: checklist,
              recommendations: recommendation,
              reportSubmittedDate: new Date().toLocaleDateString()
            }
          };
        }
        return app;
      })
    );

    addToast('EVC Inspection Report Submitted', 'Case forwarded to Regional Approving Authority for final decision.', 'success');
  };

  const recordDecision = (appId: string, decisionType: 'Approved' | 'Rejected' | 'Returned for Correction', reason: string) => {
    const orderNumber = `F.No. Western/1-RO-${Math.floor(10000000 + Math.random() * 90000000)}/2026/ACMS`;
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            currentStage: decisionType,
            lastUpdated: 'Just now',
            decision: {
              type: decisionType,
              date: new Date().toLocaleDateString(),
              officer: `${currentUser.name} (${currentUser.designation})`,
              orderNumber,
              reason,
              validityPeriod: decisionType === 'Approved' ? 'Academic Years 2026-27 to 2028-29' : 'N/A'
            }
          };
        }
        return app;
      })
    );

    const targetApp = applications.find((a) => a.id === appId);
    if (targetApp) {
      const newAudit: AuditLogEvent = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        actor: currentUser.name,
        role: currentUser.role,
        action: `DECISION_${decisionType.toUpperCase()}`,
        entityType: 'Application',
        entityId: targetApp.applicationNumber,
        details: `Official Order ${orderNumber} generated. Reason: ${reason}`,
        hash: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
      };
      setAuditLogs((prev) => [newAudit, ...prev]);

      // If approved, create initial compliance obligations
      if (decisionType === 'Approved') {
        const newComp: ComplianceObligation = {
          id: `comp-${Date.now()}`,
          applicationId: targetApp.id,
          applicationRef: targetApp.applicationNumber,
          institutionName: targetApp.institutionName,
          title: 'Mandatory Disclosure & AICTE Faculty Verification Report 2026-27',
          ruleClause: 'APH 2024-27 Clause 10.4',
          dueDate: '2026-03-31',
          assignedOwner: 'Registrar, ' + targetApp.institutionName,
          status: 'Due Soon',
          lastUpdated: 'Just now'
        };
        setComplianceList((prev) => [newComp, ...prev]);
      }
    }

    addToast(
      `Decision Executed: ${decisionType}`,
      `Order ${orderNumber} generated with digital signature seal.`,
      decisionType === 'Approved' ? 'success' : 'warning'
    );
  };

  const submitComplianceEvidence = (compObligationId: string, evidenceFileName: string) => {
    setComplianceList((prev) =>
      prev.map((c) => {
        if (c.id === compObligationId) {
          return {
            ...c,
            status: 'Awaiting Review',
            submittedEvidenceName: evidenceFileName,
            lastUpdated: 'Just now'
          };
        }
        return c;
      })
    );

    addToast('Compliance Evidence Submitted', `File ${evidenceFileName} uploaded and sent to regulatory compliance cell.`, 'success');
  };

  const resetAllDemoData = () => {
    localStorage.removeItem('acms_apps');
    setApplications(INITIAL_APPLICATIONS);
    setComplianceList(INITIAL_COMPLIANCE_OBLIGATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentAppId('app-001');
    addToast('Demo State Reset', 'Default AICTE seed records restored', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setRole,
        applications,
        currentApplication,
        setCurrentApplicationId: setCurrentAppId,
        rules,
        complianceList,
        auditLogs,
        notifications,
        unreadNotificationCount,
        markAllNotificationsRead,
        academicYear,
        setAcademicYear,
        searchQuery,
        setSearchQuery,
        createNewApplication,
        updateApplicationStatus,
        raiseDeficiency,
        resolveDeficiency,
        updateVerificationCheck,
        submitEvcReport,
        recordDecision,
        submitComplianceEvidence,
        addToast,
        toasts,
        removeToast,
        resetAllDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
