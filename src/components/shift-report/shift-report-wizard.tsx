'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { shiftReportSchema, ShiftReportInput } from '@/lib/schemas/shift-report';
import { createShiftReport } from '@/lib/actions/create-shift-report';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,A
  DialogClose,
} from '@/components/ui/dialog';

type ShiftReportData = ShiftReportInput;

const steps = [
  'Shift Details',
  'Team',
  'Production',
  'Quality',
  'Issues',
  'Safety',
  'Maintenance',
  'Handover',
  'Review',
  'Submission Complete',
];

// Mapping of step index to relevant form fields for validation
const stepFields: { [key: number]: (keyof ShiftReportInput)[] } = {
  0: ['shiftDate', 'shiftNumber', 'shiftSupervisor', 'teamLead'],
  1: ['totalStaffPresent', 'absentStaff', 'notesTeamStaffing'],
  2: ['unitsProduced', 'productionTarget', 'downtimeDuration', 'downtimeReason'],
  3: ['qualityChecksPerformed', 'defectsIdentified', 'reworkRequired'],
  4: ['majorIssues', 'correctiveActions'],
  5: ['safetyIncidents', 'nearMisses', 'safetyObservations'],
  6: ['maintenanceIssues', 'maintenanceActions'],
  7: ['handoverNotes', 'nextShiftSupervisor'],
  8: [], // Review step has no direct input fields
  9: [], // Submission Complete step has no direct input fields
};

export default function ShiftReportWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ShiftReportData>({});
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const validateStep = (stepIndex: number) => {
    if (stepIndex >= 8) { // No validation needed for Review and Submission Complete steps
      setErrors([]);
      return true;
    }

    const currentStepFields = stepFields[stepIndex];
    
    // Dynamically create a Zod schema for the current step's fields
    const stepSchema = z.object(
      currentStepFields.reduce((acc, field) => {
        // Use the original schema's shape for each field
        acc[field] = shiftReportSchema.shape[field];
        return acc;
      }, {} as { [K in keyof ShiftReportInput]: z.ZodTypeAny }) // Use ZodTypeAny for flexibility
    );

    // Filter formData to only include fields relevant to the current step
    const dataToValidate = currentStepFields.reduce((acc, field) => {
      acc[field] = formData[field];
      return acc;
    }, {} as Partial<ShiftReportInput>);

    const result = stepSchema.safeParse(dataToValidate);

    if (!result.success) {
      // Filter errors to only include those relevant to the current step
      const filteredErrors = result.error.issues.filter(issue =>
        currentStepFields.includes(issue.path[0] as keyof ShiftReportInput)
      );
      setErrors(filteredErrors);
      return false;
    }

    setErrors([]);
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }
  };
  const prevStep = () => {
    setErrors([]); // Clear errors when going back
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const goToStep = (stepIndex: number) => {
    // Allow going back to any previous step without re-validation from sidebar
    if (stepIndex < currentStep) {
      setErrors([]);
      setCurrentStep(stepIndex);
    }
    // Allow navigating to Review step (index 8) from any prior step if current step is valid
    else if (stepIndex === 8 && validateStep(currentStep)) {
        setCurrentStep(stepIndex);
    }
    // For navigating forward from the sidebar, only allow if the current step is valid
    // and it's the next immediate step
    else if (stepIndex === currentStep + 1 && validateStep(currentStep)) {
        setCurrentStep(stepIndex);
    }
  };

  // Helper to find an error message for a specific field
  const findErrorMessage = (fieldName: keyof ShiftReportInput) => {
    return errors.find(err => err.path[0] === fieldName)?.message;
  };

  const handleSubmit = async () => {
    // Validate all fields before final submission
    const result = shiftReportSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.issues);
      toast.error('Validation Error', {
        description: 'Please correct the errors before submitting.',
      });
      return;
    }

    // Clear errors if global validation passes
    setErrors([]);

    try {
      const submitResult = await createShiftReport(result.data); // Use validated data
      if (submitResult.success) {
        setCurrentStep(steps.length - 1); // Go to "Submission Complete" step
        toast.success('Submission Successful', {
            description: submitResult.message,
        });
      } else {
        toast.error('Submission Failed', {
            description: submitResult.message,
        });
      }
    } catch (error: any) {
      toast.error('An Unexpected Error Occurred', {
          description: error.message,
      });
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 0: // Step 1: Shift Details
        return (
          <form className="space-y-6">
            <div>
              <Label htmlFor="shiftDate" className="block text-sm font-medium text-text-primary-dark mb-2">Shift Date *</Label>
              <Input
                type="date"
                id="shiftDate"
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary"
                value={formData.shiftDate || ''}
                onChange={(e) => {
                  setFormData({ ...formData, shiftDate: e.target.value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'shiftDate'));
                }}
              />
              {findErrorMessage('shiftDate') && <p className="mt-2 text-sm text-error">{findErrorMessage('shiftDate')}</p>}
            </div>
            <div>
              <Label htmlFor="shiftNumber" className="block text-sm font-medium text-text-primary-dark mb-2">Shift Number *</Label>
              <Input
                type="text"
                id="shiftNumber"
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary"
                value={formData.shiftNumber || ''}
                onChange={(e) => {
                  setFormData({ ...formData, shiftNumber: e.target.value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'shiftNumber'));
                }}
              />
              {findErrorMessage('shiftNumber') && <p className="mt-2 text-sm text-error">{findErrorMessage('shiftNumber')}</p>}
            </div>
            <div>
              <Label htmlFor="shiftSupervisor" className="block text-sm font-medium text-text-primary-dark mb-2">Shift Supervisor *</Label>
              <Input
                type="text"
                id="shiftSupervisor"
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary"
                value={formData.shiftSupervisor || ''}
                onChange={(e) => {
                  setFormData({ ...formData, shiftSupervisor: e.target.value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'shiftSupervisor'));
                }}
              />
              {findErrorMessage('shiftSupervisor') && <p className="mt-2 text-sm text-error">{findErrorMessage('shiftSupervisor')}</p>}
            </div>
            <div>
              <Label htmlFor="teamLead" className="block text-sm font-medium text-text-primary-dark mb-2">Team Lead</Label>
              <Input
                type="text"
                id="teamLead"
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary"
                value={formData.teamLead || ''}
                onChange={(e) => {
                  setFormData({ ...formData, teamLead: e.target.value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'teamLead'));
                }}
              />
              {findErrorMessage('teamLead') && <p className="mt-2 text-sm text-error">{findErrorMessage('teamLead')}</p>}
            </div>
          </form>
        );
      case 1: // Step 2: Team & Staffing
        return (
          <form className="space-y-6">
            <div>
              <Label htmlFor="totalStaffPresent" className="block text-sm font-medium text-text-primary-dark mb-2">Total Staff Present</Label>
              <Input
                type="number"
                id="totalStaffPresent"
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary"
                value={formData.totalStaffPresent ?? ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFormData({ ...formData, totalStaffPresent: isNaN(value) ? undefined : value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'totalStaffPresent'));
                }}
              />
              {findErrorMessage('totalStaffPresent') && <p className="mt-2 text-sm text-error">{findErrorMessage('totalStaffPresent')}</p>}
            </div>
            <div>
              <Label htmlFor="absentStaff" className="block text-sm font-medium text-text-primary-dark mb-2">Absent Staff</Label>
              <Input
                type="number"
                id="absentStaff"
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary"
                value={formData.absentStaff ?? ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFormData({ ...formData, absentStaff: isNaN(value) ? undefined : value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'absentStaff'));
                }}
              />
              {findErrorMessage('absentStaff') && <p className="mt-2 text-sm text-error">{findErrorMessage('absentStaff')}</p>}
            </div>
            <div>
              <Label htmlFor="notesTeamStaffing" className="block text-sm font-medium text-text-primary-dark mb-2">Notes on Team & Staffing</Label>
              <textarea
                id="notesTeamStaffing"
                rows={4}
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary p-2"
                value={formData.notesTeamStaffing || ''}
                onChange={(e) => {
                  setFormData({ ...formData, notesTeamStaffing: e.target.value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'notesTeamStaffing'));
                }}
              />
              {findErrorMessage('notesTeamStaffing') && <p className="mt-2 text-sm text-error">{findErrorMessage('notesTeamStaffing')}</p>}
            </div>
          </form>
        );
      case 2: // Step 3: Production Numbers
        return (
          <form className="space-y-6">
            <div>
              <Label htmlFor="unitsProduced" className="block text-sm font-medium text-text-primary-dark mb-2">Units Produced</Label>
              <Input
                type="number"
                id="unitsProduced"
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary"
                value={formData.unitsProduced ?? ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFormData({ ...formData, unitsProduced: isNaN(value) ? undefined : value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'unitsProduced'));
                }}
              />
              {findErrorMessage('unitsProduced') && <p className="mt-2 text-sm text-error">{findErrorMessage('unitsProduced')}</p>}
            </div>
            <div>
              <Label htmlFor="productionTarget" className="block text-sm font-medium text-text-primary-dark mb-2">Production Target</Label>
              <Input
                type="number"
                id="productionTarget"
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary"
                value={formData.productionTarget ?? ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFormData({ ...formData, productionTarget: isNaN(value) ? undefined : value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'productionTarget'));
                }}
              />
              {findErrorMessage('productionTarget') && <p className="mt-2 text-sm text-error">{findErrorMessage('productionTarget')}</p>}
            </div>
            <div>
              <Label htmlFor="downtimeDuration" className="block text-sm font-medium text-text-primary-dark mb-2">Downtime Duration (minutes)</Label>
              <Input
                type="number"
                id="downtimeDuration"
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary"
                value={formData.downtimeDuration ?? ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFormData({ ...formData, downtimeDuration: isNaN(value) ? undefined : value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'downtimeDuration'));
                }}
              />
              {findErrorMessage('downtimeDuration') && <p className="mt-2 text-sm text-error">{findErrorMessage('downtimeDuration')}</p>}
            </div>
            <div>
              <Label htmlFor="downtimeReason" className="block text-sm font-medium text-text-primary-dark mb-2">Downtime Reason</Label>
              <textarea
                id="downtimeReason"
                rows={4}
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary p-2"
                value={formData.downtimeReason || ''}
                onChange={(e) => {
                  setFormData({ ...formData, downtimeReason: e.target.value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'downtimeReason'));
                }}
              />
              {findErrorMessage('downtimeReason') && <p className="mt-2 text-sm text-error">{findErrorMessage('downtimeReason')}</p>}
            </div>
          </form>
        );
      case 3: // Step 4: Quality Control
        return (
          <form className="space-y-6">
            <div>
              <Label htmlFor="qualityChecksPerformed" className="block text-sm font-medium text-text-primary-dark mb-2">Quality Checks Performed</Label>
              <Input
                type="number"
                id="qualityChecksPerformed"
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary"
                value={formData.qualityChecksPerformed ?? ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFormData({ ...formData, qualityChecksPerformed: isNaN(value) ? undefined : value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'qualityChecksPerformed'));
                }}
              />
              {findErrorMessage('qualityChecksPerformed') && <p className="mt-2 text-sm text-error">{findErrorMessage('qualityChecksPerformed')}</p>}
            </div>
            <div>
              <Label htmlFor="defectsIdentified" className="block text-sm font-medium text-text-primary-dark mb-2">Defects Identified</Label>
              <Input
                type="number"
                id="defectsIdentified"
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary"
                value={formData.defectsIdentified ?? ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFormData({ ...formData, defectsIdentified: isNaN(value) ? undefined : value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'defectsIdentified'));
                }}
              />
              {findErrorMessage('defectsIdentified') && <p className="mt-2 text-sm text-error">{findErrorMessage('defectsIdentified')}</p>}
            </div>
            <div>
              <Label htmlFor="reworkRequired" className="block text-sm font-medium text-text-primary-dark mb-2">Rework Required</Label>
              <textarea
                id="reworkRequired"
                rows={4}
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary p-2"
                value={formData.reworkRequired || ''}
                onChange={(e) => {
                  setFormData({ ...formData, reworkRequired: e.target.value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'reworkRequired'));
                }}
              />
              {findErrorMessage('reworkRequired') && <p className="mt-2 text-sm text-error">{findErrorMessage('reworkRequired')}</p>}
            </div>
          </form>
        );
      case 4: // Step 5: Major Issues
        return (
          <form className="space-y-6">
            <div>
              <Label htmlFor="majorIssues" className="block text-sm font-medium text-text-primary-dark mb-2">Major Issues/Incidents</Label>
              <textarea
                id="majorIssues"
                rows={4}
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary p-2"
                value={formData.majorIssues || ''}
                onChange={(e) => {
                  setFormData({ ...formData, majorIssues: e.target.value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'majorIssues'));
                }}
              />
              {findErrorMessage('majorIssues') && <p className="mt-2 text-sm text-error">{findErrorMessage('majorIssues')}</p>}
            </div>
            <div>
              <Label htmlFor="correctiveActions" className="block text-sm font-medium text-text-primary-dark mb-2">Corrective Actions Taken</Label>
              <textarea
                id="correctiveActions"
                rows={4}
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary p-2"
                value={formData.correctiveActions || ''}
                onChange={(e) => {
                  setFormData({ ...formData, correctiveActions: e.target.value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'correctiveActions'));
                }}
              />
              {findErrorMessage('correctiveActions') && <p className="mt-2 text-sm text-error">{findErrorMessage('correctiveActions')}</p>}
            </div>
          </form>
        );
      case 5: // Step 6: Safety Observations
        return (
          <form className="space-y-6">
            <div>
              <Label htmlFor="safetyIncidents" className="block text-sm font-medium text-text-primary-dark mb-2">Safety Incidents (count)</Label>
              <Input
                type="number"
                id="safetyIncidents"
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary"
                value={formData.safetyIncidents ?? ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFormData({ ...formData, safetyIncidents: isNaN(value) ? undefined : value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'safetyIncidents'));
                }}
              />
              {findErrorMessage('safetyIncidents') && <p className="mt-2 text-sm text-error">{findErrorMessage('safetyIncidents')}</p>}
            </div>
            <div>
              <Label htmlFor="nearMisses" className="block text-sm font-medium text-text-primary-dark mb-2">Near Misses (count)</Label>
              <Input
                type="number"
                id="nearMisses"
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary"
                value={formData.nearMisses ?? ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFormData({ ...formData, nearMisses: isNaN(value) ? undefined : value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'nearMisses'));
                }}
              />
              {findErrorMessage('nearMisses') && <p className="mt-2 text-sm text-error">{findErrorMessage('nearMisses')}</p>}
            </div>
            <div>
              <Label htmlFor="safetyObservations" className="block text-sm font-medium text-text-primary-dark mb-2">General Safety Observations</Label>
              <textarea
                id="safetyObservations"
                rows={4}
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary p-2"
                value={formData.safetyObservations || ''}
                onChange={(e) => {
                  setFormData({ ...formData, safetyObservations: e.target.value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'safetyObservations'));
                }}
              />
              {findErrorMessage('safetyObservations') && <p className="mt-2 text-sm text-error">{findErrorMessage('safetyObservations')}</p>}
            </div>
          </form>
        );
      case 6: // Step 7: Maintenance Log
        return (
          <form className="space-y-6">
            <div>
              <Label htmlFor="maintenanceIssues" className="block text-sm font-medium text-text-primary-dark mb-2">Maintenance Issues</Label>
              <textarea
                id="maintenanceIssues"
                rows={4}
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary p-2"
                value={formData.maintenanceIssues || ''}
                onChange={(e) => {
                  setFormData({ ...formData, maintenanceIssues: e.target.value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'maintenanceIssues'));
                }}
              />
              {findErrorMessage('maintenanceIssues') && <p className="mt-2 text-sm text-error">{findErrorMessage('maintenanceIssues')}</p>}
            </div>
            <div>
              <Label htmlFor="maintenanceActions" className="block text-sm font-medium text-text-primary-dark mb-2">Maintenance Actions Taken</Label>
              <textarea
                id="maintenanceActions"
                rows={4}
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary p-2"
                value={formData.maintenanceActions || ''}
                onChange={(e) => {
                  setFormData({ ...formData, maintenanceActions: e.target.value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'maintenanceActions'));
                }}
              />
              {findErrorMessage('maintenanceActions') && <p className="mt-2 text-sm text-error">{findErrorMessage('maintenanceActions')}</p>}
            </div>
          </form>
        );
      case 7: // Step 8: Handover Notes
        return (
          <form className="space-y-6">
            <div>
              <Label htmlFor="handoverNotes" className="block text-sm font-medium text-text-primary-dark mb-2">Handover Notes</Label>
              <textarea
                id="handoverNotes"
                rows={4}
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary p-2"
                value={formData.handoverNotes || ''}
                onChange={(e) => {
                  setFormData({ ...formData, handoverNotes: e.target.value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'handoverNotes'));
                }}
              />
              {findErrorMessage('handoverNotes') && <p className="mt-2 text-sm text-error">{findErrorMessage('handoverNotes')}</p>}
            </div>
            <div>
              <Label htmlFor="nextShiftSupervisor" className="block text-sm font-medium text-text-primary-dark mb-2">Next Shift Supervisor</Label>
              <Input
                type="text"
                id="nextShiftSupervisor"
                className="w-full bg-background-dark border-border-dark rounded-lg focus:ring-primary focus:border-primary"
                value={formData.nextShiftSupervisor || ''}
                onChange={(e) => {
                  setFormData({ ...formData, nextShiftSupervisor: e.target.value });
                  setErrors(prev => prev.filter(err => err.path[0] !== 'nextShiftSupervisor'));
                }}
              />
              {findErrorMessage('nextShiftSupervisor') && <p className="mt-2 text-sm text-error">{findErrorMessage('nextShiftSupervisor')}</p>}
            </div>
          </form>
        );
      case 8: // Step 9: Review
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Review Your Shift Report</h3>
            {Object.entries(formData).length > 0 ? (
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <dt className="text-sm font-medium text-text-secondary-dark">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</dt>
                    <dd className="mt-1 text-white">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-text-secondary-dark italic">No data entered yet.</p>
            )}
            <p className="mt-6 text-text-secondary-dark">Please review all information carefully before submitting.</p>
          </div>
        );
      case 9: // Step 10: Submission Complete
        return (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-success/20 text-success mx-auto flex items-center justify-center mb-6">
              <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>check_circle</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Shift Report Submitted!</h2>
            <p className="text-text-secondary-dark mb-8">Your report has been successfully submitted and is now available for managers to review.</p>
            <Button
              onClick={() => window.location.href = '/dashboard'} // Redirect to dashboard
              className="px-6 py-2 rounded-lg bg-primary text-background-dark font-bold hover:bg-primary/90 transition-colors"
            >
              Return to Dashboard
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full min-h-screen bg-background-dark text-white p-8 space-x-8">
      {/* Sidebar Stepper */}
      <aside className="w-1/4">
        <nav className="space-y-2">
          {steps.map((step, index) => (
            <button
              key={step}
              onClick={() => goToStep(index)}
              disabled={index >= currentStep && index !== currentStep -1} // Disable direct navigation to future steps, allow back and current. And go to Review from any step below it.
              className={`w-full text-left px-4 py-2 rounded-md ${
                currentStep === index
                  ? 'bg-primary text-background-dark' // Updated for better contrast
                  : 'hover:bg-content-dark-hover'
              } ${index >= currentStep && index !== currentStep -1 ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <span className="font-bold">{`SR${index + 1}:`}</span> {step}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-3/4">
        <Card className="bg-content-dark border-border-dark">
          <CardHeader>
            <CardTitle className="text-2xl text-white">{`SR${currentStep + 1}: ${steps[currentStep]}`}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderContent()}
            <div className="mt-8 flex justify-between">
              <Button onClick={prevStep} disabled={currentStep === 0 || currentStep === steps.length - 1}>
                Previous
              </Button>
              {currentStep < steps.length - 2 && ( // "Next" button for all steps except Review and Submission Complete
                <Button onClick={nextStep}>
                  Next
                </Button>
              )}
                            {currentStep === steps.length - 2 && ( // "Submit" button only for Review step
                              <Button onClick={() => setIsConfirmModalOpen(true)} className="bg-primary text-background-dark hover:bg-primary/90">
                                Submit Final Report
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </main>
              
                    <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
                      <DialogContent className="sm:max-w-md bg-content-dark border-border-dark text-white">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold mb-2">Confirm Submission</DialogTitle>
                          <DialogDescription className="text-text-secondary-dark mb-6">
                            Are you sure you want to submit this report? It cannot be edited after submission.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-end gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsConfirmModalOpen(false)}
                            className="px-6 py-2 rounded-lg border border-border-dark hover:bg-border-dark transition-colors"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              setIsConfirmModalOpen(false);
                              handleSubmit();
                            }}
                            className="px-6 py-2 rounded-lg bg-primary text-background-dark font-bold hover:bg-primary/90 transition-colors"
                          >
                            Confirm
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                );
              }
