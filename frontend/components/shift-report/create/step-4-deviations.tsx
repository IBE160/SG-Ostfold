
import { ShiftReportData } from './types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Step4Props {
  data: ShiftReportData;
  updateData: (update: Partial<ShiftReportData>) => void;
}

type DeviationItem = NonNullable<NonNullable<ShiftReportData['deviations']>['items']>[0];

export function Step4Deviations({ data, updateData }: Step4Props) {
  const items = data.deviations?.items || [];

  const updateItems = (newItems: DeviationItem[]) => {
    updateData({ deviations: { ...data.deviations, items: newItems } });
  };

  const handleAddDeviation = () => {
    const newItem: DeviationItem = {
      id: uuidv4(),
      type: 'other',
      description: '',
      severity: 'medium',
    };
    updateItems([...items, newItem]);
  };

  const handleRemoveDeviation = (id: string) => {
    updateItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof Omit<DeviationItem, 'id'>, value: string) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateItems(newItems);
  };

  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle>SR4: Deviations & Incidents</CardTitle>
        <CardDescription>Log any deviations, issues, or notable events from the shift.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="p-4 border border-gray-700 rounded-lg space-y-4 relative">
            <h4 className="font-semibold text-gray-300">Deviation #{index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`deviation-type-${item.id}`}>Type</Label>
                <Select
                  value={item.type}
                  onValueChange={(value) => handleItemChange(item.id, 'type', value)}
                >
                  <SelectTrigger id={`deviation-type-${item.id}`} className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white border-gray-700">
                    <SelectItem value="quality">Quality Issue</SelectItem>
                    <SelectItem value="safety">Safety Concern</SelectItem>
                    <SelectItem value="equipment">Equipment Failure</SelectItem>
                    <SelectItem value="process">Process Bottleneck</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`deviation-severity-${item.id}`}>Severity</Label>
                <Select
                  value={item.severity}
                  onValueChange={(value) => handleItemChange(item.id, 'severity', value)}
                >
                  <SelectTrigger id={`deviation-severity-${item.id}`} className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select severity..." />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white border-gray-700">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`deviation-desc-${item.id}`}>Description</Label>
              <Textarea
                id={`deviation-desc-${item.id}`}
                placeholder="Describe the deviation..."
                className="bg-gray-800 border-gray-700 min-h-[80px]"
                value={item.description || ''}
                onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
              />
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => handleRemoveDeviation(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button variant="outline" onClick={handleAddDeviation} className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Deviation
        </Button>
      </CardContent>
    </Card>
  );
}
