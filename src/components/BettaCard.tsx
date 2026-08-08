import type { Betta } from "../types";

interface BettaCardProps {
  betta: Betta;
  variant?: "default" | "compact";
}

function BettaCard({
  betta,
  variant = "default",
}: BettaCardProps) {

  const isCompact = variant === "compact";

  return (
    <div
      className={`
        overflow-hidden rounded-2xl
        border border-slate-200
        bg-white
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg
        dark:border-slate-700
        dark:bg-slate-800
        ${isCompact ? "p-4" : "p-6"}
      `}
    >

      <div className="mb-4 flex items-start gap-4">

        <div className="overview-avatar">
          <img
            src="https://placehold.co/96x96/FF7A7A/ffffff?text=Betta"
            alt="betta"
            className="card-image-cover"
          />
        </div>

        <div className="flex-1">

          <div className="flex items-start justify-between">

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Betta Information
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Fish profile
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

      {/* Information */}
      <div className="space-y-4">

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Name
          </p>

          <p className="font-semibold text-slate-900 dark:text-white">
            {betta.name}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Strain
            </p>

            <p className="font-medium text-slate-700 dark:text-slate-200">
              {betta.strain}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Gender
            </p>

            <p className="font-medium text-slate-700 dark:text-slate-200">
              {betta.gender}
            </p>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Age
            </p>

            <p className="font-medium text-slate-700 dark:text-slate-200">
              {betta.age} months
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Price
            </p>

            <p className="font-semibold text-slate-900 dark:text-white">
              ₱{betta.price.toLocaleString()}
            </p>
          </div>

        </div>

      </div>

      {/* Footer */}
      {!isCompact && (
        <button
          className="
            mt-6 w-full rounded-xl
            bg-cyan-600
            px-4 py-2.5
            text-sm font-semibold text-white
            transition
            hover:bg-cyan-700
          "
        >
          View Betta Details
        </button>
      )}

    </div>
  );
}

export default BettaCard;