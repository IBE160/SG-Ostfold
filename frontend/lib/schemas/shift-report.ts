import { z } from 'zod';

export const shiftReportSchema = z.object({
  // SR1: Shift Details
  shiftDate: z.string().min(1, 'Shift Date is required.'),
  shiftNumber: z.string().min(1, 'Shift Number is required.'),
  shiftSupervisor: z.string().min(1, 'Shift Supervisor is required.'),
  teamLead: z.string().optional(),

  // SR2: Team & Staffing
  totalStaffPresent: z.number().int().min(0, 'Must be a non-negative number.').optional(),
  absentStaff: z.number().int().min(0, 'Must be a non-negative number.').optional(),
  notesTeamStaffing: z.string().optional(),

  // SR3: Production Numbers
  unitsProduced: z.number().int().min(0, 'Must be a non-negative number.').optional(),
  productionTarget: z.number().int().min(0, 'Must be a non-negative number.').optional(),
  downtimeDuration: z.number().int().min(0, 'Must be a non-negative number.').optional(), // in minutes
  downtimeReason: z.string().optional(),

  // SR4: Quality Control
  qualityChecksPerformed: z.number().int().min(0, 'Must be a non-negative number.').optional(),
  defectsIdentified: z.number().int().min(0, 'Must be a non-negative number.').optional(),
  reworkRequired: z.string().optional(),

  // SR5: Major Issues (renamed for clarity)
  majorIssues: z.string().optional(),
  correctiveActions: z.string().optional(),

  // SR6: Safety Observations
  safetyIncidents: z.number().int().min(0, 'Must be a non-negative number.').optional(),
  nearMisses: z.number().int().min(0, 'Must be a non-negative number.').optional(),
  safetyObservations: z.string().optional(),

  // SR7: Maintenance Log
  maintenanceIssues: z.string().optional(),
  maintenanceActions: z.string().optional(),

  // SR8: Handover Notes
  handoverNotes: z.string().optional(),
  nextShiftSupervisor: z.string().optional(),
});

export type ShiftReportInput = z.infer<typeof shiftReportSchema>;
