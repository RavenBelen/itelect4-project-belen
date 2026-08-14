import { useState } from "react";
import useAuthStore from "../store/authStore";
import { initialReports } from "../data/mockData";

function ReportsPage() {
  const userName = useAuthStore((state) => state.userName);
  const reports = initialReports;
  const [filter, setFilter] = useState<string>("all");

  const filteredReports = reports.filter((item) => {
    if (filter === "all") return true;
    return item.overallHealth.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Protected Analytics & Audit
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
            Aquarium Health Reports 📊
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Logged in as: <strong className="text-teal-600 dark:text-teal-400">{userName || "Authorized User"}</strong>
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          🖨 Print / Export Report
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Monitored Tanks
          </p>
          <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            {reports.length}
          </p>
          <span className="mt-1 inline-block text-xs font-medium text-emerald-600 dark:text-emerald-400">
            ✓ All parameters within safe range
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Average Water pH
          </p>
          <p className="mt-2 text-3xl font-black text-teal-600 dark:text-teal-400">
            {(reports.reduce((acc, r) => acc + r.phLevel, 0) / reports.length).toFixed(1)}
          </p>
          <span className="mt-1 inline-block text-xs font-medium text-slate-500 dark:text-slate-400">
            Optimal betta range: 6.5 - 7.5
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Average Temperature
          </p>
          <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            {(reports.reduce((acc, r) => acc + r.temperature, 0) / reports.length).toFixed(1)}°C
          </p>
          <span className="mt-1 inline-block text-xs font-medium text-emerald-600 dark:text-emerald-400">
            ✓ Tropical temperature stable
          </span>
        </div>
      </div>

      {/* Filter controls */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Detailed Tank Logs
        </h2>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Filter Health:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="all">All Conditions</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="needs attention">Needs Attention</option>
          </select>
        </div>
      </div>

      {/* Reports Table / Card List */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4">Tank Setup</th>
                <th className="px-6 py-4">pH Level</th>
                <th className="px-6 py-4">Temperature</th>
                <th className="px-6 py-4">Last Water Change</th>
                <th className="px-6 py-4">Filter Status</th>
                <th className="px-6 py-4">Condition</th>
                <th className="px-6 py-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredReports.map((report) => (
                <tr
                  key={report.id}
                  className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                    {report.tankName}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                    {report.phLevel}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                    {report.temperature}°C
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                    {report.lastWaterChange}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        report.filterStatus === "Good"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}
                    >
                      {report.filterStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        report.overallHealth === "Excellent"
                          ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
                          : report.overallHealth === "Good"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                      }`}
                    >
                      {report.overallHealth}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                    {report.notes}
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

export default ReportsPage;
