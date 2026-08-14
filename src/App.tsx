import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import BettaPage from "./pages/BettaPage";
import BettaDetailPage from "./pages/BettaDetailPage";
import TankPage from "./pages/TankPage";
import PlantPage from "./pages/PlantPage";
import ReportsPage from "./pages/ReportsPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* Main Layout Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/bettas" element={<BettaPage />} />
        <Route path="/bettas/:id" element={<BettaDetailPage />} />
        <Route path="/tanks" element={<TankPage />} />
        <Route path="/plants" element={<PlantPage />} />

        {/* Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/reports" element={<ReportsPage />} />
        </Route>

        {/* Auth Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Fallback 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;