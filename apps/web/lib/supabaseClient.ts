import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'; // Import SupabaseClient type

let supabase: SupabaseClient | undefined; // Use `SupabaseClient | undefined`

export function getSupabaseBrowserClient(): SupabaseClient { // Return type is now SupabaseClient
  if (!supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required.')
    }

    supabase = createBrowserClient(
      supabaseUrl,
      supabaseAnonKey,
      // Optional: Add options here like cookie handling for Next.js, e.g.,
      // {
      //   auth: {
      //     flowType: 'pkce', // Recommended for client-side
      //     // Other auth options
      //   },
      // }
    );
  }
  return supabase;
}
