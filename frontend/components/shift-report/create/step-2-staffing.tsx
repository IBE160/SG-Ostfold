
import { ShiftReportData } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useMemo } from 'react';

// Mock data for shift workers
const MOCK_WORKERS = [
  { id: 'usr_1', name: 'Alice Johnson' },
  { id: 'usr_2', name: 'Bob Williams' },
  { id: 'usr_3', name: 'Charlie Brown' },
  { id: 'usr_4', name: 'Diana Miller' },
];

interface Step2Props {
  data: ShiftReportData;
  updateData: (update: Partial<ShiftReportData>) => void;
}

export function Step2Staffing({ data, updateData }: Step2Props) {
  const { staffing = {} } = data;

  const initialWorkers = useMemo(() => {
    return MOCK_WORKERS.map(worker => {
      const existing = staffing.shiftWorkers?.find(sw => sw.id === worker.id);
      return existing || { ...worker, present: true };
    });
  }, []); // Run only once

  const [workers, setWorkers] = useState(initialWorkers);

  const handleTeamLeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ staffing: { ...staffing, teamLeader: e.target.value } });
  };

  const handleWorkerPresenceChange = (id: string, present: boolean) => {
    const updatedWorkers = workers.map(worker =>
      worker.id === id ? { ...worker, present } : worker
    );
    setWorkers(updatedWorkers);
    updateData({ staffing: { ...staffing, shiftWorkers: updatedWorkers } });
  };

  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle>SR2: Staffing & Attendance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="teamLeader">Team Leader on Shift</Label>
          <Input
            id="teamLeader"
            placeholder="Enter name..."
            className="bg-gray-800 border-gray-700"
            value={staffing.teamLeader || ''}
            onChange={handleTeamLeaderChange}
          />
        </div>
        <div className="space-y-4">
            <Label>Shift Worker Attendance</Label>
            <div className="space-y-3 p-4 border border-gray-700 rounded-md">
                {workers.map(worker => (
                    <div key={worker.id} className="flex items-center space-x-3">
                        <Checkbox
                            id={`worker-${worker.id}`}
                            checked={worker.present}
                            onCheckedChange={(checked) => handleWorkerPresenceChange(worker.id, !!checked)}
                        />
                        <Label htmlFor={`worker-${worker.id}`} className="font-normal text-base">
                            {worker.name}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
