import type { ApiBetta, ApiPlant, NewPlant } from "../types";

export const API_URL = "http://localhost:3001";

async function getJson<T>(path: string, message: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) throw new Error(message);
  return response.json() as Promise<T>;
}

export function fetchBettas(): Promise<ApiBetta[]> {
  return getJson<ApiBetta[]>("/bettas", "Could not load betta fish.");
}

export function fetchBettaById(id: string): Promise<ApiBetta> {
  return getJson<ApiBetta>(`/bettas/${id}`, `No betta found with ID #${id}.`);
}

export function fetchPlants(): Promise<ApiPlant[]> {
  return getJson<ApiPlant[]>("/plants", "Could not load aquatic plants.");
}

export async function createPlant(newPlant: NewPlant): Promise<ApiPlant> {
  const response = await fetch(`${API_URL}/plants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPlant),
  });
  if (!response.ok) throw new Error("Could not add the aquatic plant.");
  return response.json() as Promise<ApiPlant>;
}
