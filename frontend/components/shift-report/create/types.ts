import { z } from 'zod';

// Using Zod for eventual validation, but for now it just defines the shape.
export const ShiftReportSchema = z.object({
  // SR1: Shift Metadata
  shiftMeta: z.object({
    date: z.date().optional(),
    shiftType: z.enum(['day', 'evening', 'night']).optional(),
    department: z.string().optional(),
  }).optional(),

  // SR2: Staffing
  staffing: z.object({
    teamLeader: z.string().optional(),
    shiftWorkers: z.array(z.object({ id: z.string(), name: z.string(), present: z.boolean() })).optional(),
  }).optional(),

  // SR3: Workload
  workload: z.object({
    ordersHandled: z.number().optional(),
    linesPicked: z.number().optional(),
    inboundPallets: z.number().optional(),
    outboundPallets: z.number().optional(),
    otherNotes: z.string().optional(),
  }).optional(),

  // SR4: Deviations
  deviations: z.object({
    items: z.array(z.object({
      id: z.string(),
      type: z.enum(['quality', 'safety', 'equipment', 'process', 'other']).optional(),
      description: z.string().optional(),
      severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
    })).optional(),
  }).optional(),

  // SR5: HSE
  hse: z.object({
    incidents: z.boolean().default(false),
    nearMisses: z.boolean().default(false),
    unsafeConditions: z.boolean().default(false),
    details: z.string().optional(),
  }).optional(),

  // SR6: KPIs
  kpis: z.object({
    overtimeHours: z.number().optional(),
    absencePercentage: z.number().optional(),
    ordersPerHour: z.number().optional(),
    qualityErrors: z.number().optional(),
    comments: z.string().optional(),
  }).optional(),

  // SR7: Comments
  comments: z.object({
    shiftLeaderNotes: z.string().optional(),
    handoverNotes: z.string().optional(),
  }).optional(),
});

export type ShiftReportData = z.infer<typeof ShiftReportSchema>;