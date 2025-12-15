
import Link from 'next/link';

const draftReports = [
  {
    date: '2023-10-26',
    shift: 'Morning',
    lastEdited: '2 hours ago',
    progress: 'In Progress',
    progressColor: 'bg-[#3b82f6]/20 text-[#60a5fa]',
  },
  {
    date: '2023-10-25',
    shift: 'Night',
    lastEdited: '1 day ago',
    progress: 'Partially Filled',
    progressColor: 'bg-[#f59e0b]/20 text-[#fbbf24]',
  },
  {
    date: '2023-10-25',
    shift: 'Evening',
    lastEdited: '1 day ago',
    progress: 'In Progress',
    progressColor: 'bg-[#3b82f6]/20 text-[#60a5fa]',
  },
];

const submittedReports = [
    { date: '2023-10-26', shift: 'Night', submittedBy: 'Alice Johnson' },
    { date: '2023-10-26', shift: 'Evening', submittedBy: 'Bob Williams' },
    { date: '2023-10-26', shift: 'Morning', submittedBy: 'Charlie Brown' },
    { date: '2023-10-25', shift: 'Night', submittedBy: 'Diana Miller' },
    { date: '2023-10-25', shift: 'Evening', submittedBy: 'Eve Davis' },
];


export default function ShiftReportsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Draft Reports Section */}
      <div className="flex flex-col rounded-lg bg-[#182c34] shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-b-[#305869]/50">
          <h2 className="text-white text-xl font-bold leading-tight">Draft Shift Reports</h2>
          <Link
            href="/shift-reports/create"
            className="flex items-center justify-center gap-2 min-w-[84px] cursor-pointer overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span className="truncate">New Report</span>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-b-[#305869]/50">
              <tr>
                <th className="px-6 py-4 text-left text-white/70 w-[20%] text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-white/70 w-[15%] text-xs font-medium uppercase tracking-wider">Shift</th>
                <th className="px-6 py-4 text-left text-white/70 w-[25%] text-xs font-medium uppercase tracking-wider">Last Edited</th>
                <th className="px-6 py-4 text-left text-white/70 w-[15%] text-xs font-medium uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-left text-white/70 w-[25%] text-xs font-medium uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {draftReports.map((report, index) => (
                <tr key={index} className="border-b border-b-[#305869]/50 hover:bg-[#223d49]/40 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-[#e0e0e0] text-sm font-normal">{report.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#e0e0e0] text-sm font-normal">{report.shift}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#a0a0a0] text-sm font-normal">{report.lastEdited}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.progressColor}`}>
                      {report.progress}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-4">
                      <Link className="text-primary hover:text-primary/80 font-semibold transition-colors" href="#">Continue Editing</Link>
                      <button className="text-red-500 hover:text-red-400 transition-colors">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submitted Reports Section */}
      <div className="flex flex-col rounded-lg bg-[#182c34] shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-b-[#305869]/50">
            <h2 className="text-white text-xl font-bold leading-tight">Latest Submitted Reports</h2>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="border-b border-b-[#305869]/50">
                    <tr>
                        <th className="px-6 py-4 text-left text-white/70 w-[25%] text-xs font-medium uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-left text-white/70 w-[25%] text-xs font-medium uppercase tracking-wider">Shift</th>
                        <th className="px-6 py-4 text-left text-white/70 w-[30%] text-xs font-medium uppercase tracking-wider">Submitted By</th>
                        <th className="px-6 py-4 text-left text-white/70 w-[20%] text-xs font-medium uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedReports.map((report, index) => (
                        <tr key={index} className="border-b border-b-[#305869]/50 hover:bg-[#223d49]/40 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-[#e0e0e0] text-sm font-normal">{report.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-[#e0e0e0] text-sm font-normal">{report.shift}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-[#e0e0e0] text-sm font-normal">{report.submittedBy}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link className="text-primary hover:text-primary/80 font-semibold transition-colors" href="#">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
