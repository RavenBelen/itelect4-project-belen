import { Link } from "react-router";
import type { Betta } from "../types";

interface BettaCardProps {
  betta: Betta;
  variant?: "default" | "compact";
}

function BettaCard({ betta }: BettaCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      {/* Betta Image Frame */}
      <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl bg-slate-900">
        <img
          src={
            betta.image ||
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80"
          }
          alt={betta.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // Fallback to high-contrast decorative gradient if network fails
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80";
          }}
        />
        <div className="absolute right-2 top-2 rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
          #{betta.id}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            {betta.name}
          </h3>

          <div className="mt-3 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Strain:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {betta.strain}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Gender:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {betta.gender}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Age:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {betta.age} months
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Price:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                ₱{betta.price.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-500 dark:text-slate-400">Status:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {betta.status}
              </span>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/bettas/${betta.id}`}
          className="mt-5 block w-full rounded-xl bg-[#0e4d58] py-2.5 text-center text-xs font-bold text-white shadow-sm transition hover:bg-[#093941] dark:bg-teal-700 dark:hover:bg-teal-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default BettaCard;