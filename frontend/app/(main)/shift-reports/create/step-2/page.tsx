'use client';

import { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { useShiftReportStore, AbsentEmployee, HiredEmployee, HiredOutEmployee, OvertimeEmployee } from '@/lib/stores/shiftReportStore';

// Mock Data for "Copy from Yesterday" - now generates new IDs on each call
const getPreviousDayData = () => ({
  absent: [
    { id: uuidv4(), name: 'Jane Doe', code: 'SICK', hours: 8 },
    { id: uuidv4(), name: 'John Smith', code: 'PTO', hours: 8 },
  ],
  hired: [
    { id: uuidv4(), name: 'Mike Johnson', shiftFrom: 'Morning (06:00-14:00)', hours: 4 },
    { id: uuidv4(), name: 'Sarah Miller', shiftFrom: 'Morning (06:00-14:00)', hours: 8 },
  ],
  hiredOut: [
    { id: uuidv4(), name: 'Emily White', shiftTo: 'Night (22:00-06:00)', hours: 4 },
  ],
  overtime: [
    { id: uuidv4(), name: 'Chris Green', hours: 2 },
    { id: uuidv4(), name: 'David Brown', hours: 3 },
  ],
});


export default function CreateShiftReportStep2Page() {
  const reportCriteria = useShiftReportStore((state) => state.draft.reportCriteria);
  const staffing = useShiftReportStore((state) => state.draft.staffing);
  const setReportCriteria = useShiftReportStore((state) => state.setReportCriteria);
  const addStaffingRow = useShiftReportStore((state) => state.addStaffingRow);
  const removeStaffingRow = useShiftReportStore((state) => state.removeStaffingRow);
  const updateStaffingRow = useShiftReportStore((state) => state.updateStaffingRow);
  const setStaffingField = useShiftReportStore((state) => state.setStaffingField);



  const handleCopyFromYesterday = useCallback((listName: keyof typeof staffing, data: any[]) => {
    setStaffingField(listName, data.map(item => ({ id: uuidv4(), ...item }))); // Ensure new IDs
  }, [setStaffingField]);

  // --- Totals Calculation ---
  const totalAbsentHours = useMemo(() =>
    staffing.absentEmployees.reduce((sum, emp) => sum + (Number(emp.hours) || 0), 0), [staffing.absentEmployees]
  );
  const totalHiredHours = useMemo(() =>
    staffing.hiredEmployees.reduce((sum, emp) => sum + (Number(emp.hours) || 0), 0), [staffing.hiredEmployees]
  );
  const totalHiredOutHours = useMemo(() =>
    staffing.hiredOutEmployees.reduce((sum, emp) => sum + (Number(emp.hours) || 0), 0), [staffing.hiredOutEmployees]
  );
  const totalOvertimeHours = useMemo(() =>
    staffing.overtimeEmployees.reduce((sum, emp) => sum + (Number(emp.hours) || 0), 0), [staffing.overtimeEmployees]
  );

  const previousDay = getPreviousDayData();

  return (
    <main className="flex-1 p-8 overflow-y-auto transition-all duration-300">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-primary-dark">New Shift Report</h2>
          <Link
            href="/shift-reports"
            className="px-4 py-2 text-sm font-medium rounded-md border border-border-light dark:border-border-dark text-text-primary-dark bg-content-light dark:bg-content-dark hover:bg-background-light dark:hover:bg-background-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-dark transition-all"
            type="button"
          >
            Cancel
          </Link>
        </header>
        <form className="space-y-6">
          {/* Shift Summary */}
          <div className="bg-content-light dark:bg-content-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
            <h3 className="text-xl font-semibold text-text-primary-dark mb-4">Shift Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary-dark mb-1.5" htmlFor="date-summary">Date *</label>
                <input
                  className="block w-full rounded-md border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark placeholder:text-text-secondary-dark focus:border-primary focus:ring-primary text-sm"
                  id="date-summary"
                  name="date"
                  type="date"
                  value={reportCriteria.date ? reportCriteria.date.toISOString().split('T')[0] : ''}
                  onChange={(e) => setReportCriteria({ date: new Date(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary-dark mb-1.5" htmlFor="shift-summary">Shift *</label>
                <select
                  className="block w-full rounded-md border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary focus:ring-primary text-sm"
                  id="shift-summary"
                  name="shift"
                  value={reportCriteria.shift || ''}
                  onChange={(e) => setReportCriteria({ shift: e.target.value })}
                >
                  <option value="morning">Morning (06:00-14:00)</option>
                  <option value="evening">Evening (14:00-22:00)</option>
                  <option value="night">Night (22:00-06:00)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-background-light dark:bg-background-dark p-4 rounded-md border border-border-light dark:border-border-dark">
                <p className="text-sm font-medium text-text-secondary-dark">Absent Hours</p>
                <p id="summary-absent-hours" className="text-xl font-bold text-text-primary-dark">{totalAbsentHours}</p>
              </div>
              <div className="bg-background-light dark:bg-background-dark p-4 rounded-md border border-border-light dark:border-border-dark">
                <p className="text-sm font-medium text-text-secondary-dark">Hired Hours</p>
                <p id="summary-hired-hours" className="text-xl font-bold text-text-primary-dark">{totalHiredHours}</p>
              </div>
              <div className="bg-background-light dark:bg-background-dark p-4 rounded-md border border-border-light dark:border-border-dark">
                <p className="text-sm font-medium text-text-secondary-dark">Hired Out Hours</p>
                <p id="summary-hired-out-hours" className="text-xl font-bold text-text-primary-dark">{totalHiredOutHours}</p>
              </div>
              <div className="bg-background-light dark:bg-background-dark p-4 rounded-md border border-border-light dark:border-border-dark">
                <p className="text-sm font-medium text-text-secondary-dark">Overtime Hours</p>
                <p id="summary-overtime-hours" className="text-xl font-bold text-text-primary-dark">{totalOvertimeHours}</p>
              </div>
            </div>
          </div>

          {/* Absent Employees */}
          <div className="bg-content-light dark:bg-content-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
            <h3 className="text-xl font-semibold text-text-primary-dark mb-4">Absent Employees</h3>
            <div className="rounded-md border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark">
              <div className="flow-root">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-border-light dark:divide-border-dark">
                      <thead>
                        <tr>
                          <th className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-text-secondary-dark uppercase tracking-wider sm:pl-0" scope="col">Full Name</th>
                          <th className="px-3 py-3.5 text-left text-xs font-semibold text-text-secondary-dark uppercase tracking-wider" scope="col">Absent Code</th>
                          <th className="px-3 py-3.5 text-left text-xs font-semibold text-text-secondary-dark uppercase tracking-wider" scope="col">Hours Absent</th>
                          <th className="relative py-3.5 pl-3 pr-4 sm:pr-0" scope="col"><span className="sr-only">Remove</span></th>
                        </tr>
                      </thead>
                      <tbody id="absent-employees-tbody" className="divide-y divide-border-light dark:divide-border-dark">
                        {staffing.absentEmployees.map((emp) => (
                          <tr key={emp.id}>
                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium sm:pl-0">
                              <input
                                type="text"
                                name="name"
                                value={emp.name}
                                onChange={(e) => updateStaffingRow('absentEmployees', emp.id, 'name', e.target.value)}
                                className="w-full bg-transparent border-0 focus:ring-0 text-text-primary-dark"
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm">
                              <input
                                type="text"
                                name="code"
                                value={emp.code}
                                onChange={(e) => updateStaffingRow('absentEmployees', emp.id, 'code', e.target.value)}
                                className="w-full bg-transparent border-0 focus:ring-0 text-text-secondary-dark"
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm">
                              <input
                                type="number"
                                name="hours"
                                value={emp.hours}
                                onChange={(e) => updateStaffingRow('absentEmployees', emp.id, 'hours', parseInt(e.target.value) || 0)}
                                className="w-20 bg-transparent border-0 focus:ring-0 text-text-secondary-dark"
                              />
                            </td>
                            <td className="whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm sm:pr-0">
                              <button type="button" className="text-error remove-btn font-bold" onClick={() => removeStaffingRow('absentEmployees', emp.id)}>×</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className="py-3 pl-4 pr-3 text-left text-sm font-semibold text-text-primary-dark sm:pl-0" colSpan={2}>Total Absent Hours</td>
                          <td id="total-absent-hours-cell" className="px-3 py-3 text-left text-sm font-semibold text-text-primary-dark">{totalAbsentHours}</td>
                          <td className="py-3 pl-3 pr-4 sm:pr-0"></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-x-4">
              <button
                id="add-absent-employee-btn"
                type="button"
                className="flex items-center justify-center gap-2 rounded-md border border-dashed border-border-dark px-4 py-2 text-sm font-medium text-text-secondary-dark hover:bg-background-dark hover:border-solid hover:text-text-primary-dark transition-all"
                onClick={() => addStaffingRow('absentEmployees', { name: '', code: '', hours: 0 })}
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add Employee
              </button>
              <button
                id="copy-yesterday-absent-btn"
                type="button"
                className="flex items-center justify-center gap-2 rounded-md border border-dashed border-border-dark px-4 py-2 text-sm font-medium text-text-secondary-dark hover:bg-background-dark hover:border-solid hover:text-text-primary-dark transition-all"
                onClick={() => handleCopyFromYesterday('absentEmployees', previousDay.absent)}
              >
                <span className="material-symbols-outlined text-base">content_copy</span>
                Copy from Yesterday
              </button>
            </div>
          </div>

          {/* Hired Employees */}
          <div className="bg-content-light dark:bg-content-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
            <h3 className="text-xl font-semibold text-text-primary-dark mb-4">Hired Employees</h3>
            <div className="rounded-md border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark">
              <div className="flow-root">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-border-light dark:divide-border-dark">
                      <thead>
                        <tr>
                          <th className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-text-secondary-dark uppercase tracking-wider sm:pl-0" scope="col">Full Name</th>
                          <th className="px-3 py-3.5 text-left text-xs font-semibold text-text-secondary-dark uppercase tracking-wider" scope="col">Shift Hired From</th>
                          <th className="px-3 py-3.5 text-left text-xs font-semibold text-text-secondary-dark uppercase tracking-wider" scope="col">Hours Worked</th>
                          <th className="relative py-3.5 pl-3 pr-4 sm:pr-0" scope="col"><span className="sr-only">Remove</span></th>
                        </tr>
                      </thead>
                      <tbody id="hired-employees-tbody" className="divide-y divide-border-light dark:divide-border-dark">
                        {staffing.hiredEmployees.map((emp) => (
                          <tr key={emp.id}>
                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium sm:pl-0">
                              <input
                                type="text"
                                name="full-name-hired"
                                value={emp.name}
                                onChange={(e) => updateStaffingRow('hiredEmployees', emp.id, 'name', e.target.value)}
                                className="w-full bg-transparent border-0 focus:ring-0 text-text-primary-dark"
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm">
                              <input
                                type="text"
                                name="shift-hired-from"
                                value={emp.shiftFrom}
                                onChange={(e) => updateStaffingRow('hiredEmployees', emp.id, 'shiftFrom', e.target.value)}
                                className="w-full bg-transparent border-0 focus:ring-0 text-text-secondary-dark"
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm">
                              <input
                                type="number"
                                name="hours-worked"
                                value={emp.hours}
                                onChange={(e) => updateStaffingRow('hiredEmployees', emp.id, 'hours', parseInt(e.target.value) || 0)}
                                className="w-20 bg-transparent border-0 focus:ring-0 text-text-secondary-dark"
                              />
                            </td>
                            <td className="whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm sm:pr-0">
                              <button type="button" className="text-error remove-btn font-bold" onClick={() => removeStaffingRow('hiredEmployees', emp.id)}>×</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className="py-3 pl-4 pr-3 text-left text-sm font-semibold text-text-primary-dark sm:pl-0" colSpan={2}>Total Hired Hours</td>
                          <td id="total-hired-hours-cell" className="px-3 py-3 text-left text-sm font-semibold text-text-primary-dark">{totalHiredHours}</td>
                          <td className="py-3 pl-3 pr-4 sm:pr-0"></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-x-4">
              <button
                id="add-hired-employee-btn"
                type="button"
                className="flex items-center justify-center gap-2 rounded-md border border-dashed border-border-dark px-4 py-2 text-sm font-medium text-text-secondary-dark hover:bg-background-dark hover:border-solid hover:text-text-primary-dark transition-all"
                onClick={() => addStaffingRow('hiredEmployees', { name: '', shiftFrom: '', hours: 0 })}
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add Employee
              </button>
              <button
                id="copy-yesterday-hired-btn"
                type="button"
                className="flex items-center justify-center gap-2 rounded-md border border-dashed border-border-dark px-4 py-2 text-sm font-medium text-text-secondary-dark hover:bg-background-dark hover:border-solid hover:text-text-primary-dark transition-all"
                onClick={() => handleCopyFromYesterday('hiredEmployees', previousDay.hired)}
              >
                <span className="material-symbols-outlined text-base">content_copy</span>
                Copy from Yesterday
              </button>
            </div>
          </div>

          {/* Hired Out Employees */}
          <div className="bg-content-light dark:bg-content-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
            <h3 className="text-xl font-semibold text-text-primary-dark mb-4">Hired Out Employees</h3>
            <div className="rounded-md border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark">
              <div className="flow-root">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-border-light dark:divide-border-dark">
                      <thead>
                        <tr>
                          <th className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-text-secondary-dark uppercase tracking-wider sm:pl-0" scope="col">Full Name</th>
                          <th className="px-3 py-3.5 text-left text-xs font-semibold text-text-secondary-dark uppercase tracking-wider" scope="col">Shift Hired To</th>
                          <th className="px-3 py-3.5 text-left text-xs font-semibold text-text-secondary-dark uppercase tracking-wider" scope="col">Hours Hired Out</th>
                          <th className="relative py-3.5 pl-3 pr-4 sm:pr-0" scope="col"><span className="sr-only">Remove</span></th>
                        </tr>
                      </thead>
                      <tbody id="hired-out-employees-tbody" className="divide-y divide-border-light dark:divide-border-dark">
                        {staffing.hiredOutEmployees.map((emp) => (
                          <tr key={emp.id}>
                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium sm:pl-0">
                              <input
                                type="text"
                                name="full-name-hired-out"
                                value={emp.name}
                                onChange={(e) => updateStaffingRow('hiredOutEmployees', emp.id, 'name', e.target.value)}
                                className="w-full bg-transparent border-0 focus:ring-0 text-text-primary-dark"
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm">
                              <input
                                type="text"
                                name="shift-hired-to"
                                value={emp.shiftTo}
                                onChange={(e) => updateStaffingRow('hiredOutEmployees', emp.id, 'shiftTo', e.target.value)}
                                className="w-full bg-transparent border-0 focus:ring-0 text-text-secondary-dark"
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm">
                              <input
                                type="number"
                                name="hours-hired-out"
                                value={emp.hours}
                                onChange={(e) => updateStaffingRow('hiredOutEmployees', emp.id, 'hours', parseInt(e.target.value) || 0)}
                                className="w-20 bg-transparent border-0 focus:ring-0 text-text-secondary-dark"
                              />
                            </td>
                            <td className="whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm sm:pr-0">
                              <button type="button" className="text-error remove-btn font-bold" onClick={() => removeStaffingRow('hiredOutEmployees', emp.id)}>×</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className="py-3 pl-4 pr-3 text-left text-sm font-semibold text-text-primary-dark sm:pl-0" colSpan={2}>Total Hours Hired Out</td>
                          <td id="total-hired-out-hours-cell" className="px-3 py-3 text-left text-sm font-semibold text-text-primary-dark">{totalHiredOutHours}</td>
                          <td className="py-3 pl-3 pr-4 sm:pr-0"></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-x-4">
              <button
                id="add-hired-out-employee-btn"
                type="button"
                className="flex items-center justify-center gap-2 rounded-md border border-dashed border-border-dark px-4 py-2 text-sm font-medium text-text-secondary-dark hover:bg-background-dark hover:border-solid hover:text-text-primary-dark transition-all"
                onClick={() => addStaffingRow('hiredOutEmployees', { name: '', shiftTo: '', hours: 0 })}
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add Employee
              </button>
              <button
                id="copy-yesterday-hired-out-btn"
                type="button"
                className="flex items-center justify-center gap-2 rounded-md border border-dashed border-border-dark px-4 py-2 text-sm font-medium text-text-secondary-dark hover:bg-background-dark hover:border-solid hover:text-text-primary-dark transition-all"
                onClick={() => handleCopyFromYesterday('hiredOutEmployees', previousDay.hiredOut)}
              >
                <span className="material-symbols-outlined text-base">content_copy</span>
                Copy from Yesterday
              </button>
            </div>
          </div>

          {/* Overtime Employees */}
          <div className="bg-content-light dark:bg-content-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
            <h3 className="text-xl font-semibold text-text-primary-dark mb-4">Overtime Employees</h3>
            <div className="rounded-md border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark">
              <div className="flow-root">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-border-light dark:divide-border-dark">
                      <thead>
                        <tr>
                          <th className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-text-secondary-dark uppercase tracking-wider sm:pl-0" scope="col">Full Name</th>
                          <th className="px-3 py-3.5 text-left text-xs font-semibold text-text-secondary-dark uppercase tracking-wider" scope="col">Hours Worked Overtime</th>
                          <th className="relative py-3.5 pl-3 pr-4 sm:pr-0" scope="col"><span className="sr-only">Remove</span></th>
                        </tr>
                      </thead>
                      <tbody id="overtime-employees-tbody" className="divide-y divide-border-light dark:divide-border-dark">
                        {staffing.overtimeEmployees.map((emp) => (
                          <tr key={emp.id}>
                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium sm:pl-0">
                              <input
                                type="text"
                                name="full-name-overtime"
                                value={emp.name}
                                onChange={(e) => updateStaffingRow('overtimeEmployees', emp.id, 'name', e.target.value)}
                                className="w-full bg-transparent border-0 focus:ring-0 text-text-primary-dark"
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-sm">
                              <input
                                type="number"
                                name="hours-overtime"
                                value={emp.hours}
                                onChange={(e) => updateStaffingRow('overtimeEmployees', emp.id, 'hours', parseInt(e.target.value) || 0)}
                                className="w-20 bg-transparent border-0 focus:ring-0 text-text-secondary-dark"
                              />
                            </td>
                            <td className="whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm sm:pr-0">
                              <button type="button" className="text-error remove-btn font-bold" onClick={() => removeStaffingRow('overtimeEmployees', emp.id)}>×</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className="py-3 pl-4 pr-3 text-left text-sm font-semibold text-text-primary-dark sm:pl-0" colSpan={2}>Total Overtime Hours</td>
                          <td id="total-overtime-hours-cell" className="px-3 py-3 text-left text-sm font-semibold text-text-primary-dark">{totalOvertimeHours}</td>
                          <td className="py-3 pl-3 pr-4 sm:pr-0"></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-x-4">
              <button
                id="add-overtime-employee-btn"
                type="button"
                className="flex items-center justify-center gap-2 rounded-md border border-dashed border-border-dark px-4 py-2 text-sm font-medium text-text-secondary-dark hover:bg-background-dark hover:border-solid hover:text-text-primary-dark transition-all"
                onClick={() => addStaffingRow('overtimeEmployees', { name: '', hours: 0 })}
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add Employee
              </button>
              <button
                id="copy-yesterday-overtime-btn"
                type="button"
                className="flex items-center justify-center gap-2 rounded-md border border-dashed border-border-dark px-4 py-2 text-sm font-medium text-text-secondary-dark hover:bg-background-dark hover:border-solid hover:text-text-primary-dark transition-all"
                onClick={() => handleCopyFromYesterday('overtimeEmployees', previousDay.overtime)}
              >
                <span className="material-symbols-outlined text-base">content_copy</span>
                Copy from Yesterday
              </button>
            </div>
          </div>


          {/* Navigation Buttons */}
          <div className="flex justify-between pt-2">
            <Link
              href="/shift-reports/create"
              className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-transparent border border-border-dark text-text-primary-dark text-base font-bold leading-normal tracking-wide hover:bg-content-dark transition-colors"
            >
              <span className="truncate">Back</span>
            </Link>
            <Link
              href="/shift-reports/create/step-3"
              className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-primary text-background-dark text-base font-bold leading-normal tracking-wide hover:bg-primary/90 transition-colors"
            >
              <span className="truncate">Continue</span>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}