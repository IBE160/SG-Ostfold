# Supabase Environment Variables Setup

This document outlines the essential environment variables required for integrating Supabase into the application's frontend (Next.js) and backend (NestJS) services, and how they should be handled for local development and CI/CD environments.

## 1. Required Variables

### Frontend (Next.js - `apps/web`)

These variables are publicly exposed (prefixed with `NEXT_PUBLIC_`) and used by the client-side Supabase SDK to interact with the Supabase project.

*   `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase project API.
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The 'anon' key (public key) for your Supabase project. This key allows read-only access to your database for unauthenticated users and allows users to sign up and sign in.

### Backend (NestJS - `apps/api`)

These variables should be kept confidential and are used by the server-side Supabase SDK, particularly for operations that require higher privileges (e.g., creating user profiles after sign-up via the `service_role` key).

*   `SUPABASE_URL`: The URL of your Supabase project API.
*   `SUPABASE_SERVICE_ROLE_KEY`: The 'service_role' key for your Supabase project. This key has full admin privileges and **bypasses Row-Level Security (RLS)**. **It must be kept secret and never exposed to the client-side.**
*   `SUPABASE_ANON_KEY`: (Optional) The 'anon' key for your Supabase project. May be used for specific backend operations that don't require service role privileges but need an authenticated Supabase client (e.g., initial user sign-up if not using `service_role` for profile creation directly).
*   `SUPABASE_DB_URL`: (Optional) The direct PostgreSQL connection string. This is typically used if you need direct database access for advanced migrations or custom tooling, beyond what the Supabase client SDK provides.

## 2. Local Development Setup

For local development, create `.env.local` files in the respective `apps/web` and `apps/api` directories, or a single `.env.local` in the monorepo root if configured to propagate.

Example for `apps/web/.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR_PROJECT_REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

Example for `apps/api/.env.local`:
```
SUPABASE_URL="https://[YOUR_PROJECT_REF].supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_DB_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

## 3. CI/CD and Production Environments

These environment variables **must** be securely configured as secrets in your CI/CD pipelines (e.g., GitHub Actions Secrets, GitLab CI/CD Variables, Vercel Environment Variables) and on your production hosting platforms. Never commit `.env.local` files to version control in shared repositories.

Ensure that `SUPABASE_SERVICE_ROLE_KEY` is particularly protected and never exposed in client-side bundles or logs.

## 4. Supabase CLI Setup (for Migrations)

For managing database migrations, the Supabase CLI will require project-specific configuration, which typically pulls `SUPABASE_URL` and `SUPABASE_ANON_KEY` from environment or `supabase/config.toml`. Ensure these are consistent with your project setup.
