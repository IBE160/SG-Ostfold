import React from 'react';
import { ShiftReportForm } from '@/components/reports/ShiftReportForm';

export default function NewReportPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">New Shift Report</h1>
        <ShiftReportForm />
      </div>
    </div>
  );
}