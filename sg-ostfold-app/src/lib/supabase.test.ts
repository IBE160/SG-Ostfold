import { supabase } from './supabase';

describe('Supabase Client Initialization Test', () => {
  // Store original environment variables
  const originalSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const originalSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  beforeAll(() => {
    // Temporarily set dummy environment variables for the test
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:8000';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'dummy_key';
  });

  afterAll(() => {
    // Restore original environment variables
    process.env.NEXT_PUBLIC_SUPABASE_URL = originalSupabaseUrl;
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = originalSupabaseAnonKey;
  });

  it('should initialize the Supabase client correctly with environment variables', () => {
    // Re-import supabase after setting environment variables to ensure it picks them up
    // This is a workaround for how Jest caches modules. In a real application,
    // the environment variables would be set before the app starts.
    const { supabase: testSupabase } = require('./supabase');
    expect(testSupabase).toBeDefined();
    // Further assertions could be added here if the supabase object exposed more
    // of its internal configuration for verification (e.g., URL it was initialized with).
  });

  // NOTE: A true integration test would involve making actual calls to the Supabase database.
  // This requires proper setup of a test database and environment variables
  // for the test runner to point to that live instance.
  // The current test primarily verifies that the client can be initialized
  // without crashing due to missing environment variables during the test run.
});
