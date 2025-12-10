'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function logout() {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function getDashboardData() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("shift_reports")
    .select("*")
    .limit(10);

  if (error) throw new Error(error.message);

  return data;
}
