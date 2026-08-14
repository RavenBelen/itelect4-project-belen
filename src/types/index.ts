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