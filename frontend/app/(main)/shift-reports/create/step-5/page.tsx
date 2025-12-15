'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useShiftReportStore } from '@/lib/stores/shiftReportStore';

export default function CreateShiftReportStep5Page() {
  const hours = useShiftReportStore((state) => state.draft.hours);
  const setHours = useShiftReportStore((state) => state.setHours);

  const handleInputChange = (field: keyof typeof hours, value: string) => {
    setHours({ [field]: value === '' ? '' : Number(value) });
  };

  const parsedPallelager = typeof hours.pallelager === 'number' ? hours.pallelager : parseFloat(hours.pallelager as string) || 0;
  const parsedTransitt = typeof hours.transitt === 'number' ? hours.transitt : parseFloat(hours.transitt as string) || 0;
  const parsedHeis = typeof hours.heis === 'number' ? hours.heis : parseFloat(hours.heis as string) || 0;
  const parsedHoytlager = typeof hours.hoytlager === 'number' ? hours.hoytlager : parseFloat(hours.hoytlager as string) || 0;
  const parsedOsr = typeof hours.osr === 'number' ? hours.osr : parseFloat(hours.osr as string) || 0;
  const parsedUte = typeof hours.ute === 'number' ? hours.ute : parseFloat(hours.ute as string) || 0;
  const parsedRorhall = typeof hours.rorhall === 'number' ? hours.rorhall : parseFloat(hours.rorhall as string) || 0;

  const totalHoursWorked = useMemo(() => {
    return (
      parsedPallelager +
      parsedTransitt +
      parsedHeis +
      parsedHoytlager +
      parsedOsr +
      parsedUte +
      parsedRorhall
    ).toFixed(2);
  }, [
    parsedPallelager,
    parsedTransitt,
    parsedHeis,
    parsedHoytlager,
    parsedOsr,
    parsedUte,
    parsedRorhall,
  ]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <p className="text-text-primary-dark text-4xl font-black leading-tight tracking-[-0.033em]">
          Hours Worked by Area
        </p>
        <p className="text-text-secondary-dark mt-2 text-base">
          Enter the total hours worked in each specific area for this shift.
        </p>
      </div>
      <div className="bg-content-dark/50 border border-border-dark/50 rounded-xl p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <label className="flex flex-col">
            <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
              Pallelager Hours
            </p>
            <input
              id="pallelager-hours"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
              placeholder="0"
              type="number"
              value={hours.pallelager}
              onChange={(e) => handleInputChange('pallelager', e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
              Transitt Hours
            </p>
            <input
              id="transitt-hours"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
              placeholder="0"
              type="number"
              value={hours.transitt}
              onChange={(e) => handleInputChange('transitt', e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
              Heis Hours
            </p>
            <input
              id="heis-hours"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
              placeholder="0"
              type="number"
              value={hours.heis}
              onChange={(e) => handleInputChange('heis', e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
              Høytlager Hours
            </p>
            <input
              id="hoytlager-hours"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
              placeholder="0"
              type="number"
              value={hours.hoytlager}
              onChange={(e) => handleInputChange('hoytlager', e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
              OSR Hours
            </p>
            <input
              id="osr-hours"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
              placeholder="0"
              type="number"
              value={hours.osr}
              onChange={(e) => handleInputChange('osr', e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
              Ute Hours
            </p>
            <input
              id="ute-hours"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
              placeholder="0"
              type="number"
              value={hours.ute}
              onChange={(e) => handleInputChange('ute', e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
              Rørhall Hours
            </p>
            <input
              id="rorhall-hours"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
              placeholder="0"
              type="number"
              value={hours.rorhall}
              onChange={(e) => handleInputChange('rorhall', e.target.value)}
            />
          </label>
        </div>
        <div className="border-t border-border-dark/50 my-8"></div>
        <div className="flex justify-between items-center bg-background-dark p-4 rounded-lg">
          <p className="text-text-primary-dark text-lg font-medium">
            Total Hours Worked in Areas
          </p>
          <p id="total-hours-display" className="text-primary text-2xl font-bold tracking-tight">
            {totalHoursWorked}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 pt-6">
        <Link
          className="flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold leading-6 text-text-primary-dark bg-content-dark border border-border-dark hover:bg-border-dark/80 transition-colors"
          href="/shift-reports/create/step-4"
        >
          Back
        </Link>
        <Link
          className="flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold leading-6 text-background-dark bg-primary hover:bg-primary/90 transition-colors"
          href="/shift-reports/create/step-6"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}