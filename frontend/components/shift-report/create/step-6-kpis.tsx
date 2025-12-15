
import { ShiftReportData } from './types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Step6Props {
  data: ShiftReportData;
  updateData: (update: Partial<ShiftReportData>) => void;
}

export function Step6KPIs({ data, updateData }: Step6Props) {
  const { kpis = {} } = data;

  const handleFieldChange = (field: keyof typeof kpis, value: any) => {
    updateData({ kpis: { ...kpis, [field]: value } });
  };

  const handleNumberChange = (field: keyof typeof kpis, value: string) => {
    const num = value === '' ? undefined : parseFloat(value);
    handleFieldChange(field, num);
  };

  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle>SR6: Key Performance Indicators (KPIs)</CardTitle>
        <CardDescription>Enter the final KPI values for the shift.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="overtimeHours">Overtime (Hours)</Label>
            <Input
              id="overtimeHours"
              type="number"
              placeholder="e.g., 12.5"
              className="bg-gray-800 border-gray-700"
              value={kpis.overtimeHours ?? ''}
              onChange={(e) => handleNumberChange('overtimeHours', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="absencePercentage">Absence (%)</Label>
            <Input
              id="absencePercentage"
              type="number"
              placeholder="e.g., 4.2"
              className="bg-gray-800 border-gray-700"
              value={kpis.absencePercentage ?? ''}
              onChange={(e) => handleNumberChange('absencePercentage', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ordersPerHour">Orders per Hour</Label>
            <Input
              id="ordersPerHour"
              type="number"
              placeholder="e.g., 150.7"
              className="bg-gray-800 border-gray-700"
              value={kpis.ordersPerHour ?? ''}
              onChange={(e) => handleNumberChange('ordersPerHour', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qualityErrors">Quality Errors</Label>
            <Input
              id="qualityErrors"
              type="number"
              placeholder="e.g., 5"
              className="bg-gray-800 border-gray-700"
              value={kpis.qualityErrors ?? ''}
              onChange={(e) => handleNumberChange('qualityErrors', e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="kpi-comments">KPI Comments</Label>
          <Textarea
            id="kpi-comments"
            placeholder="Any comments explaining the KPI results, e.g., 'High overtime due to large unexpected shipment.'"
            className="bg-gray-800 border-gray-700 min-h-[100px]"
            value={kpis.comments || ''}
            onChange={(e) => handleFieldChange('comments', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
