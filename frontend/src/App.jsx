
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MesOffres from "./pages/MesOffres";
import AjouterOffre from "./pages/AjouterOffre";

import Login from "./pages/Login";
import Developer from "./pages/Developer";
import Organization from "./pages/Organization";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";

import { useAuth } from "./context/AuthContext";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
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
      </Route>

      <Route element={<ProtectedRoute allowedRole="ORGANISATION" />}>
        <Route path="/organization" element={<Organization />} />
        <Route path="/organization/offres" element={<MesOffres />} />
        <Route path="/organization/offres/ajouter" element={<AjouterOffre />} />
      </Route>

      <Route path="/register" element={<Register />} />

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
