"use server";

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import * as z from "zod";

const formSchema = z.object({
    sr1_production_count: z.coerce.number().int().nonnegative(),
    sr2_downtime_minutes: z.coerce.number().int().nonnegative(),
    sr3_overtime_hours: z.coerce.number().nonnegative(),
    sr4_incidents_count: z.coerce.number().int().nonnegative(),
    sr5_safety_notes: z.string().optional(),
    sr6_personnel_on_shift: z.string().min(1),
    sr7_materials_used: z.string().optional(),
    sr8_quality_checks: z.string().min(1),
    sr9_general_notes: z.string().optional(),
});

export async function createShiftReport(values: z.infer<typeof formSchema>) {
    const supabase = createServerActionClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, message: "Not authenticated." };
    }

    const validatedData = formSchema.safeParse(values);
    if (!validatedData.success) {
        return { success: false, message: "Invalid data." };
    }

    const { sr6_personnel_on_shift, sr7_materials_used, ...rest } = validatedData.data;

    const personnelArray = sr6_personnel_on_shift.split(',').map(name => name.trim());
    
    let materialsJson = null;
    if (sr7_materials_used) {
        try {
            materialsJson = JSON.parse(sr7_materials_used);
        } catch (error) {
            return { success: false, message: "Invalid JSON format for materials used." };
        }
    }

    const reportData = {
        ...rest,
        profile_id: user.id,
        sr6_personnel_on_shift: personnelArray,
        sr7_materials_used: materialsJson,
    };

    const { error } = await supabase.from('shift_reports').insert([reportData]);

    if (error) {
        return { success: false, message: error.message };
    }

    return { success: true };
}
