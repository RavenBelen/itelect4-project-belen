import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router";
import useAuthStore from "../store/authStore";
import useUiStore from "../store/uiStore";

function Layout() {
  const navigate = useNavigate();
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const darkMode = useUiStore((state) => state.isDarkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
      isActive
        ? "bg-white/20 text-white shadow-sm font-bold"
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-1 flex-col items-center justify-center py-2 text-xs font-semibold transition ${
      isActive
        ? "text-teal-600 dark:text-teal-400 font-bold"
        : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
    }`;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="flex min-h-screen">
        {/* SIDEBAR (Desktop) */}
        <aside className="hidden w-64 shrink-0 bg-gradient-to-b from-[#0b535d] via-[#09434d] to-[#082332] p-5 text-white md:flex md:flex-col">
          {/* Logo / Brand Header */}
          <div className="mb-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-2xl shadow-inner">
                🐟
              </div>

              <div>
                <h1 className="text-base font-extrabold tracking-tight text-white">
                  Betta Manager
                </h1>
                <p className="text-[11px] text-teal-200/80">
                  Aquarium System
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1.5">
            <NavLink to="/" end className={navClass}>
              <span className="text-base">📊</span> <span>Dashboard</span>
            </NavLink>

            <NavLink to="/bettas" className={navClass}>
              <span className="text-base">🐟</span> <span>Betta Fish</span>
            </NavLink>

            <NavLink to="/tanks" className={navClass}>
              <span className="text-base">🫧</span> <span>Aquarium Tank</span>
            </NavLink>

            <NavLink to="/plants" className={navClass}>
              <span className="text-base">🌿</span> <span>Aquatic Plants</span>
            </NavLink>

            <NavLink to="/reports" className={navClass}>
              <span className="text-base">📄</span> <span>Reports</span>
            </NavLink>

            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <span className="text-base">⚙️</span> <span>Settings</span>
            </button>

            <button
              onClick={() => setShowAbout(true)}
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <span className="text-base">ℹ️</span> <span>About</span>
            </button>
          </nav>

          {/* Healthy Aquarium Info Card */}
          <div className="mt-auto rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="mb-1 text-lg">🌿</div>
            <h3 className="text-xs font-bold text-white">Healthy Aquarium</h3>
            <p className="mt-1 text-[11px] leading-relaxed text-white/70">
              A happy betta lives in a clean and well-maintained environment.
            </p>
          </div>

          {/* User Auth Info */}
          <div className="mt-4 border-t border-white/10 pt-3">
            {userName ? (
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] uppercase font-medium text-teal-200/70">User</p>
                  <p className="truncate text-xs font-bold text-white">{userName}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-rose-500/20 px-2.5 py-1 text-xs font-semibold text-rose-200 transition hover:bg-rose-600 hover:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block w-full rounded-xl bg-teal-500/30 px-3 py-2 text-center text-xs font-bold text-white transition hover:bg-teal-500"
              >
                Sign In
              </Link>
            )}
          </div>
        </aside>

        {/* MAIN COLUMN */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top Bar with Dark Mode Toggle */}
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="text-xl md:hidden">🐟</span>
              <span className="text-sm font-bold text-slate-800 dark:text-white md:hidden">
                Betta Manager
              </span>
              <span className="hidden text-xs font-semibold text-slate-400 dark:text-slate-500 md:inline-block">
                Betta Manager Dashboard
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>

              {userName && (
                <div className="hidden items-center gap-2 rounded-xl bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 sm:inline-flex">
                  <span>👤</span>
                  <span>{userName}</span>
                </div>
              )}
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 pb-20 md:pb-8">
            <Outlet />
          </main>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-slate-200 bg-white/95 px-2 py-1 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 md:hidden">
        <NavLink to="/" end className={mobileNavClass}>
          <span className="text-base">📊</span>
          <span>Home</span>
        </NavLink>

        <NavLink to="/bettas" className={mobileNavClass}>
          <span className="text-base">🐟</span>
          <span>Bettas</span>
        </NavLink>

        <NavLink to="/tanks" className={mobileNavClass}>
          <span className="text-base">🫧</span>
          <span>Tanks</span>
        </NavLink>

        <NavLink to="/plants" className={mobileNavClass}>
          <span className="text-base">🌿</span>
          <span>Plants</span>
        </NavLink>

        <NavLink to="/reports" className={mobileNavClass}>
          <span className="text-base">📄</span>
          <span>Reports</span>
        </NavLink>
      </nav>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-100 text-2xl dark:bg-teal-900/40">
                🐟
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Betta Manager System
                </h3>
                <p className="text-xs text-teal-600 dark:text-teal-400">
                  Version 1.0 - GT3 Part 1
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Betta Manager is a specialized aquarium management web application developed for monitoring betta fish profiles, tank setups, aquatic plants, and protected water quality reports.
            </p>

            <button
              onClick={() => setShowAbout(false)}
              className="mt-6 w-full rounded-xl bg-teal-600 py-2.5 text-xs font-bold text-white transition hover:bg-teal-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-2xl dark:bg-slate-800">
                ⚙️
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  System Preferences
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Manage display & app settings
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Appearance</p>
                  <p className="text-[11px] text-slate-500">Dark / Light Mode theme</p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className="rounded-lg bg-teal-600 px-3 py-1 text-xs font-semibold text-white"
                >
                  {darkMode ? "Dark" : "Light"}
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Temperature Unit</p>
                  <p className="text-[11px] text-slate-500">Default Celsius (°C)</p>
                </div>
                <span className="text-xs font-bold text-teal-600">°C</span>
              </div>
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="mt-6 w-full rounded-xl bg-slate-800 py-2.5 text-xs font-bold text-white transition hover:bg-slate-700 dark:bg-slate-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
