// src/hooks/useAuth.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { type User, type Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  // Function to get initial session and set up auth state listener
  const initializeAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      setSession(session);
      setUser(session?.user || null);
    } catch (error) {
      console.error("Error fetching session:", error);
      setSession(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [supabase.auth]);

  useEffect(() => {
    initializeAuth(); // Initialize on mount

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setIsLoading(false);

        if (event === "SIGNED_IN") {
          console.log("User signed in:", currentSession?.user.email);
          router.replace("/dashboard"); // Redirect on successful login
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out.");
          router.replace("/login"); // Redirect on logout
        } else if (event === "USER_UPDATED") {
          console.log("User data updated:", currentSession?.user.email);
        } else if (event === "TOKEN_REFRESHED") {
          console.log("Session token refreshed.");
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, [initializeAuth, router, supabase.auth]);

  const login = async ({ email, password }: { email: string; password: string }) => {
    setIsLoading(true);
    // Removed setError(null) as setError is not part of this hook's state
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        throw new Error(error.message); // Re-throw to be caught by UI
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    session,
    isLoading,
    isAuthenticated: !!session,
    login,
    logout,
  };
}
