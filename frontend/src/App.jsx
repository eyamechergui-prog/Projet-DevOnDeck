
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Developer from "./pages/Developer";
import Organization from "./pages/Organization";
import ProtectedRoute from "./components/ProtectedRoute";

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
