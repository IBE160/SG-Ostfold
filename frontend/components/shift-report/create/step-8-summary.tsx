
import { ShiftReportData } from './types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, CheckCircle2, User, Users, FileText, BarChart2, MessageSquare, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Step8Props {
  data: ShiftReportData;
}

const SummaryItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-sm font-medium text-white text-right">{value}</p>
    </div>
);

const MissingValue = () => <span className="flex items-center gap-1 text-yellow-500"><AlertTriangle className="h-4 w-4" /> Not provided</span>;

export function Step8Summary({ data }: Step8Props) {
  const { shiftMeta, staffing, workload, deviations, hse, kpis, comments } = data;
  const presentWorkers = staffing?.shiftWorkers?.filter(w => w.present).length ?? 0;
  const totalWorkers = staffing?.shiftWorkers?.length ?? 0;

  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle>SR8: Summary & Review</CardTitle>
        <CardDescription>Review all entered information before submitting the report.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Shift Meta */}
        <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-indigo-400" />Shift Info</h3>
            <div className="p-4 border border-gray-700 rounded-md">
                <SummaryItem label="Shift Date" value={shiftMeta?.date ? format(shiftMeta.date, 'PPP') : <MissingValue />} />
                <SummaryItem label="Shift Type" value={shiftMeta?.shiftType ? <span className="capitalize">{shiftMeta.shiftType}</span> : <MissingValue />} />
                <SummaryItem label="Department" value={shiftMeta?.department || <MissingValue />} />
            </div>
        </div>

        {/* Staffing */}
        <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2"><Users className="h-5 w-5 text-indigo-400" />Staffing</h3>
            <div className="p-4 border border-gray-700 rounded-md">
                <SummaryItem label="Team Leader" value={staffing?.teamLeader || <MissingValue />} />
                <SummaryItem label="Attendance" value={`${presentWorkers} / ${totalWorkers} workers present`} />
            </div>
        </div>

        {/* Workload */}
        <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2"><BarChart2 className="h-5 w-5 text-indigo-400" />Workload</h3>
             <div className="p-4 border border-gray-700 rounded-md grid grid-cols-2 gap-x-4">
                <SummaryItem label="Orders" value={workload?.ordersHandled ?? '0'} />
                <SummaryItem label="Lines" value={workload?.linesPicked ?? '0'} />
                <SummaryItem label="Inbound Pallets" value={workload?.inboundPallets ?? '0'} />
                <SummaryItem label="Outbound Pallets" value={workload?.outboundPallets ?? '0'} />
            </div>
        </div>
        
        {/* Deviations & HSE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><AlertCircle className="h-5 w-5 text-indigo-400" />Deviations</h3>
                <div className="p-4 border border-gray-700 rounded-md h-full">
                    <SummaryItem label="Total Logged" value={deviations?.items?.length ?? 0} />
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-indigo-400" />HSE Events</h3>
                 <div className="p-4 border border-gray-700 rounded-md h-full">
                    <SummaryItem label="Incidents/Misses" value={(hse?.incidents || hse?.nearMisses || hse?.unsafeConditions) ? 'Yes' : 'No'} />
                </div>
            </div>
        </div>

        {/* Comments */}
         <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2"><MessageSquare className="h-5 w-5 text-indigo-400" />Handover Notes</h3>
            <div className="p-4 border border-gray-700 rounded-md">
               <p className="text-sm text-gray-300 italic">{comments?.handoverNotes || 'No handover notes provided.'}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
