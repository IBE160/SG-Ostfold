"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createShiftReport } from "@/app/actions/create-shift-report";

const formSchema = z.object({
  sr1_production_count: z.coerce.number().int().nonnegative(),
  sr2_downtime_minutes: z.coerce.number().int().nonnegative(),
  sr3_overtime_hours: z.coerce.number().nonnegative(),
  sr4_incidents_count: z.coerce.number().int().nonnegative(),
  sr5_safety_notes: z.string().optional(),
  sr6_personnel_on_shift: z.string().min(1, "At least one person is required"),
  sr7_materials_used: z.string().optional(),
  sr8_quality_checks: z.string().min(1, "Quality checks are required"),
  sr9_general_notes: z.string().optional(),
});

export function CreateShiftReportForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sr1_production_count: 0,
      sr2_downtime_minutes: 0,
      sr3_overtime_hours: 0,
      sr4_incidents_count: 0,
      sr5_safety_notes: "",
      sr6_personnel_on_shift: "",
      sr7_materials_used: "",
      sr8_quality_checks: "",
      sr9_general_notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createShiftReport(values);
    if (result.success) {
      toast({
        title: "Success",
        description: "Shift report submitted successfully.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message || "Failed to submit shift report.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="sr1_production_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SR1: Production Count</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sr2_downtime_minutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SR2: Downtime (minutes)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sr3_overtime_hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SR3: Overtime (hours)</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sr4_incidents_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SR4: Incidents Count</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sr5_safety_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SR5: Safety Notes</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sr6_personnel_on_shift"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SR6: Personnel on Shift (comma-separated)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sr7_materials_used"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SR7: Materials Used (JSON format)</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sr8_quality_checks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SR8: Quality Checks</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sr9_general_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SR9: General Notes</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit Report"}
        </Button>
      </form>
    </Form>
  );
}
