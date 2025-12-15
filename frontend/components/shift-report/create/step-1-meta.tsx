
import { ShiftReportData } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface Step1Props {
  data: ShiftReportData;
  updateData: (update: Partial<ShiftReportData>) => void;
}

export function Step1Meta({ data, updateData }: Step1Props) {
  const { shiftMeta = {} } = data;

  const handleFieldChange = (field: keyof typeof shiftMeta, value: any) => {
    updateData({ shiftMeta: { ...shiftMeta, [field]: value } });
  };

  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle>SR1: Shift Metadata</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="date">Shift Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal bg-gray-800 border-gray-700 hover:bg-gray-700',
                  !shiftMeta.date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {shiftMeta.date ? format(shiftMeta.date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={shiftMeta.date}
                onSelect={(date) => handleFieldChange('date', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="shiftType">Shift Type</Label>
          <Select onValueChange={(value) => handleFieldChange('shiftType', value)} defaultValue={shiftMeta.shiftType}>
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select shift type..." />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white border-gray-700">
              <SelectItem value="day">Day Shift</SelectItem>
              <SelectItem value="evening">Evening Shift</SelectItem>
              <SelectItem value="night">Night Shift</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department / Area</Label>
          <Input
            id="department"
            placeholder="e.g., 'Goods In', 'Packing'"
            className="bg-gray-800 border-gray-700"
            value={shiftMeta.department || ''}
            onChange={(e) => handleFieldChange('department', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
