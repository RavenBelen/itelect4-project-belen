export const UserRole = {
  Student: "student",
  Teacher: "teacher",
  Admin: "admin",
} as const;

export type UserRoleValue = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRoleValue;
  isActive: boolean;
  score: number;
}

export interface Course {
  id: number;
  name: string;
  units: number;
  semester: string;
}

export interface Submission {
  id: number;
  title: string;
  status: string;
}

export interface Betta {
  id: number;
  name: string;
  strain: string;
  gender: string;
  age: number;
  price: number;
  status: BettaStatusValue;
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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const BettaStatus = {
  Healthy: "healthy",
  Sick: "sick",
  Quarantine: "quarantine",
} as const;

export type BettaStatusValue = (typeof BettaStatus)[keyof typeof BettaStatus];

export type BettaUpdate = Partial<Betta>;

export type BettaPreview = Pick<Betta, "id" | "name">;