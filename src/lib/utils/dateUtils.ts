import { addDays, isBefore, isAfter, differenceInCalendarDays, format, parse } from "date-fns";
import { LeaveRequest, LeaveBalance, LeaveType, AttendanceRecord } from "@/lib/types";

/**
 * Get working days in a date range (Monday-Friday)
 */
export function getWorkingDays(startDate: string, endDate: string): number {
  const start = typeof startDate === "string" ? parse(startDate, "yyyy-MM-dd", new Date()) : startDate;
  const end = typeof endDate === "string" ? parse(endDate, "yyyy-MM-dd", new Date()) : endDate;

  let workingDays = 0;
  let currentDate = new Date(start);

  while (isBefore(currentDate, end) || currentDate.toDateString() === end.toDateString()) {
    const dayOfWeek = currentDate.getDay();
    // 1 = Monday, 5 = Friday (0 = Sunday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workingDays++;
    }
    currentDate = addDays(currentDate, 1);
  }

  return workingDays;
}

/**
 * Calculate remaining leave balance
 */
export function calculateLeaveBalance(
  entitlement: number,
  used: number,
  pending: number
): number {
  return Math.max(0, entitlement - used - pending);
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date, dateFormat: string = "dd MMM yyyy"): string {
  if (typeof date === "string") {
    return format(parse(date, "yyyy-MM-dd", new Date()), dateFormat);
  }
  return format(date, dateFormat);
}

/**
 * Check if a date is a leave day
 */
export function isLeaveDay(
  date: string,
  leaveRequests: LeaveRequest[],
  attendanceRecords: AttendanceRecord[]
): boolean {
  // Check if date has an approved leave request
  const hasLeaveRequest = leaveRequests.some(
    (leave) =>
      leave.status === "approved" &&
      !isBefore(parse(date, "yyyy-MM-dd", new Date()), parse(leave.startDate, "yyyy-MM-dd", new Date())) &&
      !isAfter(parse(date, "yyyy-MM-dd", new Date()), parse(leave.endDate, "yyyy-MM-dd", new Date()))
  );

  // Check if attendance record shows leave
  const hasLeaveRecord = attendanceRecords.some(
    (record) => record.date === date && record.status === "leave"
  );

  return hasLeaveRequest || hasLeaveRecord;
}

/**
 * Get number of days between two dates
 */
export function getDaysBetween(startDate: string, endDate: string): number {
  const start = parse(startDate, "yyyy-MM-dd", new Date());
  const end = parse(endDate, "yyyy-MM-dd", new Date());
  return differenceInCalendarDays(end, start) + 1; // +1 to include both start and end dates
}

/**
 * Get month name from month string (YYYY-MM)
 */
export function getMonthName(monthStr: string): string {
  try {
    const [year, month] = monthStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return format(date, "MMMM yyyy");
  } catch {
    return monthStr;
  }
}

/**
 * Check if date is in weekend
 */
export function isWeekend(date: string): boolean {
  const d = typeof date === "string" ? parse(date, "yyyy-MM-dd", new Date()) : date;
  const dayOfWeek = d.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

/**
 * Get current month in YYYY-MM format
 */
export function getCurrentMonth(): string {
  const now = new Date();
  return format(now, "yyyy-MM");
}

/**
 * Get previous month in YYYY-MM format
 */
export function getPreviousMonth(monthStr: string): string {
  const [year, month] = monthStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  const prevDate = addDays(date, -1);
  return format(prevDate, "yyyy-MM");
}

/**
 * Get next month in YYYY-MM format
 */
export function getNextMonth(monthStr: string): string {
  const [year, month] = monthStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  const nextDate = addDays(date, 32);
  return format(nextDate, "yyyy-MM");
}

/**
 * Get working days in a month
 */
export function getWorkingDaysInMonth(monthStr: string): number {
  const [year, month] = monthStr.split("-");
  const monthDate = new Date(parseInt(year), parseInt(month) - 1);
  const startDate = format(monthDate, "yyyy-MM-01");
  const endDate = format(new Date(parseInt(year), parseInt(month), 0), "yyyy-MM-dd");

  return getWorkingDays(startDate, endDate);
}
