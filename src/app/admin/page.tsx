"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { getAllEmployees } from "@/lib/data/employees";
import { getAllSalaryStructures } from "@/lib/data/salaries";
import { getSettlementsByStatus } from "@/lib/data/settlements";

export default function AdminPage() {
  const employees = getAllEmployees();
  const salaries = getAllSalaryStructures();
  const pendingSettlements = getSettlementsByStatus("pending");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">Total Employees</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{employees.length}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">Active</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {employees.filter((e) => e.status === "active").length}
          </p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">Pending Settlements</h3>
          <p className="mt-2 text-3xl font-bold text-orange-600">{pendingSettlements.length}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">Salary Structures</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">{salaries.length}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/admin/employees"
            className="rounded-lg bg-blue-50 px-4 py-3 text-center font-medium text-blue-600 hover:bg-blue-100"
          >
            Manage Employees
          </Link>
          <Link
            href="/admin/payroll"
            className="rounded-lg bg-green-50 px-4 py-3 text-center font-medium text-green-600 hover:bg-green-100"
          >
            Manage Payroll
          </Link>
          <Link
            href="/admin/leave-approvals"
            className="rounded-lg bg-orange-50 px-4 py-3 text-center font-medium text-orange-600 hover:bg-orange-100"
          >
            Approve Leaves
          </Link>
          <Link
            href="/admin/settlement"
            className="rounded-lg bg-purple-50 px-4 py-3 text-center font-medium text-purple-600 hover:bg-purple-100"
          >
            F&F Settlements
          </Link>
        </div>
      </div>

      {/* Employee List Preview */}
      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Employees</h3>
          <Link href="/admin/employees" className="text-blue-600 hover:text-blue-700 font-medium">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Department</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Designation</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.slice(0, 5).map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">{emp.department}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{emp.designation}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        emp.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
