import type { Tank } from "../types";

interface TankCardProps {
  tank: Tank;
}

function TankCard({ tank }: TankCardProps) {
  return (
    <div>
      <h2>🏠 Tank Information</h2>
      <p>ID: {tank.id}</p>
      <p>Size: {tank.size}</p>
      <p>Water Type: {tank.waterType}</p>
      <p>Temperature: {tank.temperature}°C</p>
      <p>Filter: {tank.hasFilter ? "Yes" : "No"}</p>
    </div>
  );
}

export default TankCard;