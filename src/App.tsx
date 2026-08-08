import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import BettaCard from "./components/BettaCard";
import TankCard from "./components/TankCard";
import PlantCard from "./components/PlantCard";

import "./App.css";
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
      <main className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">

          <aside className="space-y-6">
            <div className="sidebar-card p-6">
              <div className="mb-8 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
                    Betta Manager
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-white">
                    Dashboard
                  </h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500/10 text-xl text-sky-300">
                  🐠
                </div>
              </div>
              <p className="text-sm leading-6 text-slate-400">
                Manage your betta fish, aquarium tank, and aquatic plants in one place.
              </p>
            </div>

            <div className="sidebar-card p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Menu
              </p>
              <nav className="space-y-2">
                {[
                  "Dashboard",
                  "Betta Fish",
                  "Aquarium Tank",
                  "Aquatic Plants",
                  "Reports",
                  "Settings",
                  "About",
                ].map((item) => (
                  <button
                    key={item}
                    className={`w-full rounded-3xl px-4 py-3 text-left text-sm font-semibold transition ${
                      item === "Dashboard"
                        ? "bg-slate-900 text-white"
                        : "bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="sidebar-card p-6">
              <p className="text-sm font-semibold text-white">Healthy Aquarium</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                A happy betta lives in a clean and well-maintained environment.
              </p>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="dashboard-card p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
                    Dashboard
                  </p>
                  <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                    Welcome to your aquarium
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                    Track your betta fish, aquarium tank status, and plant setup from one intuitive dashboard.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleDarkMode}
                    className="rounded-3xl bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                  </button>
                  <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-slate-900/70 text-xl text-slate-300 sm:flex">
                    👤
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { title: "Total Bettas", value: "12", badge: "Healthy" },
                  { title: "Total Tanks", value: "4", badge: "Active" },
                  { title: "Total Plants", value: "15", badge: "Healthy" },
                  { title: "Last Updated", value: "Today", badge: "Just now" },
                ].map((item) => (
                  <div key={item.title} className="stat-card p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      {item.title}
                    </p>
                    <p className="mt-4 text-3xl font-bold text-white">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-400">{item.badge}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Overview
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white">
                    Aquarium Information
                  </h2>
                </div>
                <button
                  onClick={toggleInfo}
                  className="rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
                >
                  {showInfo ? "Hide Overview" : "Show Overview"}
                </button>
              </div>

              {showInfo && (
                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                  <BettaCard betta={{ ...betta, name: bettaName }} />
                  <TankCard tank={tank} />
                  <PlantCard plant={plant} />
                </div>
              )}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="dashboard-card p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      Betta Control
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      Update your betta details
                    </h2>
                  </div>
                  <button
                    onClick={handleClick}
                    className="rounded-3xl bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Save Name
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-[1.4fr_0.9fr]">
                  <input
                    ref={inputRef}
                    type="text"
                    value={bettaName}
                    onChange={handleChange}
                    placeholder="Enter Betta Name"
                    className="AppInput w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400"
                  />
                  <button
                    onClick={handleClick}
                    className="rounded-3xl bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Focus Input
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="stat-card p-5">
                    <p className="text-sm text-slate-400">Current Name</p>
                    <p className="mt-3 text-lg font-semibold text-white">{bettaName}</p>
                  </div>
                  <div className="stat-card p-5">
                    <p className="text-sm text-slate-400">Previous Name</p>
                    <p className="mt-3 text-lg font-semibold text-white">{previousName ?? "None"}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <button
                    onClick={handleClick}
                    className="rounded-3xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Clicks: {visitCount}
                  </button>
                  <button
                    onClick={handleError}
                    className="rounded-3xl bg-slate-900/70 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Simulate Error
                  </button>
                  <button
                    onClick={handleRetry}
                    className="rounded-3xl bg-slate-900/70 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Refresh Data
                  </button>
                </div>
              </div>

              <div className="dashboard-card p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      Quick Actions
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      Shortcuts
                    </h2>
                  </div>
                  <span className="rounded-full bg-slate-900/60 px-3 py-1 text-xs font-semibold text-slate-300">
                    4 actions
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Add New Betta", detail: "Register a new betta fish" },
                    { label: "Add New Tank", detail: "Set up a new aquarium tank" },
                    { label: "Add New Plant", detail: "Add aquatic plants" },
                    { label: "View Reports", detail: "Check aquarium reports" },
                  ].map((action) => (
                    <div key={action.label} className="action-card p-4">
                      <p className="text-sm font-semibold text-white">{action.label}</p>
                      <p className="mt-2 text-sm text-slate-400">{action.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <footer className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 text-center text-sm text-slate-400">
              🐠 Betta Fish Management System
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;