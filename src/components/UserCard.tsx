import type { User } from "../types";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div>
      <h2>User Information</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Active: {user.isActive ? "Yes" : "No"}</p>
      <p>Score: {user.score}</p>
    </div>
  );
}

export default UserCard;