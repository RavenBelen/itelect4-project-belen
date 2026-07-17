import type { Betta } from "../types";

interface BettaCardProps {
  betta: Betta;
}

function BettaCard({ betta }: BettaCardProps) {
  return (
    <div>
      <h2>🐠 Betta Information</h2>

      <p>ID: {betta.id}</p>
      <p>Name: {betta.name}</p>
      <p>Strain: {betta.strain}</p>
      <p>Gender: {betta.gender}</p>
      <p>Age: {betta.age} months</p>
      <p>Price: ₱{betta.price}</p>
      <p>Status: {betta.status}</p>
    </div>
  );
}

export default BettaCard;