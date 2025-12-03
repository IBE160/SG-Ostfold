import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import * as z from 'zod';

// Define the Zod schema for the report form (reused from client-side)
const reportFormSchema = z.object({
  shift_date: z.string().min(1, "Shift Date is required."),
  shift: z.enum(["morning", "evening", "night"], {
    required_error: "Shift is required.",
  }),
  overtime_hours: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Overtime Hours cannot be negative.").max(24, "Overtime Hours cannot exceed 24.")
  ),
  sick_leave_percent: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Sick Leave Percent cannot be negative.").max(100, "Sick Leave Percent cannot exceed 100.")
  ),
  orders_per_hour: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Orders Per Hour cannot be negative.")
  ),
});

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);

  // Initialize Supabase client for server-side operations
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options) {
          request.cookies.set({ name, value, ...options });
        },
        remove(name: string, options) {
          request.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Check user authentication
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch user role for authorization
  let userRole: string | null = null;
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('role_id')
    .eq('id', user.id)
    .single();

  if (userError) {
    console.error('Error fetching user role for API:', userError);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  if (userData && userData.role_id) {
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('name')
      .eq('id', userData.role_id)
      .single();

    if (roleError) {
      console.error('Error fetching role name for API:', roleError);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
    userRole = roleData?.name || null;
  }

  // Authorize only 'shift_leader' to submit reports
  if (userRole !== 'shift_leader') {
    return NextResponse.json({ error: 'Forbidden: Only Shift Leaders can submit reports' }, { status: 403 });
  }

  // Parse request body
  let formData;
  try {
    formData = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Server-side validation using Zod
  const parsed = reportFormSchema.safeParse(formData);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.issues }, { status: 400 });
  }

  const reportData = {
    ...parsed.data,
    user_id: user.id, // Assign the report to the current user
  };

  // Insert data into Supabase
  const { data, error } = await supabase
    .from('reports')
    .insert([reportData])
    .select();

  if (error) {
    console.error('Error inserting report:', error);
    return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Report submitted successfully', data: data[0] }, { status: 201 });
}
