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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type UserUpdate = Partial<User>;

export type UserPreview = Pick<User, "id" | "name">;