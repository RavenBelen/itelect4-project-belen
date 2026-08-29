import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createBetta, deleteBetta, fetchBettas } from "../api/client";
import BettaCard from "../components/BettaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bettaSchema, type BettaFormValues } from "../schemas/bettaSchema";
import type { ApiBetta } from "../types";

function BettaPage() {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useQuery<ApiBetta[]>({ queryKey: ["bettas"], queryFn: fetchBettas });
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BettaFormValues>({ resolver: zodResolver(bettaSchema), defaultValues: { name: "", strain: "", gender: "Male", age: 4, price: 1000 }, mode: "onBlur" });
  const addBetta = useMutation({ mutationFn: createBetta, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["bettas"] }); reset(); } });
  const removeBetta = useMutation({ mutationFn: deleteBetta, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bettas"] }) });
  const onSubmit = (values: BettaFormValues) => addBetta.mutate({ ...values, status: "Healthy" });
  const onDelete = (id: string) => { if (window.confirm("Delete this betta fish? This cannot be undone.")) removeBetta.mutate(id); };

  if (isPending) return <div className="animate-pulse p-8">Loading betta fish...</div>;
  if (isError) return <div className="m-8 rounded-xl bg-rose-50 p-4 text-rose-700">{error.message} Is the API running on port 3001?</div>;
  return <div className="p-4 sm:p-6 lg:p-8">
    <div className="mb-6"><p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">Betta Management</p><h1 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">Betta Fish</h1><p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Add, view, or remove fish from your collection.</p></div>
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2 lg:grid-cols-5">
      <Field label="Betta name" id="betta-name" error={errors.name?.message}><Input id="betta-name" placeholder="e.g. Blue Moon" aria-invalid={errors.name ? true : undefined} {...register("name")} /></Field>
      <Field label="Strain" id="betta-strain" error={errors.strain?.message}><Input id="betta-strain" placeholder="e.g. Halfmoon" aria-invalid={errors.strain ? true : undefined} {...register("strain")} /></Field>
      <Field label="Gender" id="betta-gender"><select id="betta-gender" className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm dark:bg-input/30" {...register("gender")}><option value="Male">Male</option><option value="Female">Female</option></select></Field>
      <div className="grid grid-cols-2 gap-2"><Field label="Age" id="betta-age" error={errors.age?.message}><Input id="betta-age" type="number" min="1" aria-invalid={errors.age ? true : undefined} {...register("age", { valueAsNumber: true })} /></Field><Field label="Price" id="betta-price" error={errors.price?.message}><Input id="betta-price" type="number" min="1" aria-invalid={errors.price ? true : undefined} {...register("price", { valueAsNumber: true })} /></Field></div>
      <div className="flex items-end"><Button type="submit" disabled={addBetta.isPending} className="bg-teal-600 text-white hover:bg-teal-700">{addBetta.isPending ? "Adding..." : "Add Betta"}</Button></div>
      {(addBetta.isError || removeBetta.isError) && <p className="text-sm text-rose-600 sm:col-span-2 lg:col-span-5" role="alert">{addBetta.error?.message || removeBetta.error?.message}</p>}
    </form>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{data.map((betta) => <BettaCard key={betta.id} betta={betta} onDelete={onDelete} isDeleting={removeBetta.isPending && removeBetta.variables === betta.id} />)}</div>
  </div>;
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) { return <div><Label htmlFor={id} className="mb-1.5 text-slate-700 dark:text-slate-200">{label}</Label>{children}{error && <p className="mt-1 text-xs text-rose-600" role="alert">{error}</p>}</div>; }

export default BettaPage;
