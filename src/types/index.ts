export interface Betta {
  id: number;
  name: string;
  strain: string;
  gender: string;
  age: number;
  price: number;
  status: string;
  image?: string;
  description?: string;
}

export interface Tank {
  id: number;
  size: string;
  waterType: string;
  temperature: number;
  hasFilter: boolean;
  status?: string;
  image?: string;
  description?: string;
}

export interface Plant {
  id: number;
  name: string;
  type: string;
  quantity: number;
  status?: string;
  image?: string;
  description?: string;
}

// json-server generates string ids, unlike the original in-app mock data.
export type ApiBetta = Omit<Betta, "id"> & { id: string };
export type ApiPlant = Omit<Plant, "id"> & { id: string };
export type NewPlant = Omit<ApiPlant, "id">;
