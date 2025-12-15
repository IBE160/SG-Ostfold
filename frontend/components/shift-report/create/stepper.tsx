
'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  name: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-6">
        {steps.map((step, index) => {
          const stepIdx = index + 1;
          const isCompleted = currentStep > stepIdx;
          const isCurrent = currentStep === stepIdx;

          return (
            <li key={step.name} className="relative flex items-start">
              {!isCompleted && stepIdx !== steps.length && (
                <div
                  className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-700"
                  aria-hidden="true"
                />
              )}
              <div className="flex h-9 items-center" aria-hidden="true">
                <div
                  className={cn(
                    'relative flex h-8 w-8 items-center justify-center rounded-full',
                    isCompleted ? 'bg-indigo-600' : 'border-2 border-gray-600',
                    isCurrent ? 'border-indigo-500' : ''
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span
                      className={cn(
                        'h-2.5 w-2.5 rounded-full bg-transparent',
                        isCurrent ? 'bg-indigo-500' : 'bg-gray-700'
                      )}
                    />
                  )}
                </div>
              </div>
              <div className="ml-4 flex min-w-0 flex-col">
                <span className={cn(
                    'text-sm font-medium',
                     isCurrent ? 'text-indigo-400' : 'text-gray-400',
                     isCompleted ? 'text-white' : ''
                     )}>
                  {`SR${step.id}`}
                </span>
                <span className="text-sm text-gray-500">{step.name}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
