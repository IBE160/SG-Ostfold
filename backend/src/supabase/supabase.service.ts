import {
  Injectable,
  Inject,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import type {
  SupabaseClientWithTypes,
  Profile,
  User,
  Database,
} from '../types/supabase'; // Import custom types

type InsertProfile = Database['public']['Tables']['profiles']['Insert'];

@Injectable()
export class SupabaseService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private readonly supabaseClient: SupabaseClientWithTypes,
  ) {}

  /**
   * Provides direct access to the Supabase client instance.
   * Use with caution, especially with methods that bypass RLS (e.g., as a service role).
   */
  getClient(): SupabaseClientWithTypes {
    return this.supabaseClient;
  }

  // --- Example methods for common Supabase interactions (can be extended) ---

  /**
   * Fetches user profile data for a given user ID.
   * This method respects RLS if the client is not a service role.
   * @returns {Promise<Profile>} The user's profile.
   * @throws {InternalServerErrorException} If fetching the profile fails.
   */
  async getProfileById(userId: string): Promise<Profile> {
    const { data, error } = await (this.supabaseClient as any)
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new InternalServerErrorException(
        `Failed to fetch profile: ${error.message}`,
      );
    }
    return data as Profile;
  }

  /**
   * Creates a new user in Auth and inserts their profile.
   * This uses the service role client (`auth.admin.createUser`) for robust user creation
   * and ensures consistency between auth.users and public.profiles.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @param {string} fullName - The user's full name.
   * @param {'manager' | 'employee' | 'admin'} role - The user's role (default: 'employee').
   * @returns {Promise<{ user: User; profile: Profile }>} The created user and profile.
   * @throws {BadRequestException} If sign-up details are invalid.
   * @throws {ConflictException} If the email already exists.
   * @throws {InternalServerErrorException} For other sign-up or profile insertion failures.
   */
  async signUpUser(
    email: string,
    password: string,
    fullName: string,
    role: 'manager' | 'employee' | 'admin' = 'employee',
  ): Promise<{ user: User; profile: Profile }> {
    // Validate role for security - ensure only 'employee' can be assigned by this method
    if (role !== 'employee') {
      // In a real application, 'manager' or 'admin' roles should be assigned by an existing admin, not during self-signup.
      throw new BadRequestException(
        'Only the "employee" role can be assigned during self-signup.',
      );
    }

    // Attempt to create user with service role client. This skips email confirmation by default.
    const { data: authData, error: authError } =
      await this.supabaseClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Set to true to bypass email confirmation flow if desired
      });

    if (authError) {
      if (authError.message.includes('User already registered')) {
        throw new ConflictException('A user with this email already exists.');
      }
      throw new BadRequestException(
        `Auth sign-up failed: ${authError.message}`,
      );
    }

    if (!authData.user) {
      throw new InternalServerErrorException(
        'User data not returned after sign-up.',
      );
    }

    // Build profile payload according to InsertProfile type
    const newProfile: InsertProfile = {
      id: authData.user.id,
      full_name: fullName,
      role,
      // NB: ikke legg til "email" her med mindre profiles-tabellen faktisk har en email-kolonne
    };

    // Løsner typene rundt from/insert slik at TS ikke tror "never"
    const { data: profileData, error: profileError } = await (this
      .supabaseClient as any)
      .from('profiles')
      .insert(newProfile)
      .select()
      .single();

    if (profileError) {
      // IMPORTANT: If profile insertion fails, delete auth user to avoid orphans
      await this.supabaseClient.auth.admin.deleteUser(authData.user.id);
      throw new InternalServerErrorException(
        `Profile insertion failed: ${profileError.message}. User deleted from auth.`,
      );
    }

    return { user: authData.user as User, profile: profileData as Profile };
  }

  /**
   * Sign in a user with email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<any>} The session data.
   * @throws {BadRequestException} If sign-in fails.
   */
  async signInUser(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new BadRequestException(`Sign-in failed: ${error.message}`);
    }
    if (!data.session || !data.user) {
      throw new InternalServerErrorException(
        'Sign-in successful, but no session or user data returned.',
      );
    }
    return data;
  }

  /**
   * Fetches the current authenticated user's session.
   * @returns {Promise<any>} The current session.
   */
  async getSession(): Promise<any> {
    const {
      data: { session },
      error,
    } = await this.supabaseClient.auth.getSession();
    if (error) {
      throw new InternalServerErrorException(
        `Failed to get session: ${error.message}`,
      );
    }
    return session;
  }

  /**
   * Fetches the current authenticated user.
   * @returns {Promise<User>} The current user.
   */
  async getUser(): Promise<User> {
    const {
      data: { user },
      error,
    } = await this.supabaseClient.auth.getUser();
    if (error) {
      throw new InternalServerErrorException(
        `Failed to get user: ${error.message}`,
      );
    }
    if (!user) {
      throw new BadRequestException('No authenticated user found.');
    }
    return user as User;
  }
}
