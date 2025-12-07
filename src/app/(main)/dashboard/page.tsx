// src/app/(main)/dashboard/page.tsx
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server"; // Use server client for protected route rendering
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createClient();

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
    const supabase = createClient();
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
