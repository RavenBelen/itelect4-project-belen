export type UserRole = "Student" | "Admin";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  score: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Betta {
  id: number;
  name: string;
  strain: string;
  gender: string;
  age: number;
  price: number;
  status: string;
}

export interface Tank {
  id: number;
  size: string;
  waterType: string;
  temperature: number;
  hasFilter: boolean;
}

export interface Plant {
  id: number;
  name: string;
  type: string;
  quantity: number;
}