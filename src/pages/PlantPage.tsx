import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createPlant, deletePlant, fetchPlants } from "../api/client";
import PlantCard from "../components/PlantCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { plantSchema, type PlantFormValues } from "../schemas/plantSchema";
import useUiStore from "../store/uiStore";
import type { ApiPlant } from "../types";

function PlantPage() {
  const queryClient = useQueryClient();
  const searchTerm = useUiStore((state) => state.plantSearchTerm);
  const setSearchTerm = useUiStore((state) => state.setPlantSearchTerm);
  const { data, isPending, isError, error } = useQuery<ApiPlant[]>({ queryKey: ["plants"], queryFn: fetchPlants });
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PlantFormValues>({
    resolver: zodResolver(plantSchema),
    defaultValues: { name: "", type: "Foreground", quantity: 1 },
    mode: "onBlur",
  });
  const addPlant = useMutation({
    mutationFn: createPlant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
      reset();
    },
  });
  const removePlant = useMutation({
    mutationFn: deletePlant,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["plants"] }),
  });

  const onSubmit = (values: PlantFormValues) => {
    addPlant.mutate({ ...values, status: "Healthy" });
  };
  const onDelete = (id: string) => {
    if (window.confirm("Delete this aquatic plant? This cannot be undone.")) removePlant.mutate(id);
  };

  if (isPending) return <div className="animate-pulse p-8">Loading aquatic plants...</div>;
  if (isError) return <div className="m-8 rounded-xl bg-rose-50 p-4 text-rose-700">{error.message} Is the API running on port 3001?</div>;
  const filteredPlants = data.filter((plant) => plant.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6"><p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">Aquarium Management</p><h1 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">Aquatic Plants</h1><p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Search your inventory or add a new plant to the API.</p></div>
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 max-w-md">
          <Label htmlFor="plant-search" className="mb-1.5 text-slate-700 dark:text-slate-200">Search plants</Label>
          <Input id="plant-search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search plants..." />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 sm:grid-cols-3">
          <div>
            <Label htmlFor="plant-name" className="mb-1.5 text-slate-700 dark:text-slate-200">Plant name</Label>
            <Input id="plant-name" placeholder="New plant name" aria-invalid={errors.name ? true : undefined} {...register("name")} />
            {errors.name && <p className="mt-1 text-xs text-rose-600" role="alert">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="plant-type" className="mb-1.5 text-slate-700 dark:text-slate-200">Placement</Label>
            <select id="plant-type" className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-slate-800 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30 dark:text-white" aria-invalid={errors.type ? true : undefined} {...register("type")}>
              <option value="Foreground">Foreground</option>
              <option value="Midground">Midground</option>
              <option value="Background">Background</option>
            </select>
            {errors.type && <p className="mt-1 text-xs text-rose-600" role="alert">{errors.type.message}</p>}
          </div>
          <div>
            <Label htmlFor="plant-quantity" className="mb-1.5 text-slate-700 dark:text-slate-200">Quantity</Label>
            <Input id="plant-quantity" type="number" min="1" max="20" aria-invalid={errors.quantity ? true : undefined} {...register("quantity", { valueAsNumber: true })} />
            {errors.quantity && <p className="mt-1 text-xs text-rose-600" role="alert">{errors.quantity.message}</p>}
          </div>
          <Button type="submit" disabled={addPlant.isPending} className="justify-self-start bg-teal-600 text-white hover:bg-teal-700 sm:col-span-3">{addPlant.isPending ? "Adding..." : "Add Plant"}</Button>
          {(addPlant.isError || removePlant.isError) && <p className="text-sm text-rose-600 sm:col-span-3" role="alert">{addPlant.error?.message || removePlant.error?.message}</p>}
        </form>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filteredPlants.map((plant) => <PlantCard key={plant.id} plant={plant} onDelete={onDelete} isDeleting={removePlant.isPending && removePlant.variables === plant.id} />)}</div>
    </div>
  );
}

export default PlantPage;
