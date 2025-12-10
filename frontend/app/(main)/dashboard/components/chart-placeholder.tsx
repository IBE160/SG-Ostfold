// frontend/app/(main)/dashboard/components/chart-placeholder.tsx
import React from 'react';

interface ChartPlaceholderProps {
  title: string;
  timeRange: string;
  shift: string;
}

export function ChartPlaceholder({ title, timeRange, shift }: ChartPlaceholderProps) {
  return (
    <section id="main-graph-container" className="bg-content-dark p-6 rounded-lg border border-border-dark" style={{ minHeight: '448px' }}>
      <div className="flex flex-col gap-2 h-full">
        <p id="main-graph-title" className="text-text-primary-dark text-base font-medium leading-normal">
          {title}: {timeRange} ({shift})
        </p>
        <div className="flex min-h-[220px] flex-1 flex-col justify-end pt-4 space-y-1">
          {/* Simple bar chart placeholder */}
          <div className="flex items-end h-full space-x-1">
            <div className="w-4 bg-primary/60" style={{ height: '60%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '70%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '50%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '80%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '65%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '75%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '55%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '90%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '70%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '60%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '85%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '72%' }}></div>
             <div className="w-4 bg-primary/60" style={{ height: '60%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '70%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '50%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '80%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '65%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '75%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '55%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '90%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '70%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '60%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '85%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '72%' }}></div>
             <div className="w-4 bg-primary/60" style={{ height: '60%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '70%' }}></div>
            <div className="w-4 bg-primary/60" style={{ height: '50%' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
