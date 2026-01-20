# API Contracts: HR and Payroll Management Website

**Purpose**: Define the data contracts and API responses for the ESS Portal and Admin Dashboard.  
**Note**: Phase 1 (MVP) uses embedded data + frontend logic. Phase 2 will implement backend APIs. These contracts define the data shape for future API implementation.

---

## 1. Authentication & Session

### POST /api/auth/login
**MVP Implementation**: Client-side validation against dummy users in `lib/data/users.ts`

**Request**:
```typescript
{
  email: string;           // e.g., "john@company.com"
  password: string;        // e.g., "demo123"
}
```

**Response (200 OK)**:
```typescript
{
  success: true;
  user: {
    id: string;            // e.g., "emp001"
    name: string;
    email: string;
    role: 'employee' | 'admin' | 'finance';
    department?: string;
  };
  token: string;           // JWT or session token (Phase 2)
}
```

**Response (401 Unauthorized)**:
```typescript
{
  success: false;
  error: "Invalid email or password"
}
```

---

### POST /api/auth/logout
**MVP Implementation**: Clear localStorage session

**Response (200 OK)**:
```typescript
{
  success: true;
  message: "Logged out successfully"
}
```

---

## 2. ESS Portal - Employee Profile

### GET /api/ess/profile
**MVP Implementation**: Return logged-in employee's data from `lib/data/employees.ts`

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender?: string;
    employmentDate: string;
    designation: string;
    department: string;
    reportingManagerName?: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    yearsOfService: number;        // Calculated
    status: 'active' | 'inactive';
  }
}
```

---

## 3. ESS Portal - Salary & Payslip

### GET /api/ess/salary/current
**MVP Implementation**: Return calculated salary from `lib/data/salaries.ts` and `lib/utils/calculations.ts`

**Query Parameters**:
```
?month=1&year=2025   (optional; defaults to current month/year)
```

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    payPeriod: {
      month: number;
      year: number;
      startDate: string;
      endDate: string;
    };
    components: {
      base: number;
      allowances: {
        housRent?: number;
        dearness?: number;
        conveyance?: number;
        medical?: number;
      };
      grossSalary: number;
    };
    deductions: {
      providentFund: number;
      incomeTax: number;
      socialSecurity: number;
      totalDeductions: number;
    };
    adjustments: {
      leaveDeduction?: number;
      bonus?: number;
    };
    netSalary: number;
    status: 'draft' | 'calculated' | 'approved' | 'paid';
    paymentDate?: string;
  }
}
```

---

### GET /api/ess/salary/history
**MVP Implementation**: Return all historical payroll records

**Query Parameters**:
```
?limit=12&offset=0     (pagination)
```

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    records: [
      {
        month: number;
        year: number;
        netSalary: number;
        status: string;
        paymentDate?: string;
      }
    ];
    total: number;
    limit: number;
    offset: number;
  }
}
```

---

## 4. ESS Portal - Leave Management

### GET /api/ess/leave/balance
**MVP Implementation**: Return leave balances from `lib/data/leaves.ts`

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    year: number;            // e.g., 2025
    leaves: [
      {
        id: string;
        leaveType: 'paid' | 'sick' | 'casual' | 'maternity';
        totalEntitled: number;
        used: number;
        pending: number;
        available: number;
        carryForward?: number;
      }
    ]
  }
}
```

---

### POST /api/ess/leave/request
**MVP Implementation**: Create leave request, store in `lib/data/leaves.ts` (browser localStorage for MVP)

**Request**:
```typescript
{
  leaveType: 'paid' | 'sick' | 'casual';
  startDate: string;        // ISO 8601
  endDate: string;          // ISO 8601
  reason: string;           // e.g., "Vacation", "Medical"
  requestedDays: number;    // Calculated on frontend
}
```

**Response (201 Created)**:
```typescript
{
  success: true;
  data: {
    id: string;             // Generated request ID
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    requestedDays: number;
    status: 'pending';
    createdAt: string;
  }
}
```

**Response (400 Bad Request)**:
```typescript
{
  success: false;
  error: "Insufficient leave balance" | "Invalid dates" | "Other validation error"
}
```

---

### GET /api/ess/leave/requests
**MVP Implementation**: Return employee's leave requests

**Query Parameters**:
```
?status=pending&limit=10&offset=0
```

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    requests: [
      {
        id: string;
        leaveType: string;
        startDate: string;
        endDate: string;
        reason: string;
        requestedDays: number;
        status: 'pending' | 'approved' | 'rejected' | 'cancelled';
        approvedBy?: string;
        approvedDate?: string;
        rejectionReason?: string;
        createdAt: string;
      }
    ];
    total: number;
  }
}
```

---

### PUT /api/ess/leave/requests/{requestId}
**MVP Implementation**: Cancel leave request

**Request**:
```typescript
{
  action: 'cancel';
  reason: string;           // Optional cancellation reason
}
```

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    id: string;
    status: 'cancelled';
    updatedAt: string;
  }
}
```

---

## 5. ESS Portal - Attendance

### GET /api/ess/attendance
**MVP Implementation**: Return employee's attendance records

**Query Parameters**:
```
?month=1&year=2025   (optional; defaults to current month)
```

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    month: number;
    year: number;
    records: [
      {
        date: string;        // ISO 8601
        status: 'present' | 'absent' | 'half-day' | 'leave' | 'holiday' | 'weekend';
        notes?: string;
      }
    ];
    summary: {
      presentDays: number;
      absentDays: number;
      halfDays: number;
      leaveDays: number;
      totalWorkingDays: number;
    }
  }
}
```

---

## 6. Admin Dashboard - Employee Management

### GET /api/admin/employees
**MVP Implementation**: Return all employees (admin only)

**Query Parameters**:
```
?department=Engineering&status=active&limit=20&offset=0&search=john
```

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    employees: [
      {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        designation: string;
        department: string;
        status: 'active' | 'inactive' | 'exited';
        yearsOfService: number;
        salary: number;        // Current base salary
      }
    ];
    total: number;
    limit: number;
    offset: number;
  }
}
```

---

### GET /api/admin/employees/{employeeId}
**MVP Implementation**: Return single employee full details

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    employmentDate: string;
    designation: string;
    department: string;
    reportingManagerId?: string;
    reportingManagerName?: string;
    status: 'active' | 'inactive' | 'exited';
    address: { /* full address */ };
    
    // Relationships
    salaryStructure: {
      id: string;
      base: number;
      allowances: { /* breakdown */ };
      deductions: { /* breakdown */ };
      grossSalary: number;
    };
    
    leaveBalance: {
      paid: { entitled: number; used: number; available: number };
      sick: { /* ... */ };
      casual: { /* ... */ };
    };
  }
}
```

---

### PUT /api/admin/employees/{employeeId}
**MVP Implementation**: Update employee details

**Request**:
```typescript
{
  phone?: string;
  designation?: string;
  department?: string;
  status?: 'active' | 'inactive' | 'exited';
  address?: { /* address fields */ };
}
```

**Response (200 OK)**:
```typescript
{
  success: true;
  data: { /* updated employee object */ }
}
```

---

## 7. Admin Dashboard - Payroll Management

### GET /api/admin/payroll
**MVP Implementation**: Return payroll for a period

**Query Parameters**:
```
?month=1&year=2025&limit=20&offset=0
```

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    payPeriod: { month: number; year: number; startDate: string; endDate: string };
    payroll: [
      {
        employeeId: string;
        employeeName: string;
        grossSalary: number;
        totalDeductions: number;
        netSalary: number;
        status: 'draft' | 'calculated' | 'reviewed' | 'approved' | 'paid';
        approvedBy?: string;
        approvedDate?: string;
      }
    ];
    summary: {
      totalGross: number;
      totalDeductions: number;
      totalNet: number;
      employeeCount: number;
      statusCounts: { draft: number; calculated: number; approved: number; paid: number };
    }
  }
}
```

---

### POST /api/admin/payroll/calculate
**MVP Implementation**: Trigger salary calculations for a period

**Request**:
```typescript
{
  month: number;           // 1-12
  year: number;            // e.g., 2025
  overrideExisting: boolean;  // If true, recalculate existing payroll
}
```

**Response (202 Accepted)**:
```typescript
{
  success: true;
  message: "Payroll calculation started";
  jobId: string;           // For tracking long-running task
}
```

---

### PUT /api/admin/payroll/{payrollMonth}/approve
**MVP Implementation**: Approve entire month's payroll

**Request**:
```typescript
{
  approvedBy: string;      // HR/Admin user ID
  notes?: string;
}
```

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    month: number;
    year: number;
    status: 'approved';
    approvedBy: string;
    approvedDate: string;
  }
}
```

---

## 8. Admin Dashboard - Leave Approvals

### GET /api/admin/leave/pending
**MVP Implementation**: Return pending leave requests for approval

**Query Parameters**:
```
?department=&limit=20&offset=0
```

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    requests: [
      {
        id: string;
        employeeId: string;
        employeeName: string;
        leaveType: string;
        startDate: string;
        endDate: string;
        reason: string;
        requestedDays: number;
        status: 'pending';
        createdAt: string;
      }
    ];
    total: number;
  }
}
```

---

### POST /api/admin/leave/request/{requestId}/approve
**MVP Implementation**: Approve leave request

**Request**:
```typescript
{
  approvedBy: string;      // Manager user ID
  notes?: string;
}
```

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    id: string;
    status: 'approved';
    approvedBy: string;
    approvedDate: string;
    updatedLeaveBalance: {
      leaveType: string;
      used: number;
      available: number;
    }
  }
}
```

---

### POST /api/admin/leave/request/{requestId}/reject
**MVP Implementation**: Reject leave request

**Request**:
```typescript
{
  rejectionReason: string;
}
```

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    id: string;
    status: 'rejected';
    rejectionReason: string;
    rejectedAt: string;
  }
}
```

---

## 9. Full & Final Settlement

### GET /api/admin/settlement/{employeeId}
**MVP Implementation**: Return F&F settlement calculation

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    id: string;
    employeeId: string;
    employeeName: string;
    exitDate: string;
    
    calculations: {
      pendingSalary: {
        workingDays: number;
        dailyRate: number;
        amount: number;
      };
      leaveEncashment: {
        totalEncashable: number;
        dailyRate: number;
        amount: number;
      };
      gratuity: {
        yearsOfService: number;
        rate: number;        // e.g., 15 days/year
        amount: number;
      };
      totalEarnings: number;
    };
    
    deductions: {
      advanceRecovery?: number;
      loanRecovery?: number;
      totalDeductions: number;
    };
    
    netSettlementDue: number;
    status: 'draft' | 'reviewed' | 'approved' | 'paid';
  }
}
```

---

### PUT /api/admin/settlement/{settlementId}/approve
**MVP Implementation**: Approve settlement

**Request**:
```typescript
{
  approvedBy: string;
  notes?: string;
}
```

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    id: string;
    status: 'approved';
    approvedBy: string;
    approvedDate: string;
  }
}
```

---

## 10. Reports & Compliance

### GET /api/admin/reports/compliance
**MVP Implementation**: Generate compliance report for period

**Query Parameters**:
```
?month=1&year=2025&jurisdiction=IN
```

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    period: { month: number; year: number };
    jurisdiction: string;
    
    report: {
      totalEmployees: number;
      totalGross: number;
      totalTax: number;
      totalPF: number;
      totalOtherDeductions: number;
      
      complianceChecks: [
        {
          check: string;        // e.g., "Minimum wage compliance"
          status: 'pass' | 'warning' | 'fail';
          details: string;
        }
      ];
      
      auditTrail: [
        {
          date: string;
          action: string;       // e.g., "Payroll calculated"
          user: string;
          notes?: string;
        }
      ];
    }
  }
}
```

---

## 11. FAQ (Static Content)

### GET /api/public/faq
**MVP Implementation**: Return FAQ content from `lib/data/faqs.ts`

**Query Parameters**:
```
?category=leave&search=balance
```

**Response (200 OK)**:
```typescript
{
  success: true;
  data: {
    categories: [
      {
        id: string;
        name: string;
        faqs: [
          {
            id: string;
            question: string;
            answer: string;        // Can include HTML formatting
            category: string;
            views: number;         // For analytics
          }
        ]
      }
    ]
  }
}
```

---

## Error Response Format

All error responses follow this format:

```typescript
{
  success: false;
  error: string;           // Error message
  code: string;            // e.g., "INVALID_REQUEST", "UNAUTHORIZED", "NOT_FOUND"
  details?: Record<string, unknown>;  // Additional context
  timestamp: string;       // ISO 8601
}
```

**HTTP Status Codes**:
- `200 OK`: Successful GET/PUT
- `201 Created`: Successful POST (resource created)
- `202 Accepted`: Request accepted but processing async
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Authentication failed
- `403 Forbidden`: Authenticated but not authorized
- `404 Not Found`: Resource not found
- `409 Conflict`: Business logic conflict (e.g., duplicate leave request)
- `422 Unprocessable Entity`: Validation error (detailed field errors)
- `500 Internal Server Error`: Server error

---

## Implementation Notes for Phase 2

- All API endpoints will be implemented as Next.js API routes (`/pages/api/...` or `/app/api/...`)
- Authentication will use secure session management (JWT or HTTP-only cookies)
- Database queries will use ORM (e.g., Prisma) instead of in-memory data
- Approval workflows will require proper authorization checks (role-based)
- All calculations will be moved to backend (currently frontend only in MVP)
- Audit trails will be persisted to database
- Rate limiting and request validation will be implemented
