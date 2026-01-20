import { SalaryStructure, SalaryComponent } from "@/lib/types";

const salaryStructures: SalaryStructure[] = [
  {
    id: "SAL001",
    employeeId: "EMP001",
    basicSalary: 100000,
    allowances: [
      { id: "AL001", name: "House Rent Allowance", type: "earning", amount: 30000, isPercentage: false },
      {
        id: "AL002",
        name: "Dearness Allowance",
        type: "earning",
        amount: 15000,
        isPercentage: false,
      },
      {
        id: "AL003",
        name: "Special Allowance",
        type: "earning",
        amount: 10000,
        isPercentage: false,
      },
    ],
    deductions: [
      {
        id: "DED001",
        name: "Provident Fund",
        type: "deduction",
        amount: 12000,
        isPercentage: false,
      },
      {
        id: "DED002",
        name: "Professional Tax",
        type: "deduction",
        amount: 200,
        isPercentage: false,
      },
    ],
    effectiveDate: "2024-01-01",
  },
  {
    id: "SAL002",
    employeeId: "EMP002",
    basicSalary: 80000,
    allowances: [
      { id: "AL004", name: "House Rent Allowance", type: "earning", amount: 24000, isPercentage: false },
      { id: "AL005", name: "Dearness Allowance", type: "earning", amount: 12000, isPercentage: false },
    ],
    deductions: [
      {
        id: "DED003",
        name: "Provident Fund",
        type: "deduction",
        amount: 9600,
        isPercentage: false,
      },
      {
        id: "DED004",
        name: "Professional Tax",
        type: "deduction",
        amount: 200,
        isPercentage: false,
      },
    ],
    effectiveDate: "2024-01-01",
  },
  {
    id: "SAL003",
    employeeId: "EMP003",
    basicSalary: 120000,
    allowances: [
      { id: "AL006", name: "House Rent Allowance", type: "earning", amount: 36000, isPercentage: false },
      { id: "AL007", name: "Dearness Allowance", type: "earning", amount: 18000, isPercentage: false },
      {
        id: "AL008",
        name: "Conveyance Allowance",
        type: "earning",
        amount: 5000,
        isPercentage: false,
      },
    ],
    deductions: [
      {
        id: "DED005",
        name: "Provident Fund",
        type: "deduction",
        amount: 14400,
        isPercentage: false,
      },
      {
        id: "DED006",
        name: "Professional Tax",
        type: "deduction",
        amount: 200,
        isPercentage: false,
      },
    ],
    effectiveDate: "2024-01-01",
  },
  {
    id: "SAL004",
    employeeId: "EMP004",
    basicSalary: 50000,
    allowances: [
      { id: "AL009", name: "House Rent Allowance", type: "earning", amount: 15000, isPercentage: false },
      { id: "AL010", name: "Dearness Allowance", type: "earning", amount: 7500, isPercentage: false },
    ],
    deductions: [
      {
        id: "DED007",
        name: "Provident Fund",
        type: "deduction",
        amount: 6000,
        isPercentage: false,
      },
      {
        id: "DED008",
        name: "Professional Tax",
        type: "deduction",
        amount: 200,
        isPercentage: false,
      },
    ],
    effectiveDate: "2024-01-01",
  },
  {
    id: "SAL005",
    employeeId: "EMP005",
    basicSalary: 75000,
    allowances: [
      { id: "AL011", name: "House Rent Allowance", type: "earning", amount: 22500, isPercentage: false },
      { id: "AL012", name: "Dearness Allowance", type: "earning", amount: 11250, isPercentage: false },
    ],
    deductions: [
      {
        id: "DED009",
        name: "Provident Fund",
        type: "deduction",
        amount: 9000,
        isPercentage: false,
      },
      {
        id: "DED010",
        name: "Professional Tax",
        type: "deduction",
        amount: 200,
        isPercentage: false,
      },
    ],
    effectiveDate: "2024-01-01",
  },
];

export function getSalaryStructureById(id: string): SalaryStructure | undefined {
  return salaryStructures.find((sal) => sal.id === id);
}

export function getSalaryStructureByEmployeeId(employeeId: string): SalaryStructure | undefined {
  return salaryStructures.find((sal) => sal.employeeId === employeeId);
}

export function getAllSalaryStructures(): SalaryStructure[] {
  return salaryStructures;
}

export function calculateGrossSalary(salaryStructure: SalaryStructure): number {
  const totalAllowances = salaryStructure.allowances.reduce((sum, comp) => sum + comp.amount, 0);
  return salaryStructure.basicSalary + totalAllowances;
}

export function calculateTotalDeductions(salaryStructure: SalaryStructure): number {
  return salaryStructure.deductions.reduce((sum, comp) => sum + comp.amount, 0);
}

export function calculateNetSalary(salaryStructure: SalaryStructure): number {
  const gross = calculateGrossSalary(salaryStructure);
  const deductions = calculateTotalDeductions(salaryStructure);
  return gross - deductions;
}
