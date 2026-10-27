import { 
  ApplicationRecord, 
  UserProfile, 
  RegulatoryRule, 
  ComplianceObligation, 
  AuditLogEvent 
} from '../types';

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'user-inst-admin',
    name: 'Dr. S. Ramanathan',
    email: 'registrar@abctech.edu.in',
    role: 'INSTITUTION_ADMIN',
    designation: 'Registrar & Head of Compliance',
    institutionId: 'inst-001',
    institutionName: 'ABC Institute of Technology',
  },
  {
    id: 'user-scrutiny-officer',
    name: 'Dr. R. Kumar',
    email: 'r.kumar@aicte-india.gov.in',
    role: 'SCRUTINY_OFFICER',
    designation: 'Senior Scrutiny Officer (Southern Region)',
    institutionName: 'AICTE Headquarters, New Delhi',
  },
  {
    id: 'user-evc-member',
    name: 'Prof. S. Sharma',
    email: 's.sharma@iitd.ac.in',
    role: 'EVC_MEMBER',
    designation: 'Chairman, Expert Visiting Committee',
    institutionName: 'IIT Delhi & AICTE Panel',
  },
  {
    id: 'user-approving-official',
    name: 'Dr. V. Nair',
    email: 'member.secretary@aicte-india.gov.in',
    role: 'APPROVING_OFFICIAL',
    designation: 'Authorized Regional Officer & Member Secretary',
    institutionName: 'AICTE Approval Bureau',
  },
  {
    id: 'user-system-admin',
    name: 'Er. A. K. Verma',
    email: 'admin.egov@aicte-india.gov.in',
    role: 'SYSTEM_ADMIN',
    designation: 'Director (e-Governance & Systems)',
    institutionName: 'AICTE e-Governance Cell',
  }
];

export const INITIAL_RULES: RegulatoryRule[] = [
  {
    id: 'rule-aph-2024-v2.2',
    code: 'APH-2024-27-v2.2',
    title: 'AICTE Approval Process Handbook (APH 2024-2027) - Rev 2.2',
    handbookVersion: 'v2.2 (Current Active)',
    effectiveDate: '2024-11-01',
    status: 'Active',
    applicablePrograms: ['Engineering & Technology', 'Management', 'MCA', 'Pharmacy', 'Architecture'],
    description: 'Mandatory norms for land ownership, built-up carpet area, faculty-cadre ratio (1:15/1:20), Divyangjan accessibility, and digital infrastructure.',
    requirementsCount: 18,
    lastAmendedBy: 'AICTE Standing Committee on Norms',
    changelogSummary: 'Added provisions for Hybrid EVC inspections and flexible intake adjustment for autonomous institutions with NAAC A++ / NIRF Top 100.'
  },
  {
    id: 'rule-aph-2024-v2.1',
    code: 'APH-2024-27-v2.1',
    title: 'AICTE Approval Process Handbook (APH 2024-2027) - Rev 2.1',
    handbookVersion: 'v2.1 (Superseded)',
    effectiveDate: '2024-04-15',
    status: 'Amended',
    applicablePrograms: ['Engineering & Technology', 'Management', 'MCA'],
    description: 'Standard regulations for initial approval, extension of approval (EoA), and introduction of new supernumerary seats.',
    requirementsCount: 16,
    lastAmendedBy: 'AICTE Executive Committee',
    changelogSummary: 'Initial rollout for the 2024-2027 triennium approval cycle.'
  }
];

export const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'app-001',
    applicationNumber: 'APP-2025-00124',
    institutionId: 'inst-001',
    institutionName: 'ABC Institute of Technology',
    institutionType: 'Private - Self Financing',
    state: 'Tamil Nadu',
    district: 'Chennai',
    address: '123, University Road, Chennai, Tamil Nadu - 600025',
    contactPerson: 'Dr. S. Ramanathan',
    contactEmail: 'registrar@abctech.edu.in',
    contactPhone: '+91 94441 23456',
    aisheCode: 'C-24589',
    applicationType: 'New Institute / New Program',
    academicYear: '2026 - 2027',
    submissionDate: '2025-09-14 10:30 AM',
    currentStage: 'Under Scrutiny',
    assignedOfficer: 'Dr. R. Kumar',
    lastUpdated: '2 hours ago',
    programs: [
      { id: 'prog-1', name: 'Computer Science & Engineering', level: 'UG', discipline: 'Engineering & Technology', existingIntake: 0, proposedIntake: 180, durationYears: 4 },
      { id: 'prog-2', name: 'Artificial Intelligence & Data Science', level: 'UG', discipline: 'Engineering & Technology', existingIntake: 0, proposedIntake: 60, durationYears: 4 },
      { id: 'prog-3', name: 'Electronics & Communication Engineering', level: 'UG', discipline: 'Engineering & Technology', existingIntake: 0, proposedIntake: 120, durationYears: 4 }
    ],
    documents: [
      {
        id: 'doc-001',
        requirementId: 'REQ-LAND-01',
        requirementName: 'Land Ownership Certificate',
        category: 'Land',
        originalFileName: 'Land_Ownership_Deed_SubRegistrar_Signed.pdf',
        fileSize: '4.2 MB',
        fileType: 'application/pdf',
        version: 1,
        uploadDate: '2025-09-14 09:15 AM',
        uploadedBy: 'Dr. S. Ramanathan',
        status: 'Verified',
        remarks: 'Valid title deed in name of applicant educational trust registered for 99+ years.',
        hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        ocrExtraction: {
          documentType: 'Land Ownership Certificate',
          issueDate: '12-05-2018',
          validTill: 'Perpetual / 99 Years Lease',
          issuingAuthority: 'Sub Registrar, Chennai South',
          confidenceScore: 0.98,
          extractedFields: {
            'Survey Number': '451/2A & 451/2B',
            'Total Land Area': '7.5 Acres (Contiguous)',
            'Land Category': 'Educational Institutional Zone',
            'Encumbrance Status': 'Nil / Clear Title'
          },
          rawSnippet: 'This is to certify that ABC Educational Trust holds contiguous land of 7.5 Acres under S.No 451/2A, registered under Book 1, Volume 412, Sub-Registrar Office, Chennai.'
        }
      },
      {
        id: 'doc-002',
        requirementId: 'REQ-BLD-02',
        requirementName: 'Approved Building Plan',
        category: 'Building',
        originalFileName: 'CMDA_Approved_Building_Plan_Layout.pdf',
        fileSize: '8.7 MB',
        fileType: 'application/pdf',
        version: 1,
        uploadDate: '2025-09-14 09:22 AM',
        uploadedBy: 'Dr. S. Ramanathan',
        status: 'Verified',
        remarks: 'Approved by CMDA with built-up carpet area of 14,250 sq.m exceeding APH norm of 11,200 sq.m.',
        hash: 'b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78',
        ocrExtraction: {
          documentType: 'Approved Building Plan',
          issueDate: '24-01-2022',
          validTill: 'Perpetual',
          issuingAuthority: 'Chennai Metropolitan Development Authority (CMDA)',
          confidenceScore: 0.96,
          extractedFields: {
            'Approval Number': 'CMDA/REG/2022/BLD/00918',
            'Total Built-up Area': '14,250 sq. meters',
            'Instructional Area': '8,400 sq. meters',
            'Administrative Area': '2,200 sq. meters',
            'Amenities Area': '3,650 sq. meters'
          },
          rawSnippet: 'Sanction is accorded for Institutional Academic Blocks A, B & C with G+3 floors, total built-up 14,250 sq.m compliant with TNCDBR 2019.'
        }
      },
      {
        id: 'doc-003',
        requirementId: 'REQ-AFF-03',
        requirementName: 'AICTE Mandatory Affidavits (1, 2 & 3)',
        category: 'Affidavit',
        originalFileName: 'Notarized_Affidavit_Trustees.pdf',
        fileSize: '2.1 MB',
        fileType: 'application/pdf',
        version: 1,
        uploadDate: '2025-09-14 09:35 AM',
        uploadedBy: 'Dr. S. Ramanathan',
        status: 'Deficiency',
        remarks: 'Affidavit 2 notarization seal is faint; page 4 signature missing witness authentication stamp.',
        hash: '7a5f6e8d9c2b1a3e5f4d8c7b9a2e4f6d8c0b2a4e6f8d0c2b4a6e8f0d2c4b6a8e',
        ocrExtraction: {
          documentType: 'Notarized Affidavit',
          issueDate: '02-09-2025',
          validTill: 'Academic Session 2026-27',
          issuingAuthority: 'Notary Public, Govt of India, Chennai',
          confidenceScore: 0.82,
          extractedFields: {
            'Notary Advocate': 'Adv. K. Swaminathan (Reg No. 8912/TN)',
            'Stamp Paper Value': 'INR 100 Non-Judicial',
            'Clause 4.1 Anti-Ragging': 'Undertaken and committed',
            'Clause 6.3 Capitation Fee': 'Explicitly prohibited'
          },
          rawSnippet: 'We hereby solemnly affirm that ABC Educational Trust shall strictly abide by AICTE Regulations 2024 and no capitation fees shall be levied.'
        }
      },
      {
        id: 'doc-004',
        requirementId: 'REQ-FAC-04',
        requirementName: 'Faculty List & Cadre Ratio Matrix',
        category: 'Faculty',
        originalFileName: 'Faculty_Cadre_Matrix_2026.pdf',
        fileSize: '1.8 MB',
        fileType: 'application/pdf',
        version: 1,
        uploadDate: '2025-09-14 09:40 AM',
        uploadedBy: 'Dr. S. Ramanathan',
        status: 'Under Review',
        remarks: 'Cadre ratio 1:2:6 analysis underway for proposed 360 total intake.',
        hash: '1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
        ocrExtraction: {
          documentType: 'Faculty Cadre & Bio-Data Matrix',
          issueDate: '10-09-2025',
          validTill: 'Current Year',
          issuingAuthority: 'Governing Council, ABC Institute',
          confidenceScore: 0.94,
          extractedFields: {
            'Total Proposed Faculty': '24 Members',
            'Professors': '3 Ph.D Holders',
            'Associate Professors': '6 Ph.D/M.Tech',
            'Assistant Professors': '15 M.Tech Holders',
            'Faculty-Student Ratio': '1:15 Computed'
          },
          rawSnippet: 'Consolidated list of faculty recruited via AICTE Selection Committee norm with qualifications verified against AICTE Gazette.'
        }
      },
      {
        id: 'doc-005',
        requirementId: 'REQ-INFRA-05',
        requirementName: 'Infrastructure & Lab Equipment Readiness',
        category: 'Building',
        originalFileName: 'Computer_Center_and_Core_Labs_Report.pdf',
        fileSize: '5.4 MB',
        fileType: 'application/pdf',
        version: 1,
        uploadDate: '2025-09-14 09:48 AM',
        uploadedBy: 'Dr. S. Ramanathan',
        status: 'Under Review',
        remarks: 'Pending on-site EVC inspection for broadband bandwidth and core servers.',
        hash: 'f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8',
        ocrExtraction: {
          documentType: 'Infrastructure Readiness Certificate',
          issueDate: '05-09-2025',
          validTill: '2026-27',
          issuingAuthority: 'Chartered Engineer / Board of Governors',
          confidenceScore: 0.91,
          extractedFields: {
            'Computers Installed': '320 High-End Core i7 Workstations',
            'Internet Bandwidth': '1 Gbps 1:1 Dedicated Leased Line',
            'Central Library Volumes': '12,400 Volumes (3,800 Titles)',
            'Language Lab': '60 Consoles operational'
          },
          rawSnippet: 'Equipment inventory and purchase invoices verified against AICTE prescribed curriculum requirements.'
        }
      }
    ],
    verificationChecks: [
      {
        id: 'chk-01',
        name: 'Land Contiguity & Ownership Verification',
        requirementId: 'REQ-LAND-01',
        ruleReference: 'APH 2024-27 Clause 1.4.1',
        status: 'Verified',
        automatedResult: true,
        remarks: '7.5 Acres exceeds minimum 5.0 Acres for Mega/Metro category. Ownership deed clear.',
        reviewedBy: 'Dr. R. Kumar',
        timestamp: '2025-09-14 11:10 AM',
        dependentDocumentId: 'doc-001'
      },
      {
        id: 'chk-02',
        name: 'Carpet Built-up Area & Structural Stability',
        requirementId: 'REQ-BLD-02',
        ruleReference: 'APH 2024-27 Clause 2.3.2',
        status: 'Verified',
        automatedResult: true,
        remarks: '14,250 sq.m verified with CMDA planning permit and registered Structural Engineer stability certificate.',
        reviewedBy: 'Dr. R. Kumar',
        timestamp: '2025-09-14 11:25 AM',
        dependentDocumentId: 'doc-002'
      },
      {
        id: 'chk-03',
        name: 'Affidavits Completeness & Notarization',
        requirementId: 'REQ-AFF-03',
        ruleReference: 'APH 2024-27 Appendix 1',
        status: 'Deficiency',
        automatedResult: false,
        remarks: 'Missing authenticated stamp on signature block of Affidavit 2. Defective submission.',
        reviewedBy: 'Dr. R. Kumar',
        timestamp: '2025-09-14 11:40 AM',
        dependentDocumentId: 'doc-003'
      },
      {
        id: 'chk-04',
        name: 'Faculty Cadre Ratio (1:2:6)',
        requirementId: 'REQ-FAC-04',
        ruleReference: 'APH 2024-27 Clause 7.1',
        status: 'Under Review',
        automatedResult: true,
        remarks: 'Roster matches requirements for 3 departments; awaiting Aadhaar-linked verification.',
        timestamp: '2025-09-14 11:45 AM',
        dependentDocumentId: 'doc-004'
      },
      {
        id: 'chk-05',
        name: 'Barrier-Free Divyangjan Accessibility',
        requirementId: 'REQ-INFRA-05',
        ruleReference: 'APH 2024-27 Clause 5.6',
        status: 'Not Started',
        automatedResult: false,
        remarks: 'Requires inspection of lifts, tactile paving, and dedicated disabled restrooms by EVC team.',
        timestamp: '2025-09-14 11:50 AM',
        dependentDocumentId: 'doc-005'
      }
    ],
    deficiencies: [
      {
        id: 'def-001',
        applicationId: 'app-001',
        applicationRef: 'APP-2025-00124',
        institutionName: 'ABC Institute of Technology',
        requirementName: 'AICTE Mandatory Affidavits (Affidavit 2)',
        severity: 'Major',
        description: 'Page 4 of Notarized Affidavit 2 does not bear the seal and registration number of the Notary Public at the bottom execution clause.',
        raisedBy: 'Dr. R. Kumar (Scrutiny Officer)',
        raisedDate: '2025-09-14 11:45 AM',
        dueDate: '2025-09-24',
        status: 'Open',
        institutionResponse: '',
        resolutionNotes: ''
      }
    ]
  },
  {
    id: 'app-002',
    applicationNumber: 'APP-2025-00123',
    institutionId: 'inst-002',
    institutionName: 'XYZ Engineering College',
    institutionType: 'Govt. Aided Autonomous',
    state: 'Maharashtra',
    district: 'Pune',
    address: 'Sector 4, Hinjawadi Tech Park, Pune - 411057',
    contactPerson: 'Dr. M. P. Joshi',
    contactEmail: 'principal@xyzpune.ac.in',
    contactPhone: '+91 98220 98765',
    aisheCode: 'C-18402',
    applicationType: 'Increase in Intake / Extension of Approval',
    academicYear: '2026 - 2027',
    submissionDate: '2025-09-10 02:15 PM',
    currentStage: 'Documents Verified',
    assignedOfficer: 'Dr. R. Kumar',
    lastUpdated: '5 hours ago',
    programs: [
      { id: 'prog-201', name: 'Information Technology', level: 'UG', discipline: 'Engineering & Technology', existingIntake: 120, proposedIntake: 180, durationYears: 4 },
      { id: 'prog-202', name: 'Mechanical & Automation Engineering', level: 'UG', discipline: 'Engineering & Technology', existingIntake: 60, proposedIntake: 60, durationYears: 4 }
    ],
    documents: [],
    verificationChecks: [],
    deficiencies: [],
    evcCase: {
      id: 'evc-001',
      applicationId: 'app-002',
      applicationRef: 'APP-2025-00123',
      institutionName: 'XYZ Engineering College',
      address: 'Sector 4, Hinjawadi Tech Park, Pune - 411057',
      scheduledDate: '2025-09-28',
      scheduledTime: '10:00 AM IST',
      mode: 'Physical On-Site',
      coordinatorName: 'Prof. S. Sharma',
      committeeMembers: [
        { name: 'Prof. S. Sharma', role: 'Chairman', institution: 'IIT Delhi' },
        { name: 'Prof. Anjali Deshmukh', role: 'Subject Expert (IT)', institution: 'COEP Tech University' },
        { name: 'Er. R. K. Patwardhan', role: 'Architect Expert', institution: 'Council of Architecture Nominee' }
      ],
      status: 'Scheduled',
      checklist: [
        { id: 'evc-c1', category: 'Physical Infrastructure', item: 'Verification of Additional Computer Labs (120 terminals)', compliant: true, observations: 'Pre-check completed; cabling and air-conditioning verified.' },
        { id: 'evc-c2', category: 'Library & Learning Resources', item: 'IEEE Xplore / ScienceDirect Digital Subscriptions', compliant: true, observations: 'Active institutional IP subscription confirmed.' },
        { id: 'evc-c3', category: 'Safety & Environment', item: 'Fire Hydrant Coverage & Municipal NOC', compliant: null, observations: 'Pending on-site pump discharge test.' },
        { id: 'evc-c4', category: 'Divyangjan Facilities', item: 'Braille Signage & Elevator Accessibility', compliant: null, observations: 'To be physically inspected on visit day.' }
      ]
    }
  },
  {
    id: 'app-003',
    applicationNumber: 'APP-2025-00122',
    institutionId: 'inst-003',
    institutionName: 'LMN Polytechnic Institute',
    institutionType: 'Private - Self Financing',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    address: 'Outer Ring Road, Marathahalli, Bengaluru - 560037',
    contactPerson: 'Prof. K. Venkatesh',
    contactEmail: 'director@lmnpoly.edu.in',
    contactPhone: '+91 99000 11223',
    aisheCode: 'C-31908',
    applicationType: 'Introduction of New Course (Diploma in EV Tech)',
    academicYear: '2026 - 2027',
    submissionDate: '2025-09-08 11:00 AM',
    currentStage: 'Deficiency Raised',
    assignedOfficer: 'Dr. R. Kumar',
    lastUpdated: '1 day ago',
    programs: [
      { id: 'prog-301', name: 'Electric Vehicle Technology', level: 'Diploma', discipline: 'Engineering & Technology', existingIntake: 0, proposedIntake: 60, durationYears: 3 }
    ],
    documents: [],
    verificationChecks: [],
    deficiencies: [
      {
        id: 'def-002',
        applicationId: 'app-003',
        applicationRef: 'APP-2025-00122',
        institutionName: 'LMN Polytechnic Institute',
        requirementName: 'EV Battery Testing & High Voltage Lab Equipment',
        severity: 'Critical',
        description: 'Invoices for high-voltage DC load banks and safety isolator booths not submitted. APH 2024 Clause 3.2.1.',
        raisedBy: 'Dr. R. Kumar (Scrutiny Officer)',
        raisedDate: '2025-09-12 04:30 PM',
        dueDate: '2025-09-26',
        status: 'Open',
        institutionResponse: ''
      }
    ]
  },
  {
    id: 'app-004',
    applicationNumber: 'APP-2025-00121',
    institutionId: 'inst-004',
    institutionName: 'PQR University School of Technology',
    institutionType: 'State Private University',
    state: 'Telangana',
    district: 'Hyderabad',
    address: 'Knowledge City, Gachibowli, Hyderabad - 500032',
    contactPerson: 'Dr. C. H. Reddy',
    contactEmail: 'vc@pqruniv.ac.in',
    contactPhone: '+91 97000 44556',
    aisheCode: 'U-0512',
    applicationType: 'Extension of Approval (EoA) & Autonomous Continuation',
    academicYear: '2026 - 2027',
    submissionDate: '2025-08-25 09:00 AM',
    currentStage: 'Approved',
    assignedOfficer: 'Dr. R. Kumar',
    lastUpdated: '2 days ago',
    programs: [
      { id: 'prog-401', name: 'Computer Engineering', level: 'UG', discipline: 'Engineering & Technology', existingIntake: 240, proposedIntake: 240, durationYears: 4 },
      { id: 'prog-402', name: 'MBA (Tech Management)', level: 'PG', discipline: 'Management', existingIntake: 120, proposedIntake: 120, durationYears: 2 }
    ],
    documents: [],
    verificationChecks: [],
    deficiencies: [],
    decision: {
      type: 'Approved',
      date: '2025-09-15',
      officer: 'Dr. V. Nair (Member Secretary, AICTE)',
      orderNumber: 'F.No. South-Central/1-9823412091/2026/EOA',
      reason: 'Full compliance verified across 18 norms. EVC on-site committee recommended approval with 96.4% score.',
      validityPeriod: 'Academic Years 2026-27 to 2028-29 (3-Year Cycle)'
    }
  }
];

export const INITIAL_COMPLIANCE_OBLIGATIONS: ComplianceObligation[] = [
  {
    id: 'comp-001',
    applicationId: 'app-004',
    applicationRef: 'APP-2025-00121',
    institutionName: 'PQR University School of Technology',
    title: 'Mandatory Disclosure 2026-27 Publication on Institutional Website',
    ruleClause: 'APH 2024-27 Clause 10.4',
    dueDate: '2025-10-31',
    assignedOwner: 'Registrar, PQR University',
    status: 'Due Soon',
    lastUpdated: '3 days ago'
  },
  {
    id: 'comp-002',
    applicationId: 'app-004',
    applicationRef: 'APP-2025-00121',
    institutionName: 'PQR University School of Technology',
    title: 'Biometric Attendance & Faculty Salary Direct Bank Transfer Audit (Q3)',
    ruleClause: 'APH 2024-27 Clause 7.8',
    dueDate: '2025-11-15',
    assignedOwner: 'Finance Officer & HR',
    status: 'Pending',
    lastUpdated: '1 week ago'
  },
  {
    id: 'comp-003',
    applicationId: 'app-004',
    applicationRef: 'APP-2025-00121',
    institutionName: 'PQR University School of Technology',
    title: 'Establishment of Internal Complaints Committee (ICC) & Anti-Ragging Squad',
    ruleClause: 'AICTE Anti-Ragging Regulations 2009',
    dueDate: '2025-09-30',
    assignedOwner: 'Dean of Student Welfare',
    status: 'Completed',
    submittedEvidenceName: 'ICC_Gazette_Notification_2025.pdf',
    lastUpdated: '2 weeks ago'
  },
  {
    id: 'comp-004',
    applicationId: 'app-002',
    applicationRef: 'APP-2025-00123',
    institutionName: 'XYZ Engineering College',
    title: 'NBA Tier-1 Accreditation Compliance Report for CSE & ECE',
    ruleClause: 'APH 2024-27 Clause 6.1 (Autonomous Status)',
    dueDate: '2025-10-15',
    assignedOwner: 'IQAC Coordinator',
    status: 'Due Soon',
    lastUpdated: '4 days ago'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEvent[] = [
  {
    id: 'aud-001',
    timestamp: '2025-09-15 04:30 PM',
    actor: 'Dr. V. Nair',
    role: 'APPROVING_OFFICIAL',
    action: 'APPROVAL_DECISION_RECORDED',
    entityType: 'Application',
    entityId: 'APP-2025-00121',
    details: 'Formal Approval order F.No. South-Central/1-9823412091/2026/EOA dispatched and digitally signed.',
    hash: 'a9f3b18d7c4e2098f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3'
  },
  {
    id: 'aud-002',
    timestamp: '2025-09-14 11:45 AM',
    actor: 'Dr. R. Kumar',
    role: 'SCRUTINY_OFFICER',
    action: 'DEFICIENCY_RAISED',
    entityType: 'Application',
    entityId: 'APP-2025-00124',
    details: 'Major Deficiency DEF-001 issued for Missing Notary Seal in Affidavit 2.',
    hash: 'b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2'
  },
  {
    id: 'aud-003',
    timestamp: '2025-09-14 10:30 AM',
    actor: 'Dr. S. Ramanathan',
    role: 'INSTITUTION_ADMIN',
    action: 'APPLICATION_SUBMITTED',
    entityType: 'Application',
    entityId: 'APP-2025-00124',
    details: 'Application submitted with 5 verified documents and legal undertaking.',
    hash: 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4'
  },
  {
    id: 'aud-004',
    timestamp: '2025-09-12 02:15 PM',
    actor: 'Prof. S. Sharma',
    role: 'EVC_MEMBER',
    action: 'EVC_INSPECTION_SCHEDULED',
    entityType: 'EVC Case',
    entityId: 'EVC-2025-089',
    details: 'Physical visit scheduled for XYZ Engineering College on 28-09-2025.',
    hash: 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5'
  }
];

export const UPCOMING_TASKS_DATA = [
  { id: 't1', title: 'Verify EVC Report', institution: 'ABC Institute of Technology', timing: 'Today', urgency: 'high', iconColor: 'text-rose-500' },
  { id: 't2', title: 'Review Deficiency Response', institution: 'XYZ College', timing: 'Today', urgency: 'high', iconColor: 'text-amber-500' },
  { id: 't3', title: 'Schedule EVC Visit', institution: 'LMN Polytechnic', timing: 'Tomorrow', urgency: 'medium', iconColor: 'text-blue-500' },
  { id: 't4', title: 'Approve Application', institution: 'PQR University', timing: 'Tomorrow', urgency: 'normal', iconColor: 'text-emerald-500' }
];

export const ANNOUNCEMENTS_DATA = [
  { id: 'a1', title: 'Revised Approval Process Handbook 2024–2027 Published', date: '2 days ago', badge: 'New', link: '#' },
  { id: 'a2', title: 'Important Update on Document Formats & Digital Signatures', date: '5 days ago', badge: 'Notice', link: '#' },
  { id: 'a3', title: 'EVC Guidelines & Hybrid Evaluation Protocols for 2025–26', date: '1 week ago', badge: 'Guidelines', link: '#' }
];
