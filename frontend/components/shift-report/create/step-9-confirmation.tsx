
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function Step9Confirmation() {
  return (
    <Card className="bg-gray-900 border-gray-800 text-white text-center">
      <CardHeader>
        <div className="mx-auto bg-green-500/20 text-green-400 rounded-full h-16 w-16 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10" />
        </div>
        <CardTitle className="mt-4">Shift Report Submitted</CardTitle>
        <CardDescription>
          Thank you. Your shift report has been successfully recorded.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href="/dashboard">
          <Button>Return to Dashboard</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
