"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const isEmployee = user.role === "employee";
  const isAdmin = user.role === "admin" || user.role === "hr";

  return (
    <aside className="w-64 border-r border-gray-200 bg-gray-50 py-6">
      <nav className="space-y-2 px-4">
        {isEmployee && (
          <>
            <h2 className="mb-4 text-sm font-semibold text-gray-900">Employee Portal</h2>
            <Link
              href="/ess"
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                pathname === "/ess"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/ess/salary"
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                pathname === "/ess/salary"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Salary
            </Link>
            <Link
              href="/ess/leave"
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                pathname === "/ess/leave"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Leave
            </Link>
            <Link
              href="/ess/attendance"
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                pathname === "/ess/attendance"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Attendance
            </Link>
          </>
        )}

        {isAdmin && (
          <>
            <h2 className="mb-4 text-sm font-semibold text-gray-900">Admin Portal</h2>
            <Link
              href="/admin"
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                pathname === "/admin"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/employees"
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                pathname === "/admin/employees"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Employees
            </Link>
            <Link
              href="/admin/payroll"
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                pathname === "/admin/payroll"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Payroll
            </Link>
            <Link
              href="/admin/leave-approvals"
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                pathname === "/admin/leave-approvals"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Leave Approvals
            </Link>
            <Link
              href="/admin/settlement"
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                pathname === "/admin/settlement"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Settlement
            </Link>
            <Link
              href="/admin/compliance"
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                pathname === "/admin/compliance"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Compliance
            </Link>
          </>
        )}

        <hr className="my-4" />

        <Link
          href="/faq"
          className={`block rounded-lg px-4 py-2 text-sm font-medium ${
            pathname === "/faq"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          FAQ
        </Link>
      </nav>
    </aside>
  );
}
