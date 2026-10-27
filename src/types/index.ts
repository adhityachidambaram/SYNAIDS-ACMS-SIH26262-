export type UserRole = 
  | 'INSTITUTION_ADMIN' 
  | 'SCRUTINY_OFFICER' 
  | 'EVC_MEMBER' 
  | 'APPROVING_OFFICIAL' 
  | 'SYSTEM_ADMIN';

export type ApplicationStatus = 
  | 'Draft'
  | 'Submitted'
  | 'Under Scrutiny'
  | 'Documents Verified'
  | 'Deficiency Raised'
  | 'Resubmitted'
  | 'EVC Required'
  | 'EVC Scheduled'
  | 'EVC Report Submitted'
  | 'Ready for Decision'
  | 'Approved'
  | 'Rejected'
  | 'Returned for Correction'
  | 'Withdrawn';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation: string;
  institutionId?: string;
  institutionName?: string;
  avatar?: string;
}

export interface ApplicationProgram {
  id: string;
  name: string;
  level: 'UG' | 'PG' | 'Diploma';
  discipline: string;
  existingIntake: number;
  proposedIntake: number;
  durationYears: number;
}

export interface DocumentExtraction {
  documentType: string;
  issueDate: string;
  validTill: string;
  issuingAuthority: string;
  confidenceScore: number;
  extractedFields: Record<string, string>;
  rawSnippet: string;
}

export interface EvidenceDocument {
  id: string;
  requirementId: string;
  requirementName: string;
  category: 'Land' | 'Building' | 'Safety' | 'Faculty' | 'Affidavit' | 'Financial';
  originalFileName: string;
  fileSize: string;
  fileType: string;
  version: number;
  uploadDate: string;
  uploadedBy: string;
  status: 'Uploaded' | 'Processing' | 'Extracted' | 'Verified' | 'Deficiency' | 'Under Review';
  ocrExtraction?: DocumentExtraction;
  remarks?: string;
  hash: string;
}

export interface VerificationCheck {
  id: string;
  name: string;
  requirementId: string;
  ruleReference: string;
  status: 'Verified' | 'Deficiency' | 'Under Review' | 'Not Started' | 'Preserved';
  automatedResult: boolean;
  remarks: string;
  reviewedBy?: string;
  timestamp: string;
  dependentDocumentId: string;
}

export interface DeficiencyItem {
  id: string;
  applicationId: string;
  applicationRef: string;
  institutionName: string;
  requirementName: string;
  severity: 'Critical' | 'Major' | 'Minor';
  description: string;
  raisedBy: string;
  raisedDate: string;
  dueDate: string;
  status: 'Open' | 'Response Submitted' | 'Under Review' | 'Resolved' | 'Closed';
  institutionResponse?: string;
  resubmittedEvidenceId?: string;
  resubmittedEvidenceName?: string;
  resolutionNotes?: string;
  resolutionDate?: string;
}

export interface EvcCase {
  id: string;
  applicationId: string;
  applicationRef: string;
  institutionName: string;
  address: string;
  scheduledDate: string;
  scheduledTime: string;
  mode: 'Physical On-Site' | 'Hybrid / Online';
  committeeMembers: { name: string; role: string; institution: string }[];
  coordinatorName: string;
  status: 'Scheduled' | 'In Progress' | 'Report Submitted' | 'Clearance Granted' | 'Deficiencies Noted';
  checklist: {
    id: string;
    category: string;
    item: string;
    compliant: boolean | null;
    observations: string;
  }[];
  recommendations?: string;
  reportSubmittedDate?: string;
}

export interface ComplianceObligation {
  id: string;
  applicationId: string;
  applicationRef: string;
  institutionName: string;
  title: string;
  ruleClause: string;
  dueDate: string;
  assignedOwner: string;
  status: 'Completed' | 'Pending' | 'Due Soon' | 'Overdue' | 'Awaiting Review';
  submittedEvidenceName?: string;
  lastUpdated: string;
}

export interface RegulatoryRule {
  id: string;
  code: string;
  title: string;
  handbookVersion: string;
  effectiveDate: string;
  status: 'Active' | 'Amended' | 'Draft' | 'Deprecated';
  applicablePrograms: string[];
  description: string;
  requirementsCount: number;
  lastAmendedBy: string;
  changelogSummary: string;
}

export interface AuditLogEvent {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  hash: string;
}

export interface ApplicationRecord {
  id: string;
  applicationNumber: string;
  institutionId: string;
  institutionName: string;
  institutionType: string;
  state: string;
  district: string;
  address: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  aisheCode: string;
  applicationType: string;
  academicYear: string;
  submissionDate: string;
  currentStage: ApplicationStatus;
  assignedOfficer: string;
  programs: ApplicationProgram[];
  documents: EvidenceDocument[];
  verificationChecks: VerificationCheck[];
  deficiencies: DeficiencyItem[];
  evcCase?: EvcCase;
  decision?: {
    type: 'Approved' | 'Rejected' | 'Returned for Correction';
    date: string;
    officer: string;
    orderNumber: string;
    reason: string;
    validityPeriod: string;
  };
  lastUpdated: string;
}
