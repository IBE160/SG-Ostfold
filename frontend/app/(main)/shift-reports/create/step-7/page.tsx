
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CreateShiftReportStep7Page() {
  const [sampakkScans, setSampakkScans] = useState<number | ''>('');
  const [sampakkHoursWorked, setSampakkHoursWorked] = useState<number | ''>('');
  const [significantIssues, setSignificantIssues] = useState('');

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-baseline gap-3 mb-8">
        <h1 className="text-text-primary-dark text-3xl font-black leading-tight tracking-[-0.03em]">
          Sampakk &amp; Issues Summary
        </h1>
      </div>
      {/* Card Component */}
      <div className="bg-content-dark rounded-xl flex-grow flex flex-col">
        <div className="p-6 sm:p-8 flex-grow">
          <div className="flex w-full flex-col items-stretch justify-center gap-6">
            <h2 className="text-text-primary-dark text-xl font-bold leading-tight tracking-[-0.015em]">
              Sampakk &amp; Issues Summary
            </h2>
            {/* Form */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Sampakk Scans Input */}
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
                  Sampakk Scans
                </p>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                  placeholder="e.g., 500"
                  type="number"
                  value={sampakkScans}
                  onChange={(e) => setSampakkScans(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </label>
              {/* Sampakk Hours Worked Input */}
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
                  Sampakk Hours Worked
                </p>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                  placeholder="e.g., 80"
                  type="number"
                  value={sampakkHoursWorked}
                  onChange={(e) => setSampakkHoursWorked(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </label>
            </div>
            {/* Significant Issues or Delays Textarea */}
            <div className="col-span-1 md:col-span-2">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
                  Significant Issues or Delays
                </p>
                <textarea
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary min-h-36 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                  placeholder="Summarize any major incidents, delays, or challenges..."
                  value={significantIssues}
                  onChange={(e) => setSignificantIssues(e.target.value)}
                ></textarea>
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-4 pt-6">
        <Link
          className="flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold leading-6 text-text-primary-dark bg-content-dark border border-border-dark hover:bg-border-dark/80 transition-colors"
          href="/shift-reports/create/step-6"
        >
          Back
        </Link>
        <Link
          className="flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold leading-6 text-background-dark bg-primary hover:bg-primary/90 transition-colors"
          href="/shift-reports/create/summary"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
