/**
 * Custom Types for Supabase Tables
 *
 * This file defines TypeScript interfaces that mirror the structure of
 * our Supabase PostgreSQL tables. These types enhance type safety and
 * developer experience when interacting with Supabase data in the NestJS backend.
 */

// Extend from Supabase's auth.users if needed, or keep separate
export interface User {
  id: string; // auth.users.id
  email: string; // auth.users.email
  // Add other relevant auth.users fields if directly used
}

export interface Profile {
  id: string; // FK to auth.users.id
  created_at: string;
  updated_at: string;
  full_name?: string;
  avatar_url?: string;
  role: 'manager' | 'employee' | 'admin';
  department_id?: string; // FK to Department.id
  email?: string; // Added to schema, so include here
}

export interface Department {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  profile_id: string; // FK to Profile.id, UNIQUE
  employee_id_number: string;
  hire_date: string; // DATE type
  created_at: string;
  updated_at: string;
}

export interface ShiftReport {
  id: string;
  employee_profile_id?: string; // FK to Profile.id
  start_time: string; // TIMESTAMPTZ
  end_time: string; // TIMESTAMPTZ
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface KPI {
  id: string;
  metric_name: string;
  value: number; // NUMERIC
  recorded_at: string; // TIMESTAMPTZ
  shift_report_id?: string; // FK to ShiftReport.id
  employee_profile_id?: string; // FK to Profile.id
  created_at: string;
  updated_at: string;
}

// You might also want a combined type if you frequently join them
export interface ProfileWithUser extends Profile {
  user: User; // Assuming a join or retrieval of user data alongside profile
}

// Define the SupabaseClient type with custom schema types
// This allows for type-safe Supabase queries.
// If your schema is in a named schema (e.g., 'app_data'), adjust 'public' accordingly.
import type { SupabaseClient } from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Profile>;
      };
      departments: {
        Row: Department;
        Insert: Omit<Department, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Department>;
      };
      employees: {
        Row: Employee;
        Insert: Omit<Employee, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Employee>;
      };
      shift_reports: {
        Row: ShiftReport;
        Insert: Omit<ShiftReport, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<ShiftReport>;
      };
      kpis: {
        Row: KPI;
        Insert: Omit<KPI, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<KPI>;
      };
    };
    Functions: {
      get_user_role: {
        Args: Record<string, never>; // Function takes no arguments
        Returns: string;
      };
      get_user_department_id: {
        Args: Record<string, never>; // Function takes no arguments
        Returns: string; // UUID is represented as string in TS
      };
    };
  };
};

export type SupabaseClientWithTypes = SupabaseClient<Database>;
