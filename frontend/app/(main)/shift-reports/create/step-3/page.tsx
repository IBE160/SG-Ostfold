
'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';

export default function CreateShiftReportStep3Page() {
  const [initialTotalOrderlines, setInitialTotalOrderlines] = useState<number | ''>(0);
  const [transittOrderlines, setTransittOrderlines] = useState<number | ''>(0);
  const [heisOrderlines, setHeisOrderlines] = useState<number | ''>(0);
  const [hoytlagerOrderlines, setHoytlagerOrderlines] = useState<number | ''>(0);
  const [osrOrderlines, setOsrOrderlines] = useState<number | ''>(0);
  const [uteOrderlines, setUteOrderlines] = useState<number | ''>(0);
  const [rorhallOrderlines, setRorhallOrderlines] = useState<number | ''>(0);

  const parsedInitialTotal = typeof initialTotalOrderlines === 'number' ? initialTotalOrderlines : parseFloat(initialTotalOrderlines as string) || 0;
  const parsedTransitt = typeof transittOrderlines === 'number' ? transittOrderlines : parseFloat(transittOrderlines as string) || 0;
  const parsedHeis = typeof heisOrderlines === 'number' ? heisOrderlines : parseFloat(heisOrderlines as string) || 0;
  const parsedHoytlager = typeof hoytlagerOrderlines === 'number' ? hoytlagerOrderlines : parseFloat(hoytlagerOrderlines as string) || 0;
  const parsedOsr = typeof osrOrderlines === 'number' ? osrOrderlines : parseFloat(osrOrderlines as string) || 0;
  const parsedUte = typeof uteOrderlines === 'number' ? uteOrderlines : parseFloat(uteOrderlines as string) || 0;
  const parsedRorhall = typeof rorhallOrderlines === 'number' ? rorhallOrderlines : parseFloat(rorhallOrderlines as string) || 0;


  const specificOrderlineSum = useMemo(() => {
    return parsedTransitt + parsedHeis + parsedHoytlager + parsedOsr + parsedUte + parsedRorhall;
  }, [parsedTransitt, parsedHeis, parsedHoytlager, parsedOsr, parsedUte, parsedRorhall]);

  const pallelagerOrderlines = useMemo(() => {
    const calculated = parsedInitialTotal - specificOrderlineSum;
    return Math.max(0, calculated);
  }, [parsedInitialTotal, specificOrderlineSum]);

  const totalOrderlinesPicked = useMemo(() => {
    return specificOrderlineSum + pallelagerOrderlines;
  }, [specificOrderlineSum, pallelagerOrderlines]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Breadcrumbs & Page Heading */}
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Link href="/shift-reports" className="text-text-secondary-dark text-base font-medium leading-normal hover:text-text-primary-dark">Shift Reports</Link>
          <span className="text-text-secondary-dark text-base font-medium leading-normal">/</span>
          <Link href="/shift-reports/create" className="text-text-secondary-dark text-base font-medium leading-normal hover:text-text-primary-dark">Create New</Link>
          <span className="text-text-secondary-dark text-base font-medium leading-normal">/</span>
          <span className="text-text-primary-dark text-base font-medium leading-normal">Orderlines by Area</span>
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <p className="text-text-primary-dark text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">New Shift Report</p>
        </div>
      </header>
      {/* Form Card */}
      <div className="bg-content-dark rounded-xl p-6 md:p-8">
        <form>
          <div className="flex flex-col gap-8">
            {/* Section Header */}
            <h2 className="text-text-primary-dark text-[22px] font-bold leading-tight tracking-[-0.015em] border-b border-border-dark pb-4">Orderlines Picked by Area</h2>
            {/* New Total Orderlines Picked Input */}
            <label className="flex flex-col">
              <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">Total Orderlines Picked</p>
              <input
                id="initial-total-orderlines"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                min="0"
                placeholder="Enter total number of orderlines"
                type="number"
                autoFocus
                value={initialTotalOrderlines}
                onChange={(e) => setInitialTotalOrderlines(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </label>
            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
              <label className="flex flex-col">
                <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">Pallelager Orderlines</p>
                <input
                  id="pallelager-orderlines"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                  min="0"
                  placeholder="Calculated"
                  type="number"
                  value={pallelagerOrderlines}
                  readOnly
                />
              </label>
              <label className="flex flex-col">
                <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">Transitt Orderlines</p>
                <input
                  id="transitt-orderlines"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                  min="0"
                  placeholder="Enter number"
                  type="number"
                  value={transittOrderlines}
                  onChange={(e) => setTransittOrderlines(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col">
                <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">Heis Orderlines</p>
                <input
                  id="heis-orderlines"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                  min="0"
                  placeholder="Enter number"
                  type="number"
                  value={heisOrderlines}
                  onChange={(e) => setHeisOrderlines(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col">
                <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">Høytlager Orderlines</p>
                <input
                  id="hoytlager-orderlines"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                  min="0"
                  placeholder="Enter number"
                  type="number"
                  value={hoytlagerOrderlines}
                  onChange={(e) => setHoytlagerOrderlines(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col">
                <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">OSR Orderlines</p>
                <input
                  id="osr-orderlines"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                  min="0"
                  placeholder="Enter number"
                  type="number"
                  value={osrOrderlines}
                  onChange={(e) => setOsrOrderlines(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col">
                <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">Ute Orderlines</p>
                <input
                  id="ute-orderlines"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                  min="0"
                  placeholder="Enter number"
                  type="number"
                  value={uteOrderlines}
                  onChange={(e) => setUteOrderlines(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col">
                <p className="text-text-primary-dark text-base font-medium leading-normal pb-2">Rørhall Orderlines</p>
                <input
                  id="rorhall-orderlines"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-primary-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-dark bg-background-dark focus:border-primary h-14 placeholder:text-text-secondary-dark p-[15px] text-base font-normal leading-normal"
                  min="0"
                  placeholder="Enter number"
                  type="number"
                  value={rorhallOrderlines}
                  onChange={(e) => setRorhallOrderlines(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </label>
            </div>
            {/* Total Display */}
            <div className="flex justify-between items-center bg-background-dark p-4 rounded-lg">
              <p className="text-text-primary-dark text-lg font-bold leading-normal">Total Orderlines Picked</p>
              <span id="total-orderlines-display" className="text-primary text-2xl font-black">{totalOrderlinesPicked}</span>
            </div>
          </div>
        </form>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-4 pt-6">
        <Link
          className="flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold leading-6 text-text-primary-dark bg-content-dark border border-border-dark hover:bg-border-dark/80 transition-colors"
          href="/shift-reports/create/step-2"
        >
          Back
        </Link>
        <Link
          className="flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold leading-6 text-background-dark bg-primary hover:bg-primary/90 transition-colors"
          href="/shift-reports/create/step-4"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
