// src/app/(main)/dashboard/page.tsx
import { createClientReadOnly } from "@/lib/supabase/server-read-only"; 
import { createClientAction } from "@/lib/supabase/server-actions";

// ... rest of the code

export default async function DashboardPage() {
  const supabase = await createClientReadOnly();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This check is redundant if middleware is correctly configured, but good for direct access/server rendering safety
    redirect("/auth/login");
  }

  // Placeholder for logout action
  const logout = async () => {
    "use server";
    const supabase = await createClientAction();
    await supabase.auth.signOut();
    redirect("/auth/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard!</h1>
      <p className="text-xl mb-8">You are logged in as {user.email}</p>

      <form action={logout}>
        <Button variant="outline">Logout</Button>
      </form>
    </div>
  );
}
