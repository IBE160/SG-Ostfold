'use client';

import Link from 'next/link';

// Mock Data for Summary
const mockReportCriteria = {
  date: '2023-10-27',
  shift: 'Evening (14:00 - 22:00)',
};

const mockEmployeeStaffing = {
  absent: 4,
  hired: 2,
  hiredOut: 1,
  overtime: 8,
};

const mockAreaPerformance = [
  { area: 'Pallelager', orderlines: 1500, moves: 600, hours: 25.0 },
  { area: 'Transitt', orderlines: 800, moves: 300, hours: 12.0 },
  { area: 'Heis', orderlines: 600, moves: 250, hours: 10.0 },
  { area: 'Høytlager', orderlines: 1200, moves: 500, hours: 22.0 },
  { area: 'Osr', orderlines: 900, moves: 350, hours: 15.0 },
  { area: 'Rørhall', orderlines: 700, moves: 280, hours: 11.0 },
  { area: 'Ute', orderlines: 400, moves: 150, hours: 8.0 },
];

const mockSampakkIssues = {
  sampakkScans: '4,512',
  sampakkHoursWorked: '8.0',
  significantIssues: '- Conveyor belt malfunction in B-Block from 09:15 to 09:45.\n- System outage for 10 minutes at 11:00.',
};

export default function CreateShiftReportSummaryPage() {
  const handleSubmit = () => {
    // In a real application, this would send data to the backend.
    // For now, it just navigates back to the main shift reports list.
    console.log('Submitting Report...');
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-full">
      {/* PageHeading */}
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
      {/* Main Review Card */}
      <div className="bg-content-dark rounded-xl p-6 md:p-8 space-y-8 border border-border-dark/50 flex-grow">
        {/* Report Criteria Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-text-primary-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">
              Report Criteria
            </h2>
            <Link
              className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"
              href="/shift-reports/create"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                edit
              </span>
              Edit
            </Link>
          </div>
          <div className="p-4 grid grid-cols-[1fr_3fr] md:grid-cols-[20%_1fr] gap-x-6 bg-background-dark rounded-lg">
            <div className="col-span-2 grid grid-cols-subgrid py-3">
              <p className="text-text-secondary-dark text-sm font-normal leading-normal">Date</p>
              <p className="text-text-primary-dark text-sm font-normal leading-normal">
                {mockReportCriteria.date}
              </p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-border-dark py-3">
              <p className="text-text-secondary-dark text-sm font-normal leading-normal">Shift</p>
              <p className="text-text-primary-dark text-sm font-normal leading-normal">
                {mockReportCriteria.shift}
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
            <Link
              className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"
              href="/shift-reports/create/step-2"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                edit
              </span>
              Edit
            </Link>
          </div>
          <div className="bg-background-dark rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-text-secondary-dark text-sm">Absent Employees</p>
              <p className="text-text-primary-dark text-sm font-medium">
                {mockEmployeeStaffing.absent}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-text-secondary-dark text-sm">Hired Employees</p>
              <p className="text-text-primary-dark text-sm font-medium">
                {mockEmployeeStaffing.hired}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-text-secondary-dark text-sm">Hired Out Employees</p>
              <p className="text-text-primary-dark text-sm font-medium">
                {mockEmployeeStaffing.hiredOut}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-text-secondary-dark text-sm">Overtime Employees</p>
              <p className="text-text-primary-dark text-sm font-medium">
                {mockEmployeeStaffing.overtime}
              </p>
            </div>
          </div>
        </div>
        {/* Area Performance Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-text-primary-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">
              Area Performance
            </h2>
            <Link
              className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"
              href="/shift-reports/create/step-3"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                edit
              </span>
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
              {mockAreaPerformance.map((data, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 text-sm text-text-primary-dark bg-content-dark p-4 rounded-md">
                  <span>{data.area}</span>
                  <span className="text-right">{data.orderlines}</span>
                  <span className="text-right">{data.moves}</span>
                  <span className="text-right">{data.hours}</span>
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
            <Link
              className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"
              href="/shift-reports/create/step-7"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                edit
              </span>
              Edit
            </Link>
          </div>
          <div className="bg-background-dark rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              <p className="text-text-secondary-dark text-sm">Sampakk Scans</p>
              <p className="text-text-primary-dark text-sm">
                {mockSampakkIssues.sampakkScans}
              </p>
              <p className="text-text-secondary-dark text-sm">Sampakk Hours Worked</p>
              <p className="text-text-primary-dark text-sm">
                {mockSampakkIssues.sampakkHoursWorked}
              </p>
              <p className="text-text-secondary-dark text-sm col-span-1 md:col-span-2 mt-2">
                Significant Issues/Delays
              </p>
              <p className="text-text-primary-dark text-sm col-span-1 md:col-span-2 whitespace-pre-line">
                {mockSampakkIssues.significantIssues}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-4 pt-6">
        <Link
          className="flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold leading-6 text-text-primary-dark bg-content-dark border border-border-dark hover:bg-border-dark/80 transition-colors"
          href="/shift-reports/create/step-7"
        >
          Back
        </Link>
        <Link
          className="flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold leading-6 text-background-dark bg-primary hover:bg-primary/90 transition-colors"
          href="/shift-reports" // Submit leads to the main reports list
          onClick={handleSubmit}
        >
          Submit Final Report
        </Link>
      </div>
    </div>
  );
}
