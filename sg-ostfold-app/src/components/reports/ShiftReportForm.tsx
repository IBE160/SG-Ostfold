"use client";

import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast"; // Import useToast


// Define the Zod schema for the report form
const reportFormSchema = z.object({
  shift_date: z.string().min(1, "Shift Date is required."),
  shift: z.enum(["morning", "evening", "night"], {
    required_error: "Shift is required.",
  }),
  overtime_hours: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Overtime Hours cannot be negative.").max(24, "Overtime Hours cannot exceed 24.")
  ),
  sick_leave_percent: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Sick Leave Percent cannot be negative.").max(100, "Sick Leave Percent cannot exceed 100.")
  ),
  orders_per_hour: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Orders Per Hour cannot be negative.")
  ),
});


export function ShiftReportForm() {
  const [date, setDate] = useState<Date>();
  const [shift, setShift] = useState<string>("");
  const [overtimeHours, setOvertimeHours] = useState<string>("");
  const [sickLeavePercent, setSickLeavePercent] = useState<string>("");
  const [ordersPerHour, setOrdersPerHour] = useState<string>("");
  const [formErrors, setFormErrors] = useState<z.ZodIssue[] | null>(null);
  
  const { toast } = useToast(); // Initialize useToast

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors(null);

    const formData = {
      shift_date: date ? format(date, "yyyy-MM-dd") : "",
      shift,
      overtime_hours: overtimeHours,
      sick_leave_percent: sickLeavePercent,
      orders_per_hour: ordersPerHour,
    };

    const parsed = reportFormSchema.safeParse(formData);

    if (!parsed.success) {
      setFormErrors(parsed.error.issues);
      toast({
        title: "Validation Error",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }

    const reportData = parsed.data;

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.errors[0].message || 'Failed to submit report');
      }

      const result = await response.json();
      toast({
        title: "Success",
        description: result.message || "Report submitted successfully!",
        variant: "success",
      });
      console.log('Report Data:', reportData);
      // Clear form
      setDate(undefined);
      setShift("");
      setOvertimeHours("");
      setSickLeavePercent("");
      setOrdersPerHour("");

    } catch (err: any) {
      setFormErrors([{ message: err.message, path: ['form'] }]);
      toast({
        title: "Submission Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const getErrorMessage = (path: string) => {
    return formErrors?.find(err => err.path[0] === path)?.message;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      {formErrors && formErrors.find(err => err.path[0] === 'form') && (
        <p className="text-sm text-red-500">{getErrorMessage('form')}</p>
      )}

      {/* Shift Date */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="shiftDate">Shift Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {getErrorMessage('shift_date') && (
          <p className="text-sm text-red-500">{getErrorMessage('shift_date')}</p>
        )}
      </div>

      {/* Shift Select */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="shift">Shift</Label>
        <Select value={shift} onValueChange={setShift}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select a shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="morning">Morning</SelectItem>
            <SelectItem value="evening">Evening</SelectItem>
            <SelectItem value="night">Night</SelectItem>
          </SelectContent>
        </Select>
        {getErrorMessage('shift') && (
          <p className="text-sm text-red-500">{getErrorMessage('shift')}</p>
        )}
      </div>

      {/* Overtime Hours */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="overtimeHours">Overtime Hours</Label>
        <Input
          type="number"
          id="overtimeHours"
          placeholder="0-24"
          value={overtimeHours}
          onChange={(e) => setOvertimeHours(e.target.value)}
        />
        {getErrorMessage('overtime_hours') && (
          <p className="text-sm text-red-500">{getErrorMessage('overtime_hours')}</p>
        )}
      </div>

      {/* Sick Leave Percent */}
      <div className="grid w-full max_w-sm items-center gap-1.5">
        <Label htmlFor="sickLeavePercent">Sick Leave (%)</Label>
        <Input
          type="number"
          id="sickLeavePercent"
          placeholder="0-100"
          value={sickLeavePercent}
          onChange={(e) => setSickLeavePercent(e.target.value)}
        />
        {getErrorMessage('sick_leave_percent') && (
          <p className="text-sm text-red-500">{getErrorMessage('sick_leave_percent')}</p>
        )}
      </div>

      {/* Orders Per Hour */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="ordersPerHour">Orders Per Hour</Label>
        <Input
          type="number"
          id="ordersPerHour"
          placeholder="e.g., 150"
          value={ordersPerHour}
          onChange={(e) => setOrdersPerHour(e.target.value)}
        />
        {getErrorMessage('orders_per_hour') && (
          <p className="text-sm text-red-500">{getErrorMessage('orders_per_hour')}</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <Button type="submit">Submit Report</Button>
      </div>
    </form>
  );
}
