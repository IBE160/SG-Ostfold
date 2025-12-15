
'use client';

import { useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { format, getDaysInMonth, getDay, startOfMonth, addMonths, subMonths, isSameDay } from 'date-fns';
import { useShiftReportStore } from '@/lib/stores/shiftReportStore';

const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const mockShifts = [
  { id: 'morning', name: 'Morning', time: '06:00-14:00' },
  { id: 'evening', name: 'Evening', time: '14:00-22:00' },
  { id: 'night', name: 'Night', time: '22:00-06:00' },
];

export default function CreateShiftReportPage() {
  const date = useShiftReportStore((state) => state.draft.reportCriteria.date);
  const shift = useShiftReportStore((state) => state.draft.reportCriteria.shift);
  const setReportCriteria = useShiftReportStore((state) => state.setReportCriteria);

  // The month displayed in the calendar is derived from the selected date
  const currentMonth = date || new Date();

  const handlePrevMonth = () => {
    setReportCriteria({ date: subMonths(currentMonth, 1) });
  };

  const handleNextMonth = () => {
    setReportCriteria({ date: addMonths(currentMonth, 1) });
  };

  const handleDayClick = useCallback((dayDate: Date) => {
    const dayOfWeek = getDay(dayDate);
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Saturday or Sunday
      setReportCriteria({ date: dayDate });
    }
  }, [setReportCriteria]);

  const calendarDays = useMemo(() => {
    const startMonth = startOfMonth(currentMonth);
    const numDays = getDaysInMonth(currentMonth);
    const today = new Date();

    let firstDayOfWeek = getDay(startMonth);
    firstDayOfWeek = (firstDayOfWeek === 0) ? 6 : firstDayOfWeek - 1;

    const days = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-prev-${i}`} className="calendar-day empty"></div>);
    }

    for (let i = 1; i <= numDays; i++) {
      const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const dayOfWeek = getDay(dayDate);
      const isToday = isSameDay(dayDate, today);
      const isSelected = date ? isSameDay(dayDate, date) : false;
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      days.push(
        <div
          key={`day-${i}`}
          className={`
            calendar-day current-month
            ${isToday ? 'today' : ''}
            ${isSelected ? 'selected' : ''}
            ${isWeekend ? 'greyed-out' : ''}
          `}
          onClick={() => handleDayClick(dayDate)}
        >
          {i}
        </div>
      );
    }
    
    const totalCells = days.length;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 0; i < remainingCells; i++) {
      days.push(<div key={`empty-next-${i}`} className="calendar-day empty"></div>);
    }

    return days;
  }, [currentMonth, date, handleDayClick]);


  return (
    <main className="flex-1 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary-dark">Select Report Criteria</h1>
      </header>
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-lg border border-border-dark bg-content-dark p-8 shadow-lg">
          <div className="space-y-8">
            {/* Date Selection */}
            <div>
              <h2 className="text-text-primary-dark text-xl font-bold leading-tight">Select Date</h2>
              <p className="text-text-secondary-dark mt-1 text-sm">Choose the date for the new report.</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <div className="flex items-center justify-between pb-4">
                  <button
                    id="prev-month"
                    className="text-text-secondary-dark hover:text-text-primary-dark transition-colors rounded-full p-2 hover:bg-border-dark"
                    onClick={handlePrevMonth}
                  >
                    <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
                  </button>
                  <h3 id="current-month-year" className="text-text-primary-dark text-lg font-semibold">
                    {format(currentMonth, 'MMMM yyyy')}
                  </h3>
                  <button
                    id="next-month"
                    className="text-text-secondary-dark hover:text-text-primary-dark transition-colors rounded-full p-2 hover:bg-border-dark"
                    onClick={handleNextMonth}
                  >
                    <span className="material-symbols-outlined text-2xl">arrow_forward_ios</span>
                  </button>
                </div>
                <div id="calendar-body" className="calendar-grid text-sm">
                    {weekdays.map(day => (
                        <div key={day} className="calendar-weekday">{day}</div>
                    ))}
                    {calendarDays}
                </div>
              </div>
            </div>

            {/* Shift Selection */}
            <div className="flex flex-col gap-4">
              <h2 className="text-text-primary-dark text-xl font-bold leading-tight">Select Shift</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockShifts.map(shiftOption => (
                  <div
                    key={shiftOption.id}
                    className={`
                      shift-option flex flex-col items-center justify-center p-4 rounded-lg border
                      ${shift === shiftOption.id ? 'border-primary bg-primary/10' : 'border-border-dark bg-background-dark hover:border-primary'}
                      text-text-primary-dark cursor-pointer transition-colors h-24 text-center
                    `}
                    onClick={() => setReportCriteria({ shift: shiftOption.id })}
                  >
                    <p className="text-base font-medium">{shiftOption.name}</p>
                    <p className="text-sm text-text-secondary-dark">({shiftOption.time})</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex pt-4 justify-between">
              <Link
                href="/shift-reports"
                className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent border border-border-dark text-text-primary-dark text-base font-bold leading-normal tracking-wide hover:bg-content-dark transition-colors"
              >
                <span className="truncate">Back</span>
              </Link>
              <Link
                href="/shift-reports/create/step-2" // Link to SR3
                className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-background-dark text-base font-bold leading-normal tracking-wide hover:bg-primary/90 transition-colors"
              >
                <span className="truncate">Continue</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
