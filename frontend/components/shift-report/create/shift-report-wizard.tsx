'use client';

import { useState } from 'react';
import { ShiftReportData } from './types';
import { Stepper } from './stepper';
import { Button } from '@/components/ui/button';

// Step Components
import { Step1Meta } from './step-1-meta';
import { Step2Staffing } from './step-2-staffing';
import { Step3Workload } from './step-3-workload';
import { Step4Deviations } from './step-4-deviations';
import { Step5HSE } from './step-5-hse';
import { Step6KPIs } from './step-6-kpis';
import { Step7Comments } from './step-7-comments';
import { Step8Summary } from './step-8-summary';
import { Step9Confirmation } from './step-9-confirmation';

const steps = [
  { id: 1, name: 'Shift Meta' },
  { id: 2, name: 'Staffing' },
  { id: 3, name: 'Workload' },
  { id: 4, name: 'Deviations' },
  { id: 5, name: 'HSE' },
  { id: 6, name: 'KPIs' },
  { id: 7, name: 'Comments' },
  { id: 8, name: 'Summary' },
  { id: 9, name: 'Confirm' },
];

export default function ShiftReportWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<ShiftReportData>({
    // Initialize with empty structures to prevent issues with nested properties
    shiftMeta: {},
    staffing: { shiftWorkers: [] },
    workload: {},
    deviations: { items: [] },
    hse: { incidents: false, nearMisses: false, unsafeConditions: false },
    kpis: {},
    comments: {},
  });

  const updateData = (update: Partial<ShiftReportData>) => {
    setData((prev) => ({ ...prev, ...update }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // TODO: Implement the actual submission logic to Supabase
    console.log('Final Shift Report Data:', data);
    handleNext(); // Move to confirmation screen
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Meta data={data} updateData={updateData} />;
      case 2:
        return <Step2Staffing data={data} updateData={updateData} />;
      case 3:
        return <Step3Workload data={data} updateData={updateData} />;
      case 4:
        return <Step4Deviations data={data} updateData={updateData} />;
      case 5:
        return <Step5HSE data={data} updateData={updateData} />;
      case 6:
        return <Step6KPIs data={data} updateData={updateData} />;
      case 7:
        return <Step7Comments data={data} updateData={updateData} />;
      case 8:
        return <Step8Summary data={data} />;
      case 9:
        return <Step9Confirmation />;
      default:
        return <Step1Meta data={data} updateData={updateData} />;
    }
  };

  const isLastFormStep = currentStep === steps.length - 1;
  const isConfirmationStep = currentStep === steps.length;

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 md:p-8">
      <aside className="w-full lg:w-1/4 xl:w-1/5">
        <Stepper steps={steps} currentStep={currentStep} />
      </aside>
      <main className="flex-1">
        {renderStep()}

        {!isConfirmationStep && (
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
              Back
            </Button>

            {isLastFormStep ? (
              <Button onClick={handleSubmit}>
                Review & Submit Report
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}