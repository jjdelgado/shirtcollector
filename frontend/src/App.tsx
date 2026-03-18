import { Navigate, Route, Routes } from "react-router-dom";
import { AppShellLayout } from "./components/layout/AppShellLayout";
import { CollectionPage } from "./pages/CollectionPage";
import { ShirtsPage } from "./pages/ShirtsPage";
import { StatsPage } from "./pages/StatsPage";
import { TeamsPage } from "./pages/TeamsPage";

export default function App() {
  return (
    <AppShellLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/teams" replace />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/shirts" element={<ShirtsPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </AppShellLayout>
  );
}