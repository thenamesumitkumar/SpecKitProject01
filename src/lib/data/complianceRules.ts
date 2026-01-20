import { ComplianceRule, TaxSlab, TaxBracket } from "@/lib/types";

export const complianceRules: ComplianceRule[] = [
  {
    id: "COMP001",
    name: "Provident Fund (PF)",
    jurisdiction: "India",
    type: "deduction",
    rule: "12% of basic salary",
    effectiveDate: "2024-01-01",
    percentage: 12,
    isActive: true,
  },
  {
    id: "COMP002",
    name: "Employees State Insurance (ESI)",
    jurisdiction: "India",
    type: "deduction",
    rule: "0.75% of salary if salary < 21000",
    effectiveDate: "2024-01-01",
    percentage: 0.75,
    isActive: true,
  },
  {
    id: "COMP003",
    name: "Professional Tax",
    jurisdiction: "India",
    type: "deduction",
    rule: "Up to Rs. 200 per month",
    effectiveDate: "2024-01-01",
    amount: 200,
    isActive: true,
  },
  {
    id: "COMP004",
    name: "Minimum Wage",
    jurisdiction: "India",
    type: "earning",
    rule: "Minimum wage must be at least regional minimum",
    effectiveDate: "2024-01-01",
    amount: 18000,
    isActive: true,
  },
];

export const taxSlabs: TaxSlab[] = [
  {
    id: "TAX001",
    jurisdiction: "India",
    financialYear: "2025-26",
    brackets: [
      {
        minAmount: 0,
        maxAmount: 300000,
        taxRate: 0,
        standardDeduction: 75000,
      },
      {
        minAmount: 300000,
        maxAmount: 600000,
        taxRate: 0.05,
      },
      {
        minAmount: 600000,
        maxAmount: 900000,
        taxRate: 0.1,
      },
      {
        minAmount: 900000,
        maxAmount: 1200000,
        taxRate: 0.15,
      },
      {
        minAmount: 1200000,
        maxAmount: 1500000,
        taxRate: 0.2,
      },
      {
        minAmount: 1500000,
        maxAmount: undefined,
        taxRate: 0.3,
      },
    ],
    surcharge: 0,
    cessPercentage: 0,
  },
];

export function getComplianceRulesByType(type: ComplianceRule["type"]): ComplianceRule[] {
  return complianceRules.filter((rule) => rule.type === type && rule.isActive);
}

export function getTaxSlab(jurisdiction: string, financialYear: string): TaxSlab | undefined {
  return taxSlabs.find((slab) => slab.jurisdiction === jurisdiction && slab.financialYear === financialYear);
}

export function getActiveComplianceRules(): ComplianceRule[] {
  return complianceRules.filter((rule) => rule.isActive);
}
