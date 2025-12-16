'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { format, getDaysInMonth, getDay, startOfMonth, addMonths, subMonths, isSameDay, setDate } from 'date-fns';
import { useShiftReportStore } from '@/lib/stores/shiftReportStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const mockShifts = [
  { id: 'morning', name: 'Morning', time: '06:00-14:00' },
  { id: 'evening', name: 'Evening', time: '14:00-22:00' },
  { id: 'night', name: 'Night', time: '22:00-06:00' },
];

export default function CreateShiftReportPage() {
  const selectedDate = useShiftReportStore((state) => state.draft.reportCriteria.date) || new Date();
  const selectedShift = useShiftReportStore((state) => state.draft.reportCriteria.shift);
  const setReportCriteria = useShiftReportStore((state) => state.setReportCriteria);

  // The month currently displayed in the calendar view
  const currentMonthDate = useShiftReportStore((state) => state.draft.reportCriteria.date) || new Date();

  const handlePrevMonth = () => {
    // We update the date in the store, which causes the component to re-render
    setReportCriteria({ date: subMonths(currentMonthDate, 1) });
  };

  const handleNextMonth = () => {
    setReportCriteria({ date: addMonths(currentMonthDate, 1) });
  };

  const handleDayClick = (day: number) => {
    const newDate = setDate(currentMonthDate, day);
    const dayOfWeek = getDay(newDate);
    // Allow selection only for weekdays
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      setReportCriteria({ date: newDate });
    }
  };

  const handleShiftClick = (shiftId: string) => {
    setReportCriteria({ shift: shiftId });
  };
  
  const { calendarGrid, monthLabel } = useMemo(() => {
    const monthStart = startOfMonth(currentMonthDate);
    const daysInMonth = getDaysInMonth(currentMonthDate);
    const today = new Date();

    // Adjust start of week to be Monday (0) to Sunday (6)
    let firstDayOfWeek = getDay(monthStart); // 0=Sun, 1=Mon
    firstDayOfWeek = (firstDayOfWeek === 0) ? 6 : firstDayOfWeek - 1; // 0=Mon, 6=Sun
    
    const grid = [];

    // Add weekday labels
    for (const day of weekdays) {
      grid.push(
        <div key={`weekday-${day}`} className="text-center font-medium text-text-secondary-dark text-sm">
          {day}
        </div>
      );
    }
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      grid.push(<div key={`empty-start-${i}`} />);
    }

    // Add day cells
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = setDate(currentMonthDate, i);
      const isWeekend = getDay(dayDate) === 0 || getDay(dayDate) === 6;
      const isSelected = isSameDay(dayDate, selectedDate) && !isWeekend;
      const isToday = isSameDay(dayDate, today);

      let dayClasses = "flex items-center justify-center h-10 rounded-lg transition-colors font-bold ";

      if (isWeekend) {
        dayClasses += "text-text-secondary-dark cursor-not-allowed";
      } else {
        dayClasses += "cursor-pointer text-text-primary-dark ";
        if (isSelected) {
          dayClasses += "bg-primary text-background-dark";
        } else {
          dayClasses += "hover:bg-border-dark";
        }
      }
      
      if (isToday && !isSelected) {
        dayClasses += " border-2 border-primary";
      }

      grid.push(
        <div key={`day-${i}`} className={dayClasses} onClick={() => handleDayClick(i)}>
          {i}
        </div>
      );
    }
    
    // Fill remaining cells to complete the grid (42 cells = 6 rows * 7 days + 7 weekdays)
    const totalCells = grid.length;
    for (let i = totalCells; i < 49; i++) {
        grid.push(<div key={`empty-end-${i-totalCells}`} />);
    }

    return {
      calendarGrid: grid,
      monthLabel: format(currentMonthDate, 'MMMM yyyy'),
    };
  }, [currentMonthDate, selectedDate]);


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
            <div className="w-full">
              <div className="flex items-center justify-between pb-4">
                <button
                  className="text-text-secondary-dark hover:text-text-primary-dark transition-colors rounded-full p-2 hover:bg-border-dark"
                  onClick={handlePrevMonth}
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <h3 className="text-text-primary-dark text-lg font-semibold">
                  {monthLabel}
                </h3>
                <button
                  className="text-text-secondary-dark hover:text-text-primary-dark transition-colors rounded-full p-2 hover:bg-border-dark"
                  onClick={handleNextMonth}
                  aria-label="Next month"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2 text-sm">
                  {calendarGrid}
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
                      flex flex-col items-center justify-center p-4 rounded-lg border
                      ${selectedShift === shiftOption.id ? 'border-primary bg-primary/10' : 'border-border-dark bg-background-dark hover:border-primary'}
                      text-text-primary-dark cursor-pointer transition-colors h-24 text-center
                    `}
                    onClick={() => handleShiftClick(shiftOption.id)}
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
                href="/shift-reports/create/step-2"
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