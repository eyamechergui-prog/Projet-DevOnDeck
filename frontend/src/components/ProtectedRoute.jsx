
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRole }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    if (user.role === "DEVELOPPEUR") {
      return <Navigate to="/developer" replace />;
    }

    if (user.role === "ORGANISATION") {
      return <Navigate to="/organization" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
