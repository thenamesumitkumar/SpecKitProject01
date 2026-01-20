# Phase 0 Research: HR and Payroll Management Website

**Purpose**: Resolve technical unknowns and research best practices for Next.js static site generation with embedded data for HR/Payroll system.  
**Date**: 2026-01-20  
**Status**: Complete - No critical unknowns remain; all technical choices well-established.

## Research Findings & Decisions

### 1. Static Site Generation Framework: Next.js

**Decision**: Use Next.js 14.x with App Router and `next export` for static generation

**Rationale**:
- Next.js `next export` generates truly static HTML/CSS/JS output (complies with Static Web App Constitution)
- App Router provides modern, intuitive file-based routing
- Automatic code splitting and optimization built-in
- Excellent TypeScript support
- Mature ecosystem with extensive component libraries
- Plays well with Tailwind CSS for styling
- Can be deployed to any static host (Azure Static Web Apps, Netlify, Vercel, S3+CloudFront)

**Alternatives Considered**:
- **Gatsby**: More opinionated, GraphQL-first; overkill for embedded data MVP
- **Hugo/Jekyll**: Less ideal for interactive React components needed for ESS portal
- **Vite/SPA**: No built-in routing/metadata; would require additional setup
- **Plain React**: No SSG; SEO and performance would suffer

**Conclusion**: Next.js is the right choice. Best-in-class framework for static-first web apps with React components.

---

### 2. Data Storage Strategy: Embedded JSON Files

**Decision**: Store all employee, salary, leave, and attendance data in TypeScript data files checked into repository

**Rationale**:
- MVP requirement: "dummy databases where data is embedded directly into content"
- Eliminates need for backend API, database, authentication middleware for MVP
- Simple to understand and modify during development
- Data is version-controlled alongside code
- Static export includes data directly in HTML (no runtime API calls)
- Easy to migrate to real backend/database in Phase 2

**Data Structure** (TypeScript files):
```
lib/data/
├── employees.ts       # Employee records with IDs, names, depts, designations
├── salaries.ts        # Salary structures and calculated payroll
├── leaves.ts          # Leave types, balances, request statuses
├── attendance.ts      # Daily attendance records
├── faqs.ts            # FAQ entries and categories
└── settlements.ts     # F&F settlement calculations
```

**Phase 2 Migration Path**:
- Export data to JSON file format
- Set up backend API (Node.js/Express or similar)
- Implement database (PostgreSQL/MongoDB)
- Replace file imports with API calls
- No component-level changes needed (implement service layer abstraction now)

**Conclusion**: Embedded data files are ideal for MVP. Scalable architectural pattern enables Phase 2 migration.

---

### 3. Styling Strategy: Tailwind CSS

**Decision**: Use Tailwind CSS 3.x for utility-first styling with mobile-first design

**Rationale**:
- Aligns with "sleek, modern, standout design" requirement
- Mobile-first responsive design built into framework
- Utility classes compose cleanly for consistent design
- Excellent TypeScript support with class names
- Integrates seamlessly with Next.js
- Minimal CSS output with tree-shaking/purging
- Accessibility features (focus states, contrast) easy to implement correctly
- Large community and component resources (Tailwind UI, HeadlessUI)

**Responsive Design**:
- Mobile-first breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- All pages tested on: iPhone SE (375px), iPhone 12 (390px), iPad (768px), Desktop (1920px)

**Accessibility**:
- Color contrast ratios meet WCAG AA standards
- Focus visible states for keyboard navigation
- Semantic HTML with proper heading hierarchy
- ARIA labels where needed for screen readers

**Conclusion**: Tailwind CSS is industry standard for modern, responsive, accessible web design. Best choice for this project.

---

### 4. Salary Calculation Engine

**Decision**: Implement calculation logic in TypeScript utility functions in `lib/utils/calculations.ts`

**Key Calculations** (as per requirement):
- **Gross Salary** = Base + Allowances
- **Deductions** = Tax + Social Security + Mandatory Deductions
- **Net Salary** = Gross - Deductions
- **Leave Adjustment** = (Monthly Salary / Working Days) × Absent Days
- **Attendance Adjustment** = Apply leave deduction rules based on attendance percentage

**Formula Examples** (configurable per jurisdiction):
```typescript
// India (current assumption)
const grossSalary = (salary.base + salary.allowances);
const taxableIncome = Math.max(grossSalary - salary.exemptions, 0);
const incomeTax = calculateProgressiveTax(taxableIncome); // Slab-based
const socialSecurity = Math.min(grossSalary * 0.12, socialSecurityCap); // 12% capped
const netSalary = grossSalary - incomeTax - socialSecurity - salary.otherDeductions;
```

**Leave Impact**:
```typescript
const dailyRate = salary.base / workingDaysPerMonth;
const leaveLoss = dailyRate × leavesTaken;
const adjustedSalary = grossSalary - leaveLoss;
```

**Full & Final (Exit) Calculation**:
- Pending salary for worked days
- Leave encashment (accrued × daily rate)
- Gratuity (if configured): 15 days per year × years of service (India standard)
- Less: Advance recovery, unpaid dues

**Testing Strategy**:
- Unit tests for each calculation function
- Test fixtures with known inputs/expected outputs
- Verify against manual calculations for accuracy (SC-002: 100% accuracy required)

**Conclusion**: Calculation engine will be pure TypeScript functions, testable and performant. Architecture supports Phase 2 backend migration.

---

### 5. Leave & Attendance Management Logic

**Decision**: Implement leave request workflow and attendance tracking with approval states

**Leave Request States**:
- **Pending**: Awaiting manager approval
- **Approved**: Approved; deduction applied in salary
- **Rejected**: Declined; no impact on balance
- **Cancelled**: Employee-initiated cancellation

**Leave Balance Rules**:
- Deduct from available balance upon approval
- Restore to balance if request is rejected or cancelled
- Display month-wise balance trend
- Prevent approval if balance would go negative (or require exception approval)

**Attendance Recording**:
- Daily status: Present, Absent, Half-Day, Leave
- Leaves (approved) automatically mark as leave days
- Attendance impacts salary calculation per policy
- Generate monthly attendance report

**Approval Workflow**:
- ESS employee: Submit leave request with dates, reason, leave type
- Embedded data: Manager automatically derived from employee record
- Dummy implementation: Approval simulated in frontend (Phase 2: backend approval)
- Notification: Status displayed on ESS dashboard

**Conclusion**: Leave & attendance logic will use state machines and validation. Straightforward to implement with dummy data.

---

### 6. Authentication & Authorization for MVP

**Decision**: Dummy authentication with hardcoded credentials in data files (Phase 1 MVP); real authentication deferred to Phase 2

**MVP Approach**:
```typescript
// Static dummy users
const users = [
  { id: 'emp001', email: 'john@company.com', name: 'John Doe', role: 'employee', password: 'demo123' },
  { id: 'admin001', email: 'admin@company.com', name: 'HR Admin', role: 'admin', password: 'admin123' },
];

// Frontend only: localStorage session (no security for MVP)
// Real security in Phase 2: OAuth/SSO with backend validation
```

**Role-Based Access**:
- **Employee**: Can view only own profile, salary, leave, attendance
- **Admin/HR**: Can view all employee records, manage approvals, access reports
- **Finance**: Can view payroll data and compliance reports (admin subset in MVP)

**ESS Portal Security** (MVP limitations acknowledged):
- Not production-ready; for demo/prototype only
- Real authentication requires backend + secure session management
- Phase 2: Implement OAuth 2.0 or enterprise SSO

**Phase 2 Migration**:
- Replace localStorage with secure HTTP-only cookies
- Implement backend authentication service
- Add audit logging for all operations
- Implement MFA for admin accounts

**Conclusion**: Dummy auth sufficient for MVP. Documented path to secure Phase 2 implementation.

---

### 7. Full & Final Settlement Module

**Decision**: Calculate and display F&F settlement for exiting employees; approval workflow handled in admin panel

**F&F Calculation Components** (as per Indian labor law):
1. **Pending Salary**: Days worked × daily rate
2. **Leave Encashment**: Accrued leave days × daily rate
3. **Gratuity** (if applicable): 15 days × years of service × daily rate
4. **Bonuses/Performance Pay**: Last bonus (if configured)
5. **Less Recoveries**: Advance, unpaid dues, equipment
6. **Net Settlement Due**: Total earnings - recoveries

**Workflow**:
- Employee exit initiated in admin panel
- System calculates F&F automatically
- Finance team reviews and approves
- Settlement report generated for employee
- Payment tracking in payroll

**Compliance** (India):
- Follows labor law exit settlement requirements
- Generates auditable report with calculation breakdown
- Stores settlement history for compliance audits

**Implementation**:
- Calculation logic in `lib/utils/calculations.ts`
- Settlement display component
- PDF generation for settlement letter (future: Phase 2)

**Conclusion**: F&F module well-defined and straightforward to implement with dummy data.

---

### 8. Compliance & Statutory Requirements

**Decision**: India-specific compliance rules in Phase 1; multi-jurisdiction support deferred to Phase 2

**India Compliance Implemented**:
- **Income Tax**: Progressive slab-based calculation (FY 2025-26 rates)
- **Social Security**: Employee Provident Fund (EPF) 12% contribution
- **Minimum Wage**: Validation against state-specific minimum wage
- **Statutory Deductions**: ESI (optional), LWF where applicable
- **Compliance Reporting**: Monthly payroll register, statutory filings audit trail

**Compliance Rules Architecture**:
```typescript
interface ComplianceRule {
  id: string;
  name: string;
  jurisdiction: 'IN' | 'US' | 'UK' | ...;
  calculation: (salary: SalaryData) => number;
  validationRules: ValidationRule[];
  effectiveDate: Date;
}

// Rules stored in data file or configuration
const complianceRules: ComplianceRule[] = [
  { id: 'epf', name: 'Employee Provident Fund', jurisdiction: 'IN', calculation: (s) => s.gross * 0.12, ... },
  { id: 'income_tax', name: 'Income Tax', jurisdiction: 'IN', calculation: taxCalculator, ... },
];
```

**Phase 2 Expansion**:
- Add more jurisdictions: US, UK, Singapore, etc.
- Implement compliance rule configuration UI
- Generate jurisdiction-specific compliance reports

**Compliance Audit Trail**:
- Log all salary calculations with applied rules
- Maintain historical compliance configurations
- Generate audit reports for regulatory inspections

**Conclusion**: India compliance rules well-researched. Extensible architecture for Phase 2.

---

### 9. Mobile Responsiveness & Progressive Enhancement

**Decision**: Mobile-first design using Tailwind CSS breakpoints; core content accessible without JavaScript

**Mobile-First Approach**:
1. Base styles for mobile (375px+)
2. Tablet enhancements (768px+): Larger tables, sidebar navigation
3. Desktop enhancements (1024px+): Multi-column layouts, advanced features

**Progressive Enhancement**:
- **No JavaScript**: Core content (employee info, salary display) readable as plain HTML
- **With JavaScript**: Interactive features (leave requests, form validations, animations)
- **Fallback**: Forms submit to dummy endpoints; data updates reflected on page reload

**Accessibility**:
- WCAG 2.1 AA compliance target
- Semantic HTML: Proper heading hierarchy, list structures, form labels
- Color: Contrast ratios 4.5:1 for text
- Interactive: Keyboard navigation, focus visible, ARIA labels
- Mobile: Touch targets 44×44px minimum

**Testing Strategy**:
- Responsive testing: Chrome DevTools, real devices
- Accessibility testing: WAVE, axe, NVDA screen reader
- Lighthouse CI: Automated performance/accessibility checks

**Conclusion**: Mobile-first, accessible design achievable with Tailwind + semantic HTML. Next.js provides SEO benefits.

---

### 10. Testing Strategy for MVP

**Decision**: Balanced testing approach: unit tests for logic, component tests for UI, E2E for critical flows

**Testing Pyramid**:
```
     E2E Tests (5%)
      └─ Playwright
   
   Component Tests (25%)
   └─ React Testing Library

Unit Tests (70%)
└─ Jest (calculations, validation, utilities)
```

**Unit Tests** (70%):
- Salary calculation functions: 100% coverage
- Leave balance logic: All edge cases
- Date utilities: Leap years, month boundaries
- Validation functions: Input sanitization

**Component Tests** (25%):
- Critical components: SalaryCard, LeaveCard, EmployeeList
- User interactions: Form submissions, button clicks
- State management: Data updates propagation

**E2E Tests** (5%):
- ESS portal login → view profile → request leave
- Admin dashboard: view employees, approve leave
- Landing page: all sections accessible

**Tools**:
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing with user-centric approach
- **Playwright**: E2E browser testing

**CI/CD Integration**:
- Tests run on every commit
- Minimum 80% code coverage for utils
- E2E tests run on staging
- Lighthouse audit on every build

**Conclusion**: Comprehensive testing strategy ensures quality. Dummy data enables fast, deterministic tests.

---

## Outstanding Clarifications: NONE

All technical unknowns resolved. Implementation approach fully defined and aligned with Constitution principles.

## Next Steps

- ✅ Phase 0: Research complete
- → Phase 1: Generate data-model.md, contracts/, quickstart.md
- → Phase 1: Update agent context with Next.js + embedded data specifics
- → Create tasks.md with implementation breakdown
