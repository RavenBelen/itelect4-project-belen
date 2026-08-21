import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPlant, fetchPlants } from "../api/client";
import PlantCard from "../components/PlantCard";
import useUiStore from "../store/uiStore";
import type { ApiPlant } from "../types";

function PlantPage() {
  const [plantName, setPlantName] = useState("");
  const queryClient = useQueryClient();
  const searchTerm = useUiStore((state) => state.plantSearchTerm);
  const setSearchTerm = useUiStore((state) => state.setPlantSearchTerm);
  const { data, isPending, isError, error } = useQuery<ApiPlant[]>({ queryKey: ["plants"], queryFn: fetchPlants });
  const addPlant = useMutation({
    mutationFn: createPlant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
      setPlantName("");
    },
  });

  const handleAdd = () => {
    const name = plantName.trim();
    if (name) addPlant.mutate({ name, type: "Foreground", quantity: 1, status: "Healthy" });
  };

  if (isPending) return <div className="animate-pulse p-8">Loading aquatic plants...</div>;
  if (isError) return <div className="m-8 rounded-xl bg-rose-50 p-4 text-rose-700">{error.message} Is the API running on port 3001?</div>;
  const filteredPlants = data.filter((plant) => plant.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6"><p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">Aquarium Management</p><h1 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">Aquatic Plants</h1><p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Search your inventory or add a new plant to the API.</p></div>
      <div className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[1fr_1fr_auto]">
        <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search plants..." className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
        <input value={plantName} onChange={(event) => setPlantName(event.target.value)} placeholder="New plant name" className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
        <button onClick={handleAdd} disabled={!plantName.trim() || addPlant.isPending} className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-700 disabled:bg-slate-400">{addPlant.isPending ? "Adding..." : "Add Plant"}</button>
        {addPlant.isError && <p className="text-sm text-rose-600 sm:col-span-3">{addPlant.error.message}</p>}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filteredPlants.map((plant) => <PlantCard key={plant.id} plant={plant} />)}</div>
    </div>
  );
}

export default PlantPage;
