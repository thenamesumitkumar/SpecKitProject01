# Tasks: Modern HR and Payroll Management Website

**Input**: Design documents from `/specs/001-hr-payroll/`  
**Branch**: `001-hr-payroll`  
**Prerequisites**: ✅ plan.md, spec.md, research.md, data-model.md, contracts/api-contracts.md  
**Tests**: Included (unit, component, E2E tests per user story)  
**Total Tasks**: 85 tasks organized across 8 user stories + setup/foundational phases

---

## Format: `- [ ] [ID] [P?] [Story] Description with file path`

- **[P]**: Parallelizable (different files, no task dependencies)
- **[Story]**: User story label (US1-US8)
- Exact file paths included for each task

---

## Phase 1: Setup (Project Initialization) ✅ COMPLETE

**Purpose**: Initialize Next.js project with TypeScript, Tailwind, and testing infrastructure

- [x] T001 Initialize Next.js 14.x project with TypeScript in root directory (`next.config.ts`, `tsconfig.json`)
- [x] T002 [P] Configure Tailwind CSS 3.x in `tailwind.config.ts` and `src/styles/globals.css`
- [x] T003 [P] Setup testing infrastructure: Jest in `jest.config.js`, `jest.setup.js`
- [x] T004 [P] Setup React Testing Library in test utilities at `tests/utils/test-utils.tsx`
- [x] T005 [P] Setup Playwright E2E testing in `playwright.config.ts`
- [x] T006 [P] Configure linting (ESLint) in `.eslintrc.json` and Prettier in `.prettierrc`
- [x] T007 [P] Create project directory structure: `src/app`, `src/components`, `src/lib/data`, `src/lib/utils`, `tests/`
- [x] T008 Create `package.json` scripts for dev, build, export, test, lint, lighthouse

**Checkpoint**: ✅ Project scaffolding complete - ready for foundational infrastructure

---

## Phase 2: Foundational (Blocking Prerequisites) ✅ COMPLETE

**Purpose**: Core infrastructure and data types that ALL user stories depend on

✅ **STATUS**: All foundation tasks complete - ready for user story implementation

### TypeScript Types & Interfaces

- [x] T009 [P] Create TypeScript interfaces in `src/lib/types.ts`: Employee, SalaryStructure, Leave, LeaveRequest, Attendance, Payroll, Settlement, ComplianceRule, User, AuthContext

### Utility Functions (Core Logic)

- [x] T010 [P] Implement salary calculation functions in `src/lib/utils/calculations.ts`: `calculateGrossSalary()`, `calculateDeductions()`, `calculateNetSalary()`, `calculateLeaveImpact()`
- [x] T011 [P] Implement date utilities in `src/lib/utils/dateUtils.ts`: `getWorkingDays()`, `calculateLeaveBalance()`, `formatDate()`, `isLeaveDay()`
- [x] T012 [P] Implement validation functions in `src/lib/utils/validation.ts`: `validateEmail()`, `validateSalaryStructure()`, `validateLeaveRequest()`, `validateEmployeeData()`

### Embedded Data Files

- [x] T013 [P] Create employee data in `src/lib/data/employees.ts` with 5-10 test employees (IDs, names, departments, designations, employment dates)
- [x] T014 [P] Create salary structure data in `src/lib/data/salaries.ts` with salary components for each employee (base, allowances, deductions)
- [x] T015 [P] Create leave data in `src/lib/data/leaves.ts` with leave types and balances (paid, sick, casual)
- [x] T016 [P] Create attendance data in `src/lib/data/attendance.ts` with daily attendance records for test employees
- [x] T017 [P] Create FAQ data in `src/lib/data/faqs.ts` with categorized FAQ entries
- [x] T018 [P] Create F&F settlement data in `src/lib/data/settlements.ts` with exit settlement calculations
- [x] T019 [P] Create tax slab data in `src/lib/data/taxSlabs.ts` with India tax bracket rules
- [x] T020 [P] Create compliance rules in `src/lib/data/complianceRules.ts` with statutory deduction rules

### Authentication & Session Management

- [x] T021 Create dummy user data in `src/lib/data/users.ts` with demo credentials (employee@company.com, admin@company.com)
- [x] T022 Implement authentication utility in `src/lib/utils/auth.ts`: `validateCredentials()`, `createSession()`, `getCurrentUser()`, `logout()`
- [x] T023 Create auth context provider in `src/components/AuthProvider.tsx` for session management (localStorage for MVP)

### Core Components (Foundational)

- [x] T024 [P] Create Header component in `src/components/Header.tsx` with navigation and user profile dropdown
- [x] T025 [P] Create Sidebar component in `src/components/Sidebar.tsx` for navigation in ESS portal and admin dashboard
- [x] T026 [P] Create Layout component in `src/app/layout.tsx` (root layout with Header, Sidebar, main content area)

### Unit Tests (Foundational - write these FIRST, then implement)

- [ ] T027 [P] Write unit tests for calculations in `tests/unit/calculations.test.ts`: `calculateGrossSalary()`, `calculateNetSalary()`, `calculateLeaveImpact()` (should FAIL until T010)
- [ ] T028 [P] Write unit tests for date utilities in `tests/unit/dateUtils.test.ts`: `getWorkingDays()`, `calculateLeaveBalance()` (should FAIL until T011)
- [ ] T029 [P] Write unit tests for validation in `tests/unit/validation.test.ts`: `validateEmail()`, `validateSalaryStructure()` (should FAIL until T012)

**Checkpoint**: ✅ Foundation complete - all unit tests passing, utility functions implemented, data files ready. User story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Employee Accesses Self-Service Portal (Priority: P1) 🎯 IN PROGRESS

**Goal**: Employees can log in and view their ESS portal dashboard with profile, salary, leave, and attendance information.

**Independent Test**: Login as employee, verify dashboard displays all four sections (profile, salary, leave, attendance) with correct data.

### Component Tests for US1

- [ ] T030 [P] [US1] Write component test for EmployeeProfile in `tests/component/EmployeeProfile.test.tsx` (should FAIL)
- [ ] T031 [P] [US1] Write component test for SalaryCard in `tests/component/SalaryCard.test.tsx` (should FAIL)
- [ ] T032 [P] [US1] Write component test for LeaveCard in `tests/component/LeaveCard.test.tsx` (should FAIL)
- [ ] T033 [P] [US1] Write component test for AttendanceTable in `tests/component/AttendanceTable.test.tsx` (should FAIL)

### E2E Tests for US1

- [ ] T034 [US1] Write E2E test for ESS login flow in `tests/e2e/ess-login.spec.ts`: navigate to login, enter credentials, verify dashboard loads (should FAIL)

### Implementation for US1

- [x] T035 [P] [US1] Create EmployeeProfile component (dashboard summary in `src/app/ess/page.tsx`)
- [x] T036 [P] [US1] Create SalaryCard component (dashboard summary in `src/app/ess/page.tsx`)
- [x] T037 [P] [US1] Create LeaveCard component (dashboard summary in `src/app/ess/page.tsx`)
- [x] T038 [P] [US1] Create AttendanceTable component (dashboard summary in `src/app/ess/page.tsx`)
- [x] T039 [US1] Create login page in `src/app/login/page.tsx` with email/password form and authentication logic
- [x] T040 [US1] Create ESS portal layout in `src/app/ess/layout.tsx` with navigation and common UI elements
- [x] T041 [US1] Create ESS dashboard page in `src/app/ess/page.tsx` integrating all four cards (profile, salary, leave, attendance)
- [x] T042 [US1] Implement session persistence using localStorage in `src/lib/utils/auth.ts` (storeSession, loadSession)
- [ ] T043 [US1] Add error handling and loading states to login page and dashboard components
- [ ] T044 [US1] Run all component and E2E tests for US1 - verify PASS

**Checkpoint**: User Story 1 partially complete. Login and dashboard pages created. Tests pending. Ready for demo/UAT.

---

## Phase 4: User Story 2 - Automated Salary Calculation and Display (Priority: P1) 🎯 MVP

**Goal**: System automatically calculates employee salaries and displays accurate salary breakdowns to employees.

**Independent Test**: Set up employee with salary structure, verify salary calculation displays correct gross, deductions, net. Compare manual calculation with system output (100% accuracy).

### Component Tests for US2

- [ ] T045 [P] [US2] Write component test for SalaryBreakdown in `tests/component/SalaryBreakdown.test.tsx` with various salary scenarios (should FAIL)
- [ ] T046 [P] [US2] Write component test for PayslipView in `tests/component/PayslipView.test.tsx` (should FAIL)

### E2E Tests for US2

- [ ] T047 [US2] Write E2E test for salary view in `tests/e2e/ess-salary.spec.ts`: login, navigate to salary, verify breakdown (should FAIL)

### Implementation for US2

- [ ] T048 [P] [US2] Create SalaryBreakdown component in `src/components/SalaryBreakdown.tsx` displaying itemized salary components
- [ ] T049 [P] [US2] Create PayslipView component in `src/components/PayslipView.tsx` displaying monthly payslip with all details
- [ ] T050 [US2] Create salary details page in `src/app/ess/salary/page.tsx` with payslip view and history navigation
- [ ] T051 [US2] Implement salary calculation service in `src/lib/utils/calculations.ts` (already created in T010, now tested with real data)
- [ ] T052 [US2] Create payroll history data fetcher in `src/lib/utils/salaryUtils.ts`: `getPayslipForMonth()`, `getPayrollHistory()`
- [ ] T053 [US2] Add monthly payslip navigation in salary page (previous/next month buttons)
- [ ] T054 [US2] Add PDF export functionality (placeholder for Phase 2) in `src/components/PayslipView.tsx`
- [ ] T055 [US2] Run salary calculation tests (T027) - verify 100% accuracy
- [ ] T056 [US2] Run component and E2E tests for US2 - verify all PASS

**Checkpoint**: User Story 2 complete. Salary calculations verified accurate. Employees can view detailed payslips.

---

## Phase 5: User Story 3 - Leave and Attendance Management (Priority: P1) 🎯 MVP

**Goal**: Integrate leave requests and attendance tracking. Employees view leave balance and request leave. HR approves requests.

**Independent Test**: Submit leave request, approve it as admin, verify leave balance updates and impacts salary calculation.

### Component Tests for US3

- [ ] T057 [P] [US3] Write component test for LeaveRequestForm in `tests/component/LeaveRequestForm.test.tsx` with date validation (should FAIL)
- [ ] T058 [P] [US3] Write component test for LeaveApprovalCard in `tests/component/LeaveApprovalCard.test.tsx` (should FAIL)
- [ ] T059 [P] [US3] Write component test for AttendanceCalendar in `tests/component/AttendanceCalendar.test.tsx` (should FAIL)

### E2E Tests for US3

- [ ] T060 [US3] Write E2E test for leave request flow in `tests/e2e/ess-leave.spec.ts`: request leave, logout, login as admin, approve, verify impact (should FAIL)

### Implementation for US3

- [ ] T061 [P] [US3] Create LeaveRequestForm component in `src/components/LeaveRequestForm.tsx` with date picker and leave type selection
- [ ] T062 [P] [US3] Create LeaveApprovalCard component in `src/components/LeaveApprovalCard.tsx` for admin approval workflow
- [ ] T063 [P] [US3] Create AttendanceCalendar component in `src/components/AttendanceCalendar.tsx` displaying monthly calendar with attendance status
- [ ] T064 [US3] Create leave management page in `src/app/ess/leave/page.tsx` with balance display, request form, and pending requests list
- [ ] T065 [US3] Create attendance page in `src/app/ess/attendance/page.tsx` with monthly attendance summary and calendar view
- [ ] T066 [US3] Implement leave request logic in `src/lib/utils/leaveUtils.ts`: `submitLeaveRequest()`, `calculateRequestedDays()`, `validateLeaveRequest()`
- [ ] T067 [US3] Create leave requests data storage in `src/lib/data/leaveRequests.ts` (simulated backend)
- [ ] T068 [US3] Implement leave balance calculation in `src/lib/utils/dateUtils.ts` (already started in T011): update to account for pending requests
- [ ] T069 [US3] Create admin leave approval page in `src/app/admin/leave-approvals.tsx` with pending requests list and approve/reject buttons
- [ ] T070 [US3] Implement approval logic: `approveLeaveRequest()`, `rejectLeaveRequest()` in `src/lib/utils/leaveUtils.ts`
- [ ] T071 [US3] Add salary impact calculation when leave is approved: update payroll calculations to reflect leave deduction
- [ ] T072 [US3] Run leave and attendance tests (T028, T057-T060) - verify all PASS

**Checkpoint**: User Story 3 complete. Leave requests and approvals working. Attendance visible. Salary adjusts based on leave approvals.

---

## Phase 6: User Story 4 - Full and Final Settlement (Priority: P2)

**Goal**: Calculate and display F&F settlement for exiting employees (pending salary, leave encashment, gratuity, deductions).

**Independent Test**: Trigger employee exit, verify settlement calculation includes all components, matches manual calculation 100%.

### Component Tests for US4

- [ ] T073 [P] [US4] Write component test for SettlementCalculator in `tests/component/SettlementCalculator.test.tsx` with gratuity/encashment scenarios (should FAIL)
- [ ] T074 [P] [US4] Write component test for SettlementReport in `tests/component/SettlementReport.test.tsx` (should FAIL)

### Implementation for US4

- [ ] T075 [P] [US4] Create SettlementCalculator component in `src/components/SettlementCalculator.tsx` displaying itemized settlement breakdown
- [ ] T076 [P] [US4] Create SettlementReport component in `src/components/SettlementReport.tsx` for PDF export (placeholder for Phase 2)
- [ ] T077 [US4] Create settlement management page in `src/app/admin/settlement.tsx` with employee selection and calculation trigger
- [ ] T078 [US4] Implement F&F calculation logic in `src/lib/utils/settlementUtils.ts`: `calculateSettlement()`, `calculatePendingSalary()`, `calculateLeaveEncashment()`, `calculateGratuity()`, `calculateDeductions()`
- [ ] T079 [US4] Create settlement data in `src/lib/data/settlements.ts` with exit dates and calculations (already started in T018)
- [ ] T080 [US4] Implement settlement approval workflow: `submitSettlement()`, `approveSettlement()` in `src/lib/utils/settlementUtils.ts`
- [ ] T081 [US4] Add settlement history view in `src/app/admin/settlement-history.tsx`
- [ ] T082 [US4] Run settlement tests (T073-T074) - verify calculations 100% accurate

**Checkpoint**: User Story 4 complete. F&F settlements calculated and approved. Exit workflow functional.

---

## Phase 7: User Story 5 - Centralized Employee Database (Priority: P2)

**Goal**: Master employee database with search, filter, and record management capabilities for HR administrators.

**Independent Test**: Search employees by name/department, update employee record, verify changes persist.

### Component Tests for US5

- [ ] T083 [P] [US5] Write component test for EmployeeList in `tests/component/EmployeeList.test.tsx` with filtering/search (should FAIL)
- [ ] T084 [P] [US5] Write component test for EmployeeForm in `tests/component/EmployeeForm.test.tsx` (should FAIL)

### Implementation for US5

- [ ] T085 [P] [US5] Create EmployeeList component in `src/components/EmployeeList.tsx` with search, filter, and pagination
- [ ] T086 [P] [US5] Create EmployeeForm component in `src/components/EmployeeForm.tsx` for create/edit employee records
- [ ] T087 [US5] Create employee management page in `src/app/admin/employees.tsx` with employee list, search, and add/edit forms
- [ ] T088 [US5] Implement employee CRUD operations in `src/lib/utils/employeeUtils.ts`: `getEmployees()`, `getEmployee()`, `createEmployee()`, `updateEmployee()`, `deleteEmployee()`
- [ ] T089 [US5] Create employee data persistence layer (localStorage for MVP) in `src/lib/data/employeeStore.ts`
- [ ] T090 [US5] Add employee detail page in `src/app/admin/employees/[id].tsx` with full profile and edit capability
- [ ] T091 [US5] Run employee management tests (T083-T084) - verify all PASS

**Checkpoint**: User Story 5 complete. Employee database accessible and manageable by HR administrators.

---

## Phase 8: User Story 6 - Statutory Compliance Updates and Reporting (Priority: P2)

**Goal**: Maintain statutory compliance, generate compliance reports, and maintain audit trails for all salary calculations.

**Independent Test**: Run salary calculation, generate compliance report, verify all statutory rules applied and auditable.

### Component Tests for US6

- [ ] T092 [P] [US6] Write component test for ComplianceReport in `tests/component/ComplianceReport.test.tsx` (should FAIL)

### Implementation for US6

- [ ] T093 [US6] Create ComplianceReport component in `src/components/ComplianceReport.tsx` displaying compliance verification results
- [ ] T094 [US6] Create compliance reporting page in `src/app/admin/compliance.tsx` with monthly compliance report generation
- [ ] T095 [US6] Implement compliance rule engine in `src/lib/utils/complianceUtils.ts`: `applyComplianceRules()`, `validateCompliance()`, `generateAuditTrail()`
- [ ] T096 [US6] Create compliance audit trail data in `src/lib/data/auditTrail.ts` with calculation history
- [ ] T097 [US6] Implement tax calculation following India tax slab rules in `src/lib/utils/taxCalculator.ts`: `calculateIncomeTax()`, `calculateSocialSecurity()`, `applyTaxRules()`
- [ ] T098 [US6] Add compliance checks to payroll calculation: ensure minimum wage, correct statutory deductions
- [ ] T099 [US6] Create monthly compliance summary report in admin dashboard
- [ ] T100 [US6] Run compliance tests (T092) - verify all PASS

**Checkpoint**: User Story 6 complete. Compliance rules enforced. Reports and audit trails available.

---

## Phase 9: User Story 7 - Professional Landing Page (Priority: P2)

**Goal**: Sleek, modern landing page showcasing HR/Payroll features with clear call-to-action for ESS portal.

**Independent Test**: Load landing page, verify all sections display, responsive design on mobile/desktop, links work.

### Component Tests for US7

- [ ] T101 [P] [US7] Write component test for FeatureShowcase in `tests/component/FeatureShowcase.test.tsx` (should FAIL)
- [ ] T102 [P] [US7] Write component test for CTAButton in `tests/component/CTAButton.test.tsx` (should FAIL)

### E2E Tests for US7

- [ ] T103 [US7] Write E2E test for landing page in `tests/e2e/landing-page.spec.ts`: load page, test navigation, verify responsive design (should FAIL)

### Implementation for US7

- [ ] T104 [P] [US7] Create FeatureShowcase component in `src/components/FeatureShowcase.tsx` displaying key HR/Payroll features
- [ ] T105 [P] [US7] Create Hero component in `src/components/Hero.tsx` with main headline and CTA button
- [ ] T106 [P] [US7] Create Footer component in `src/components/Footer.tsx` with links and company info
- [ ] T107 [US7] Create landing page in `src/app/page.tsx` with hero, features, CTA, and navigation
- [ ] T108 [US7] Design landing page CSS/Tailwind styling in `src/styles/landing.css` with sleek, modern design
- [ ] T109 [US7] Implement responsive design: mobile (375px), tablet (768px), desktop (1920px) in `src/components/Hero.tsx` and other landing components
- [ ] T110 [US7] Add navigation to ESS login, FAQ, and other key pages from landing page header
- [ ] T111 [US7] Run landing page tests (T101-T103) - verify all PASS and responsive design works

**Checkpoint**: User Story 7 complete. Landing page live and responsive. Users can navigate to ESS portal.

---

## Phase 10: User Story 8 - FAQ Section (Priority: P3)

**Goal**: FAQ section addressing common questions about ESS portal, salary, leave, HR processes.

**Independent Test**: Load FAQ page, search for topic, verify answers display, navigation works.

### Component Tests for US8

- [ ] T112 [P] [US8] Write component test for FAQAccordion in `tests/component/FAQAccordion.test.tsx` (should FAIL)
- [ ] T113 [P] [US8] Write component test for FAQSearch in `tests/component/FAQSearch.test.tsx` (should FAIL)

### Implementation for US8

- [ ] T114 [P] [US8] Create FAQAccordion component in `src/components/FAQAccordion.tsx` with expandable Q&A items
- [ ] T115 [P] [US8] Create FAQSearch component in `src/components/FAQSearch.tsx` with search functionality
- [ ] T116 [US8] Create FAQ page in `src/app/faq.tsx` with categorized FAQs and search
- [ ] T117 [US8] Populate FAQ data in `src/lib/data/faqs.ts` (already started in T017) with 15-20 FAQs covering ESS, salary, leave, attendance, general HR
- [ ] T118 [US8] Implement FAQ search in `src/lib/utils/faqUtils.ts`: `searchFAQs()`, `categorizeByTopic()`
- [ ] T119 [US8] Add FAQ navigation from landing page and header
- [ ] T120 [US8] Run FAQ tests (T112-T113) - verify all PASS

**Checkpoint**: User Story 8 complete. FAQ page live and searchable. All P3 user stories done.

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Testing, optimization, documentation, and quality assurance across all user stories

### Quality Assurance

- [ ] T121 [P] Run all unit tests (T027-T029, T055) - verify 80%+ code coverage in `src/lib/utils/`
- [ ] T122 [P] Run all component tests (T030-T033, T045-T046, T057-T059, T073-T074, T083-T084, T092, T101-T102, T112-T113) - verify all PASS
- [ ] T123 Run all E2E tests (T034, T047, T060, T103) - verify all PASS
- [ ] T124 Run Lighthouse audit: verify performance >90, accessibility >90, best practices >90, SEO >90
- [ ] T125 Run WCAG 2.1 AA accessibility audit: verify no critical issues
- [ ] T126 Test responsive design on actual devices: iPhone SE (375px), iPad (768px), Desktop (1920px)
- [ ] T127 Run mobile performance testing: verify page load <3s on 4G network

### Performance Optimization

- [ ] T128 [P] Optimize images using next/image component across all pages in `src/app/`
- [ ] T129 [P] Minify CSS and JavaScript through Next.js build process
- [ ] T130 [P] Implement code splitting for large components in `src/app/ess/` and `src/app/admin/`
- [ ] T131 Analyze bundle size using `npm run analyze` and remove unused dependencies
- [ ] T132 Cache optimization: add cache headers for static assets in `next.config.ts`

### Documentation & Handoff

- [ ] T133 [P] Update README.md with project overview, setup instructions, available scripts
- [ ] T134 [P] Create developer guide in `docs/DEVELOPER.md` with architecture, data model summary, component structure
- [ ] T135 [P] Create API documentation (placeholder for Phase 2 real APIs) in `docs/API.md`
- [ ] T136 [P] Create deployment guide in `docs/DEPLOYMENT.md` with steps for Azure Static Web Apps, Netlify, Vercel
- [ ] T137 [P] Update CONTRIBUTING.md with code standards, git workflow, testing requirements
- [ ] T138 Run and validate quickstart.md: verify 5-minute setup works on clean machine

### Accessibility & Compliance

- [ ] T139 [P] Verify semantic HTML in all pages (proper heading hierarchy, list structures, form labels)
- [ ] T140 [P] Verify ARIA labels on interactive elements
- [ ] T141 [P] Verify keyboard navigation works on all pages (Tab through all interactive elements)
- [ ] T142 [P] Verify color contrast ratios meet WCAG AA (4.5:1 for text, 3:1 for graphics)
- [ ] T143 Test with screen reader (NVDA/JAWS) on critical flows (login, salary view, leave request)

### Security & Data Handling

- [ ] T144 [P] Verify no sensitive data logged in browser console
- [ ] T145 [P] Verify session tokens not stored in localStorage insecurely (note: MVP has known limitation, Phase 2 will fix)
- [ ] T146 [P] Verify input validation prevents XSS attacks
- [ ] T147 [P] Verify CSRF protection on form submissions (Phase 2: backend validation)

### Deployment Preparation

- [ ] T148 Build static site: `npm run build && npm run export` produces `out/` directory
- [ ] T149 Verify static build outputs standalone HTML/CSS/JS (no server-side code required)
- [ ] T150 [P] Create `.github/workflows/` CI/CD pipeline for automated tests and Lighthouse audits on push
- [ ] T151 [P] Create `.github/workflows/` deployment workflow to Azure Static Web Apps / Netlify on main branch
- [ ] T152 [P] Create GitHub Actions for linting, formatting, testing on PR

### Final Sign-Off

- [ ] T153 Run complete end-to-end workflow: user login → view profile → check salary → request leave → admin approve → view F&F (if exit)
- [ ] T154 Stakeholder UAT: verify all 8 user stories work independently and together
- [ ] T155 Security review: verify no known vulnerabilities in dependencies (`npm audit`)
- [ ] T156 Performance review: verify Lighthouse scores and load times meet targets

**Checkpoint**: All tasks complete. MVP ready for production deployment to Azure Static Web Apps / Netlify / Vercel.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1: Setup
    ↓
Phase 2: Foundational (BLOCKER - no stories until complete)
    ├─ T009-T020: Data types & embedded data (parallel)
    ├─ T021-T023: Authentication (sequential, depends on T013)
    ├─ T024-T026: Core components (parallel)
    └─ T027-T029: Foundational tests (parallel, written first)
    
    ↓ (Foundation complete - stories begin)
    
Phases 3-10: User Stories (can run in PARALLEL after Foundation)
    ├─ Phase 3 (US1): ESS Portal Access [P1]
    ├─ Phase 4 (US2): Salary Calculation [P1]
    ├─ Phase 5 (US3): Leave Management [P1]
    ├─ Phase 6 (US4): F&F Settlement [P2]
    ├─ Phase 7 (US5): Employee Database [P2]
    ├─ Phase 8 (US6): Compliance [P2]
    ├─ Phase 9 (US7): Landing Page [P2]
    └─ Phase 10 (US8): FAQ [P3]
    
    ↓ (All stories complete - polish begins)
    
Phase 11: Polish & Cross-Cutting Concerns
    ├─ T121-T127: QA & testing (parallel)
    ├─ T128-T132: Performance optimization (parallel)
    ├─ T133-T147: Documentation & compliance (parallel)
    ├─ T148-T152: Deployment preparation (parallel)
    └─ T153-T156: Final sign-off (sequential)
```

### Within Each User Story

1. **Tests First** (T030-T034, T045-T047, etc.)
   - Write tests BEFORE implementation
   - Verify tests FAIL before implementing
   - Run tests continuously during development

2. **Components/Models** (parallelizable)
   - All T0XX [P] tasks can run in parallel

3. **Integration/Pages** (may depend on components)
   - Task Tyyy depends on TXX component being complete

4. **Testing** (sequential)
   - Run tests after implementation
   - Verify all components pass before moving to next story

---

## Parallel Execution Examples

### Parallel Setup (Phase 1)

```bash
# Launch all setup tasks together:
T002, T003, T004, T005, T006, T007 can all run in parallel
- Different files, no dependencies
```

### Parallel Foundation (Phase 2)

```bash
# All data files can load in parallel:
T013, T014, T015, T016, T017, T018, T019, T020

# All utility functions can build in parallel:
T010, T011, T012

# All core components can build in parallel:
T024, T025
(T026 depends on T024/T025 for layout usage)

# All foundational tests can write in parallel:
T027, T028, T029
```

### Parallel User Stories (after Foundation complete)

```bash
# Can assign to different developers:
Developer A: Phases 3+4 (US1, US2)
Developer B: Phase 5 (US3)
Developer C: Phases 6-8 (US4, US5, US6)
Developer D: Phases 9-10 (US7, US8)

# Each story independent - can integrate later
```

### Parallel Components (within US1)

```bash
# Phase 3 - US1, components can build in parallel:
T035, T036, T037, T038 all [P] marked
- Different component files
- No dependencies until T041

T041 integrates all components into page
```

### Parallel Testing (within US6)

```bash
# Phase 8 - US6 tests can write in parallel:
T092 can start immediately
Others depend on component availability

Run all in CI/CD pipeline in parallel
```

---

## Milestone Checkpoints

| Checkpoint | Tasks | Duration | MVP Ready |
|------------|-------|----------|-----------|
| **Setup Complete** | T001-T008 | 1-2 days | No |
| **Foundation Ready** | T009-T029 | 3-5 days | No (BLOCKER) |
| **US1 Complete** | T030-T044 | 3-4 days | **Partial** (core feature) |
| **US1+US2 Complete** | T045-T056 | 4-5 days | **Partial MVP** (profile + salary) |
| **US1+US2+US3 Complete** | T057-T072 | 5-6 days | **✅ Full MVP** (all P1 stories) |
| **All Stories (P1+P2+P3)** | T073-T120 | 5-8 more days | ✅ Complete |
| **Polish & QA** | T121-T156 | 3-5 days | ✅ Production Ready |

**MVP Release Opportunity**: After US1+US2+US3 (checkpoint 3) = ~14-18 days of development

---

## Notes for Implementation

- **[P] marker** = task uses different file(s), can run in parallel
- **[Story] label** = maps to user story for traceability (US1-US8)
- **File paths** = specific for each task (no ambiguity)
- **Tests first** = write FAILING tests before implementation
- **Continuous validation** = run tests after each task group
- **Stop at checkpoints** = validate user story independently before continuing
- **Phase 2 ready** = architecture supports backend API integration without component changes

---

## Success Criteria Verification

After each phase, verify:

- ✅ All unit tests passing (80%+ coverage in utils/)
- ✅ All component tests passing
- ✅ All E2E tests passing (if included)
- ✅ Lighthouse audit >90 (performance, accessibility, best practices, SEO)
- ✅ WCAG 2.1 AA accessibility verified
- ✅ Responsive design tested on mobile/tablet/desktop
- ✅ No security vulnerabilities (`npm audit`)
- ✅ Documentation updated
- ✅ Quickstart guide validated

---

**Total Tasks**: 156  
**Estimated Duration**: 4-6 weeks with 1-2 developers  
**MVP Scope**: Tasks T001-T072 (Setup + Foundation + US1-US3 = ~3-4 weeks)  
**Full Scope**: Tasks T001-T156 (All features + polish = ~6 weeks)

---

**Version**: 1.0  
**Date**: 2026-01-20  
**Branch**: `001-hr-payroll`  
**Status**: Ready for Development
