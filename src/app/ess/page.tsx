"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { getEmployeeByEmail } from "@/lib/data/employees";
import { getSalaryStructureByEmployeeId, calculateGrossSalary, calculateNetSalary } from "@/lib/data/salaries";
import { getLeaveBalanceForEmployee } from "@/lib/data/leaves";
import { getAttendanceSummaryForEmployee } from "@/lib/data/attendance";
import { Employee, SalaryStructure, LeaveBalance } from "@/lib/types";

export default function ESSPage() {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [salary, setSalary] = useState<SalaryStructure | null>(null);
  const [leaves, setLeaves] = useState<LeaveBalance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const emp = getEmployeeByEmail(user.email);
      setEmployee(emp || null);

      if (emp) {
        const sal = getSalaryStructureByEmployeeId(emp.id);
        setSalary(sal || null);

        const leaveBalance = getLeaveBalanceForEmployee(emp.id);
        setLeaves(leaveBalance);
      }

      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const grossSalary = salary ? calculateGrossSalary(salary) : 0;
  const netSalary = salary ? calculateNetSalary(salary) : 0;
  const totalLeaves = leaves.reduce((sum, l) => sum + l.available, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {employee.firstName} {employee.lastName}!
        </h1>
        <p className="mt-1 text-gray-600">{employee.designation} • {employee.department}</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Profile Card */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Email:</span>
              <p className="text-gray-900 font-medium">{employee.email}</p>
            </div>
            <div>
              <span className="text-gray-600">Department:</span>
              <p className="text-gray-900 font-medium">{employee.department}</p>
            </div>
            <div>
              <span className="text-gray-600">Joining Date:</span>
              <p className="text-gray-900 font-medium">{employee.employmentDate}</p>
            </div>
          </div>
        </div>

        {/* Salary Card */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">Current Salary</h3>
          <div className="mt-4 space-y-2">
            <div>
              <span className="text-sm text-gray-600">Gross Salary</span>
              <p className="text-2xl font-bold text-blue-600">₹{grossSalary.toLocaleString()}</p>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <span className="text-sm text-gray-600">Net Salary (Take Home)</span>
              <p className="text-xl font-bold text-green-600">₹{netSalary.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Leave Balance Card */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">Leave Balance</h3>
          <div className="mt-4 space-y-2">
            <div>
              <span className="text-sm text-gray-600">Total Available</span>
              <p className="text-2xl font-bold text-orange-600">{totalLeaves} days</p>
            </div>
            {leaves.length > 0 && (
              <div className="border-t border-gray-200 pt-2 text-sm">
                {leaves.map((l) => (
                  <div key={l.leaveType} className="flex justify-between">
                    <span className="capitalize">{l.leaveType}:</span>
                    <span className="font-medium">{l.available}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
          <div className="mt-4 space-y-2">
            <a
              href="/ess/salary"
              className="block rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
            >
              View Payslips
            </a>
            <a
              href="/ess/leave"
              className="block rounded-lg bg-orange-50 px-3 py-2 text-sm font-medium text-orange-600 hover:bg-orange-100"
            >
              Request Leave
            </a>
            <a
              href="/ess/attendance"
              className="block rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-100"
            >
              View Attendance
            </a>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900">Recent Information</h3>
        <div className="mt-4 text-sm text-gray-600">
          <p>This is your Employee Self-Service (ESS) portal. You can:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>View your salary details and payslips</li>
            <li>Check and manage your leave balance</li>
            <li>Request leaves and track approvals</li>
            <li>Monitor your attendance records</li>
            <li>View company policies and FAQs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
