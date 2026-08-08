import type { Tank } from "../types";

interface TankCardProps {
  tank: Tank;
}

function TankCard({ tank }: TankCardProps) {
  return (
    <div
      className="
        overflow-hidden rounded-2xl
        border border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg
        dark:border-slate-700
        dark:bg-slate-800
      "
    >

      {/* Header */}
      <div className="mb-4 flex items-start gap-4">

        <div className="overview-avatar">
          <img
            src="https://placehold.co/96x96/7dd3fc/ffffff?text=Tank"
            alt="tank"
            className="card-image-cover"
          />
        </div>

        <div className="flex-1">

          <div className="flex items-start justify-between">

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Tank Information
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Aquarium setup
              </p>
            </div>

            <span
              className="
                rounded-full
                bg-emerald-100
                px-3 py-1
                text-xs font-semibold
                text-emerald-700
                dark:bg-emerald-900/30
                dark:text-emerald-400
              "
            >
              Active
            </span>

          </div>

        </div>

      </div>

      {/* Tank Information */}
      <div className="space-y-4">

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Tank Size
          </p>

          <p className="font-semibold text-slate-900 dark:text-white">
            {tank.size}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Water Type
          </p>

          <p className="font-medium text-slate-700 dark:text-slate-200">
            {tank.waterType}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Temperature
            </p>

            <p className="font-semibold text-slate-900 dark:text-white">
              {tank.temperature}°C
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Filter
            </p>

            <p className="font-semibold text-emerald-600">
              {tank.hasFilter ? "✓ Installed" : "✕ None"}
            </p>
          </div>

        </div>

      </div>

      <button
        className="
          mt-6 w-full rounded-xl
          bg-blue-600
          px-4 py-2.5
          text-sm font-semibold text-white
          transition
          hover:bg-blue-700
        "
      >
        View Tank Details
      </button>

    </div>
  );
}

export default TankCard;