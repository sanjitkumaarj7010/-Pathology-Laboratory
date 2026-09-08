/**
 * ==========================================================================
 * PATHOLOGY EVIDENCE TIMELINE - JAVASCRIPT (PHASE 1 - PHASE 7)
 * Pure Vanilla JavaScript written cleanly for 2nd-year students.
 * 
 * Features:
 * 1. Sample Case Data Store with Audit & Specimen Lineage Chains
 * 2. Evidence Drill-Down Panel ("View Details") & Version History Log
 * 3. Phase 6 Laboratory Capacity & Scheduling Controller
 * 4. Phase 7 Multidisciplinary Team (MDT) Review & Decision Tracking Engine
 * 5. Missing / Stale Evidence Clinical Safety Safeguards
 * 6. Audit Review History & Timeline Integration
 * 7. Phase 4 Role-Based Permissions (Doctor, Pathologist, Radiologist, Molecular Specialist, Lab Admin)
 * 8. Dynamic Navigation Router (Dashboard, Cases, Timeline, Scheduling, Reports)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', function () {

    /* ----------------------------------------------------------------------
       1. PHASE 6 LABORATORY CAPACITY STATE
       ---------------------------------------------------------------------- */
    const capacityState = {
        totalCapacity: 20,
        scheduledCount: 15,
        availableSlots: 5,
        urgentCount: 3
    };

    /* ----------------------------------------------------------------------
       2. SAMPLE CASE DATA STORE (PHASE 1 - PHASE 7)
       ---------------------------------------------------------------------- */
    const casesData = {
        "Case 001": {
            id: "Case 001",
            title: "Suspected Lung Cancer",
            priority: "Urgent",
            status: "Pending Results",
            mdtStatus: "Needs Expert Review",
            mdtHistory: [],
            evidence: {
                pathology: {
                    test: "Biopsy",
                    status: "Completed",
                    freshness: "Fresh",
                    time: "10:00 AM",
                    summary: "Abnormal tissue detected",
                    specimenId: "SP-001",
                    collectionTime: "08:30 AM",
                    processingTime: "09:45 AM",
                    reviewer: "Dr. Kumar",
                    reportVersion: "v1.2",
                    lastUpdated: "02:30 PM",
                    department: "Pathology",
                    versionHistory: [
                        "v1.0 — Initial biopsy accessioning (08:45 AM)",
                        "v1.1 — Preliminary histological examination (11:15 AM)",
                        "v1.2 — Final verified diagnostic pathology report (02:30 PM)"
                    ]
                },
                imaging: {
                    test: "CT Scan",
                    status: "Completed",
                    freshness: "Fresh",
                    time: "12:00 PM",
                    summary: "Lung lesion identified",
                    specimenId: "IMG-001",
                    collectionTime: "11:15 AM",
                    processingTime: "11:50 AM",
                    reviewer: "Dr. Priya",
                    reportVersion: "v2.0",
                    lastUpdated: "01:10 PM",
                    department: "Radiology",
                    versionHistory: [
                        "v1.0 — Initial DICOM scan acquisition (11:30 AM)",
                        "v2.0 — Verified chest CT radiology report (01:10 PM)"
                    ]
                },
                molecular: {
                    test: "Gene Panel",
                    status: "Pending",
                    freshness: "Missing",
                    time: "02:00 PM",
                    summary: "Molecular result is not available.",
                    specimenId: "MOL-001",
                    collectionTime: "—",
                    processingTime: "—",
                    reviewer: "Dr. Arun",
                    reportVersion: "v0.1",
                    lastUpdated: "02:00 PM",
                    department: "Molecular Laboratory",
                    versionHistory: [
                        "v0.1 — Order logged; pending NGS sample accessioning (02:00 PM)"
                    ]
                }
            },
            lineage: [
                {
                    stepTitle: "Original Specimen",
                    specimenId: "SP-001",
                    specimenType: "Tissue",
                    parent: "Original Sample",
                    purpose: "Initial CT-guided biopsy",
                    status: "Available"
                },
                {
                    stepTitle: "Tissue Processing",
                    specimenId: "SP-001-A",
                    specimenType: "Tissue Block",
                    parent: "SP-001",
                    purpose: "Formalin fixation & paraffin embedding",
                    status: "Used"
                },
                {
                    stepTitle: "Pathology Testing",
                    specimenId: "PATH-001",
                    specimenType: "Histology Slide",
                    parent: "SP-001-A",
                    purpose: "H&E & immunohistochemistry staining",
                    status: "Completed"
                },
                {
                    stepTitle: "Molecular Testing",
                    specimenId: "MOL-001",
                    specimenType: "Molecular Sample",
                    parent: "SP-001-A",
                    purpose: "DNA extraction for gene panel",
                    status: "Pending"
                }
            ],
            mdtReview: {
                status: "Scheduled",
                time: "04:00 PM",
                summary: "Manual review required due to missing molecular data."
            }
        },
        "Case 002": {
            id: "Case 002",
            title: "Breast Tumor",
            priority: "Normal",
            status: "Ready for Review",
            mdtStatus: "Scheduled",
            mdtHistory: [],
            evidence: {
                pathology: {
                    test: "Tissue Biopsy",
                    status: "Completed",
                    freshness: "Fresh",
                    time: "09:30 AM",
                    summary: "Tumor cells identified",
                    specimenId: "SP-002",
                    collectionTime: "08:00 AM",
                    processingTime: "09:15 AM",
                    reviewer: "Dr. Kumar",
                    reportVersion: "v1.1",
                    lastUpdated: "10:00 AM",
                    department: "Pathology",
                    versionHistory: [
                        "v1.0 — Initial H&E stain (09:00 AM)",
                        "v1.1 — Verified ER/PR receptor panel (10:00 AM)"
                    ]
                },
                imaging: {
                    test: "Mammogram",
                    status: "Completed",
                    freshness: "Aging",
                    time: "11:00 AM",
                    summary: "Mammogram result is becoming old. Please verify.",
                    specimenId: "IMG-002",
                    collectionTime: "10:15 AM",
                    processingTime: "10:45 AM",
                    reviewer: "Dr. Priya",
                    reportVersion: "v1.0",
                    lastUpdated: "11:00 AM",
                    department: "Radiology",
                    versionHistory: [
                        "v1.0 — Diagnostic mammogram findings documented (11:00 AM)"
                    ]
                },
                molecular: {
                    test: "HER2 Test",
                    status: "Completed",
                    freshness: "Fresh",
                    time: "01:30 PM",
                    summary: "HER2 result available",
                    specimenId: "MOL-002",
                    collectionTime: "11:30 AM",
                    processingTime: "01:00 PM",
                    reviewer: "Dr. Arun",
                    reportVersion: "v1.0",
                    lastUpdated: "01:30 PM",
                    department: "Molecular Laboratory",
                    versionHistory: [
                        "v1.0 — HER2 FISH amplification result confirmed (01:30 PM)"
                    ]
                }
            },
            lineage: [
                {
                    stepTitle: "Original Specimen",
                    specimenId: "SP-002",
                    specimenType: "Core Tissue",
                    parent: "Original Sample",
                    purpose: "Core needle biopsy",
                    status: "Available"
                },
                {
                    stepTitle: "Tissue Processing",
                    specimenId: "SP-002-A",
                    specimenType: "Tissue Block",
                    parent: "SP-002",
                    purpose: "Histological sectioning",
                    status: "Used"
                },
                {
                    stepTitle: "Pathology Testing",
                    specimenId: "PATH-002",
                    specimenType: "Histology Slide",
                    parent: "SP-002-A",
                    purpose: "Ductal carcinoma evaluation",
                    status: "Completed"
                },
                {
                    stepTitle: "Molecular Testing",
                    specimenId: "MOL-002",
                    specimenType: "FISH Probe Sample",
                    parent: "SP-002-A",
                    purpose: "HER2 gene amplification assay",
                    status: "Completed"
                }
            ],
            mdtReview: {
                status: "Scheduled",
                time: "03:00 PM",
                summary: "Multidisciplinary team review scheduled."
            }
        },
        "Case 003": {
            id: "Case 003",
            title: "Liver Lesion",
            priority: "Urgent",
            status: "Ready for Review",
            mdtStatus: "Needs Expert Review",
            mdtHistory: [],
            evidence: {
                pathology: {
                    test: "Liver Biopsy",
                    status: "Completed",
                    freshness: "Fresh",
                    time: "10:15 AM",
                    summary: "Tissue examination completed",
                    specimenId: "SP-003",
                    collectionTime: "09:00 AM",
                    processingTime: "10:00 AM",
                    reviewer: "Dr. Kumar",
                    reportVersion: "v1.0",
                    lastUpdated: "10:15 AM",
                    department: "Pathology",
                    versionHistory: [
                        "v1.0 — Fine needle aspiration cytology report (10:15 AM)"
                    ]
                },
                imaging: {
                    test: "MRI",
                    status: "Completed",
                    freshness: "Stale",
                    time: "12:30 PM",
                    summary: "This imaging result is old. Please verify before review.",
                    specimenId: "IMG-003",
                    collectionTime: "11:45 AM",
                    processingTime: "12:15 PM",
                    reviewer: "Dr. Priya",
                    reportVersion: "v1.0",
                    lastUpdated: "12:30 PM",
                    department: "Radiology",
                    versionHistory: [
                        "v1.0 — Abdominal MRI scan findings logged (12:30 PM)"
                    ]
                },
                molecular: {
                    test: "Molecular Panel",
                    status: "Missing",
                    freshness: "Missing",
                    time: "—",
                    summary: "Molecular result is not available.",
                    specimenId: "MOL-003",
                    collectionTime: "—",
                    processingTime: "—",
                    reviewer: "Dr. Arun",
                    reportVersion: "v0.0",
                    lastUpdated: "—",
                    department: "Molecular Laboratory",
                    versionHistory: [
                        "v0.0 — No molecular specimen received (—)"
                    ]
                }
            },
            lineage: [
                {
                    stepTitle: "Original Specimen",
                    specimenId: "SP-003",
                    specimenType: "Liver Tissue",
                    parent: "Original Sample",
                    purpose: "Ultrasound-guided FNA",
                    status: "Available"
                },
                {
                    stepTitle: "Tissue Processing",
                    specimenId: "SP-003-A",
                    specimenType: "Cytology Cell Block",
                    parent: "SP-003",
                    purpose: "Smear preparation & histology",
                    status: "Used"
                },
                {
                    stepTitle: "Pathology Testing",
                    specimenId: "PATH-003",
                    specimenType: "Cytology Slide",
                    parent: "SP-003-A",
                    purpose: "Hepatocellular carcinoma check",
                    status: "Completed"
                },
                {
                    stepTitle: "Molecular Testing",
                    specimenId: "MOL-003",
                    specimenType: "Molecular Sample",
                    parent: "SP-003-A",
                    purpose: "Targeted mutation panel",
                    status: "Missing"
                }
            ],
            mdtReview: {
                status: "Pending",
                time: "—",
                summary: "Pending resolution of stale imaging and missing molecular panel."
            }
        },
        "Case 004": {
            id: "Case 004",
            title: "Brain Tumor",
            priority: "Normal",
            status: "Pending Results",
            mdtStatus: "Scheduled",
            mdtHistory: [],
            evidence: {
                pathology: {
                    test: "Tissue Biopsy",
                    status: "Completed",
                    freshness: "Fresh",
                    time: "08:30 AM",
                    summary: "Abnormal tissue identified",
                    specimenId: "SP-004",
                    collectionTime: "07:30 AM",
                    processingTime: "08:15 AM",
                    reviewer: "Dr. Kumar",
                    reportVersion: "v1.2",
                    lastUpdated: "09:00 AM",
                    department: "Pathology",
                    versionHistory: [
                        "v1.0 — Intraoperative frozen section (08:00 AM)",
                        "v1.1 — Permanent section H&E evaluation (08:30 AM)",
                        "v1.2 — Verified neuropathology report (09:00 AM)"
                    ]
                },
                imaging: {
                    test: "MRI Brain",
                    status: "Completed",
                    freshness: "Fresh",
                    time: "10:00 AM",
                    summary: "Brain lesion identified",
                    specimenId: "IMG-004",
                    collectionTime: "09:15 AM",
                    processingTime: "09:45 AM",
                    reviewer: "Dr. Priya",
                    reportVersion: "v1.0",
                    lastUpdated: "10:00 AM",
                    department: "Radiology",
                    versionHistory: [
                        "v1.0 — Contrast-enhanced brain MRI report (10:00 AM)"
                    ]
                },
                molecular: {
                    test: "Genetic Test",
                    status: "Completed",
                    freshness: "Aging",
                    time: "01:00 PM",
                    summary: "Genetic result is becoming old. Please verify.",
                    specimenId: "MOL-004",
                    collectionTime: "10:30 AM",
                    processingTime: "12:30 PM",
                    reviewer: "Dr. Arun",
                    reportVersion: "v1.0",
                    lastUpdated: "01:00 PM",
                    department: "Molecular Laboratory",
                    versionHistory: [
                        "v1.0 — IDH1/IDH2 mutation & MGMT promoter methylation (01:00 PM)"
                    ]
                }
            },
            lineage: [
                {
                    stepTitle: "Original Specimen",
                    specimenId: "SP-004",
                    specimenType: "Brain Resection",
                    parent: "Original Sample",
                    purpose: "Surgical tissue resection",
                    status: "Available"
                },
                {
                    stepTitle: "Tissue Processing",
                    specimenId: "SP-004-A",
                    specimenType: "Paraffin Block",
                    parent: "SP-004",
                    purpose: "Neuropathology block sectioning",
                    status: "Used"
                },
                {
                    stepTitle: "Pathology Testing",
                    specimenId: "PATH-004",
                    specimenType: "Neuropathology Slide",
                    parent: "SP-004-A",
                    purpose: "Glioma grading & immunostains",
                    status: "Completed"
                },
                {
                    stepTitle: "Molecular Testing",
                    specimenId: "MOL-004",
                    specimenType: "Genomic DNA",
                    parent: "SP-004-A",
                    purpose: "NGS glioma biomarker panel",
                    status: "Completed"
                }
            ],
            mdtReview: {
                status: "Scheduled",
                time: "03:30 PM",
                summary: "Tumor board discussion scheduled"
            }
        }
    };


    /* ----------------------------------------------------------------------
       3. GLOBAL STATE TRACKING
       ---------------------------------------------------------------------- */
    let currentSelectedRole = 'Doctor';
    let currentOpenCaseId = null;


    /* ----------------------------------------------------------------------
       4. DOM ELEMENT REFERENCES
       ---------------------------------------------------------------------- */
    // Views
    const dashboardView = document.getElementById('dashboardView');
    const caseDetailsView = document.getElementById('caseDetailsView');
    const schedulingView = document.getElementById('schedulingView');
    const reportsView = document.getElementById('reportsView');
    const backToDashboardBtn = document.getElementById('backToDashboardBtn');

    // Sidebar Items
    const navDashboardItem = document.getElementById('navDashboardItem');
    const navCasesItem = document.getElementById('navCasesItem');
    const navTimelineItem = document.getElementById('navTimelineItem');
    const navSchedulingItem = document.getElementById('navSchedulingItem');
    const navReportsItem = document.getElementById('navReportsItem');

    const navDashboardLink = document.getElementById('navDashboardLink');
    const navCasesLink = document.getElementById('navCasesLink');
    const navTimelineLink = document.getElementById('navTimelineLink');
    const navSchedulingLink = document.getElementById('navSchedulingLink');
    const navReportsLink = document.getElementById('navReportsLink');

    // Controls & Banners
    const userRoleSelect = document.getElementById('userRole');
    const activeRoleDisplay = document.getElementById('activeRoleDisplay');
    const caseSearchInput = document.getElementById('caseSearch');
    const caseRows = document.querySelectorAll('.case-row');
    const caseCountTag = document.getElementById('caseCountTag');
    const noResultsDiv = document.getElementById('noResults');

    const roleBannerIcon = document.getElementById('roleBannerIcon');
    const roleBannerTitle = document.getElementById('roleBannerTitle');
    const labCapacitySection = document.getElementById('labCapacitySection');
    const adminWidgetScheduledVal = document.getElementById('adminWidgetScheduledVal');
    const adminWidgetAvailableVal = document.getElementById('adminWidgetAvailableVal');

    // Case Details Elements
    const detailCaseId = document.getElementById('detailCaseId');
    const detailCaseTitle = document.getElementById('detailCaseTitle');
    const detailCasePriority = document.getElementById('detailCasePriority');
    const detailCaseStatus = document.getElementById('detailCaseStatus');
    const evidenceAlertsContainer = document.getElementById('evidenceAlertsContainer');
    const safetyNoticeBox = document.getElementById('safetyNoticeBox');

    const cardPathology = document.getElementById('cardPathology');
    const cardImaging = document.getElementById('cardImaging');
    const cardMolecular = document.getElementById('cardMolecular');

    const pathologyTestName = document.getElementById('pathologyTestName');
    const pathologyStatusBadge = document.getElementById('pathologyStatusBadge');
    const pathologySummaryText = document.getElementById('pathologySummaryText');
    const pathologyFreshnessBadge = document.getElementById('pathologyFreshnessBadge');

    const imagingTestName = document.getElementById('imagingTestName');
    const imagingStatusBadge = document.getElementById('imagingStatusBadge');
    const imagingSummaryText = document.getElementById('imagingSummaryText');
    const imagingFreshnessBadge = document.getElementById('imagingFreshnessBadge');

    const molecularTestName = document.getElementById('molecularTestName');
    const molecularStatusBadge = document.getElementById('molecularStatusBadge');
    const molecularSummaryText = document.getElementById('molecularSummaryText');
    const molecularFreshnessBadge = document.getElementById('molecularFreshnessBadge');

    const otherEvidenceSection = document.getElementById('otherEvidenceSection');
    const otherEvidenceContainer = document.getElementById('otherEvidenceContainer');
    const lineageContainer = document.getElementById('lineageContainer');
    const timelineContainer = document.getElementById('timelineContainer');

    // PHASE 7 MDT REVIEW DOM ELEMENTS
    const mdtCaseIdDisplay = document.getElementById('mdtCaseIdVal');
    const mdtCaseNameDisplay = document.getElementById('mdtCaseNameVal');
    const mdtReviewStatusBadge = document.getElementById('mdtReviewStatusBadge');
    const mdtReviewDateDisplay = document.getElementById('mdtReviewDateVal');
    const mdtSafetyAlertBox = document.getElementById('mdtSafetyAlertBox');
    const mdtSafetyAlertMessage = document.getElementById('mdtSafetyAlertMessage');
    const mdtActionBar = document.getElementById('mdtActionBar');
    const btnRecordMdtDecision = document.getElementById('btnRecordMdtDecision');
    const mdtLabAdminNotice = document.getElementById('mdtLabAdminNotice');

    // MDT Decision Form Elements
    const mdtDecisionFormCard = document.getElementById('mdtDecisionFormCard');
    const mdtFormSafetyAlert = document.getElementById('mdtFormSafetyAlert');
    const selectMdtDecision = document.getElementById('selectMdtDecision');
    const selectMdtReviewerRole = document.getElementById('selectMdtReviewerRole');
    const txtMdtComments = document.getElementById('txtMdtComments');
    const btnSaveMdtDecision = document.getElementById('btnSaveMdtDecision');
    const btnCancelMdtDecision = document.getElementById('btnCancelMdtDecision');
    const mdtHistoryList = document.getElementById('mdtHistoryList');

    // Drill-Down Modal Elements
    const evidenceDetailsModal = document.getElementById('evidenceDetailsModal');
    const detailsModalTitle = document.getElementById('detailsModalTitle');
    const closeDetailsHeaderBtn = document.getElementById('closeDetailsHeaderBtn');
    const closeDetailsFooterBtn = document.getElementById('closeDetailsFooterBtn');

    const auditCaseId = document.getElementById('auditCaseId');
    const auditEvidenceType = document.getElementById('auditEvidenceType');
    const auditTestName = document.getElementById('auditTestName');
    const auditSpecimenId = document.getElementById('auditSpecimenId');
    const auditCollectionTime = document.getElementById('auditCollectionTime');
    const auditProcessingTime = document.getElementById('auditProcessingTime');
    const auditReviewer = document.getElementById('auditReviewer');
    const auditReportVersion = document.getElementById('auditReportVersion');
    const auditLastUpdated = document.getElementById('auditLastUpdated');
    const auditDepartment = document.getElementById('auditDepartment');
    const auditFreshnessSlot = document.getElementById('auditFreshnessSlot');
    const auditResultSummary = document.getElementById('auditResultSummary');
    const auditVersionHistoryList = document.getElementById('auditVersionHistoryList');

    // Phase 6 Scheduling Elements
    const schedCardScheduledVal = document.getElementById('schedCardScheduledVal');
    const schedCardAvailableVal = document.getElementById('schedCardAvailableVal');
    const schedCardUrgentVal = document.getElementById('schedCardUrgentVal');

    const capacityStatusBanner = document.getElementById('capacityStatusBanner');
    const capacityStatusIcon = document.getElementById('capacityStatusIcon');
    const capacityStatusTitleText = document.getElementById('capacityStatusTitleText');
    const capacityStatusSubText = document.getElementById('capacityStatusSubText');
    const schedulingNotificationBox = document.getElementById('schedulingNotificationBox');
    const schedulingSafetyNotice = document.getElementById('schedulingSafetyNotice');

    const btnScheduleCase003 = document.getElementById('btnScheduleCase003');
    const btnScheduleUrgentCase003 = document.getElementById('btnScheduleUrgentCase003');
    const statusCellCase003 = document.getElementById('statusCellCase003');
    const actionCellCase003 = document.getElementById('actionCellCase003');
    const urgentStatusTagCase003 = document.getElementById('urgentStatusTagCase003');


    /* ----------------------------------------------------------------------
       5. HELPER BADGE & ICON FUNCTIONS
       ---------------------------------------------------------------------- */
    function getStatusBadgeHtml(statusText) {
        const lower = statusText.toLowerCase();
        if (lower.includes('completed') || lower.includes('ready') || lower.includes('available')) {
            return `<span class="badge badge-status-completed"><span aria-hidden="true">✅</span> ${statusText}</span>`;
        } else if (lower.includes('pending') || lower.includes('used') || lower.includes('in progress')) {
            return `<span class="badge badge-status-pending"><span aria-hidden="true">⏳</span> ${statusText}</span>`;
        } else if (lower.includes('scheduled')) {
            return `<span class="badge badge-status-scheduled"><span aria-hidden="true">📅</span> ${statusText}</span>`;
        } else if (lower.includes('missing') || lower.includes('stale') || lower.includes('expert review')) {
            return `<span class="badge badge-status-missing"><span aria-hidden="true">⚠️</span> ${statusText}</span>`;
        } else {
            return `<span class="badge">${statusText}</span>`;
        }
    }

    function getFreshnessBadgeHtml(freshnessState) {
        switch (freshnessState) {
            case 'Fresh':
                return `<span class="badge badge-freshness badge-freshness-fresh"><span aria-hidden="true">✓</span> FRESH</span>`;
            case 'Aging':
                return `<span class="badge badge-freshness badge-freshness-aging"><span aria-hidden="true">⚠</span> AGING</span>`;
            case 'Stale':
                return `<span class="badge badge-freshness badge-freshness-stale"><span aria-hidden="true">!</span> STALE</span>`;
            case 'Missing':
                return `<span class="badge badge-freshness badge-freshness-missing"><span aria-hidden="true">○</span> MISSING</span>`;
            default:
                return `<span class="badge badge-freshness">${freshnessState}</span>`;
        }
    }

    function getMdtStatusBadgeHtml(statusText) {
        switch (statusText) {
            case 'Scheduled':
                return `<span class="badge badge-status-scheduled"><span aria-hidden="true">📅</span> Scheduled</span>`;
            case 'In Progress':
                return `<span class="badge badge-status-pending"><span aria-hidden="true">⏳</span> In Progress</span>`;
            case 'Decision Recorded':
                return `<span class="badge badge-status-completed"><span aria-hidden="true">✅</span> Decision Recorded</span>`;
            case 'Needs Expert Review':
                return `<span class="badge badge-status-stale"><span aria-hidden="true">⚠️</span> Needs Expert Review</span>`;
            default:
                return `<span class="badge">${statusText}</span>`;
        }
    }

    function getRoleIcon(role) {
        switch (role) {
            case 'Doctor': return '👨‍⚕️';
            case 'Pathologist': return '🧪';
            case 'Radiologist': return '🩻';
            case 'Molecular Specialist': return '🧬';
            case 'Lab Admin': return '📋';
            default: return '🔬';
        }
    }


    /* ----------------------------------------------------------------------
       6. PHASE 6 LABORATORY CAPACITY & SCHEDULING CONTROLLER
       ---------------------------------------------------------------------- */
    function updateCapacityUI() {
        // Update Admin Widget
        if (adminWidgetScheduledVal) adminWidgetScheduledVal.textContent = `${capacityState.scheduledCount} cases`;
        if (adminWidgetAvailableVal) adminWidgetAvailableVal.textContent = `${capacityState.availableSlots} cases`;

        // Update Scheduling Cards
        if (schedCardScheduledVal) schedCardScheduledVal.textContent = `${capacityState.scheduledCount} cases`;
        if (schedCardAvailableVal) schedCardAvailableVal.textContent = `${capacityState.availableSlots}`;
        if (schedCardUrgentVal) schedCardUrgentVal.textContent = `${capacityState.urgentCount}`;

        // Update Status Banner
        if (capacityStatusBanner) {
            if (capacityState.availableSlots > 0) {
                capacityStatusBanner.className = 'capacity-status-banner banner-available';
                capacityStatusIcon.textContent = '🟢';
                capacityStatusTitleText.textContent = 'Capacity Available';
                capacityStatusSubText.textContent = `${capacityState.scheduledCount} / ${capacityState.totalCapacity} cases scheduled — ${capacityState.availableSlots} slots remaining`;
                schedulingSafetyNotice.classList.add('hidden');
            } else {
                capacityStatusBanner.className = 'capacity-status-banner banner-full';
                capacityStatusIcon.textContent = '⚠️';
                capacityStatusTitleText.textContent = 'CAPACITY FULL';
                capacityStatusSubText.textContent = `${capacityState.scheduledCount} / ${capacityState.totalCapacity} cases scheduled — 0 slots remaining`;
                schedulingSafetyNotice.classList.remove('hidden');
            }
        }
    }

    function showSchedulingToast(message, isError) {
        if (!schedulingNotificationBox) return;
        schedulingNotificationBox.className = isError ? 'scheduling-toast alert-box alert-stale' : 'scheduling-toast';
        schedulingNotificationBox.innerHTML = message;
        schedulingNotificationBox.classList.remove('hidden');

        schedulingNotificationBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function scheduleTest(caseIdKey, isUrgent) {
        if (capacityState.availableSlots <= 0) {
            showSchedulingToast('⚠️ <strong>Laboratory Capacity Full</strong>: No immediate slot is available today. Suggested Action: Schedule for the next available slot or request manual prioritization.', true);
            schedulingSafetyNotice.classList.remove('hidden');
            return;
        }

        capacityState.availableSlots--;
        capacityState.scheduledCount++;
        if (isUrgent && capacityState.urgentCount > 0) {
            capacityState.urgentCount--;
        }

        updateCapacityUI();

        if (statusCellCase003) {
            statusCellCase003.innerHTML = `<span class="badge badge-status-scheduled">📅 Scheduled</span>`;
        }
        if (actionCellCase003) {
            actionCellCase003.innerHTML = `<button type="button" class="btn btn-secondary" disabled>Slot Confirmed</button>`;
        }
        if (urgentStatusTagCase003) {
            urgentStatusTagCase003.className = 'badge badge-status-scheduled';
            urgentStatusTagCase003.innerHTML = '📅 Scheduled for 12:00 PM';
        }
        if (btnScheduleUrgentCase003) {
            btnScheduleUrgentCase003.disabled = true;
            btnScheduleUrgentCase003.innerHTML = '✓ Slot Confirmed';
            btnScheduleUrgentCase003.className = 'btn btn-secondary';
        }

        if (casesData[caseIdKey]) {
            casesData[caseIdKey].evidence.molecular.status = 'Pending';
            casesData[caseIdKey].evidence.molecular.freshness = 'Aging';
            casesData[caseIdKey].evidence.molecular.time = '12:00 PM';
            casesData[caseIdKey].evidence.molecular.summary = 'Molecular Test scheduled for 12:00 PM today (Awaiting laboratory processing).';
            
            if (casesData[caseIdKey].lineage) {
                casesData[caseIdKey].lineage.forEach(function (step) {
                    if (step.stepTitle === 'Molecular Testing') {
                        step.status = 'Pending (Scheduled)';
                    }
                });
            }

            if (currentOpenCaseId === caseIdKey) {
                renderCaseDetails(caseIdKey);
            }
        }

        showSchedulingToast(`✓ <strong>Test scheduled successfully</strong>: Case ${caseIdKey} Molecular Test slot confirmed for 12:00 PM.`, false);
    }


    /* ----------------------------------------------------------------------
       7. EVIDENCE ALERTS & SAFETY DISCLAIMER GENERATOR
       ---------------------------------------------------------------------- */
    function renderEvidenceAlerts(evidenceObj) {
        evidenceAlertsContainer.innerHTML = '';
        const alerts = [];

        if (evidenceObj.pathology.freshness === 'Missing') {
            alerts.push({ type: 'missing', text: 'Pathology result is missing.' });
        } else if (evidenceObj.pathology.freshness === 'Stale') {
            alerts.push({ type: 'stale', text: 'Pathology result is stale. Please verify before review.' });
        } else if (evidenceObj.pathology.freshness === 'Aging') {
            alerts.push({ type: 'aging', text: 'Pathology result is becoming old. Please verify.' });
        }

        if (evidenceObj.imaging.freshness === 'Missing') {
            alerts.push({ type: 'missing', text: 'Imaging result is missing.' });
        } else if (evidenceObj.imaging.freshness === 'Stale') {
            alerts.push({ type: 'stale', text: 'Imaging result is stale. Please verify before MDT review.' });
        } else if (evidenceObj.imaging.freshness === 'Aging') {
            alerts.push({ type: 'aging', text: 'Imaging result is becoming old. Please verify.' });
        }

        if (evidenceObj.molecular.freshness === 'Missing') {
            alerts.push({ type: 'missing', text: 'Molecular result is missing.' });
        } else if (evidenceObj.molecular.freshness === 'Stale') {
            alerts.push({ type: 'stale', text: 'Molecular result is stale. Please verify before review.' });
        } else if (evidenceObj.molecular.freshness === 'Aging') {
            alerts.push({ type: 'aging', text: 'Molecular result is becoming old. Please verify.' });
        }

        if (alerts.length === 0) {
            const freshAlert = document.createElement('div');
            freshAlert.className = 'alert-box alert-all-fresh';
            freshAlert.innerHTML = `<span aria-hidden="true">✓</span> All available evidence is fresh.`;
            evidenceAlertsContainer.appendChild(freshAlert);
            safetyNoticeBox.classList.add('hidden');
        } else {
            alerts.forEach(function (alert) {
                const alertDiv = document.createElement('div');
                alertDiv.className = `alert-box alert-${alert.type}`;
                
                let iconStr = '⚠';
                if (alert.type === 'stale') iconStr = '!';
                if (alert.type === 'missing') iconStr = '○';

                alertDiv.innerHTML = `<span aria-hidden="true">${iconStr} Evidence Alert:</span> ${alert.text}`;
                evidenceAlertsContainer.appendChild(alertDiv);
            });

            safetyNoticeBox.classList.remove('hidden');
        }
    }


    /* ----------------------------------------------------------------------
       8. SPECIMEN LINEAGE GENERATOR
       ---------------------------------------------------------------------- */
    function renderSpecimenLineage(caseObj) {
        lineageContainer.innerHTML = '';
        if (!caseObj.lineage || caseObj.lineage.length === 0) return;

        caseObj.lineage.forEach(function (step, index) {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'lineage-card';

            cardDiv.innerHTML = `
                <div class="lineage-step-header">
                    <span class="lineage-step-title">
                        <span aria-hidden="true">🔬</span> ${step.stepTitle}
                    </span>
                    <span class="lineage-id-tag">${step.specimenId}</span>
                </div>
                <div class="lineage-details-grid">
                    <div class="lineage-item">
                        <span class="lineage-label">Specimen Type:</span>
                        <span class="lineage-value">${step.specimenType}</span>
                    </div>
                    <div class="lineage-item">
                        <span class="lineage-label">Parent Specimen:</span>
                        <span class="lineage-value">${step.parent}</span>
                    </div>
                    <div class="lineage-item">
                        <span class="lineage-label">Purpose:</span>
                        <span class="lineage-value">${step.purpose}</span>
                    </div>
                    <div class="lineage-item">
                        <span class="lineage-label">Status:</span>
                        <div>${getStatusBadgeHtml(step.status)}</div>
                    </div>
                </div>
            `;

            lineageContainer.appendChild(cardDiv);

            if (index < caseObj.lineage.length - 1) {
                const arrowDiv = document.createElement('div');
                arrowDiv.className = 'lineage-arrow';
                arrowDiv.innerHTML = '↓';
                arrowDiv.setAttribute('aria-hidden', 'true');
                lineageContainer.appendChild(arrowDiv);
            }
        });
    }


    /* ----------------------------------------------------------------------
       9. PHASE 7 MDT REVIEW & DECISION TRACKING CONTROLLER
       ---------------------------------------------------------------------- */
    function renderMdtReview(caseObj) {
        if (!caseObj) return;

        // A. Set Header Details
        if (mdtCaseIdDisplay) mdtCaseIdDisplay.textContent = caseObj.id;
        if (mdtCaseNameDisplay) mdtCaseNameDisplay.textContent = caseObj.title;
        if (mdtReviewDateDisplay) mdtReviewDateDisplay.textContent = "Today";

        // B. Inspect Evidence Safety (Missing / Stale Check)
        let hasMissing = false;
        let hasStale = false;
        let missingOrStaleLabels = [];

        ['pathology', 'imaging', 'molecular'].forEach(function (domain) {
            const item = caseObj.evidence[domain];
            if (item) {
                if (item.freshness === 'Missing') {
                    hasMissing = true;
                    missingOrStaleLabels.push(`${domain.charAt(0).toUpperCase() + domain.slice(1)} evidence is missing`);
                } else if (item.freshness === 'Stale') {
                    hasStale = true;
                    missingOrStaleLabels.push(`${domain.charAt(0).toUpperCase() + domain.slice(1)} evidence is stale`);
                }
            }
        });

        // Enforce safety rule: if missing/stale and no decision recorded yet, set status to Needs Expert Review
        if ((hasMissing || hasStale) && caseObj.mdtStatus !== 'Decision Recorded') {
            caseObj.mdtStatus = 'Needs Expert Review';
        }

        // Render Status Badge
        if (mdtReviewStatusBadge) {
            mdtReviewStatusBadge.innerHTML = getMdtStatusBadgeHtml(caseObj.mdtStatus);
        }

        // Render Safety Disclaimer Box
        if (mdtSafetyAlertBox) {
            if (hasMissing || hasStale) {
                const detailsStr = missingOrStaleLabels.join(', ');
                mdtSafetyAlertMessage.innerHTML = `
                    <strong>⚠️ Important evidence is missing or stale (${detailsStr}).</strong><br>
                    <strong>Manual Expert Review Required.</strong> Do not automatically suggest a medical diagnosis or treatment.<br>
                    <span style="font-weight:600; text-decoration:underline;">Suggested Safe Action:</span> Select "Request Additional Evidence" or "Manual Expert Review Required".
                `;
                mdtSafetyAlertBox.classList.remove('hidden');
            } else {
                mdtSafetyAlertBox.classList.add('hidden');
            }
        }

        // C. Render Review History List
        if (mdtHistoryList) {
            mdtHistoryList.innerHTML = '';
            
            if (!caseObj.mdtHistory || caseObj.mdtHistory.length === 0) {
                mdtHistoryList.innerHTML = `<div class="empty-history-text"><span aria-hidden="true">📋</span> No MDT decisions recorded yet.</div>`;
            } else {
                // Render entries in chronological order
                caseObj.mdtHistory.forEach(function (item) {
                    const historyDiv = document.createElement('div');
                    historyDiv.className = 'mdt-history-item';
                    
                    const roleIcon = getRoleIcon(item.reviewer);

                    historyDiv.innerHTML = `
                        <div class="history-item-header">
                            <div class="history-item-left">
                                <span class="history-time"><span aria-hidden="true">🕒</span> ${item.time}</span>
                                <span class="history-reviewer">${roleIcon} ${item.reviewer}</span>
                            </div>
                            <span class="badge badge-status-completed"><span aria-hidden="true">✅</span> ${item.decision}</span>
                        </div>
                        <div class="history-comment">
                            <strong>Comments:</strong> ${item.comment}
                        </div>
                    `;

                    mdtHistoryList.appendChild(historyDiv);
                });
            }
        }
    }

    function saveMdtDecision() {
        if (!currentOpenCaseId || !casesData[currentOpenCaseId]) return;

        try {
            const decisionVal = selectMdtDecision.value;
            const reviewerRoleVal = selectMdtReviewerRole.value;
            const commentsVal = txtMdtComments.value.trim() || 'No comments provided.';

            // Get Current Time String (e.g. 04:30 PM)
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            const timeStr = `${hours}:${minutes} ${ampm}`;

            const caseObj = casesData[currentOpenCaseId];
            if (!caseObj.mdtHistory) {
                caseObj.mdtHistory = [];
            }

            // Append new decision to history
            caseObj.mdtHistory.push({
                time: timeStr,
                reviewer: reviewerRoleVal,
                decision: decisionVal,
                comment: commentsVal
            });

            // Update Review Status to "Decision Recorded"
            caseObj.mdtStatus = 'Decision Recorded';

            // Hide Form & Reset Inputs
            mdtDecisionFormCard.classList.add('hidden');
            mdtFormSafetyAlert.classList.add('hidden');
            txtMdtComments.value = '';

            // Re-render Case Details (updates MDT card, Review History, and Case Timeline)
            renderCaseDetails(currentOpenCaseId);

            console.log(`MDT Decision saved for ${currentOpenCaseId}:`, decisionVal);

        } catch (err) {
            console.error('Error saving MDT decision:', err);
            // Safe Fallback Display
            if (mdtFormSafetyAlert) {
                mdtFormSafetyAlert.innerHTML = `⚠️ <strong>Unable to record MDT decision.</strong> Manual Expert Review Required.`;
                mdtFormSafetyAlert.classList.remove('hidden');
            }
        }
    }


    /* ----------------------------------------------------------------------
       10. RENDER CASE DETAILS & ROLE ADAPTATION
       ---------------------------------------------------------------------- */
    function renderCaseDetails(caseIdKey) {
        const caseObj = casesData[caseIdKey];
        if (!caseObj) return;

        currentOpenCaseId = caseIdKey;

        // A. Header
        detailCaseId.textContent = caseObj.id;
        detailCaseTitle.textContent = caseObj.title;

        if (caseObj.priority === 'Urgent') {
            detailCasePriority.className = 'badge badge-priority-urgent';
            detailCasePriority.innerHTML = '⚠️ Urgent';
        } else {
            detailCasePriority.className = 'badge badge-priority-normal';
            detailCasePriority.innerHTML = '🟢 Normal';
        }

        detailCaseStatus.outerHTML = `<span id="detailCaseStatus">${getStatusBadgeHtml(caseObj.status)}</span>`;

        // B. Alerts
        renderEvidenceAlerts(caseObj.evidence);

        // C. Populate 3 Cards
        pathologyTestName.textContent = caseObj.evidence.pathology.test;
        pathologyStatusBadge.innerHTML = getStatusBadgeHtml(caseObj.evidence.pathology.status);
        pathologyFreshnessBadge.innerHTML = getFreshnessBadgeHtml(caseObj.evidence.pathology.freshness);
        pathologySummaryText.textContent = caseObj.evidence.pathology.summary;

        imagingTestName.textContent = caseObj.evidence.imaging.test;
        imagingStatusBadge.innerHTML = getStatusBadgeHtml(caseObj.evidence.imaging.status);
        imagingFreshnessBadge.innerHTML = getFreshnessBadgeHtml(caseObj.evidence.imaging.freshness);
        imagingSummaryText.textContent = caseObj.evidence.imaging.summary;

        molecularTestName.textContent = caseObj.evidence.molecular.test;
        molecularStatusBadge.innerHTML = getStatusBadgeHtml(caseObj.evidence.molecular.status);
        molecularFreshnessBadge.innerHTML = getFreshnessBadgeHtml(caseObj.evidence.molecular.freshness);
        molecularSummaryText.textContent = caseObj.evidence.molecular.summary;

        // D. Role Adaptation
        applyRoleToCaseDetails(caseObj, currentSelectedRole);

        // E. Specimen Lineage
        renderSpecimenLineage(caseObj);

        // F. MDT Review Section & Review History
        renderMdtReview(caseObj);

        // G. Vertical Timeline Integration (Pathology, Imaging, Molecular, MDT Scheduled, MDT Decisions)
        const timelineEvents = [
            {
                time: caseObj.evidence.pathology.time,
                icon: "🧪",
                stage: "Pathology",
                testName: caseObj.evidence.pathology.test,
                status: caseObj.evidence.pathology.status,
                freshness: caseObj.evidence.pathology.freshness,
                summary: caseObj.evidence.pathology.summary
            },
            {
                time: caseObj.evidence.imaging.time,
                icon: "🩻",
                stage: "Imaging",
                testName: caseObj.evidence.imaging.test,
                status: caseObj.evidence.imaging.status,
                freshness: caseObj.evidence.imaging.freshness,
                summary: caseObj.evidence.imaging.summary
            },
            {
                time: caseObj.evidence.molecular.time,
                icon: "🧬",
                stage: "Molecular",
                testName: caseObj.evidence.molecular.test,
                status: caseObj.evidence.molecular.status,
                freshness: caseObj.evidence.molecular.freshness,
                summary: caseObj.evidence.molecular.summary
            },
            {
                time: caseObj.mdtReview.time,
                icon: "👨‍⚕️",
                stage: "MDT Review",
                testName: "Multidisciplinary Team Review",
                status: caseObj.mdtStatus,
                freshness: null,
                summary: caseObj.mdtReview.summary
            }
        ];

        // Append recorded MDT decisions into timeline
        if (caseObj.mdtHistory && caseObj.mdtHistory.length > 0) {
            caseObj.mdtHistory.forEach(function (decItem) {
                timelineEvents.push({
                    time: decItem.time,
                    icon: "⚖️",
                    stage: "MDT Decision",
                    testName: `Decision: ${decItem.decision}`,
                    status: "Decision Recorded",
                    freshness: null,
                    summary: `Reviewer: ${decItem.reviewer} | Comments: ${decItem.comment}`
                });
            });
        }

        timelineContainer.innerHTML = '';

        timelineEvents.forEach(function (event, index) {
            const nodeDiv = document.createElement('div');
            nodeDiv.className = 'timeline-node';

            const freshnessBadgeHtml = event.freshness ? getFreshnessBadgeHtml(event.freshness) : '';

            nodeDiv.innerHTML = `
                <div class="timeline-time-col">
                    <span class="timeline-time">${event.time}</span>
                </div>
                <div class="timeline-icon-col" aria-hidden="true">
                    ${event.icon}
                </div>
                <div class="timeline-content-card">
                    <div class="timeline-content-header">
                        <span class="timeline-step-title">${event.stage} — ${event.testName}</span>
                        <div class="timeline-badges-group">
                            ${getStatusBadgeHtml(event.status)}
                            ${freshnessBadgeHtml}
                        </div>
                    </div>
                    <p class="timeline-summary">${event.summary}</p>
                </div>
            `;

            timelineContainer.appendChild(nodeDiv);

            if (index < timelineEvents.length - 1) {
                const arrowDiv = document.createElement('div');
                arrowDiv.className = 'timeline-arrow-connector';
                arrowDiv.innerHTML = '↓';
                arrowDiv.setAttribute('aria-hidden', 'true');
                timelineContainer.appendChild(arrowDiv);
            }
        });
    }


    /* ----------------------------------------------------------------------
       11. ROLE-BASED LAYOUT & PERMISSIONS ADAPTATION
       ---------------------------------------------------------------------- */
    function applyRoleToCaseDetails(caseObj, role) {
        // Reset evidence cards
        [cardPathology, cardImaging, cardMolecular].forEach(function (card) {
            card.classList.remove('card-emphasized');
            card.classList.remove('hidden');
            const focusTag = card.querySelector('.primary-focus-tag');
            if (focusTag) focusTag.remove();
        });

        otherEvidenceSection.classList.add('hidden');
        otherEvidenceContainer.innerHTML = '';

        // Role-based MDT Action Bar vs Lab Admin Notice
        if (role === 'Lab Admin') {
            if (mdtActionBar) mdtActionBar.classList.add('hidden');
            if (mdtLabAdminNotice) mdtLabAdminNotice.classList.remove('hidden');
        } else {
            if (mdtActionBar) mdtActionBar.classList.remove('hidden');
            if (mdtLabAdminNotice) mdtLabAdminNotice.classList.add('hidden');
            
            // Set Reviewer Role dropdown default to current active role if applicable
            if (selectMdtReviewerRole) {
                if (['Doctor', 'Pathologist', 'Radiologist', 'Molecular Specialist'].includes(role)) {
                    selectMdtReviewerRole.value = role;
                }
            }
        }

        if (role === 'Doctor' || role === 'Lab Admin') {
            return;
        }

        function addFocusTag(cardElement, labelText) {
            cardElement.classList.add('card-emphasized');
            const titleEl = cardElement.querySelector('.card-header-left');
            if (titleEl) {
                const tag = document.createElement('span');
                tag.className = 'primary-focus-tag';
                tag.textContent = labelText;
                titleEl.appendChild(tag);
            }
        }

        function renderOtherEvidenceItem(domainName, iconStr, testData, domainKey) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'other-evidence-item';
            
            const freshnessBadgeHtml = getFreshnessBadgeHtml(testData.freshness);
            const statusBadgeHtml = getStatusBadgeHtml(testData.status);

            itemDiv.innerHTML = `
                <div class="other-item-header">
                    <span class="other-item-title">${iconStr} ${domainName}: ${testData.test}</span>
                    <div style="display:flex; gap:0.4rem; align-items:center;">
                        ${statusBadgeHtml}
                        ${freshnessBadgeHtml}
                    </div>
                </div>
                <div class="other-item-summary">${testData.summary}</div>
                <button type="button" class="btn btn-secondary btn-view-details" data-domain="${domainKey}" style="margin-top:0.4rem; font-size:0.8rem; min-height:34px;">
                    <span aria-hidden="true">📋</span> View Details
                </button>
            `;

            const detailsBtn = itemDiv.querySelector('.btn-view-details');
            if (detailsBtn) {
                detailsBtn.addEventListener('click', function () {
                    openEvidenceDetails(domainKey);
                });
            }

            otherEvidenceContainer.appendChild(itemDiv);
        }

        if (role === 'Pathologist') {
            addFocusTag(cardPathology, 'Pathology Focus');
            cardImaging.classList.add('hidden');
            cardMolecular.classList.add('hidden');
            
            renderOtherEvidenceItem('Imaging', '🩻', caseObj.evidence.imaging, 'imaging');
            renderOtherEvidenceItem('Molecular', '🧬', caseObj.evidence.molecular, 'molecular');
            otherEvidenceSection.classList.remove('hidden');

        } else if (role === 'Radiologist') {
            addFocusTag(cardImaging, 'Radiology Focus');
            cardPathology.classList.add('hidden');
            cardMolecular.classList.add('hidden');

            renderOtherEvidenceItem('Pathology', '🧪', caseObj.evidence.pathology, 'pathology');
            renderOtherEvidenceItem('Molecular', '🧬', caseObj.evidence.molecular, 'molecular');
            otherEvidenceSection.classList.remove('hidden');

        } else if (role === 'Molecular Specialist') {
            addFocusTag(cardMolecular, 'Molecular Focus');
            cardPathology.classList.add('hidden');
            cardImaging.classList.add('hidden');

            renderOtherEvidenceItem('Pathology', '🧪', caseObj.evidence.pathology, 'pathology');
            renderOtherEvidenceItem('Imaging', '🩻', caseObj.evidence.imaging, 'imaging');
            otherEvidenceSection.classList.remove('hidden');
        }
    }


    /* ----------------------------------------------------------------------
       12. DRILL-DOWN EVIDENCE MODAL CONTROLLER
       ---------------------------------------------------------------------- */
    function openEvidenceDetails(domainKey) {
        if (!currentOpenCaseId || !casesData[currentOpenCaseId]) return;

        const caseObj = casesData[currentOpenCaseId];
        const evidenceItem = caseObj.evidence[domainKey];
        if (!evidenceItem) return;

        auditCaseId.textContent = caseObj.id;
        auditEvidenceType.textContent = domainKey.charAt(0).toUpperCase() + domainKey.slice(1);
        auditTestName.textContent = evidenceItem.test;
        auditSpecimenId.textContent = evidenceItem.specimenId;
        auditCollectionTime.textContent = evidenceItem.collectionTime;
        auditProcessingTime.textContent = evidenceItem.processingTime;
        auditReviewer.textContent = evidenceItem.reviewer;
        auditReportVersion.textContent = evidenceItem.reportVersion;
        auditLastUpdated.textContent = evidenceItem.lastUpdated;
        auditDepartment.textContent = evidenceItem.department;
        auditResultSummary.textContent = evidenceItem.summary;

        detailsModalTitle.textContent = `${domainKey.charAt(0).toUpperCase() + domainKey.slice(1)} Evidence Details`;
        auditFreshnessSlot.innerHTML = getFreshnessBadgeHtml(evidenceItem.freshness);

        auditVersionHistoryList.innerHTML = '';
        if (evidenceItem.versionHistory && evidenceItem.versionHistory.length > 0) {
            evidenceItem.versionHistory.forEach(function (logItem) {
                const li = document.createElement('li');
                li.className = 'version-history-item';
                li.innerHTML = `<span class="version-tag">LOG</span> <span>${logItem}</span>`;
                auditVersionHistoryList.appendChild(li);
            });
        }

        evidenceDetailsModal.classList.remove('hidden');
    }

    function closeEvidenceDetails() {
        if (evidenceDetailsModal) {
            evidenceDetailsModal.classList.add('hidden');
        }
    }

    const cardDetailsButtons = document.querySelectorAll('.btn-view-details');
    cardDetailsButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const domainKey = btn.getAttribute('data-domain');
            openEvidenceDetails(domainKey);
        });
    });

    if (closeDetailsHeaderBtn) closeDetailsHeaderBtn.addEventListener('click', closeEvidenceDetails);
    if (closeDetailsFooterBtn) closeDetailsFooterBtn.addEventListener('click', closeEvidenceDetails);

    if (evidenceDetailsModal) {
        evidenceDetailsModal.addEventListener('click', function (e) {
            if (e.target === evidenceDetailsModal) {
                closeEvidenceDetails();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !evidenceDetailsModal.classList.contains('hidden')) {
            closeEvidenceDetails();
        }
    });


    /* ----------------------------------------------------------------------
       13. EVENT LISTENERS FOR MDT DECISION FORM
       ---------------------------------------------------------------------- */
    if (btnRecordMdtDecision) {
        btnRecordMdtDecision.addEventListener('click', function () {
            if (mdtDecisionFormCard) {
                mdtDecisionFormCard.classList.remove('hidden');
                mdtFormSafetyAlert.classList.add('hidden');
                mdtDecisionFormCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    if (btnCancelMdtDecision) {
        btnCancelMdtDecision.addEventListener('click', function () {
            if (mdtDecisionFormCard) {
                mdtDecisionFormCard.classList.add('hidden');
                mdtFormSafetyAlert.classList.add('hidden');
            }
        });
    }

    if (btnSaveMdtDecision) {
        btnSaveMdtDecision.addEventListener('click', function () {
            saveMdtDecision();
        });
    }


    /* ----------------------------------------------------------------------
       14. MAIN ROLE SWITCHING CONTROLLER
       ---------------------------------------------------------------------- */
    function applyRoleView(selectedRole) {
        currentSelectedRole = selectedRole;
        const iconStr = getRoleIcon(selectedRole);

        if (roleBannerIcon) roleBannerIcon.textContent = iconStr;
        if (roleBannerTitle) roleBannerTitle.textContent = selectedRole;
        if (activeRoleDisplay) activeRoleDisplay.textContent = selectedRole;

        if (labCapacitySection) {
            labCapacitySection.classList.toggle('hidden', selectedRole !== 'Lab Admin');
        }

        if (currentOpenCaseId !== null && casesData[currentOpenCaseId]) {
            renderCaseDetails(currentOpenCaseId);
        }

        console.log(`Role View switched to: ${selectedRole}`);
    }


    /* ----------------------------------------------------------------------
       15. VIEW NAVIGATION ROUTER (DASHBOARD, CASES, TIMELINE, SCHEDULING, REPORTS)
       ---------------------------------------------------------------------- */
    function hideAllViews() {
        dashboardView.classList.add('hidden');
        caseDetailsView.classList.add('hidden');
        schedulingView.classList.add('hidden');
        reportsView.classList.add('hidden');

        [navDashboardItem, navCasesItem, navTimelineItem, navSchedulingItem, navReportsItem].forEach(function (item) {
            if (item) item.classList.remove('active');
        });
    }

    function showDashboardView() {
        hideAllViews();
        dashboardView.classList.remove('hidden');
        if (navDashboardItem) navDashboardItem.classList.add('active');
        currentOpenCaseId = null;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showCasesView() {
        showDashboardView();
        if (navCasesItem) {
            navDashboardItem.classList.remove('active');
            navCasesItem.classList.add('active');
        }
        const casesTableSection = document.getElementById('casesTableSection');
        if (casesTableSection) {
            casesTableSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function showCaseDetailsView(caseIdKey) {
        hideAllViews();
        renderCaseDetails(caseIdKey);
        caseDetailsView.classList.remove('hidden');
        if (navTimelineItem) navTimelineItem.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showSchedulingView() {
        hideAllViews();
        updateCapacityUI();
        schedulingView.classList.remove('hidden');
        if (navSchedulingItem) navSchedulingItem.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showReportsView() {
        hideAllViews();
        reportsView.classList.remove('hidden');
        if (navReportsItem) navReportsItem.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Attach Sidebar Nav Click Listeners
    if (navDashboardLink) navDashboardLink.addEventListener('click', function (e) { e.preventDefault(); showDashboardView(); });
    if (navCasesLink) navCasesLink.addEventListener('click', function (e) { e.preventDefault(); showCasesView(); });
    if (navTimelineLink) navTimelineLink.addEventListener('click', function (e) { e.preventDefault(); showCaseDetailsView(currentOpenCaseId || 'Case 001'); });
    if (navSchedulingLink) navSchedulingLink.addEventListener('click', function (e) { e.preventDefault(); showSchedulingView(); });
    if (navReportsLink) navReportsLink.addEventListener('click', function (e) { e.preventDefault(); showReportsView(); });
    if (backToDashboardBtn) backToDashboardBtn.addEventListener('click', showDashboardView);

    // Attach View Case buttons
    const viewButtons = document.querySelectorAll('.btn-view-case');
    viewButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const caseIdKey = button.getAttribute('data-case-id');
            showCaseDetailsView(caseIdKey);
        });
    });

    // Phase 6 Scheduling Buttons Click Handlers
    if (btnScheduleCase003) {
        btnScheduleCase003.addEventListener('click', function () {
            scheduleTest('Case 003', false);
        });
    }

    if (btnScheduleUrgentCase003) {
        btnScheduleUrgentCase003.addEventListener('click', function () {
            scheduleTest('Case 003', true);
        });
    }


    /* ----------------------------------------------------------------------
       16. ROLE SELECTOR & LIVE SEARCH
       ---------------------------------------------------------------------- */
    if (userRoleSelect) {
        userRoleSelect.addEventListener('change', function (event) {
            applyRoleView(event.target.value);
        });
    }

    if (caseSearchInput) {
        caseSearchInput.addEventListener('input', function (event) {
            const searchTerm = event.target.value.toLowerCase().trim();
            let visibleCount = 0;

            caseRows.forEach(function (row) {
                const caseId = row.dataset.caseId ? row.dataset.caseId.toLowerCase() : '';
                const caseTitleElement = row.querySelector('.case-title');
                const caseTitle = caseTitleElement ? caseTitleElement.textContent.toLowerCase() : '';

                const matches = caseId.includes(searchTerm) || caseTitle.includes(searchTerm);

                if (matches) {
                    row.classList.remove('hidden');
                    visibleCount++;
                } else {
                    row.classList.add('hidden');
                }
            });

            if (caseCountTag) {
                caseCountTag.textContent = searchTerm === '' 
                    ? `Showing ${caseRows.length} sample cases`
                    : `Showing ${visibleCount} of ${caseRows.length} cases`;
            }

            if (noResultsDiv) {
                noResultsDiv.classList.toggle('hidden', visibleCount > 0);
            }
        });
    }

    // Initialize State
    if (userRoleSelect) applyRoleView(userRoleSelect.value);
    updateCapacityUI();

    console.log('Pathology Evidence Timeline (Phase 7 MDT Review & Decision Tracking) initialized successfully.');
});
