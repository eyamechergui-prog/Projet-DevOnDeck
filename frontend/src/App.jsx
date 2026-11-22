
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Developer from "./pages/Developer";
import Organization from "./pages/Organization";
import DeveloperProfilePage from "./profile/DeveloperProfilePage";
import FrameworksSkills from "./components/FrameworksSkills";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/login"
        element={
          user ? (
            <Navigate
              to={
                user.role === "DEVELOPPEUR"
                  ? "/developer"
                  : "/organization"
              }
              replace
            />
          ) : (
            <Login />
          )
        }
      />

      <Route element={<ProtectedRoute allowedRole="DEVELOPPEUR" />}>
        <Route path="/developer" element={<Developer />} />
        <Route path="/profile" element={<DeveloperProfilePage />} />
        <Route path="/profile/frameworks" element={<FrameworksSkills />} />
      </Route>

      <Route element={<ProtectedRoute allowedRole="ORGANISATION" />}>
        <Route path="/organization" element={<Organization />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
