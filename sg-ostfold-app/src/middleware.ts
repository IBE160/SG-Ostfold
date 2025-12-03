import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userRole: string | null = null;
  if (user) {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role_id')
      .eq('id', user.id)
      .single();

    if (userError) {
      console.error('Error fetching user role:', userError);
      // Handle error, maybe redirect to a generic error page or login
    } else if (userData && userData.role_id) {
      const { data: roleData, error: roleError } = await supabase
        .from('roles')
        .select('name')
        .eq('id', userData.role_id)
        .single();

      if (roleError) {
        console.error('Error fetching role name:', roleError);
      } else if (roleData) {
        userRole = roleData.name;
      }
    }
  }

  // Redirect to login if not authenticated and accessing protected routes
  // The (app) group is considered protected
  if (!user && request.nextUrl.pathname.startsWith('/(app)')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Handle role-based redirection if authenticated and on the login page
  if (user && request.nextUrl.pathname === '/login') {
    let redirectTo = '/dashboard'; // Default dashboard

    if (userRole === 'shift_leader') {
      redirectTo = '/shift-leader/dashboard';
    } else if (userRole === 'manager') {
      redirectTo = '/manager/dashboard';
    }
    // If userRole is null or undefined, it defaults to /dashboard as set initially.

    return NextResponse.redirect(new URL(redirectTo, request.url))
  }

  return response
}

function createClient(request: NextRequest) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options) {
          // If the cookie is updated, update the cookies for the request and response
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options) {
          // If the cookie is removed, update the cookies for the request and response
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  return { supabase, response }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}