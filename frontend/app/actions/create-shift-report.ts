"use server";

import { createClientAction } from "@/lib/supabase/server-actions";

export async function createShiftReport(values: z.infer<typeof formSchema>) {
    const supabase = await createClientAction();
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
