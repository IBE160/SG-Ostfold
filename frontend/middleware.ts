// frontend/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  // Lag en respons som Supabase kan bruke til å lese/oppdatere cookies
  const res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          res.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Hent session fra Supabase (bruker er innlogget hvis session != null)
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  const isLoginRoute = pathname === '/login';
  const isProtectedRoute = pathname.startsWith('/dashboard');

  // 1) Ikke innlogget og prøver å gå til protected route → redirect til /login
  if (!session && isProtectedRoute) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 2) Innlogget og prøver å gå til /login → redirect til /dashboard
  if (session && isLoginRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // 3) Ellers: bare la requesten gå videre
  return res;
}

// Si til Next.js hvilke routes middleware skal kjøre på
export const config = {
  matcher: ['/login', '/dashboard/:path*'],
};
