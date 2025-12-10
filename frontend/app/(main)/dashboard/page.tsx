import { getDashboardData, logout } from "./actions";
import { Button } from '@/components/ui/button';
import { KpiCard } from "./components/kpi-card";
import { ChartPlaceholder } from "./components/chart-placeholder";

// Define KPI data structure
// interface KpiData {
//   [shift: string]: {
//     [kpiId: string]: number[];
//   };
// }

// Keeping this config to define the structure and display properties of KPI cards
const KPI_CARDS_CONFIG = [
  { id: 'kpi-efficiency', title: 'Efficiency Score', value: '88', unit: '%', type: 'primary' },
  { id: 'kpi-downtime', title: 'Unplanned Downtime', value: '3.5', unit: ' hrs', type: 'error' },
  { id: 'kpi-sick-leave', title: 'Sick Leave (vs. Avg)', value: '2', unit: '%', type: 'success', prefix: '↓ ' },
  { id: 'kpi-overtime', title: 'Overtime (vs. Avg)', value: '15', unit: '%', type: 'error', prefix: '↑ ' },
  { id: 'kpi-avg-orders', title: 'Avg. Orders/Hr', value: '120', unit: '', type: 'primary' },
  { id: 'kpi-quality', title: 'Quality Pass Rate', value: '99.2', unit: '%', type: 'success' },
  { id: 'kpi-maintenance', title: 'Scheduled Maintenance', value: '2', unit: ' days', type: 'primary' },
  { id: 'kpi-satisfaction', title: 'Customer Satisfaction', value: '95', unit: '%', type: 'primary' },
  { id: 'kpi-new-users', title: 'New Users', value: '10', unit: '%', type: 'success', prefix: '↑ ' },
  { id: 'kpi-tickets', title: 'Support Tickets (Closed)', value: '85', unit: '', type: 'primary' },
];

export default async function DashboardPage() {
  // Although getDashboardData is called, its data is not used for the visual mockup
  // as per the instructions (priority is visual match with placeholder data).
  // const data = await getDashboardData(); 

  // Dummy values for header components
  const currentTimeRange = 'Last 30 Days';
  const currentShift = 'Totalt';
  const currentKpiForChart = 'Orders per Hour'; // This would dynamically change in a real app

  return (
    <div className="flex-1 p-8">
      <header className="flex flex-col gap-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-text-primary-dark text-4xl font-black leading-tight tracking-[-0.033em]">Dashboard</h1>
          <div className="relative">
            <button
              id="time-range-button"
              className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-content-dark pl-4 pr-3 border border-border-dark hover:border-primary/50 transition-colors duration-200"
              aria-label="Select date range"
            >
              <p id="time-range-text" className="text-text-primary-dark text-sm font-medium leading-normal">{currentTimeRange}</p>
              <span className="material-symbols-outlined text-text-secondary-dark" style={{ fontSize: '20px' }}>expand_more</span>
            </button>
            {/* Time range dropdown placeholder */}
            <div id="time-range-dropdown" className="absolute right-0 mt-2 w-48 bg-content-dark border border-border-dark rounded-lg shadow-lg hidden">
                <a href="#" className="block px-4 py-2 text-sm text-text-primary-dark hover:bg-primary/20">Last year</a>
                <a href="#" className="block px-4 py-2 text-sm text-text-primary-dark hover:bg-primary/20">Last 3 months</a>
                <a href="#" className="block px-4 py-2 text-sm text-text-primary-dark hover:bg-primary/20">Last 1 month</a>
                <a href="#" className="block px-4 py-2 text-sm text-text-primary-dark hover:bg-primary/20">Last 3 weeks</a>
                <a href="#" className="block px-4 py-2 text-sm text-text-primary-dark hover:bg-primary/20">Last week</a>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {['Totalt', 'Drift 1', 'Drift 2', 'Drift 3'].map((shift) => (
            <button
              key={shift}
              className={`shift-button px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                ${currentShift === shift ? 'bg-primary/20 text-primary' : 'text-text-secondary-dark hover:bg-content-dark'}`}
            >
              {shift}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-1 space-y-8">
          {KPI_CARDS_CONFIG.filter((_, idx) => idx < 5).map((kpi) => ( // First 5 KPIs
            <KpiCard
              key={kpi.id}
              id={kpi.id}
              title={kpi.title}
              value={kpi.value}
              unit={kpi.unit}
              type={kpi.type}
              prefix={kpi.prefix}
              isActive={kpi.id === 'kpi-avg-orders'} // Example active state
            />
          ))}
        </div>

        <div className="col-span-3">
          <ChartPlaceholder title={currentKpiForChart} timeRange={currentTimeRange} shift={currentShift} />
        </div>

        <div className="col-span-1 space-y-8">
          {KPI_CARDS_CONFIG.filter((_, idx) => idx >= 5).map((kpi) => ( // Remaining KPIs
            <KpiCard
              key={kpi.id}
              id={kpi.id}
              title={kpi.title}
              value={kpi.value}
              unit={kpi.unit}
              type={kpi.type}
              prefix={kpi.prefix}
              isActive={false}
            />
          ))}
        </div>
      </div>

      {/* Placeholder for the lower section content (e.g., tables or lists) */}
      <section className="mt-8 bg-content-dark p-6 rounded-lg border border-border-dark">
        <h2 className="text-text-primary-dark text-xl font-bold mb-4">Latest Reports (Placeholder)</h2>
        <div className="text-text-secondary-dark">
          <p>This section would contain tables or lists, e.g., last 5 shift reports.</p>
          <pre className="mt-4 p-4 bg-background-dark rounded text-xs overflow-auto">
            {/* Example of data from getDashboardData, if uncommented */}
            {/* {JSON.stringify(data, null, 2)} */}
            {`[
  { "id": "rep-001", "date": "2025-11-29", "shift": "Totalt", "status": "Completed" },
  { "id": "rep-002", "date": "2025-11-28", "shift": "Drift 1", "status": "Completed" },
  { "id": "rep-003", "date": "2025-11-27", "shift": "Drift 2", "status": "Completed" }
]`}
          </pre>
        </div>
      </section>

      {/* Logout button - can still trigger server action */}
      <form action={logout}>
        <Button type="submit" variant="outline" className="mt-8">
          Logout
        </Button>
      </form>
    </div>
  );
}