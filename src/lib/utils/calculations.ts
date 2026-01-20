import { SalaryComponent, SalaryStructure, LeaveRequest, LeaveBalance, LeaveType } from "@/lib/types";

/**
 * Calculate gross salary from salary structure
 * Gross = Basic + All Allowances
 */
export function calculateGrossSalary(
  basicSalary: number,
  allowances: SalaryComponent[]
): number {
  const totalAllowances = allowances.reduce((sum, component) => sum + component.amount, 0);
  return basicSalary + totalAllowances;
}

/**
 * Calculate total deductions from components
 */
export function calculateDeductions(deductions: SalaryComponent[]): number {
  return deductions.reduce((sum, component) => sum + component.amount, 0);
}

/**
 * Calculate net salary
 * Net = Gross - Deductions
 */
export function calculateNetSalary(grossSalary: number, totalDeductions: number): number {
  return Math.max(0, grossSalary - totalDeductions);
}

/**
 * Calculate salary impact of leave
 * Deduction = Daily rate * Number of leave days
 */
export function calculateLeaveImpact(
  basicSalary: number,
  numberOfLeaveDays: number,
  workingDaysInMonth: number = 22
): number {
  const dailyRate = basicSalary / workingDaysInMonth;
  return Math.round(dailyRate * numberOfLeaveDays * 100) / 100;
}

/**
 * Calculate full and final settlement components
 */
export function calculateSettlement(
  employee: { id: string; employmentDate: string },
  currentSalary: number,
  leaveBalance: LeaveBalance,
  exitDate: string,
  years: number
): {
  pendingSalary: number;
  leaveEncashment: number;
  gratuity: number;
} {
  // Pending salary (simplified - assume 1 month)
  const pendingSalary = currentSalary;

  // Leave encashment = leave balance * daily rate
  const dailyRate = currentSalary / 22;
  const leaveEncashment = leaveBalance.available * dailyRate;

  // Gratuity calculation (simplified - 15 days per year for first 5 years, 20 days after)
  const gratuityDays = years <= 5 ? 15 * years : 15 * 5 + 20 * (years - 5);
  const gratuity = (currentSalary / 22) * gratuityDays;

  return {
    pendingSalary,
    leaveEncashment,
    gratuity,
  };
}

/**
 * Apply tax based on slab and gross salary
 */
export function calculateIncomeTax(grossSalary: number): number {
  // Simplified India tax slab for FY 2025-26
  // This is a basic implementation - real implementation would be more complex
  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, grossSalary * 12 - standardDeduction); // Annual income

  if (taxableIncome <= 300000) {
    return 0;
  }
  if (taxableIncome <= 600000) {
    return (taxableIncome - 300000) * 0.05;
  }
  if (taxableIncome <= 900000) {
    return 300000 * 0.05 + (taxableIncome - 600000) * 0.1;
  }
  if (taxableIncome <= 1200000) {
    return 300000 * 0.05 + 300000 * 0.1 + (taxableIncome - 900000) * 0.15;
  }
  if (taxableIncome <= 1500000) {
    return 300000 * 0.05 + 300000 * 0.1 + 300000 * 0.15 + (taxableIncome - 1200000) * 0.2;
  }

  // Above 15 lakhs
  return (
    300000 * 0.05 +
    300000 * 0.1 +
    300000 * 0.15 +
    300000 * 0.2 +
    (taxableIncome - 1500000) * 0.3
  );
}

/**
 * Calculate social security contributions (PF, ESI)
 */
export function calculateSocialSecurity(grossSalary: number): {
  epf: number;
  esi: number;
} {
  // Simplified - typically PF is 12% and ESI is 0.75-1.75%
  const epf = grossSalary * 0.12;
  const esi = grossSalary < 21000 ? grossSalary * 0.0075 : 0;

  return {
    epf: Math.round(epf * 100) / 100,
    esi: Math.round(esi * 100) / 100,
  };
}
