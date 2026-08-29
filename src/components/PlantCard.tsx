import { useState } from "react";
import type { ApiPlant } from "../types";

interface PlantCardProps {
  plant: ApiPlant;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

function PlantCard({ plant, onDelete, isDeleting }: PlantCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="relative mb-4 grid h-48 w-full place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-emerald-400 to-teal-700 text-8xl shadow-inner" role="img" aria-label={`${plant.name} aquatic plant sticker`}>
          <span aria-hidden="true">🪴</span>
          <div className="absolute right-2 top-2 rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
            #{plant.id}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {plant.name}
            </h3>

            <div className="mt-3 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Type:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {plant.type}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Quantity:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {plant.quantity}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500 dark:text-slate-400">Status:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {plant.status || "Healthy"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2"><button onClick={() => setShowModal(true)} className="rounded-xl bg-[#0e4d58] py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#093941] dark:bg-teal-700 dark:hover:bg-teal-600">View Details</button><button onClick={() => onDelete(plant.id)} disabled={isDeleting} className="rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white transition hover:bg-rose-700 disabled:opacity-50">{isDeleting ? "Deleting..." : "Delete"}</button></div>
        </div>
      </div>

      {/* Plant Quick Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {plant.name}
            </h3>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {plant.type} Plant • Species #{plant.id}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {plant.description || "Live aquatic plant promoting oxygenation and natural biofilm for aquarium inhabitants."}
            </p>
            <div className="mt-4 space-y-2 rounded-2xl bg-slate-50 p-4 text-xs dark:bg-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500">Placement:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{plant.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Inventory:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{plant.quantity} in stock</span>
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

export default PlantCard;
