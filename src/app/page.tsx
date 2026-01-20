import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-blue-600">HR & Payroll</h1>
            </div>
            <div className="flex gap-4">
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link href="/faq" className="text-gray-700 hover:text-blue-600">
                FAQ
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Modern HR & Payroll Management
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Streamline your HR operations with automated salary calculations, leave management, and compliance tracking.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/login"
              className="rounded-lg bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">Employee Self-Service</h3>
            <p className="mt-2 text-gray-600">
              View your profile, salary, leave balance, and attendance records in one place.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">Automated Salary Calculation</h3>
            <p className="mt-2 text-gray-600">
              Accurate salary calculations with automatic deductions and compliance checks.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">Leave Management</h3>
            <p className="mt-2 text-gray-600">
              Track leave balances, submit requests, and manage approvals efficiently.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">Attendance Tracking</h3>
            <p className="mt-2 text-gray-600">
              Monitor daily attendance and view comprehensive attendance summaries.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">F&F Settlement</h3>
            <p className="mt-2 text-gray-600">
              Calculate and manage full and final settlements for exiting employees.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">Compliance Reporting</h3>
            <p className="mt-2 text-gray-600">
              Generate compliance reports and maintain statutory audit trails.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">
            © 2026 HR & Payroll Management. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
