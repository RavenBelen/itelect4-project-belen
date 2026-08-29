import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { fetchBettaById } from "../api/client";
import type { ApiBetta } from "../types";

function BettaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: betta, isPending, isError, error } = useQuery<ApiBetta>({
    queryKey: ["bettas", id],
    queryFn: () => fetchBettaById(id!),
    enabled: id !== undefined,
  });

  if (isPending) return <div className="animate-pulse p-8">Loading betta profile...</div>;
  if (isError) return <div className="p-8"><div className="max-w-md rounded-2xl bg-rose-50 p-6 text-rose-700">{error.message}<button onClick={() => navigate("/bettas")} className="mt-4 block rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white">Return to Bettas</button></div></div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <button onClick={() => navigate("/bettas")} className="mb-6 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">Back to Bettas</button>
      <div className="mb-6"><p className="text-xs font-semibold text-slate-400">Betta Details</p><h1 className="text-2xl font-black text-slate-900 dark:text-white">{betta.name}</h1><p className="text-xs text-slate-500">Betta ID: {betta.id}</p></div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="grid h-72 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 text-9xl shadow-sm sm:h-80" role="img" aria-label={`${betta.name} betta fish sticker`}><span aria-hidden="true">🐟</span></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="space-y-4 text-xs">
          <p><span className="text-slate-400">Strain: </span><strong className="text-slate-900 dark:text-white">{betta.strain}</strong></p>
          <p><span className="text-slate-400">Gender: </span><strong className="text-slate-900 dark:text-white">{betta.gender}</strong></p>
          <p><span className="text-slate-400">Age: </span><strong className="text-slate-900 dark:text-white">{betta.age} months</strong></p>
          <p><span className="text-slate-400">Price: </span><strong className="text-slate-900 dark:text-white">PHP {betta.price.toLocaleString()}</strong></p>
          <p><span className="text-slate-400">Status: </span><strong className="text-emerald-600">{betta.status}</strong></p>
        </div></div>
      </div>
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h2 className="text-sm font-bold text-slate-900 dark:text-white">About {betta.name}</h2><p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{betta.description || `${betta.name} is a healthy ${betta.strain.toLowerCase()} betta.`}</p></section>
    </div>
  );
}

export default BettaDetailPage;
