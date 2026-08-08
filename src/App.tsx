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

// =====================================================
// MOCK DATA
// =====================================================

const mockBetta: Betta = {
  id: 1,
  name: "KCT Hulk",
  strain: "Halfmoon",
  gender: "Male",
  age: 4,
  price: 2500,
  status: "healthy",
};

const mockTank: Tank = {
  id: 1,
  size: "5 Gallons",
  waterType: "Freshwater",
  temperature: 26,
  hasFilter: true,
};

const mockPlant: Plant = {
  id: 1,
  name: "Anubias Nana Petite",
  type: "Foreground",
  quantity: 3,
};

// =====================================================
// APP
// =====================================================

function App() {
  // ===================================================
  // GT2 PART 2 - DYNAMIC STATE
  // ===================================================

  const [betta, setBetta] =
    useState<Betta | null>(null);

  const [tank, setTank] =
    useState<Tank | null>(null);

  const [plant, setPlant] =
    useState<Plant | null>(null);

  const [isLoading, setIsLoading] =
    useState<boolean>(true);

  // ===================================================
  // GT2 PART 3 - ERROR STATE
  // ===================================================

  const [isError, setIsError] =
    useState<boolean>(false);

  // ===================================================
  // useState #1
  // ===================================================

  const [bettaName, setBettaName] =
    useState<string>("");

  // ===================================================
  // useState #2
  // ===================================================

  const [visitCount, setVisitCount] =
    useState<number>(0);

  // ===================================================
  // DARK MODE
  // Uses localStorage and document root class
  // ===================================================

  const [isDarkMode, setIsDarkMode] =
    useState<boolean>(() => {
      if (typeof window === "undefined") {
        return false;
      }

      const savedTheme =
        window.localStorage.getItem(
          "betta-theme"
        );

      if (savedTheme === "dark") {
        return true;
      }

      if (savedTheme === "light") {
        return false;
      }

      return window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    });

  const toggleDarkMode = (): void => {
    setIsDarkMode(
      (previous: boolean) => !previous,
    );
  };

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      isDarkMode,
    );

    window.localStorage.setItem(
      "betta-theme",
      isDarkMode ? "dark" : "light",
    );
  }, [isDarkMode]);

  // ===================================================
  // SHOW / HIDE AQUARIUM
  // ===================================================

  const {
    value: showInfo,
    toggle: toggleInfo,
  } = useToggle(true);

  // ===================================================
  // usePrevious
  // ===================================================

  const previousName =
    usePrevious(bettaName);

  // ===================================================
  // useRef
  // ===================================================

  const inputRef =
    useRef<HTMLInputElement>(null);

  // ===================================================
  // useEffect
  // LOAD MOCK DATA
  // ===================================================

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setBetta(mockBetta);
        setTank(mockTank);
        setPlant(mockPlant);

        setBettaName(mockBetta.name);

        setIsLoading(false);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
    }, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  // ===================================================
  // useEffect
  // UPDATE BROWSER TAB TITLE
  // ===================================================

  useEffect(() => {
    if (bettaName !== "") {
      document.title = `Betta: ${bettaName}`;
    }
  }, [bettaName]);

  // ===================================================
  // TYPED CHANGE EVENT
  // ===================================================

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setBettaName(event.target.value);
  };

  // ===================================================
  // BUTTON HANDLER
  // ===================================================

  const handleClick = (): void => {
    setVisitCount(
      (previous: number) =>
        previous + 1,
    );

    inputRef.current?.focus();
  };

  // ===================================================
  // SIMULATE ERROR
  // ===================================================

  const handleError = (): void => {
    setIsError(true);
  };

  // ===================================================
  // RETRY
  // ===================================================

  const handleRetry = (): void => {
    setIsError(false);
    setIsLoading(true);

    window.setTimeout(() => {
      setBetta(mockBetta);
      setTank(mockTank);
      setPlant(mockPlant);
      setBettaName(mockBetta.name);
      setIsLoading(false);
    }, 500);
  };

  // ===================================================
  // LOADING STATE
  // ===================================================

  if (isLoading) {
    return (
      <div
        className={
          isDarkMode
            ? "dark"
            : ""
        }
      >
        <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6 dark:bg-slate-950">
          <div className="w-full max-w-md animate-pulse rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-700 dark:bg-slate-800">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-3xl dark:bg-teal-900/40">
              🐠
            </div>

            <div className="mx-auto mb-3 h-6 w-48 rounded bg-slate-200 dark:bg-slate-700" />

            <div className="mx-auto h-4 w-64 rounded bg-slate-200 dark:bg-slate-700" />

            <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
              Loading aquarium data...
            </p>
          </div>
        </main>
      </div>
    );
  }

  // ===================================================
  // ERROR STATE
  // ===================================================

  if (
    isError ||
    betta === null ||
    tank === null ||
    plant === null
  ) {
    return (
      <div
        className={
          isDarkMode
            ? "dark"
            : ""
        }
      >
        <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6 dark:bg-slate-950">
          <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-xl dark:border-red-900/50 dark:bg-slate-800">
            <div className="mb-4 text-5xl">
              ⚠️
            </div>

            <h1 className="text-2xl font-bold text-red-700 dark:text-red-400">
              Aquarium Data Error
            </h1>

            <p className="mt-2 text-slate-600 dark:text-slate-300">
              We could not load your aquarium information.
            </p>

            <button
              onClick={handleRetry}
              className="mt-6 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ===================================================
  // MAIN APPLICATION
  // ===================================================

  return (
    <div
      className={
        isDarkMode
          ? "dark"
          : ""
      }
    >
      <main className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">

        {/* ===========================================
            HEADER
        =========================================== */}

        <header className="border-b border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">
                  🐠
                </span>

                <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
                  Betta Manager
                </p>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Aquarium Management System
              </h1>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Manage your betta fish, aquarium tank,
                and aquatic plants in one place.
              </p>
            </div>

            <button
              onClick={toggleDarkMode}
              className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-700 dark:bg-amber-300 dark:text-slate-900 dark:hover:bg-amber-200"
            >
              {isDarkMode
                ? "☀️ Light Mode"
                : "🌙 Dark Mode"}
            </button>
          </div>
        </header>

        {/* ===========================================
            CONTENT
        =========================================== */}

        <section className="mx-auto max-w-7xl px-6 py-8">

          {/* Dashboard Heading */}

          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Aquarium Dashboard
            </p>

            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              Welcome to your aquarium 🫧
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Keep track of your betta, tank, and aquatic
              plants.
            </p>
          </div>

          {/* =========================================
              BETTA MANAGEMENT
          ========================================= */}

          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
                Betta Information
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Update Your Betta
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Change your betta's display name.
              </p>
            </div>

            {/* Input Area */}

            <div className="flex flex-col gap-3 sm:flex-row">

              <input
                ref={inputRef}
                type="text"
                value={bettaName}
                onChange={handleChange}
                placeholder="Enter Betta Name"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 sm:max-w-md"
              />

              <button
                onClick={handleClick}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Focus Input
              </button>
            </div>

            {/* Name Information */}

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Current Name
                </p>

                <p className="mt-1 text-lg font-bold">
                  {bettaName}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Previous Name
                </p>

                <p className="mt-1 text-lg font-bold">
                  {previousName ?? "None"}
                </p>
              </div>

            </div>

            {/* Action Buttons */}

            <div className="mt-5 flex flex-wrap gap-3">

              <button
                onClick={handleClick}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Click Count: {visitCount}
              </button>

              <button
                onClick={toggleInfo}
                className="rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
              >
                {showInfo
                  ? "Hide Aquarium Information"
                  : "Show Aquarium Information"}
              </button>

              <button
                onClick={handleError}
                className="rounded-xl bg-red-100 px-5 py-3 font-semibold text-red-700 transition hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
              >
                Simulate Error
              </button>

            </div>
          </section>

          {/* =========================================
              AQUARIUM OVERVIEW
          ========================================= */}

          {showInfo && (
            <section>

              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Overview
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Aquarium Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Current information about your aquarium setup.
                </p>
              </div>

              {/* RESPONSIVE GRID
                  Mobile: 1
                  sm: 2
                  lg: 3
              */}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                <BettaCard
                  betta={{
                    ...betta,
                    name: bettaName,
                  }}
                />

                <TankCard tank={tank} />

                <PlantCard plant={plant} />

              </div>

            </section>
          )}

        </section>

        {/* ===========================================
            FOOTER
        =========================================== */}

        <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6 py-5 text-center text-sm text-slate-500 dark:text-slate-400">
            🐠 Betta Fish Management System
          </div>
        </footer>

      </main>
    </div>
  );
}

export default App;