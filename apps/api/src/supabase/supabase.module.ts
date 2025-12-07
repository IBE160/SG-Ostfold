import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { supabaseConfig } from '../config/supabase.config';

@Module({})
export class SupabaseModule {
  static register(): DynamicModule {
    return {
      module: SupabaseModule,
      imports: [ConfigModule.forFeature(supabaseConfig)],
      providers: [
        {
          provide: 'SUPABASE_CLIENT',
          useFactory: (configService: ConfigService) => {
            const supabaseUrl = configService.get<string>('supabase.url');
            const supabaseServiceRoleKey = configService.get<string>('supabase.serviceRoleKey');

            if (!supabaseUrl || !supabaseServiceRoleKey) {
              throw new Error('Supabase URL or Service Role Key is not configured.');
            }

            // Using the service_role key for backend operations
            return createClient(supabaseUrl, supabaseServiceRoleKey, {
              auth: {
                persistSession: false, // Important for backend to avoid local storage persistence
              },
            });
          },
          inject: [ConfigService],
        },
        SupabaseService, // Provide the service that wraps the client
      ],
      exports: [SupabaseService], // Export the service for use in other modules
    };
  }
}
