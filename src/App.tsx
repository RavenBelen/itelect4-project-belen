import BettaCard from "./components/BettaCard";
import TankCard from "./components/TankCard";
import PlantCard from "./components/PlantCard";

import type {
  Betta,
  Tank,
  Plant,
} from "./types";

function App() {

  const betta: Betta = {
    id: 1,
    name: "KCT Hulk",
    strain: "Halfmoon",
    gender: "Male",
    age: 4,
    price: 2500,
    status: "healthy",
  };

  const tank: Tank = {
    id: 1,
    size: "5 Gallons",
    waterType: "Freshwater",
    temperature: 26,
    hasFilter: true,
  };

  const plant: Plant = {
    id: 1,
    name: "Anubias Nana Petite",
    type: "Foreground",
    quantity: 3,
  };

  const handleClick = (): void => {
    alert("Welcome to Betta Fish Management System!");
  };

  return (
    <>
      <h1>🐠 Betta Fish Management System</h1>
      <hr />
      <BettaCard betta={betta} />
      <hr />
      <TankCard tank={tank} />
      <hr />
      <PlantCard plant={plant} />
      <hr />
      <button onClick={handleClick}>Show Message</button>
    </>
  );
}

export default App;