
import { ShiftReportData } from './types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface Step5Props {
  data: ShiftReportData;
  updateData: (update: Partial<ShiftReportData>) => void;
}

export function Step5HSE({ data, updateData }: Step5Props) {
  const { hse = {} } = data;

  const handleCheckboxChange = (field: keyof Omit<typeof hse, 'details'>, checked: boolean) => {
    updateData({ hse: { ...hse, [field]: checked } });
  };
  
  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ hse: { ...hse, details: e.target.value } });
  };

  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle>SR5: Health, Safety & Environment (HSE)</CardTitle>
        <CardDescription>Log any HSE-related events. Check all that apply.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 rounded-md border border-gray-700 p-4">
            <div className="flex items-center space-x-3">
                <Checkbox
                    id="incidents"
                    checked={hse.incidents}
                    onCheckedChange={(checked) => handleCheckboxChange('incidents', !!checked)}
                />
                <Label htmlFor="incidents" className="font-medium text-base">
                    Incidents
                </Label>
            </div>
            <div className="flex items-center space-x-3">
                <Checkbox
                    id="nearMisses"
                    checked={hse.nearMisses}
                    onCheckedChange={(checked) => handleCheckboxChange('nearMisses', !!checked)}
                />
                <Label htmlFor="nearMisses" className="font-medium text-base">
                    Near-Misses Reported
                </Label>
            </div>
            <div className="flex items-center space-x-3">
                <Checkbox
                    id="unsafeConditions"
                    checked={hse.unsafeConditions}
                    onCheckedChange={(checked) => handleCheckboxChange('unsafeConditions', !!checked)}
                />
                <Label htmlFor="unsafeConditions" className="font-medium text-base">
                    Unsafe Conditions Identified
                </Label>
            </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="hse-details">HSE Details</Label>
          <Textarea
            id="hse-details"
            placeholder="Provide details for any checked items above. Describe the event, location, and immediate actions taken."
            className="bg-gray-800 border-gray-700 min-h-[120px]"
            value={hse.details || ''}
            onChange={handleDetailsChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
