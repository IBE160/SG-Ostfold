
'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';

export default function CreateShiftReportStep5Page() {
  const [pallelagerHours, setPallelagerHours] = useState<number | ''>(0);
  const [transittHours, setTransittHours] = useState<number | ''>(0);
  const [heisHours, setHeisHours] = useState<number | ''>(0);
  const [hoytlagerHours, setHoytlagerHours] = useState<number | ''>(0);
  const [osrHours, setOsrHours] = useState<number | ''>(0);
  const [uteHours, setUteHours] = useState<number | ''>(0);
  const [rorhallHours, setRorhallHours] = useState<number | ''>(0);

  const parsedPallelager = typeof pallelagerHours === 'number' ? pallelagerHours : parseFloat(pallelagerHours as string) || 0;
  const parsedTransitt = typeof transittHours === 'number' ? transittHours : parseFloat(transittHours as string) || 0;
  const parsedHeis = typeof heisHours === 'number' ? heisHours : parseFloat(heisHours as string) || 0;
  const parsedHoytlager = typeof hoytlagerHours === 'number' ? hoytlagerHours : parseFloat(hoytlagerHours as string) || 0;
  const parsedOsr = typeof osrHours === 'number' ? osrHours : parseFloat(osrHours as string) || 0;
  const parsedUte = typeof uteHours === 'number' ? uteHours : parseFloat(uteHours as string) || 0;
  const parsedRorhall = typeof rorhallHours === 'number' ? rorhallHours : parseFloat(rorhallHours as string) || 0;

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
      {/* PageHeading */}
      <div className="mb-8">
        <p className="text-text-primary-dark text-4xl font-black leading-tight tracking-[-0.033em]">
          Hours Worked by Area
        </p>
        <p className="text-text-secondary-dark mt-2 text-base">
          Enter the total hours worked in each specific area for this shift.
        </p>
      </div>
      {/* Card Component */}
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
              value={pallelagerHours}
              onChange={(e) => setPallelagerHours(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </label>
          {/* TextField: Transitt Hours */}
          <label className="flex flex-col">
            <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
              Transitt Hours
            </p>
            <input
              id="transitt-hours"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
              placeholder="0"
              type="number"
              value={transittHours}
              onChange={(e) => setTransittHours(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </label>
          {/* TextField: Heis Hours */}
          <label className="flex flex-col">
            <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
              Heis Hours
            </p>
            <input
              id="heis-hours"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
              placeholder="0"
              type="number"
              value={heisHours}
              onChange={(e) => setHeisHours(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </label>
          {/* TextField: Høytlager Hours */}
          <label className="flex flex-col">
            <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
              Høytlager Hours
            </p>
            <input
              id="hoytlager-hours"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
              placeholder="0"
              type="number"
              value={hoytlagerHours}
              onChange={(e) => setHoytlagerHours(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </label>
          {/* TextField: OSR Hours */}
          <label className="flex flex-col">
            <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
              OSR Hours
            </p>
            <input
              id="osr-hours"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
              placeholder="0"
              type="number"
              value={osrHours}
              onChange={(e) => setOsrHours(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </label>
          {/* TextField: Ute Hours */}
          <label className="flex flex-col">
            <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
              Ute Hours
            </p>
            <input
              id="ute-hours"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
              placeholder="0"
              type="number"
              value={uteHours}
              onChange={(e) => setUteHours(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </label>
          {/* TextField: Rørhall Hours */}
          <label className="flex flex-col">
            <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">
              Rørhall Hours
            </p>
            <input
              id="rorhall-hours"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
              placeholder="0"
              type="number"
              value={rorhallHours}
              onChange={(e) => setRorhallHours(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </label>
        </div>
        <div className="border-t border-border-dark/50 my-8"></div>
        {/* Dynamic Display Field */}
        <div className="flex justify-between items-center bg-background-dark p-4 rounded-lg">
          <p className="text-text-primary-dark text-lg font-medium">
            Total Hours Worked in Areas
          </p>
          <p id="total-hours-display" className="text-primary text-2xl font-bold tracking-tight">
            {totalHoursWorked}
          </p>
        </div>
      </div>
      {/* Action Buttons */}
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
