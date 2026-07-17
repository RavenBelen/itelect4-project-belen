import type { Plant } from "../types";

interface PlantCardProps {
  plant: Plant;
}

function PlantCard({ plant }: PlantCardProps) {
  return (
    <div>
      <h2>🌿 Plant Information</h2>
      <p>ID: {plant.id}</p>
      <p>Name: {plant.name}</p>
      <p>Type: {plant.type}</p>
      <p>Quantity: {plant.quantity}</p>
    </div>
  );
}

export default PlantCard;