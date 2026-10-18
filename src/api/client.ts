import useAuthStore from "../store/authStore";
import type {
  ApiBetta,
  ApiPlant,
  ApiTank,
  NewBetta,
  NewPlant,
  NewTank,
} from "../types";

export const API_URL = "https://itelect4-backend-belen.vercel.app";

function authHeaders(extraHeaders: Record<string, string> = {}) {
  const token = useAuthStore.getState().token;

  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function getJson<T>(path: string, message: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: authHeaders(),
  });

  if (!response.ok) throw new Error(message);
  return response.json() as Promise<T>;
}

export function fetchBettas(): Promise<ApiBetta[]> {
  return getJson<ApiBetta[]>("/api/bettas", "Could not load betta fish.");
}

export function fetchBettaById(id: string): Promise<ApiBetta> {
  return getJson<ApiBetta>(
    `/api/bettas/${id}`,
    `No betta found with ID #${id}.`
  );
}

export function fetchPlants(): Promise<ApiPlant[]> {
  return getJson<ApiPlant[]>("/plants", "Could not load aquatic plants.");
}

export function fetchTanks(): Promise<ApiTank[]> {
  return getJson<ApiTank[]>("/tanks", "Could not load aquarium tanks.");
}

async function createItem<TInput, TOutput>(
  path: string,
  item: TInput,
  message: string
): Promise<TOutput> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(item),
  });

  if (!response.ok) throw new Error(message);
  return response.json() as Promise<TOutput>;
}

async function deleteItem(path: string, message: string): Promise<void> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!response.ok) throw new Error(message);
}

export async function createPlant(newPlant: NewPlant): Promise<ApiPlant> {
  return createItem<NewPlant, ApiPlant>(
    "/plants",
    newPlant,
    "Could not add the aquatic plant."
  );
}

export function createBetta(newBetta: NewBetta): Promise<ApiBetta> {
  return createItem<NewBetta, ApiBetta>(
    "/api/bettas",
    newBetta,
    "Could not add the betta fish."
  );
}

export function createTank(newTank: NewTank): Promise<ApiTank> {
  return createItem<NewTank, ApiTank>(
    "/tanks",
    newTank,
    "Could not add the aquarium tank."
  );
}

export const deletePlant = (id: string) =>
  deleteItem(`/plants/${id}`, "Could not delete the aquatic plant.");

export const deleteBetta = (id: string) =>
  deleteItem(`/api/bettas/${id}`, "Could not delete the betta fish.");

export const deleteTank = (id: string) =>
  deleteItem(`/tanks/${id}`, "Could not delete the aquarium tank.");