import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-content-bg border-r border-border p-4">
        <h1 className="text-2xl font-bold mb-6 pb-4 border-b border-border">
          Shift & KPI Reporting
        </h1>
        <nav className="flex flex-col gap-2 text-sm">
          <span className="font-semibold text-text-secondary">Navigation</span>
          <a className="rounded-lg px-3 py-2 hover:bg-[#223d49]" href="#">
            Dashboard
          </a>
          <a className="rounded-lg px-3 py-2 hover:bg-[#223d49]" href="#">
            Shift Reports
          </a>
          <a className="rounded-lg px-3 py-2 hover:bg-[#223d49]" href="#">
            Historical
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
