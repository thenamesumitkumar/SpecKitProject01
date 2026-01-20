import { LeaveBalance, LeaveType } from "@/lib/types";

export const leaveBalances: LeaveBalance[] = [
  {
    employeeId: "EMP001",
    leaveType: LeaveType.PAID,
    totalEntitlement: 20,
    used: 5,
    pending: 2,
    available: 13,
    yearStartDate: "2025-01-01",
    yearEndDate: "2025-12-31",
  },
  {
    employeeId: "EMP001",
    leaveType: LeaveType.SICK,
    totalEntitlement: 10,
    used: 2,
    pending: 0,
    available: 8,
    yearStartDate: "2025-01-01",
    yearEndDate: "2025-12-31",
  },
  {
    employeeId: "EMP001",
    leaveType: LeaveType.CASUAL,
    totalEntitlement: 5,
    used: 1,
    pending: 0,
    available: 4,
    yearStartDate: "2025-01-01",
    yearEndDate: "2025-12-31",
  },
  {
    employeeId: "EMP002",
    leaveType: LeaveType.PAID,
    totalEntitlement: 20,
    used: 8,
    pending: 1,
    available: 11,
    yearStartDate: "2025-01-01",
    yearEndDate: "2025-12-31",
  },
  {
    employeeId: "EMP002",
    leaveType: LeaveType.SICK,
    totalEntitlement: 10,
    used: 3,
    pending: 0,
    available: 7,
    yearStartDate: "2025-01-01",
    yearEndDate: "2025-12-31",
  },
  {
    employeeId: "EMP003",
    leaveType: LeaveType.PAID,
    totalEntitlement: 20,
    used: 10,
    pending: 0,
    available: 10,
    yearStartDate: "2025-01-01",
    yearEndDate: "2025-12-31",
  },
];

export function getLeaveBalanceForEmployee(
  employeeId: string,
  leaveType?: LeaveType
): LeaveBalance[] {
  let balances = leaveBalances.filter((bal) => bal.employeeId === employeeId);
  if (leaveType) {
    balances = balances.filter((bal) => bal.leaveType === leaveType);
  }
  return balances;
}

export function getTotalLeaveBalance(employeeId: string): number {
  return getLeaveBalanceForEmployee(employeeId).reduce((sum, bal) => sum + bal.available, 0);
}
