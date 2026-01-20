import { Settlement } from "@/lib/types";

export const settlements: Settlement[] = [
  {
    id: "SETL001",
    employeeId: "EMP006",
    exitDate: "2025-12-31",
    requestDate: "2025-10-01",
    status: "pending",
    pendingSalary: 120000,
    leaveEncashment: 50000,
    gratuity: 180000,
    otherBenefits: 0,
    totalDeductions: 25000,
    totalSettlement: 325000,
    notes: "Regular exit",
  },
];

export function getSettlementById(id: string): Settlement | undefined {
  return settlements.find((s) => s.id === id);
}

export function getSettlementByEmployeeId(employeeId: string): Settlement | undefined {
  return settlements.find((s) => s.employeeId === employeeId);
}

export function getSettlementsByStatus(status: Settlement["status"]): Settlement[] {
  return settlements.filter((s) => s.status === status);
}

export function getAllSettlements(): Settlement[] {
  return settlements;
}
