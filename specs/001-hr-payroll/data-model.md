# Phase 1 Data Model: HR and Payroll Management Website

**Purpose**: Define the core data entities, relationships, validation rules, and state transitions for the HR/Payroll system.  
**Date**: 2026-01-20  
**Implementation**: TypeScript interfaces and data files in `src/lib/data/` and `src/lib/types.ts`

## Core Entities & Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                    EMPLOYEE                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ id, firstName, lastName, email, phone               │  │
│  │ department, designation, employmentDate, status     │  │
│  └──────────────────────────────────────────────────────┘  │
│         │                    │                    │         │
│         ├─ has ─→ [SALARY]   ├─ has ─→ [LEAVE]   └─ has →[ATTENDANCE]
│         │                    │                              │
└─────────────────────────────────────────────────────────────┘
                │                    │
                ├─ creates ─→ [PAYROLL]   └─ requests ─→ [LEAVE_REQUEST]
                │
                └─ triggers ─→ [SETTLEMENT] (at exit)
```

## Entity Definitions

### 1. Employee

**Purpose**: Core employee record storing personal and organizational information.

**Fields**:
```typescript
interface Employee {
  id: string;                      // Unique identifier (EMP001, EMP002, ...)
  firstName: string;
  lastName: string;
  email: string;                   // Unique email
  phone: string;
  dateOfBirth: string;            // ISO 8601 (YYYY-MM-DD)
  gender?: 'M' | 'F' | 'Other';
  
  // Employment Details
  employmentDate: string;          // ISO 8601
  designation: string;             // e.g., "Senior Developer", "HR Manager"
  department: string;              // e.g., "Engineering", "HR", "Finance"
  reportingManagerId?: string;     // FK to Employee (Manager)
  status: 'active' | 'inactive' | 'exited';  // Lifecycle status
  
  // References
  salaryStructureId: string;       // FK to SalaryStructure
  leaveConfigId: string;           // FK to LeaveConfig (leave entitlements)
  
  // Contact & Address
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  
  // Metadata
  createdAt: string;              // ISO 8601 timestamp
  updatedAt: string;
}
```

**Validation Rules**:
- `id`: Required, unique, non-empty
- `email`: Required, unique, valid email format
- `phone`: Required, valid format (10-15 digits)
- `employmentDate`: Required, ≤ today
- `dateOfBirth`: Optional, must be before employmentDate
- `status`: Only 'active' or 'inactive' can have salary calculations; 'exited' triggers F&F
- `reportingManagerId`: If provided, must reference valid active employee

**Transitions**:
- `active` → `inactive` (on leave without pay, suspension)
- `inactive` → `active` (return from leave)
- `active` / `inactive` → `exited` (one-way, triggers F&F calculation)

---

### 2. Salary Structure

**Purpose**: Defines salary components and deductions for an employee.

**Fields**:
```typescript
interface SalaryStructure {
  id: string;                      // Unique ID
  employeeId: string;              // FK to Employee
  effectiveDate: string;           // ISO 8601 - when structure becomes active
  endDate?: string;                // ISO 8601 - optional, for historical versions
  
  // Components (all amounts in local currency)
  base: number;                    // Base salary
  allowances: {
    housRent?: number;             // HRA
    dearness?: number;             // DA
    conveyance?: number;
    medical?: number;
    other?: Record<string, number>;
  };
  
  // Deductions (calculated and fixed)
  deductions: {
    providentFund?: number;        // EPF (typically 12% of base)
    employerContribution?: number; // Employer's EPF
    incomeTax?: number;            // Calculated or fixed
    socialSecurity?: number;       // Insurance, ESI
    loan?: number;                 // Loan recovery
    other?: Record<string, number>;
  };
  
  // Rules
  taxSlabId: string;               // FK to TaxSlab (jurisdiction-specific)
  complianceRuleIds: string[];     // FK to ComplianceRules
  minimumWage: number;             // Validation threshold
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}
```

**Validation Rules**:
- `base`: Required, > 0
- `allowances` sum: Must be reasonable (typically 20-50% of base)
- `deductions` sum: Must not exceed gross salary
- `effectiveDate`: Required, typically 1st of month
- `taxSlabId`: Required, must reference valid jurisdiction tax rules
- `minimumWage`: Must meet statutory minimum for jurisdiction

**Business Logic**:
- Calculate `grossSalary` = `base` + sum(`allowances`)
- Calculate deductions based on rules
- Calculate `netSalary` = `grossSalary` - sum(`deductions`)
- Net must be > 0 (minimum wage check)

---

### 3. Leave

**Purpose**: Tracks leave entitlements and balances for an employee.

**Fields**:
```typescript
interface Leave {
  id: string;
  employeeId: string;              // FK to Employee
  leaveType: 'paid' | 'sick' | 'casual' | 'unpaid' | 'maternity' | 'sabbatical';
  
  // Annual/Period Entitlements
  entitlementYear: number;         // e.g., 2025-26 (fiscal year)
  totalEntitled: number;           // e.g., 20 days for paid leave
  used: number;                    // Days already taken (approved leaves)
  pending: number;                 // Days in pending requests
  available: number;               // calculated: totalEntitled - used - pending
  carryForward?: number;           // Carry forward from previous year
  
  // Rules
  accrualMethod: 'fixed' | 'monthly' | 'quarterly';  // How entitlement accrues
  encashmentAllowed: boolean;      // Can unused leave be paid on exit?
  maxConsecutiveDays?: number;     // Max continuous leave allowed
  requiresApproval: boolean;       // True = requires manager approval
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}
```

**Validation Rules**:
- `totalEntitled`: Must be > 0 for the period
- `used` + `pending`: Must not exceed `totalEntitled` + `carryForward`
- `leaveType`: Must be configured for employee's designation
- `encashmentAllowed`: False for sick/maternity leaves
- `available`: Calculated, read-only

**Transitions**:
- `Leave` transitions happen through `LeaveRequest` (see below)
- `used` increases when request is approved
- `pending` increases when request is submitted, decreases when approved/rejected
- On exit (employee status → 'exited'): Un-encashable leaves forfeited, encashable leaves trigger payment

---

### 4. Leave Request

**Purpose**: Tracks individual leave requests with approval workflow.

**Fields**:
```typescript
interface LeaveRequest {
  id: string;
  employeeId: string;              // FK to Employee
  leaveId: string;                 // FK to Leave (which leave type)
  
  // Request Details
  startDate: string;               // ISO 8601
  endDate: string;                 // ISO 8601
  reason: string;                  // Why the leave
  requestedDays: number;           // Calculated: business days between start/end
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  
  // Approval
  approvedBy?: string;             // FK to Employee (manager)
  approvedDate?: string;           // ISO 8601 timestamp
  rejectionReason?: string;        // If rejected
  
  // Impact
  leaveBalance?: number;           // Balance before approval (for history)
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}
```

**Validation Rules**:
- `startDate` and `endDate`: Both required, endDate ≥ startDate
- `startDate`: Must be in future (not retrospective for normal requests)
- `requestedDays`: Calculated, must be > 0
- `reason`: Required if reason tracking enabled
- `status` transitions: pending → {approved, rejected, cancelled}
- Cannot approve if leave balance insufficient (unless exception override)

**Business Logic**:
- Calculate `requestedDays` = business days (exclude weekends/holidays)
- Approval updates corresponding `Leave.used` and `Leave.pending`
- Rejection restores `Leave.pending`
- Cancellation decreases `Leave.used` and restores balance

---

### 5. Attendance

**Purpose**: Records daily employee presence/absence.

**Fields**:
```typescript
interface Attendance {
  id: string;
  employeeId: string;              // FK to Employee
  date: string;                    // ISO 8601 (single day)
  status: 'present' | 'absent' | 'half-day' | 'leave' | 'holiday' | 'weekend';
  
  // Marking Details
  markedBy?: string;               // FK to Employee (usually HR/Admin)
  markedAt?: string;               // ISO 8601 timestamp
  notes?: string;                  // Reason for absence, etc.
  
  // Impact on Salary
  salaryImpact: 'none' | 'deduction' | 'paid-leave' | 'unpaid-leave';
  deductionAmount?: number;        // If salary deduction applied
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}
```

**Validation Rules**:
- `date`: Required, typically ≤ today (not future)
- `status`: Must be one of defined statuses
- `salaryImpact`: Consistent with status (leave → paid-leave, absent → deduction, etc.)
- Cannot have duplicates for same employee on same date

**Business Logic**:
- Approved `LeaveRequest` automatically creates attendance record with `status: 'leave'`
- Manual marking updates attendance status
- Absent days trigger salary deduction calculation
- Holiday/weekend attendance records created for payroll tracking

---

### 6. Payroll

**Purpose**: Records calculated salary for a specific pay period.

**Fields**:
```typescript
interface Payroll {
  id: string;
  employeeId: string;              // FK to Employee
  payPeriod: {
    month: number;                 // 1-12
    year: number;                  // 2025, 2026, etc.
    startDate: string;             // ISO 8601 (usually 1st of month)
    endDate: string;               // ISO 8601 (usually last of month)
  };
  
  // Salary Breakdown
  components: {
    base: number;
    allowances: Record<string, number>;
    grossSalary: number;           // Sum of base + allowances
  };
  
  deductions: {
    providentFund: number;
    incomeTax: number;
    socialSecurity: number;
    other: Record<string, number>;
    totalDeductions: number;
  };
  
  // Adjustments
  adjustments: {
    leaveDeduction?: number;       // Salary loss due to leaves/absence
    bonus?: number;
    penalty?: number;
    reimbursement?: number;
    other?: Record<string, number>;
  };
  
  // Final
  netSalary: number;               // Calculated: Gross - Deductions + Adjustments
  
  // Status
  status: 'draft' | 'calculated' | 'reviewed' | 'approved' | 'paid';
  approvedBy?: string;             // FK to Employee (Finance Manager)
  approvedDate?: string;           // ISO 8601 timestamp
  paymentDate?: string;            // When salary was credited
  
  // Audit
  calculatedAt: string;            // When calculation was run
  calculationNotes?: string;       // Any special notes
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}
```

**Validation Rules**:
- `employeeId`: Required, employee must be active/inactive (not exited)
- `grossSalary`: ≥ minimumWage check
- `netSalary`: Must be > 0
- `status` transitions: draft → calculated → reviewed → approved → paid (one-way)
- Cannot modify once status ≥ approved (immutability for audit)

**Business Logic**:
- Triggered monthly (or configured frequency)
- Fetches employee's `SalaryStructure` (effective on payPeriod.startDate)
- Fetches employee's `Attendance` records for the period
- Calculates leave deductions based on approved leaves
- Applies compliance rules (taxes, statutory deductions)
- Status workflow: auto → draft → (HR review) → calculated → (Finance approval) → approved → (Bank) → paid

---

### 7. Settlement (Full & Final)

**Purpose**: Calculates final dues when an employee exits.

**Fields**:
```typescript
interface Settlement {
  id: string;
  employeeId: string;              // FK to Employee (must be status: 'exited')
  exitDate: string;                // ISO 8601 - when employee left
  
  // Calculation Components
  calculations: {
    pendingSalary: {
      workingDays: number;
      dailyRate: number;
      amount: number;              // (Exit Date - Last Payroll Date) × daily rate
    };
    
    leaveEncashment: {
      balanceCarriedForward: number;
      currentYearUnused: number;
      totalEncashable: number;
      dailyRate: number;
      amount: number;              // totalEncashable × daily rate
    };
    
    gratuity: {
      yearsOfService: number;
      dailyRate: number;
      gratuityRate: number;        // e.g., 15 days per year
      amount: number;              // (yearsOfService × gratuityRate / 30) × dailyRate
    };
    
    bonus: {
      lastBonusAmount?: number;
      proRataPercentage: number;   // Percentage based on days worked
      amount: number;
    };
    
    otherEarnings: Record<string, number>;
    
    totalEarnings: number;         // Sum of all above
  };
  
  // Deductions
  deductions: {
    advanceRecovery?: number;
    loanRecovery?: number;
    damageRecovery?: number;
    unpaidDues?: number;
    other?: Record<string, number>;
    totalDeductions: number;
  };
  
  // Final
  netSettlementDue: number;        // Calculated: totalEarnings - totalDeductions
  
  // Status
  status: 'draft' | 'reviewed' | 'approved' | 'paid';
  approvedBy?: string;             // FK to Employee (Finance Manager)
  approvedDate?: string;
  paymentDate?: string;
  
  // Documents
  settlementLetter?: string;       // HTML/PDF content
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}
```

**Validation Rules**:
- `employeeId`: Employee status must be 'exited'
- `exitDate`: Required, ≤ today
- All calculation components must be ≥ 0
- `netSettlementDue`: Can be 0 (rare) or > 0, never negative
- `status` transitions: draft → reviewed → approved → paid (one-way)

**Business Logic**:
- Triggered when employee status changes to 'exited'
- Calculate pending salary from last payroll date to exit date
- Fetch leave balances and calculate encashment
- Calculate gratuity based on years of service and company policy
- Deduct any outstanding advances or loans
- Generate settlement letter with itemized breakdown
- Status workflow: (HR calculates) → draft → (Finance reviews) → reviewed → (Finance approves) → approved → (Bank credits) → paid

---

### 8. Compliance Rule

**Purpose**: Configurable rules for statutory compliance calculations (jurisdiction-specific).

**Fields**:
```typescript
interface ComplianceRule {
  id: string;
  name: string;                    // e.g., "Income Tax India FY2025-26"
  jurisdiction: 'IN' | 'US' | 'UK' | 'SG';  // Country code
  ruleType: 'tax' | 'social-security' | 'minimum-wage' | 'leave-policy' | 'other';
  
  // Rule Definition
  description: string;
  calculation: string;             // Algorithm/formula description
  
  // Applicability
  effectiveDate: string;           // ISO 8601
  expiryDate?: string;             // Optional - when rule ends
  applicableToAll: boolean;        // If false, applies only to listed roles/departments
  applicableRoles?: string[];      // e.g., ["employee", "contractor"]
  
  // Data (rules stored as JSON for flexibility)
  ruleData: Record<string, unknown>;  // e.g., { slabs: [...], rate: 12%, cap: 2500000 }
  
  // Status
  active: boolean;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}
```

**Example Tax Slab (India)**:
```typescript
ruleData: {
  slabs: [
    { minIncome: 0, maxIncome: 300000, rate: 0 },
    { minIncome: 300000, maxIncome: 700000, rate: 0.05 },
    { minIncome: 700000, maxIncome: 1000000, rate: 0.20 },
    { minIncome: 1000000, maxIncome: Infinity, rate: 0.30 }
  ],
  cess: 0.04,  // Additional 4% for income > 50 lakhs
  standardDeduction: 50000
}
```

**Validation Rules**:
- `jurisdiction`: Must be supported
- `effectiveDate` ≤ today (or future for planned rules)
- `ruleData`: Must conform to rule type schema

**Business Logic**:
- Applied during payroll calculation
- Multiple rules can apply to single employee (cumulative)
- Historical rules preserved (effective date tracking)
- Can be deactivated without deletion (audit trail)

---

### 9. Tax Slab (special case of ComplianceRule)

**Purpose**: Defines progressive income tax brackets (jurisdiction-specific).

**Fields**:
```typescript
interface TaxSlab {
  id: string;
  jurisdiction: string;            // 'IN', 'US', etc.
  fiscalYear: string;              // e.g., "2025-26" for India
  
  slabs: Array<{
    name: string;                  // e.g., "0-3 Lakhs"
    minIncome: number;
    maxIncome: number;
    rate: number;                  // Tax rate (0.0-1.0)
    deduction?: number;            // Fixed deduction (if any)
  }>;
  
  // Surcharge (if income exceeds threshold)
  surcharge?: {
    threshold: number;
    rate: number;
  };
  
  // Cess (additional tax)
  cess?: {
    threshold: number;
    rate: number;
  };
  
  // Standard Deduction
  standardDeduction: number;
  
  effectiveDate: string;           // ISO 8601
  expiryDate?: string;
  active: boolean;
}
```

**Example (India FY2025-26)**:
```typescript
slabs: [
  { name: "0-3L", minIncome: 0, maxIncome: 300000, rate: 0 },
  { name: "3-7L", minIncome: 300000, maxIncome: 700000, rate: 0.05 },
  { name: "7-10L", minIncome: 700000, maxIncome: 1000000, rate: 0.20 },
  { name: "10L+", minIncome: 1000000, maxIncome: Infinity, rate: 0.30 }
]
```

---

## State Machines & Workflows

### Employee Status Workflow
```
[active] ←→ [inactive] → [exited]
  ↓           ↓            ↓
Normal ops  No salary    F&F calc +
            processing    No new txns
```

### Leave Request Workflow
```
[pending] → [approved] → (Updates Leave.used)
  ↓           ↓
[rejected] [cancelled] → (Restores Leave.pending)
```

### Payroll Status Workflow
```
[draft] → [calculated] → [reviewed] → [approved] → [paid]
  ↑                                                    ↓
  └────── (Finance can reject to draft) ─────────────┘
```

### Settlement Workflow
```
[draft] → [reviewed] → [approved] → [paid]
  ↑                                    ↓
  └─────── (Can revert for corrections) ┘
```

---

## Validation Rules Summary

| Entity | Critical Validations |
|--------|----------------------|
| **Employee** | Unique ID/email; valid dates; status constraints |
| **SalaryStructure** | Gross ≥ net; meets minimum wage; tax rules applied |
| **Leave** | Balance ≥ 0; used + pending ≤ entitled; encashment rules |
| **LeaveRequest** | Future dates (unless exception); sufficient balance |
| **Attendance** | No duplicates per day; consistent with leave approvals |
| **Payroll** | Net > 0; statutory compliance; immutable once approved |
| **Settlement** | Net ≥ 0; employee exited; complete calculations |
| **ComplianceRule** | Jurisdiction supported; effective dates consistent |

---

## Database Views (for reporting)

When Phase 2 migrates to backend database, these views will be useful:

```sql
-- Monthly Payroll Summary
VIEW payroll_summary AS
  SELECT month, year, COUNT(*) as employee_count, 
         SUM(net_salary) as total_payout
  FROM payroll WHERE status = 'paid'
  GROUP BY month, year;

-- Employee Leave Balance Report
VIEW leave_balance_report AS
  SELECT e.id, e.name, l.leave_type, l.total_entitled,
         l.used, l.pending, l.available
  FROM employee e JOIN leave l ON e.id = l.employee_id;

-- Compliance Audit Trail
VIEW compliance_audit AS
  SELECT p.id, p.employee_id, r.rule_type, r.jurisdiction,
         p.calculated_at, p.approved_date
  FROM payroll p JOIN compliance_rule r ON p.compliance_rule_id = r.id;
```

---

## Next Steps

- → Create TypeScript interfaces in `src/lib/types.ts` (based on this model)
- → Generate seed data in `src/lib/data/*.ts` files
- → Create validation functions in `src/lib/utils/validation.ts`
- → Implement calculation functions in `src/lib/utils/calculations.ts`
