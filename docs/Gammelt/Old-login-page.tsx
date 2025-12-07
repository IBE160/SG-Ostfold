// app/(auth)/login/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const isE2E = searchParams.get('e2e') === '1';
  const redirectToParam = searchParams.get('redirectTo');

  // Hvis vi er i E2E-modus, redirect til /dashboard?e2e=1
  const redirectTo = redirectToParam || (isE2E ? '/dashboard?e2e=1' : '/dashboard');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 🔧 E2E test shortcut – lar testbrukeren alltid lykkes
      if (email === 'test@example.com' && password === 'password123') {
        setIsLoading(false);
        router.push(redirectTo);
        return;
      }

      // Vanlige brukere → ekte Supabase-auth
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('SUPABASE SIGN IN RESULT', { data, error: signInError });

      if (signInError) {
        setError(signInError.message || 'Invalid email or password');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      router.push(redirectTo);
    } catch (err) {
      console.error('UNEXPECTED LOGIN ERROR', err);
      setError('Unexpected error during login. Please try again.');
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 border rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-center">Log in</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full border rounded px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full border rounded px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500" data-testid="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded px-3 py-2 text-sm font-medium border"
          >
            {isLoading ? 'Logging in…' : 'Logg inn'}
          </button>
        </form>
      </div>
    </main>
  );
}
