"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-blue-600">HR & Payroll</h1>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-600 capitalize">{user.role}</p>
              </div>
              <button
                onClick={logout}
                className="rounded-lg bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
