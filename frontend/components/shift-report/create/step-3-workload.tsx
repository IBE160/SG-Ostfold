
import { ShiftReportData } from './types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Step3Props {
  data: ShiftReportData;
  updateData: (update: Partial<ShiftReportData>) => void;
}

export function Step3Workload({ data, updateData }: Step3Props) {
  const { workload = {} } = data;

  const handleFieldChange = (field: keyof typeof workload, value: any) => {
    updateData({ workload: { ...workload, [field]: value } });
  };
  
  const handleNumberChange = (field: keyof typeof workload, value: string) => {
    const num = value === '' ? undefined : parseInt(value, 10);
    handleFieldChange(field, num);
  };

  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle>SR3: Workload & Volume</CardTitle>
        <CardDescription>Enter the key volume metrics for the shift.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="ordersHandled">Orders Handled</Label>
            <Input
              id="ordersHandled"
              type="number"
              placeholder="e.g., 2500"
              className="bg-gray-800 border-gray-700"
              value={workload.ordersHandled ?? ''}
              onChange={(e) => handleNumberChange('ordersHandled', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linesPicked">Lines Picked</Label>
            <Input
              id="linesPicked"
              type="number"
              placeholder="e.g., 12000"
              className="bg-gray-800 border-gray-700"
              value={workload.linesPicked ?? ''}
              onChange={(e) => handleNumberChange('linesPicked', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inboundPallets">Inbound Pallets</Label>
            <Input
              id="inboundPallets"
              type="number"
              placeholder="e.g., 80"
              className="bg-gray-800 border-gray-700"
              value={workload.inboundPallets ?? ''}
              onChange={(e) => handleNumberChange('inboundPallets', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outboundPallets">Outbound Pallets</Label>
            <Input
              id="outboundPallets"
              type="number"
              placeholder="e.g., 120"
              className="bg-gray-800 border-gray-700"
              value={workload.outboundPallets ?? ''}
              onChange={(e) => handleNumberChange('outboundPallets', e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="otherNotes">Other Volume Notes</Label>
          <Textarea
            id="otherNotes"
            placeholder="Any other relevant details about shift volume or workload..."
            className="bg-gray-800 border-gray-700 min-h-[100px]"
            value={workload.otherNotes || ''}
            onChange={(e) => handleFieldChange('otherNotes', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
