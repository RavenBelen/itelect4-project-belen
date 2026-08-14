import { Link } from "react-router";
import { initialBettas, initialTanks, initialPlants } from "../data/mockData";

function DashboardPage() {
  const betta = initialBettas[0];
  const tank = initialTanks[0];
  const plant = initialPlants[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Top Welcome Banner */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Dashboard
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Welcome to your aquarium 🫧
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Manage your betta fish, aquarium tanks, and aquatic plants in one place.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {/* Betta Stat */}
        <Link
          to="/bettas"
          className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <span className="text-xs font-medium text-slate-400">Betta</span>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="flex items-center gap-1.5 text-2xl font-extrabold text-slate-900 dark:text-white">
              <span>🐟</span>
              <span>1</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Healthy
            </span>
          </div>
        </Link>

        {/* Tanks Stat */}
        <Link
          to="/tanks"
          className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <span className="text-xs font-medium text-slate-400">Tanks</span>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="flex items-center gap-1.5 text-2xl font-extrabold text-slate-900 dark:text-white">
              <span>🐠</span>
              <span>1</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Active
            </span>
          </div>
        </Link>

        {/* Plants Stat */}
        <Link
          to="/plants"
          className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <span className="text-xs font-medium text-slate-400">Plants</span>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="flex items-center gap-1.5 text-2xl font-extrabold text-slate-900 dark:text-white">
              <span>🌿</span>
              <span>3</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Healthy
            </span>
          </div>
        </Link>

        {/* Update Stat */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-400">Update</span>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="flex items-center gap-1.5 text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              <span>⏱️</span>
              <span>Latest</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Just now
            </span>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="mt-8">
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
          Overview
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Betta Overview Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div>
              {/* Header Badge */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block rounded-lg bg-rose-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                    Betta
                  </span>
                  <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                    Betta Information
                  </h3>
                  <p className="text-xs text-slate-400">Fish profile</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  Healthy
                </span>
              </div>

              {/* Rows */}
              <div className="mt-5 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-1.5 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Name</span>
                  <span className="font-bold text-slate-900 dark:text-white">{betta.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Strain</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{betta.strain}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Gender</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{betta.gender}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Age</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{betta.age} months</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-slate-500 dark:text-slate-400">Price</span>
                  <span className="font-extrabold text-teal-600 dark:text-teal-400">₱{betta.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Link
              to={`/bettas/${betta.id}`}
              className="mt-6 block w-full rounded-xl bg-[#0e4d58] py-2.5 text-center text-xs font-bold text-white shadow-sm transition hover:bg-[#093941] dark:bg-teal-700 dark:hover:bg-teal-600"
            >
              View Betta Details
            </Link>
          </div>

          {/* Tank Information Overview Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div>
              {/* Header Badge */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Tank Information
                  </h3>
                  <p className="text-xs text-slate-400">Aquarium setup</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  Good
                </span>
              </div>

              {/* Rows */}
              <div className="mt-5 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-1.5 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Size</span>
                  <span className="font-bold text-slate-900 dark:text-white">{tank.size}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Water Type</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{tank.waterType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Temperature</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{tank.temperature}°C</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-slate-500 dark:text-slate-400">Filter</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {tank.hasFilter ? "Installed" : "Not Installed"}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/tanks"
              className="mt-6 block w-full rounded-xl bg-[#0e4d58] py-2.5 text-center text-xs font-bold text-white shadow-sm transition hover:bg-[#093941] dark:bg-teal-700 dark:hover:bg-teal-600"
            >
              View Tank Details
            </Link>
          </div>

          {/* Plant Overview Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div>
              {/* Header Badge */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block rounded-lg bg-emerald-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                    Plant
                  </span>
                  <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                    Plant Information
                  </h3>
                  <p className="text-xs text-slate-400">Aquatic plants</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  Healthy
                </span>
              </div>

              {/* Rows */}
              <div className="mt-5 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-100 pb-1.5 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Plant Name</span>
                  <span className="font-bold text-slate-900 dark:text-white">{plant.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Type</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{plant.type}</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-slate-500 dark:text-slate-400">Quantity</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{plant.quantity}</span>
                </div>
              </div>
            </div>

            <Link
              to="/plants"
              className="mt-6 block w-full rounded-xl bg-[#0e4d58] py-2.5 text-center text-xs font-bold text-white shadow-sm transition hover:bg-[#093941] dark:bg-teal-700 dark:hover:bg-teal-600"
            >
              View Plant Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;