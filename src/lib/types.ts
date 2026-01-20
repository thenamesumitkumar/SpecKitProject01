// User and Auth Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "employee" | "admin" | "hr";
}

export interface AuthContext {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Employee Types
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  designation: string;
  employmentDate: string;
  exitDate?: string;
  status: "active" | "inactive" | "on-leave";
  salaryStructureId: string;
  personalEmail?: string;
  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  panNumber?: string;
  aadharNumber?: string;
}

// Salary Types
export interface SalaryComponent {
  id: string;
  name: string;
  type: "earning" | "deduction";
  amount: number;
  isPercentage: boolean;
}

export interface SalaryStructure {
  id: string;
  employeeId: string;
  basicSalary: number;
  allowances: SalaryComponent[];
  deductions: SalaryComponent[];
  effectiveDate: string;
  endDate?: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  month: string; // YYYY-MM format
  salary: number;
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
  components: SalaryComponent[];
  status: "pending" | "calculated" | "approved" | "paid";
  approvedBy?: string;
  approvedDate?: string;
  paidDate?: string;
  notes?: string;
}

// Leave Types
export enum LeaveType {
  PAID = "paid",
  SICK = "sick",
  CASUAL = "casual",
  EARNED = "earned",
  WITHOUT_PAY = "without_pay",
}

export interface LeaveBalance {
  employeeId: string;
  leaveType: LeaveType;
  totalEntitlement: number;
  used: number;
  pending: number;
  available: number;
  yearStartDate: string;
  yearEndDate: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  reason?: string;
  approvedBy?: string;
  approvalDate?: string;
  rejectionReason?: string;
  numberOfDays: number;
}

// Attendance Types
export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  status: "present" | "absent" | "half-day" | "leave" | "holiday" | "weekend";
  checkInTime?: string;
  checkOutTime?: string;
  remarks?: string;
}

export interface AttendanceSummary {
  employeeId: string;
  month: string; // YYYY-MM format
  totalWorkingDays: number;
  presentDays: number;
  absentDays: number;
  halfDays: number;
  leaveDays: number;
  attendancePercentage: number;
}

// Settlement Types
export interface Settlement {
  id: string;
  employeeId: string;
  exitDate: string;
  requestDate: string;
  status: "pending" | "calculated" | "approved" | "paid" | "cancelled";
  pendingSalary: number;
  leaveEncashment: number;
  gratuity: number;
  otherBenefits: number;
  totalDeductions: number;
  totalSettlement: number;
  calculatedBy?: string;
  calculationDate?: string;
  approvedBy?: string;
  approvalDate?: string;
  paidDate?: string;
  notes?: string;
}

// Compliance Types
export interface ComplianceRule {
  id: string;
  name: string;
  jurisdiction: string;
  type: "tax" | "deduction" | "earning" | "leave" | "other";
  rule: string;
  effectiveDate: string;
  endDate?: string;
  percentage?: number;
  amount?: number;
  isActive: boolean;
}

export interface TaxSlab {
  id: string;
  jurisdiction: string;
  financialYear: string;
  brackets: TaxBracket[];
  surcharge?: number;
  cessPercentage?: number;
}

export interface TaxBracket {
  minAmount: number;
  maxAmount?: number;
  taxRate: number;
  standardDeduction?: number;
}

export interface ComplianceAuditTrail {
  id: string;
  payrollId?: string;
  settlementId?: string;
  action: string;
  details: Record<string, unknown>;
  performedBy: string;
  performedDate: string;
  affectedEmployee?: string;
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  isActive: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
