import { Employee, SalaryStructure, LeaveRequest } from "@/lib/types";

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate salary structure
 */
export function validateSalaryStructure(salary: SalaryStructure): boolean {
  if (salary.basicSalary <= 0) {
    return false;
  }

  if (!salary.effectiveDate) {
    return false;
  }

  return true;
}

/**
 * Validate leave request
 */
export function validateLeaveRequest(leave: LeaveRequest): boolean {
  // End date must be after start date
  if (leave.endDate <= leave.startDate) {
    return false;
  }

  // Reason should be provided
  if (!leave.reason || leave.reason.trim().length === 0) {
    return false;
  }

  // Number of days must be positive
  if (leave.numberOfDays <= 0) {
    return false;
  }

  return true;
}

/**
 * Validate employee data
 */
export function validateEmployeeData(employee: Employee): string[] {
  const errors: string[] = [];

  if (!employee.firstName || employee.firstName.trim().length === 0) {
    errors.push("First name is required");
  }

  if (!employee.lastName || employee.lastName.trim().length === 0) {
    errors.push("Last name is required");
  }

  if (!validateEmail(employee.email)) {
    errors.push("Valid email is required");
  }

  if (!employee.department || employee.department.trim().length === 0) {
    errors.push("Department is required");
  }

  if (!employee.designation || employee.designation.trim().length === 0) {
    errors.push("Designation is required");
  }

  if (!employee.employmentDate) {
    errors.push("Employment date is required");
  }

  return errors;
}

/**
 * Validate PAN number format (India)
 */
export function validatePANNumber(pan: string): boolean {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan.toUpperCase());
}

/**
 * Validate Aadhar number format (India)
 */
export function validateAadharNumber(aadhar: string): boolean {
  const aadharRegex = /^[0-9]{12}$/;
  return aadharRegex.test(aadhar);
}

/**
 * Validate phone number format (India)
 */
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ""));
}

/**
 * Validate date range (start before end)
 */
export function validateDateRange(startDate: string, endDate: string): boolean {
  return startDate < endDate;
}

/**
 * Check if value is not empty
 */
export function isNotEmpty(value: string | undefined | null): boolean {
  return value !== undefined && value !== null && value.trim().length > 0;
}
