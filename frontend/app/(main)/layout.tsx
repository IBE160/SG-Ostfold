import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClientReadOnly } from '@/lib/supabase/server-read-only';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClientReadOnly();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If no session, redirect to login page
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="w-72 bg-card border-r border-border p-4">
        <h2 className="text-xl font-bold mb-4">Navigation</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <Link href="/" className="block text-muted-foreground hover:text-foreground">Dashboard</Link>
            </li>
            <li className="mb-2">
              <Link href="/reports" className="block text-muted-foreground hover:text-foreground">Shift Reports</Link>
            </li>
            <li className="mb-2">
              <Link href="/historical" className="block text-muted-foreground hover:text-foreground">Historical Data</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}