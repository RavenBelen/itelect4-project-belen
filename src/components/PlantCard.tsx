import type { Plant } from "../types";

interface PlantCardProps {
  plant: Plant;
}

function PlantCard({ plant }: PlantCardProps) {
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
            src="https://placehold.co/96x96/86efac/ffffff?text=Plant"
            alt="plant"
            className="card-image-cover"
          />
        </div>

        <div className="flex-1">

          <div className="flex items-start justify-between">

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Plant Information
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Aquatic plants
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
              Healthy
            </span>

          </div>

        </div>

      </div>

      {/* Plant Information */}
      <div className="space-y-4">

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Plant Name
          </p>

          <p className="font-semibold text-slate-900 dark:text-white">
            {plant.name}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Type
          </p>

          <p className="font-medium text-slate-700 dark:text-slate-200">
            {plant.type}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Quantity
          </p>

          <p className="font-semibold text-slate-900 dark:text-white">
            {plant.quantity}
          </p>
        </div>

      </div>

      <button
        className="
          mt-6 w-full rounded-xl
          bg-emerald-600
          px-4 py-2.5
          text-sm font-semibold text-white
          transition
          hover:bg-emerald-700
        "
      >
        View Plant Details
      </button>

    </div>
  );
}

export default PlantCard;