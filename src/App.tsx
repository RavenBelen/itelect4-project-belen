﻿import { useEffect, useState } from "react";
import BettaCard from "./components/BettaCard";
import TankCard from "./components/TankCard";
import PlantCard from "./components/PlantCard";
import { usePrevious } from "./hooks/usePrevious";
import { useToggle } from "./hooks/useToggle";
import type { Betta, Tank, Plant } from "./types";

const bettaData: Betta = {
  id: 1,
  name: "KCT Hulk",
  strain: "Halfmoon",
  gender: "Male",
  age: 4,
  price: 2500,
  status: "Healthy",
};

const tankData: Tank = {
  id: 1,
  size: "5 Gallons",
  waterType: "Freshwater",
  temperature: 26,
  hasFilter: true,
};

const plantData: Plant = {
  id: 1,
  name: "Anubias Nana Petite",
  type: "Foreground",
  quantity: 3,
};

function App() {
  const [bettaName, setBettaName] = useState(bettaData.name);
  const [clickCount, setClickCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getInitialDarkMode = () => {
    if (typeof window === "undefined") return false;
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
  };

  const { value: darkMode, toggle: toggleDarkMode } = useToggle(getInitialDarkMode());
  const previousName = usePrevious(bettaName);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleNameChange = () => {
    const trimmed = bettaName.trim();
    if (!trimmed) {
      setBettaName(bettaData.name);
    }
  };

  return (
    <div className="app">
      {sidebarOpen && <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar ${sidebarOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="logo-icon">🐟</div>
          <div className="logo-text">
            <h2>Betta Manager</h2>
            <p>Aquarium System</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">
            <span className="nav-icon">⌂</span>
            <span>Dashboard</span>
          </button>
          <button className="nav-item">
            <span className="nav-icon">🐟</span>
            <span>Betta Fish</span>
          </button>
          <button className="nav-item">
            <span className="nav-icon">▣</span>
            <span>Aquarium Tank</span>
          </button>
          <button className="nav-item">
            <span className="nav-icon">🌿</span>
            <span>Aquatic Plants</span>
          </button>
          <button className="nav-item">
            <span className="nav-icon">▤</span>
            <span>Reports</span>
          </button>
          <button className="nav-item">
            <span className="nav-icon">⚙</span>
            <span>Settings</span>
          </button>
          <button className="nav-item">
            <span className="nav-icon">ⓘ</span>
            <span>About</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-bottom-icon">🌿</div>
          <h3>Healthy Aquarium</h3>
          <p>A happy betta lives in a clean and well-maintained environment.</p>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <div className="header-left">
            <button className="mobile-menu" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <div>
              <p className="eyebrow">Dashboard</p>
              <h1>Welcome to your aquarium 🫧</h1>
              <p>Manage your betta fish, aquarium tank, and aquatic plants in one place.</p>
            </div>
          </div>

          <div className="header-right">
            <button className="dark-toggle" onClick={toggleDarkMode}>
              {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🐟</div>
            <div className="stat-info">
              <span className="stat-label">Betta</span>
              <strong className="stat-value">1</strong>
              <span className="stat-status">Healthy</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">▣</div>
            <div className="stat-info">
              <span className="stat-label">Tanks</span>
              <strong className="stat-value">1</strong>
              <span className="stat-status">Active</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌿</div>
            <div className="stat-info">
              <span className="stat-label">Plants</span>
              <strong className="stat-value">{plantData.quantity}</strong>
              <span className="stat-status">Healthy</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⟳</div>
            <div className="stat-info">
              <span className="stat-label">Update</span>
              <strong className="stat-value">Latest</strong>
              <span className="stat-status">Just now</span>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-title">
            <h2>Overview</h2>
          </div>
          <div className="overview-grid">
            <BettaCard betta={bettaData} />
            <TankCard tank={tankData} />
            <PlantCard plant={plantData} />
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-title">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <button className="action-card" onClick={() => setClickCount((count) => count + 1)}>
              <div className="action-icon">＋</div>
              <div>
                <strong>Add New Betta</strong>
                <span>Add a new betta fish</span>
              </div>
            </button>
            <button className="action-card" onClick={() => setClickCount((count) => count + 1)}>
              <div className="action-icon">🏠</div>
              <div>
                <strong>Add New Tank</strong>
                <span>Set up a new aquarium tank</span>
              </div>
            </button>
            <button className="action-card" onClick={() => setClickCount((count) => count + 1)}>
              <div className="action-icon">🌱</div>
              <div>
                <strong>Add New Plant</strong>
                <span>Add aquatic plants</span>
              </div>
            </button>
            <button className="action-card" onClick={() => setClickCount((count) => count + 1)}>
              <div className="action-icon">📊</div>
              <div>
                <strong>View Reports</strong>
                <span>Check aquarium reports</span>
              </div>
            </button>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-title">
            <h2>Betta Name</h2>
          </div>
          <div className="function-card">
            <div className="function-body">
              <p>Update your betta's display name.</p>
              <input
                type="text"
                value={bettaName}
                onChange={(e) => setBettaName(e.target.value)}
                onBlur={handleNameChange}
              />
            </div>
            <div className="name-information">
              <div>
                <span>Current Name</span>
                <strong>{bettaName}</strong>
              </div>
              <div>
                <span>Previous Name</span>
                <strong>{previousName || bettaData.name}</strong>
              </div>
            </div>
            <div className="function-buttons">
              <button className="primary-button" onClick={() => setClickCount((count) => count + 1)}>
                Click Count: {clickCount}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;