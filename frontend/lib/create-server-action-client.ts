import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Lokal variant av createServerActionClient.
 *
 * Bruk:
 *   const supabase = createServerActionClient<Database>({ cookies });
 */
export function createServerActionClient<Database = any>(
  _opts: { cookies: any }
): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase env-variabler mangler. Sett NEXT_PUBLIC_SUPABASE_URL og NEXT_PUBLIC_SUPABASE_ANON_KEY i .env.local"
    );
  }

  // Foreløpig ignorerer vi cookies og lager en enkel klient med anon-key.
  return createClient<Database>(url, anonKey);
}
