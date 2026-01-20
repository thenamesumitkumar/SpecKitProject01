import { AttendanceRecord, AttendanceSummary } from "@/lib/types";

export const attendanceRecords: AttendanceRecord[] = [
  // January 2025 records for EMP001
  {
    id: "ATT001",
    employeeId: "EMP001",
    date: "2025-01-01",
    status: "holiday",
  },
  {
    id: "ATT002",
    employeeId: "EMP001",
    date: "2025-01-02",
    status: "present",
    checkInTime: "08:45",
    checkOutTime: "18:00",
  },
  {
    id: "ATT003",
    employeeId: "EMP001",
    date: "2025-01-03",
    status: "present",
    checkInTime: "09:00",
    checkOutTime: "18:15",
  },
  {
    id: "ATT004",
    employeeId: "EMP001",
    date: "2025-01-04",
    status: "present",
    checkInTime: "08:50",
    checkOutTime: "17:45",
  },
  {
    id: "ATT005",
    employeeId: "EMP001",
    date: "2025-01-05",
    status: "present",
    checkInTime: "09:05",
    checkOutTime: "18:00",
  },
  {
    id: "ATT006",
    employeeId: "EMP001",
    date: "2025-01-06",
    status: "weekend",
  },
  {
    id: "ATT007",
    employeeId: "EMP001",
    date: "2025-01-07",
    status: "weekend",
  },
  {
    id: "ATT008",
    employeeId: "EMP001",
    date: "2025-01-08",
    status: "present",
    checkInTime: "09:00",
    checkOutTime: "18:00",
  },
  {
    id: "ATT009",
    employeeId: "EMP001",
    date: "2025-01-09",
    status: "leave",
  },
  {
    id: "ATT010",
    employeeId: "EMP001",
    date: "2025-01-10",
    status: "half-day",
    checkInTime: "09:00",
    checkOutTime: "13:00",
  },
];

export const attendanceSummaries: AttendanceSummary[] = [
  {
    employeeId: "EMP001",
    month: "2025-01",
    totalWorkingDays: 22,
    presentDays: 16,
    absentDays: 2,
    halfDays: 1,
    leaveDays: 1,
    attendancePercentage: 79.5,
  },
  {
    employeeId: "EMP002",
    month: "2025-01",
    totalWorkingDays: 22,
    presentDays: 19,
    absentDays: 1,
    halfDays: 0,
    leaveDays: 2,
    attendancePercentage: 95.5,
  },
  {
    employeeId: "EMP003",
    month: "2025-01",
    totalWorkingDays: 22,
    presentDays: 20,
    absentDays: 0,
    halfDays: 1,
    leaveDays: 1,
    attendancePercentage: 95.5,
  },
];

export function getAttendanceForEmployee(employeeId: string, month?: string): AttendanceRecord[] {
  let records = attendanceRecords.filter((record) => record.employeeId === employeeId);
  if (month) {
    records = records.filter((record) => record.date.startsWith(month));
  }
  return records;
}

export function getAttendanceSummaryForEmployee(employeeId: string, month: string): AttendanceSummary | undefined {
  return attendanceSummaries.find((summary) => summary.employeeId === employeeId && summary.month === month);
}

export function getMonthlyAttendanceSummary(employeeId: string): AttendanceSummary[] {
  return attendanceSummaries.filter((summary) => summary.employeeId === employeeId);
}
