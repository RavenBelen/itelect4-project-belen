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

/* =========================================================
   MOCK DATA
   ========================================================= */

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

/* =========================================================
   APP
   ========================================================= */

function App() {

  /* =======================================================
     DATA STATE
     ======================================================= */

  const [betta, setBetta] =
    useState<Betta | null>(null);

  const [tank, setTank] =
    useState<Tank | null>(null);

  const [plant, setPlant] =
    useState<Plant | null>(null);

  /* =======================================================
     REQUIRED useState #1
     ======================================================= */

  const [bettaName, setBettaName] =
    useState<string>("");

  /* =======================================================
     REQUIRED useState #2
     ======================================================= */

  const [visitCount, setVisitCount] =
    useState<number>(0);

  /* =======================================================
     Loading and Error State
     ======================================================= */

  const [isLoading, setIsLoading] =
    useState<boolean>(true);

  const [isError] =
    useState<boolean>(false);

  /* =======================================================
     DARK MODE
     Uses the custom useToggle hook
     ======================================================= */

  const getInitialDark = (): boolean => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return (
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
      );
    } catch {
      return false;
    }
  };

  const {
    value: isDarkMode,
    toggle: toggleDarkMode,
  } = useToggle(getInitialDark());

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  /* =======================================================
     SHOW INFORMATION
     ======================================================= */

  const {
    value: showInfo,
    toggle: toggleInfo,
  } = useToggle(true);

  /* =======================================================
     PREVIOUS NAME
     ======================================================= */

  const previousName =
    usePrevious(bettaName);

  /* =======================================================
     useRef
     ======================================================= */

  const inputRef =
    useRef<HTMLInputElement>(null);

  /* =======================================================
     useEffect
     Loads mock data when component mounts
     ======================================================= */

  useEffect(() => {

    const timer = setTimeout(() => {

      setBetta(initialBetta);
      setTank(initialTank);
      setPlant(initialPlant);

      setBettaName(initialBetta.name);

      setIsLoading(false);

    }, 500);

    return () => clearTimeout(timer);

  }, []);

  /* =======================================================
     useEffect
     Updates browser tab title
     ======================================================= */

  useEffect(() => {

    if (bettaName !== "") {
      document.title =
        `Betta Manager - ${bettaName}`;
    } else {
      document.title =
        "Betta Fish Management System";
    }

  }, [bettaName]);

  /* =======================================================
     Typed Change Event Handler
     ======================================================= */

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {

    setBettaName(
      event.target.value
    );

  };

  /* =======================================================
     Button Handler
     ======================================================= */

  const handleClick = (): void => {

    setVisitCount(
      (prev: number) => prev + 1
    );

    inputRef.current?.focus();

  };

  /* Error handler was removed (no longer used) */

  /* =======================================================
     LOADING STATE
     ======================================================= */

  if (isLoading) {

    return (
      <div className="min-h-screen bg-slate-100 p-6 dark:bg-slate-950">

        <div className="mx-auto max-w-7xl">

          <div className="animate-pulse">

            <div className="mb-8 h-10 w-64 rounded-lg bg-slate-200 dark:bg-slate-800" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              <div className="h-72 rounded-2xl bg-white shadow-sm dark:bg-slate-800" />

              <div className="h-72 rounded-2xl bg-white shadow-sm dark:bg-slate-800" />

              <div className="h-72 rounded-2xl bg-white shadow-sm dark:bg-slate-800" />

            </div>

          </div>

        </div>

      </div>
    );

  }

  /* =======================================================
     ERROR STATE
     ======================================================= */

  if (isError) {

    return (
      <div className="min-h-screen bg-slate-100 p-6 dark:bg-slate-950">

        <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">

          <div
            className="
              w-full rounded-2xl
              border border-red-200
              bg-white p-8
              text-center
              shadow-lg
              dark:border-red-900
              dark:bg-slate-800
            "
          >

            <div className="mb-4 text-5xl">
              ⚠️
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Unable to Load Aquarium Data
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Something went wrong while loading
              your aquarium information.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="
                mt-6 rounded-xl
                bg-cyan-600
                px-5 py-2.5
                font-semibold text-white
                transition
                hover:bg-cyan-700
              "
            >
              Try Again
            </button>

          </div>

        </div>

      </div>
    );

  }

  /* =======================================================
     SAFETY CHECK
     ======================================================= */

  if (
    betta === null ||
    tank === null ||
    plant === null
  ) {
    return null;
  }

  /* =======================================================
     MAIN APPLICATION
     ======================================================= */

  return (

    <div className={isDarkMode ? "dark" : ""}>

      <div
        className="
          min-h-screen
          bg-slate-100
          text-slate-900
          transition-colors duration-300
          dark:bg-slate-950
          dark:text-slate-100
        "
      >

        {/* =================================================
            PAGE CONTAINER
            ================================================= */}

        <div className="mx-auto w-full max-w-7xl app-grid">

          {/* =================================================
              SIDEBAR
              ================================================= */}

            <aside
            className="
              hidden w-full max-w-[280px]
              min-h-screen
              p-6
              lg:block
              sidebar-gradient
            "
          >

            {/* Logo + top controls */}

            <div className="mb-6">

              <div className="flex items-center justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-xl
                      bg-cyan-600
                      text-xl
                    "
                  >
                    🐠
                  </div>

                  <div>

                    <h1 className="font-bold text-white">
                      Betta Manager
                    </h1>

                    <p className="text-xs text-white/80">
                      Aquarium System
                    </p>

                  </div>

                </div>

                <div className="sidebar-top-controls">

                  <button onClick={toggleDarkMode} className="dark-toggle">
                    {isDarkMode ? "☀️" : "🌙"}
                  </button>

                  <div className="avatar-sm" title="User">
                    <img src="https://placehold.co/40x40/ffffff/0ea5b7?text=U" alt="user" />
                  </div>

                </div>

              </div>

            </div>
            {/* Sidebar header text (moved from main header) */}
            <div className="mb-6">

              <h2 className="sidebar-title">Dashboard</h2>

              <p className="sidebar-subtitle">Welcome to your aquarium 🫧</p>

              <p className="sidebar-desc mt-2">Manage your betta fish, aquarium tank, and aquatic plants in one place.</p>

            </div>

            {/* Navigation */}

            <nav className="sidebar-nav space-y-2">

              <button className="nav-item active">
                📊 Dashboard
              </button>

              <button className="nav-item">
                🐠 Betta Fish
              </button>

              <button className="nav-item">
                🏠 Aquarium Tank
              </button>

              <button className="nav-item">
                🌿 Aquatic Plants
              </button>

              <button className="nav-item">
                📋 Reports
              </button>

              <button className="nav-item">
                ⚙️ Settings
              </button>

            </nav>

            {/* Sidebar Bottom */}

            <div
              className="
                mt-10 rounded-2xl
                bg-cyan-50
                p-4
                dark:bg-cyan-950/40
              "
            >

              <p className="text-sm font-bold text-cyan-800 dark:text-cyan-300">
                Healthy Aquarium 🫧
              </p>

              <p className="mt-2 text-xs leading-5 text-cyan-700 dark:text-cyan-400">
                A happy betta lives in a
                clean and well-maintained
                environment.
              </p>

            </div>

          </aside>

          {/* =================================================
              MAIN CONTENT
              ================================================= */}

          <main className="min-w-0 flex-1 p-5 sm:p-8 main-content">

            <div className="main-heading mb-6">

              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Dashboard
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">                Welcome to your aquarium 🫧
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                Manage your betta fish, aquarium tank, and aquatic plants in one place.
              </p>

            </div>

            <section className="section-card mb-8 stats-grid">


              <div className="stat-card">
                <div className="flex items-center justify-between">

                  <p className="stat-label">Total Bettas</p>

                  <div className="text-2xl">🐠</div>

                </div>

                <div className="mt-3">
                  <div className="stat-value">1</div>
                  <div className="mt-1"><span className="stat-pill">Healthy</span></div>
                </div>

              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <p className="stat-label">Total Tanks</p>
                  <div className="text-2xl">🏠</div>
                </div>
                <div className="mt-3">
                  <div className="stat-value">1</div>
                  <div className="mt-1"><span className="stat-pill">Active</span></div>
                </div>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <p className="stat-label">Total Plants</p>
                  <div className="text-2xl">🌿</div>
                </div>
                <div className="mt-3">
                  <div className="stat-value">{plant.quantity}</div>
                  <div className="mt-1"><span className="stat-pill">Healthy</span></div>
                </div>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <p className="stat-label">Temperature</p>
                  <div className="text-2xl">🌡️</div>
                </div>
                <div className="mt-3">
                  <div className="stat-value">{tank.temperature}°C</div>
                  <div className="mt-1"><span className="stat-pill">Freshwater</span></div>
                </div>
              </div>

            </section>

            {/* =================================================
                BETTA NAME SECTION
                ================================================= */}

            <section className="section-card mb-8">

              <div
                className="
                  flex flex-col gap-5
                  lg:flex-row
                  lg:items-end
                  lg:justify-between
                "
              >

                <div className="flex-1">

                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    Betta Information
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                    Update your betta's display name
                  </h3>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">

                    <input
                      ref={inputRef}
                      type="text"
                      value={bettaName}
                      onChange={handleChange}
                      placeholder="Enter Betta Name"
                      className="
                        w-full rounded-xl
                        border border-slate-200
                        bg-slate-50
                        px-4 py-2.5
                        text-sm
                        text-slate-900
                        outline-none
                        transition
                        focus:border-cyan-500
                        focus:ring-2
                        focus:ring-cyan-500/20
                        dark:border-slate-700
                        dark:bg-slate-800
                        dark:text-white
                      "
                    />

                    <button
                      onClick={handleClick}
                      className="
                        rounded-xl
                        bg-cyan-600
                        px-5 py-2.5
                        text-sm font-semibold
                        text-white
                        transition
                        hover:bg-cyan-700
                      "
                    >
                      Focus Input
                    </button>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-xs text-slate-400">
                      Current Name
                    </p>

                    <p className="font-semibold text-slate-900 dark:text-white">
                      {bettaName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Previous Name
                    </p>

                    <p className="font-semibold text-slate-900 dark:text-white">
                      {previousName ?? "None"}
                    </p>
                  </div>

                </div>

              </div>

              <div className="mt-5 flex flex-wrap gap-3">

                <button
                  onClick={handleClick}
                  className="
                    rounded-xl
                    bg-blue-600
                    px-4 py-2.5
                    text-sm font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                  "
                >
                  Click Count: {visitCount}
                </button>

                <button
                  onClick={toggleInfo}
                  className="
                    rounded-xl
                    bg-slate-800
                    px-4 py-2.5
                    text-sm font-semibold
                    text-white
                    transition
                    hover:bg-slate-700
                    dark:bg-slate-700
                    dark:hover:bg-slate-600
                  "
                >
                  {showInfo
                    ? "Hide Aquarium Information"
                    : "Show Aquarium Information"}
                </button>

              </div>

            </section>

            {/* =================================================
                OVERVIEW
                ================================================= */}

            {showInfo && (

              <section className="section-card mb-6">

                <div className="mb-5">

                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    Overview
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                    Aquarium Overview
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Current information about your aquarium setup.
                  </p>

                </div>

                {/* REQUIRED RESPONSIVE GRID */}

                <div className="overview-grid">

                  <BettaCard betta={betta} />

                  <TankCard tank={tank} />

                  <PlantCard plant={plant} />

                </div>

              </section>

            )}

            {/* =================================================
                QUICK ACTIONS
                ================================================= */}

            <section className="section-card mt-8">

              <div className="mb-5">

                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  Quick Actions
                </p>

                <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  Manage Aquarium
                </h3>

              </div>

              <div className="quick-actions">


                <button
                  className="
                    rounded-2xl
                    border border-slate-200
                    bg-white p-5
                    text-left
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-md
                    dark:border-slate-800
                    dark:bg-slate-900
                  "
                >
                  <span className="text-2xl">➕</span>

                  <p className="mt-3 font-bold text-slate-900 dark:text-white">
                    Add New Betta
                  </p>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Register a new betta fish
                  </p>

                </button>

                <button
                  className="
                    rounded-2xl
                    border border-slate-200
                    bg-white p-5
                    text-left
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-md
                    dark:border-slate-800
                    dark:bg-slate-900
                  "
                >
                  <span className="text-2xl">🏠</span>

                  <p className="mt-3 font-bold text-slate-900 dark:text-white">
                    Add New Tank
                  </p>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Set up an aquarium tank
                  </p>

                </button>

                <button
                  className="
                    rounded-2xl
                    border border-slate-200
                    bg-white p-5
                    text-left
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-md
                    dark:border-slate-800
                    dark:bg-slate-900
                  "
                >
                  <span className="text-2xl">🌿</span>

                  <p className="mt-3 font-bold text-slate-900 dark:text-white">
                    Add New Plant
                  </p>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Add aquatic plants
                  </p>

                </button>

                <button
                  className="
                    rounded-2xl
                    border border-slate-200
                    bg-white p-5
                    text-left
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-md
                    dark:border-slate-800
                    dark:bg-slate-900
                  "
                >
                  <span className="text-2xl">📊</span>

                  <p className="mt-3 font-bold text-slate-900 dark:text-white">
                    View Reports
                  </p>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Check aquarium reports
                  </p>

                </button>

              </div>

            </section>

          </main>

        </div>

      </div>

    </div>
  );
}

export default App;