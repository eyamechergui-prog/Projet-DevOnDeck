
import { createContext, useContext, useState } from "react";
import {
  getCurrentUser,
  login as loginService,
  logout as logoutService,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());

  async function login(email, password) {
    const data = await loginService(email, password);
    setUser({
      token: data.token,
      email: data.email,
      role: data.role,
    });

    return data;
  }

  function logout() {
    logoutService();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
