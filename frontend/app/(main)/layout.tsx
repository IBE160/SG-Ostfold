import React from 'react';
import { redirect } from 'next/navigation';
import { createClientReadOnly } from '@/lib/supabase/server-read-only';
import AppShell from '@/components/layout/AppShell'; // Import AppShell

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
    <AppShell>
      {children}
    </AppShell>
  );
}