import { registerAs } from '@nestjs/config';
import * as Joi from 'joi'; // Assuming Joi is installed

export const supabaseConfig = registerAs('supabase', () => ({
  url: process.env.SUPABASE_URL,
  anonKey: process.env.SUPABASE_ANON_KEY,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  // Add other Supabase related configurations here if needed
}));

// Validation schema for Supabase environment variables
export const supabaseConfigValidationSchema = Joi.object({
  SUPABASE_URL: Joi.string().uri().required(),
  SUPABASE_ANON_KEY: Joi.string().required(),
  SUPABASE_SERVICE_ROLE_KEY: Joi.string().required(),
});

// Optional: Type-safe configuration access
export interface SupabaseConfig {
  url: string;
  anonKey: string;
  serviceRoleKey: string;
}
