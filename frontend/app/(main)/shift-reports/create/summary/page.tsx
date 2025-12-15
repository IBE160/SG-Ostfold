'use client';

import Link from 'next/link';
import { useShiftReportStore } from '@/lib/stores/shiftReportStore';
import { useMemo } from 'react';

const getShiftDisplayName = (shiftId: string | null) => {
    switch (shiftId) {
        case 'morning': return 'Morning (06:00 - 14:00)';
        case 'evening': return 'Evening (14:00 - 22:00)';
        case 'night': return 'Night (22:00 - 06:00)';
        default: return 'Not Selected';
    }
}

export default function CreateShiftReportSummaryPage() {
  const draft = useShiftReportStore((state) => state.draft);
  const resetDraft = useShiftReportStore((state) => state.resetDraft);

  const handleSubmit = () => {
    // In a real application, this would send data to the backend.
    console.log('Submitting Report:', draft);
    resetDraft();
  };
  
  const areaPerformance = useMemo(() => {
    return [
      { area: 'Pallelager', orderlines: draft.orderlines.initialTotal, moves: draft.moves.pallelager, hours: draft.hours.pallelager },
      { area: 'Transitt', orderlines: draft.orderlines.transitt, moves: draft.moves.transitt, hours: draft.hours.transitt },
      { area: 'Heis', orderlines: draft.orderlines.heis, moves: draft.moves.heis, hours: draft.hours.heis },
      { area: 'Høytlager', orderlines: draft.orderlines.hoytlager, moves: draft.moves.hoytlager, hours: draft.hours.hoytlager },
      { area: 'Osr', orderlines: draft.orderlines.osr, moves: draft.moves.osr, hours: draft.hours.osr },
      { area: 'Rørhall', orderlines: draft.orderlines.rorhall, moves: draft.moves.rorhall, hours: draft.hours.rorhall },
      { area: 'Ute', orderlines: draft.orderlines.ute, moves: draft.moves.ute, hours: draft.hours.ute },
    ]
  }, [draft]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-full">
      <div className="flex flex-wrap justify-between gap-3 mb-8">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-text-primary-dark text-4xl font-black leading-tight tracking-[-0.033em]">
            Review and Submit Shift Report
          </p>
          <p className="text-text-secondary-dark text-base font-normal leading-normal">
            Please verify all information before submitting.
          </p>
        </div>
      </div>
      <div className="bg-content-dark rounded-xl p-6 md:p-8 space-y-8 border border-border-dark/50 flex-grow">
        {/* Report Criteria Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-text-primary-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">
              Report Criteria
            </h2>
            <Link className="flex items-center gap-2 text-primary text-sm font-medium hover:underline" href="/shift-reports/create">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
              Edit
            </Link>
          </div>
          <div className="p-4 grid grid-cols-[1fr_3fr] md:grid-cols-[20%_1fr] gap-x-6 bg-background-dark rounded-lg">
            <div className="col-span-2 grid grid-cols-subgrid py-3">
              <p className="text-text-secondary-dark text-sm font-normal leading-normal">Date</p>
              <p className="text-text-primary-dark text-sm font-normal leading-normal">
                {draft.reportCriteria.date ? draft.reportCriteria.date.toLocaleDateString() : 'Not set'}
              </p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-border-dark py-3">
              <p className="text-text-secondary-dark text-sm font-normal leading-normal">Shift</p>
              <p className="text-text-primary-dark text-sm font-normal leading-normal">
                {getShiftDisplayName(draft.reportCriteria.shift)}
              </p>
            </div>
          </div>
        </div>
        {/* Employee Staffing Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-text-primary-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">
              Employee Staffing
            </h2>
            <Link className="flex items-center gap-2 text-primary text-sm font-medium hover:underline" href="/shift-reports/create/step-2">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
              Edit
            </Link>
          </div>
          <div className="bg-background-dark rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-text-secondary-dark text-sm">Absent Employees</p>
              <p className="text-text-primary-dark text-sm font-medium">{draft.staffing.absentEmployees.length}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-text-secondary-dark text-sm">Hired Employees</p>
              <p className="text-text-primary-dark text-sm font-medium">{draft.staffing.hiredEmployees.length}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-text-secondary-dark text-sm">Hired Out Employees</p>
              <p className="text-text-primary-dark text-sm font-medium">{draft.staffing.hiredOutEmployees.length}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-text-secondary-dark text-sm">Overtime Employees</p>
              <p className="text-text-primary-dark text-sm font-medium">{draft.staffing.overtimeEmployees.length}</p>
            </div>
          </div>
        </div>
        {/* Area Performance Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-text-primary-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">
              Area Performance
            </h2>
            <Link className="flex items-center gap-2 text-primary text-sm font-medium hover:underline" href="/shift-reports/create/step-3">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
              Edit
            </Link>
          </div>
          <div className="bg-background-dark rounded-lg p-4">
            <div className="grid grid-cols-4 gap-4 text-sm text-text-secondary-dark mb-3 px-4">
              <span>Area</span>
              <span className="text-right">Orderlines</span>
              <span className="text-right">Moves</span>
              <span className="text-right">Hours</span>
            </div>
            <div className="space-y-2">
              {areaPerformance.map((data, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 text-sm text-text-primary-dark bg-content-dark p-4 rounded-md">
                  <span>{data.area}</span>
                  <span className="text-right">{Number(data.orderlines) || 0}</span>
                  <span className="text-right">{Number(data.moves) || 0}</span>
                  <span className="text-right">{Number(data.hours) || 0}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Sampakk & Issues Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-text-primary-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">
              Sampakk &amp; Issues
            </h2>
            <Link className="flex items-center gap-2 text-primary text-sm font-medium hover:underline" href="/shift-reports/create/step-7">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
              Edit
            </Link>
          </div>
          <div className="bg-background-dark rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              <p className="text-text-secondary-dark text-sm">Sampakk Scans</p>
              <p className="text-text-primary-dark text-sm">{Number(draft.issues.sampakkScans) || 0}</p>
              <p className="text-text-secondary-dark text-sm">Sampakk Hours Worked</p>
              <p className="text-text-primary-dark text-sm">{Number(draft.issues.sampakkHoursWorked) || 0}</p>
              <p className="text-text-secondary-dark text-sm col-span-1 md:col-span-2 mt-2">
                Significant Issues/Delays
              </p>
              <p className="text-text-primary-dark text-sm col-span-1 md:col-span-2 whitespace-pre-line">
                {draft.issues.significantIssues || 'None'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 pt-6">
        <Link
          className="flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold leading-6 text-text-primary-dark bg-content-dark border border-border-dark hover:bg-border-dark/80 transition-colors"
          href="/shift-reports/create/step-7"
        >
          Back
        </Link>
        <Link
          className="flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold leading-6 text-background-dark bg-primary hover:bg-primary/90 transition-colors"
          href="/shift-reports"
          onClick={handleSubmit}
        >
          Submit Final Report
        </Link>
      </div>
    </div>
  );
}