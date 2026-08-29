import { Navigate, Routes, Route } from "react-router";
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
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/bettas" element={<BettaPage />} />
        <Route path="/bettas/:id" element={<BettaDetailPage />} />
        <Route path="/tanks" element={<TankPage />} />
        <Route path="/plants" element={<PlantPage />} />

        <Route path="/reports" element={<ReportsPage />} />

        {/* Fallback 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
