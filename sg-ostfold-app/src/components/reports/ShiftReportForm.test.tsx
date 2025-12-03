import { ShiftReportForm } from './ShiftReportForm';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import React from 'react';

// Mock the toast hook
jest.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

describe('ShiftReportForm client-side validation', () => {
  it('should display error for missing Shift Date', async () => {
    render(<ShiftReportForm />);
    fireEvent.click(screen.getByRole('button', { name: /submit report/i }));
    expect(await screen.findByText(/Shift Date is required/i)).toBeInTheDocument();
  });

  it('should display error for missing Shift', async () => {
    render(<ShiftReportForm />);
    fireEvent.change(screen.getByPlaceholderText(/pick a date/i), { target: { value: '12/03/2025' } }); // Mock date selection
    fireEvent.click(screen.getByRole('button', { name: /submit report/i }));
    expect(await screen.findByText(/Shift is required/i)).toBeInTheDocument();
  });

  it('should display error for invalid Overtime Hours (negative)', async () => {
    render(<ShiftReportForm />);
    fireEvent.change(screen.getByPlaceholderText(/pick a date/i), { target: { value: '12/03/2025' } });
    fireEvent.change(screen.getByRole('combobox', { name: /shift/i }), { target: { value: 'morning' } }); // Mock shift selection
    fireEvent.change(screen.getByPlaceholderText(/0-24/i), { target: { value: '-5' } });
    fireEvent.click(screen.getByRole('button', { name: /submit report/i }));
    expect(await screen.findByText(/Overtime Hours cannot be negative/i)).toBeInTheDocument();
  });

  it('should display error for invalid Overtime Hours (exceeds 24)', async () => {
    render(<ShiftReportForm />);
    fireEvent.change(screen.getByPlaceholderText(/pick a date/i), { target: { value: '12/03/2025' } });
    fireEvent.change(screen.getByRole('combobox', { name: /shift/i }), { target: { value: 'morning' } });
    fireEvent.change(screen.getByPlaceholderText(/0-24/i), { target: { value: '25' } });
    fireEvent.click(screen.getByRole('button', { name: /submit report/i }));
    expect(await screen.findByText(/Overtime Hours cannot exceed 24/i)).toBeInTheDocument();
  });

  // More tests for other fields will go here
});
