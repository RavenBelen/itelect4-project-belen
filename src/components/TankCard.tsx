import { useState } from "react";
import type { ApiTank } from "../types";

interface TankCardProps {
  tank: ApiTank;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

function TankCard({ tank, onDelete, isDeleting }: TankCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="relative mb-4 grid h-48 w-full place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-sky-400 to-cyan-700 text-8xl shadow-inner" role="img" aria-label={`${tank.size} aquarium tank sticker`}>
          <span aria-hidden="true">🐠</span>
          <div className="absolute right-2 top-2 rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
            #{tank.id}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {tank.size}
            </h3>

            <div className="mt-3 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Water Type:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {tank.waterType}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Temperature:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {tank.temperature}°C
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Filter:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {tank.hasFilter ? "Installed" : "Not Installed"}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500 dark:text-slate-400">Status:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {tank.status || "Good"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2"><button onClick={() => setShowModal(true)} className="rounded-xl bg-[#0e4d58] py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#093941] dark:bg-teal-700 dark:hover:bg-teal-600">View Details</button><button onClick={() => onDelete(tank.id)} disabled={isDeleting} className="rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white transition hover:bg-rose-700 disabled:opacity-50">{isDeleting ? "Deleting..." : "Delete"}</button></div>
        </div>
      </div>

      {/* Tank Quick Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {tank.size}
            </h3>
            <p className="mt-1 text-xs text-teal-600 dark:text-teal-400">
              Aquarium Tank ID: #{tank.id}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {tank.description || "Fully cycled and filtered freshwater environment configured for optimal betta fish health."}
            </p>
            <div className="mt-4 space-y-2 rounded-2xl bg-slate-50 p-4 text-xs dark:bg-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500">Water Type:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{tank.waterType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Preset Temp:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{tank.temperature}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Filter System:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{tank.hasFilter ? "Installed & Active" : "None"}</span>
              </div>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full rounded-xl bg-teal-600 py-2.5 text-xs font-bold text-white transition hover:bg-teal-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TankCard;
