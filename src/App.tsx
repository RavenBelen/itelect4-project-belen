import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

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

const initialBetta: Betta = {
  id: 1,
  name: "KCT Hulk",
  strain: "Halfmoon",
  gender: "Male",
  age: 4,
  price: 2500,
  status: "healthy",
};

const initialTank: Tank = {
  id: 1,
  size: "5 Gallons",
  waterType: "Freshwater",
  temperature: 26,
  hasFilter: true,
};

const initialPlant: Plant = {
  id: 1,
  name: "Anubias Nana Petite",
  type: "Foreground",
  quantity: 3,
};

function App() {
  // ==========================================
  // Betta, Tank, and Plant State
  // ==========================================

  const [betta] = useState<Betta>(initialBetta);

  const [tank] = useState<Tank>(initialTank);

  const [plant] = useState<Plant>(initialPlant);

  // ==========================================
  // useState #1
  // ==========================================

  const [bettaName, setBettaName] =
    useState<string>(initialBetta.name);

  // ==========================================
  // useState #2
  // ==========================================

  const [visitCount, setVisitCount] =
    useState<number>(0);

  // ==========================================
  // Custom Hook #1
  // ==========================================

  const {
    value: showInfo,
    toggle,
  } = useToggle(true);

  // ==========================================
  // Custom Hook #2
  // ==========================================

  const previousName =
    usePrevious<string>(bettaName);

  // ==========================================
  // useRef
  // ==========================================

  const inputRef =
    useRef<HTMLInputElement>(null);

  // ==========================================
  // useEffect
  // Updates browser tab title
  // ==========================================

  useEffect(() => {
    if (bettaName !== "") {
      document.title = `Betta: ${bettaName}`;
    }
  }, [bettaName]);

  // ==========================================
  // Typed Change Event Handler
  // ==========================================

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setBettaName(event.target.value);
  };

  // ==========================================
  // Button Handler
  // ==========================================

  const handleClick = (): void => {
    setVisitCount(
      (prev: number) => prev + 1
    );

    inputRef.current?.focus();
  };

  // ==========================================
  // Loading Screen
  // ==========================================

  if (
    betta === null ||
    tank === null ||
    plant === null
  ) {
    return (
      <div className="container">
        <h1>
          🐠 Betta Fish Management System
        </h1>

        <p>
          Loading aquarium data...
        </p>
      </div>
    );
  }

  // ==========================================
  // Main Application
  // ==========================================

  return (
    <div className="container">

      <h1>
        🐠 Betta Fish Management System
      </h1>

      <hr />

      <h2>Betta Name</h2>

      <input
        ref={inputRef}
        type="text"
        value={bettaName}
        onChange={handleChange}
        placeholder="Enter Betta Name"
      />

      <p>
        <strong>Current Name:</strong>{" "}
        {bettaName}
      </p>

      <p>
        <strong>Previous Name:</strong>{" "}
        {previousName ?? "None"}
      </p>

      <button onClick={handleClick}>
        Click Count: {visitCount}
      </button>

      <button onClick={toggle}>
        {showInfo
          ? "Hide Aquarium Information"
          : "Show Aquarium Information"}
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

          <TankCard
            tank={tank}
          />

          <hr />

          <PlantCard
            plant={plant}
          />
        </>
      )}

    </div>
  );
}

export default App;