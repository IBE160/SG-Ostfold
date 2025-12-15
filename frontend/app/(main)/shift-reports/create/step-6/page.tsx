
'use client';

import Link from 'next/link';
import { useMemo } from 'react';

// Mock data for efficiency comparisons
const todayData = {
  pallelager: 15.2,
  transitt: 12.8,
  heis: 18.1,
  hoytlager: 20.5,
  osr: 25.0,
  ute: 9.7,
  rorhall: 11.3,
};

const yesterdayData = {
  pallelager: 14.5,
  transitt: 13.0,
  heis: 18.1,
  hoytlager: 21.0,
  osr: 24.5,
  ute: 9.0,
  rorhall: 12.0,
};

const threeWeeksAgoData = {
  pallelager: 15.8,
  transitt: 12.5,
  heis: 17.5,
  hoytlager: 20.5,
  osr: 26.0,
  ute: 10.0,
  rorhall: 10.5,
};

type EfficiencyData = typeof todayData;

// Reusable function to determine trend icon and color
const getTrend = (todayValue: number, comparisonValue: number) => {
  if (todayValue > comparisonValue) {
    return { icon: 'arrow_upward', colorClass: 'text-green-500' };
  } else if (todayValue < comparisonValue) {
    return { icon: 'arrow_downward', colorClass: 'text-red-500' };
  } else {
    return { icon: 'horizontal_rule', colorClass: 'text-yellow-500' };
  }
};

export default function CreateShiftReportStep6Page() {
  const areas = useMemo(() => Object.keys(todayData) as Array<keyof EfficiencyData>, []);

  const totalEfficiency = useMemo(() => {
    const sum = areas.reduce((acc, area) => acc + todayData[area], 0);
    return (sum / areas.length).toFixed(1);
  }, [areas]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-baseline gap-3 mb-8">
        <h1 className="text-text-primary-dark text-3xl font-black leading-tight tracking-[-0.03em]">
          Area Efficiency Summary
        </h1>
      </div>
      {/* Card */}
      <div className="bg-content-dark rounded-xl flex-grow flex flex-col">
        <div className="p-6 sm:p-8 flex-grow">
          {/* Data List */}
          <div className="space-y-2">
            {/* Header */}
            <div className="flex justify-between gap-x-4 pb-2 border-b border-border-dark/50 text-xs text-text-secondary-dark uppercase tracking-wider">
              <p className="w-1/4">Area</p>
              <p className="w-1/4 text-right">Efficiency</p>
              <p className="w-1/4 text-right">vs Yesterday</p>
              <p className="w-1/4 text-right">vs 3 Weeks Ago</p>
            </div>
            {areas.map((area) => {
              const todayValue = todayData[area];
              const trendYesterday = getTrend(todayValue, yesterdayData[area]);
              const trendThreeWeeks = getTrend(todayValue, threeWeeksAgoData[area]);

              return (
                <div key={area} className="flex justify-between items-center gap-x-4 py-3">
                  <p className="w-1/4 text-text-secondary-dark text-sm font-normal leading-normal capitalize">{area}</p>
                  <p className={`w-1/4 text-sm font-medium leading-normal text-right ${area === 'osr' ? 'text-primary' : 'text-text-primary-dark'}`}>
                    {todayValue} units/hour
                  </p>
                  <span className={`w-1/4 text-right material-symbols-outlined ${trendYesterday.colorClass}`}>
                    {trendYesterday.icon}
                  </span>
                  <span className={`w-1/4 text-right material-symbols-outlined ${trendThreeWeeks.colorClass}`}>
                    {trendThreeWeeks.icon}
                  </span>
                </div>
              );
            })}
            {/* Total */}
            <div className="flex justify-between items-center gap-x-4 py-4 mt-4 border-t border-border-dark/50">
              <p className="text-text-primary-dark text-base font-bold leading-normal">
                Total/Overall Efficiency
              </p>
              <p id="total-efficiency" className="text-primary text-base font-bold leading-normal text-right">
                {totalEfficiency} units/hour
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-4 pt-6">
        <Link
          className="flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold leading-6 text-text-primary-dark bg-content-dark border border-border-dark hover:bg-border-dark/80 transition-colors"
          href="/shift-reports/create/step-5"
        >
          Back
        </Link>
        <Link
          className="flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold leading-6 text-background-dark bg-primary hover:bg-primary/90 transition-colors"
          href="/shift-reports/create/step-7"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
