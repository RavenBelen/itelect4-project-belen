import { useEffect, useRef, useState } from "react";

import BettaCard from "./components/BettaCard";
import TankCard from "./components/TankCard";
import PlantCard from "./components/PlantCard";

import { useToggle } from "./hooks/useToggle";
import { usePrevious } from "./hooks/usePrevious";

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

  // useState #1
  const [bettaName, setBettaName] = useState<string>(betta.name);

  // useState #2
  const [visitCount, setVisitCount] = useState<number>(0);

  // Custom Hook #1
  const { value: showInfo, toggle } = useToggle(true);

  // Custom Hook #2
  const previousName = usePrevious(bettaName);

  // useRef
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect
  useEffect(() => {
    document.title = `Betta: ${bettaName}`;
  }, [bettaName]);

  // Typed Event Handler
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setBettaName(event.target.value);
  };

  const handleClick = (): void => {
    setVisitCount((prev) => prev + 1);
    inputRef.current?.focus();
  };

  return (
    <div className="container">
      <h1>🐠 Betta Fish Management System</h1>

      <input
        ref={inputRef}
        type="text"
        value={bettaName}
        onChange={handleChange}
        placeholder="Enter Betta Name"
      />

      <p>
        <strong>Current Name:</strong> {bettaName}
      </p>

      <p>
        <strong>Previous Name:</strong>{" "}
        {previousName ?? "None"}
      </p>

      <button onClick={handleClick}>
        Click Count: {visitCount}
      </button>

      <button onClick={toggle}>
        {showInfo ? "Hide Cards" : "Show Cards"}
      </button>

      <hr />

      {showInfo && (
        <>
          <BettaCard
            betta={{
              ...betta,
              name: bettaName,
            }}
          />

          <hr />

          <TankCard tank={tank} />

          <hr />

          <PlantCard plant={plant} />
        </>
      )}
    </div>
  );
}

export default App;