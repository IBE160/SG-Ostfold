
import { ShiftReportData } from './types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Step7Props {
  data: ShiftReportData;
  updateData: (update: Partial<ShiftReportData>) => void;
}

export function Step7Comments({ data, updateData }: Step7Props) {
  const { comments = {} } = data;

  const handleFieldChange = (field: keyof typeof comments, value: string) => {
    updateData({ comments: { ...comments, [field]: value } });
  };

  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle>SR7: General Comments</CardTitle>
        <CardDescription>Add any final notes and handover information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="shiftLeaderNotes">Shift Leader Notes</Label>
          <Textarea
            id="shiftLeaderNotes"
            placeholder="General summary of the shift, overall performance, team morale, etc."
            className="bg-gray-800 border-gray-700 min-h-[150px]"
            value={comments.shiftLeaderNotes || ''}
            onChange={(e) => handleFieldChange('shiftLeaderNotes', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="handoverNotes">Handover to Next Shift</Label>
          <Textarea
            id="handoverNotes"
            placeholder="Important information for the next shift leader. E.g., 'Area C needs cleaning', 'Forklift #3 is waiting for maintenance', 'Watch out for the large incoming shipment at 16:00'."
            className="bg-gray-800 border-gray-700 min-h-[150px]"
            value={comments.handoverNotes || ''}
            onChange={(e) => handleFieldChange('handoverNotes', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
