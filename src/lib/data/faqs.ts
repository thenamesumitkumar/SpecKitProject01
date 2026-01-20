import { FAQ } from "@/lib/types";

export const faqs: FAQ[] = [
  {
    id: "FAQ001",
    question: "How do I access my salary slip?",
    answer:
      "You can access your salary slip by logging in to the Employee Self-Service portal and navigating to the Salary section. You'll see your current month's payslip along with previous months.",
    category: "Salary",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "FAQ002",
    question: "How can I request leave?",
    answer:
      "Go to the Leave section in your ESS portal, click 'Request Leave', select the dates and leave type, add a reason, and submit. Your manager will receive a notification for approval.",
    category: "Leave",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "FAQ003",
    question: "How do I check my attendance?",
    answer:
      "Navigate to the Attendance section in your ESS portal to view your daily attendance records and monthly summary with attendance percentage.",
    category: "Attendance",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "FAQ004",
    question: "What is leave encashment?",
    answer:
      "Leave encashment is the payment of cash equivalent of unused leave days. When you exit the company, your unused leave balance is converted to cash and paid as part of your full and final settlement.",
    category: "Settlement",
    displayOrder: 4,
    isActive: true,
  },
  {
    id: "FAQ005",
    question: "How is gratuity calculated?",
    answer:
      "Gratuity is typically calculated as 15 days of last drawn salary per year for the first 5 years, and 20 days for each year after that. Exact calculation may vary based on your employment contract.",
    category: "Settlement",
    displayOrder: 5,
    isActive: true,
  },
  {
    id: "FAQ006",
    question: "What deductions are made from my salary?",
    answer:
      "Common deductions include Provident Fund (PF), Professional Tax (PT), and Income Tax (if applicable). These are deducted as per government regulations and your salary structure.",
    category: "Salary",
    displayOrder: 6,
    isActive: true,
  },
  {
    id: "FAQ007",
    question: "Can I modify my leave request after submission?",
    answer:
      "You can modify or cancel a pending leave request before it's approved by your manager. Once approved or rejected, you cannot modify it. Contact your HR for special cases.",
    category: "Leave",
    displayOrder: 7,
    isActive: true,
  },
  {
    id: "FAQ008",
    question: "How many days of leave am I entitled to?",
    answer:
      "Leave entitlement depends on your designation and company policy. You can view your leave balance in the Leave section of your ESS portal. It typically includes paid leave, sick leave, and casual leave.",
    category: "Leave",
    displayOrder: 8,
    isActive: true,
  },
  {
    id: "FAQ009",
    question: "What happens if I take leave without approval?",
    answer:
      "Unauthorized absence is treated as absent and may impact your salary and attendance records. Always submit a leave request in advance or inform your manager immediately.",
    category: "Leave",
    displayOrder: 9,
    isActive: true,
  },
  {
    id: "FAQ010",
    question: "How is gross salary calculated?",
    answer:
      "Gross salary = Basic Salary + Allowances. It does not include deductions. Deductions are subtracted from gross salary to calculate net salary (take-home amount).",
    category: "Salary",
    displayOrder: 10,
    isActive: true,
  },
];

export function getFAQs(category?: string): FAQ[] {
  let filtered = faqs.filter((faq) => faq.isActive);
  if (category) {
    filtered = filtered.filter((faq) => faq.category === category);
  }
  return filtered.sort((a, b) => a.displayOrder - b.displayOrder);
}

export function searchFAQs(query: string): FAQ[] {
  const lowerQuery = query.toLowerCase();
  return faqs
    .filter(
      (faq) =>
        faq.isActive &&
        (faq.question.toLowerCase().includes(lowerQuery) ||
          faq.answer.toLowerCase().includes(lowerQuery))
    )
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getFAQCategories(): string[] {
  return [...new Set(faqs.filter((faq) => faq.isActive).map((faq) => faq.category))].sort();
}
