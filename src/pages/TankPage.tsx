import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTank, deleteTank, fetchTanks } from "../api/client";
import TankCard from "../components/TankCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tankSchema, type TankFormValues } from "../schemas/tankSchema";
import type { ApiTank } from "../types";

function TankPage() {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useQuery<ApiTank[]>({ queryKey: ["tanks"], queryFn: fetchTanks });
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TankFormValues>({ resolver: zodResolver(tankSchema), defaultValues: { size: "", waterType: "Freshwater", temperature: 26, hasFilter: true }, mode: "onBlur" });
  const addTank = useMutation({ mutationFn: createTank, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["tanks"] }); reset(); } });
  const removeTank = useMutation({ mutationFn: deleteTank, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tanks"] }) });
  const onSubmit = (values: TankFormValues) => addTank.mutate({ ...values, status: "Good" });
  const onDelete = (id: string) => { if (window.confirm("Delete this aquarium tank? This cannot be undone.")) removeTank.mutate(id); };
  if (isPending) return <div className="animate-pulse p-8">Loading aquarium tanks...</div>;
  if (isError) return <div className="m-8 rounded-xl bg-rose-50 p-4 text-rose-700">{error.message} Is the API running on port 3001?</div>;
  return <div className="p-4 sm:p-6 lg:p-8">
    <div className="mb-6"><p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">Aquarium Management</p><h1 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">Aquarium Tanks</h1><p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Add, view, or remove aquarium setups.</p></div>
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2 lg:grid-cols-4">
      <Field label="Tank size" id="tank-size" error={errors.size?.message}><Input id="tank-size" placeholder="e.g. 10 Gallons" aria-invalid={errors.size ? true : undefined} {...register("size")} /></Field>
      <Field label="Water type" id="water-type"><select id="water-type" className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm dark:bg-input/30" {...register("waterType")}><option value="Freshwater">Freshwater</option><option value="Saltwater">Saltwater</option></select></Field>
      <Field label="Temperature (°C)" id="tank-temperature" error={errors.temperature?.message}><Input id="tank-temperature" type="number" min="18" max="32" aria-invalid={errors.temperature ? true : undefined} {...register("temperature", { valueAsNumber: true })} /></Field>
      <div className="flex items-end gap-3"><label className="flex h-8 items-center gap-2 text-sm text-slate-700 dark:text-slate-200"><input type="checkbox" {...register("hasFilter")} /> Filter installed</label><Button type="submit" disabled={addTank.isPending} className="bg-teal-600 text-white hover:bg-teal-700">{addTank.isPending ? "Adding..." : "Add Tank"}</Button></div>
      {(addTank.isError || removeTank.isError) && <p className="text-sm text-rose-600 sm:col-span-2 lg:col-span-4" role="alert">{addTank.error?.message || removeTank.error?.message}</p>}
    </form>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{data.map((tank) => <TankCard key={tank.id} tank={tank} onDelete={onDelete} isDeleting={removeTank.isPending && removeTank.variables === tank.id} />)}</div>
  </div>;
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) { return <div><Label htmlFor={id} className="mb-1.5 text-slate-700 dark:text-slate-200">{label}</Label>{children}{error && <p className="mt-1 text-xs text-rose-600" role="alert">{error}</p>}</div>; }

export default TankPage;
