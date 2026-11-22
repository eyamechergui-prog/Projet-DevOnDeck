
const API_URL = "http://localhost:8080/api/auth";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Email ou mot de passe incorrect.");
  }

  if (!data.token) {
    throw new Error("Le serveur n'a pas retourné de token.");
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);
  localStorage.setItem("role", data.role);

  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
}

export function getCurrentUser() {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  if (!token || !email || !role) {
    return null;
  }

  return { token, email, role };
}


export async function register(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || data.error || "Impossible de créer le compte."
    );
  }

  return data;
}
