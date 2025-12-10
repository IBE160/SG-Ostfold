// frontend/app/(main)/dashboard/components/kpi-card.tsx
import React from 'react';

interface KpiCardProps {
  id: string;
  title: string;
  value: string;
  unit?: string;
  type?: 'primary' | 'success' | 'error';
  prefix?: string;
  // onClick?: (id: string) => void; // Not needed for a static server component for now
  isActive?: boolean;
}

const getKpiColorClass = (type: KpiCardProps['type']) => {
  switch (type) {
    case 'primary':
      return 'text-primary';
    case 'success':
      return 'text-success';
    case 'error':
      return 'text-error';
    default:
      return 'text-text-primary-dark';
  }
};

export function KpiCard({ id, title, value, unit, type, prefix, isActive }: KpiCardProps) {
  const colorClass = getKpiColorClass(type);
  const displayValue = `${prefix || ''}${value}${unit || ''}`;

  return (
    <div
      id={id}
      className={`flex flex-col gap-2 rounded-lg p-6 bg-content-dark border cursor-pointer transition-colors duration-200
        ${isActive ? 'border-primary' : 'border-border-dark'}`}
      // onClick={() => onClick?.(id)} // Not needed for a static server component for now
    >
      <p className="text-text-secondary-dark text-base font-medium leading-normal">{title}</p>
      <p className={`${colorClass} tracking-light text-4xl font-bold leading-tight`}>
        {displayValue}
      </p>
    </div>
  );
}

