const API_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"
).replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status, errors = {}) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

function getToken() {
  return localStorage.getItem("token");
}

export async function request(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("Impossible de joindre le serveur.", 0);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(
      data.message || messageForStatus(response.status),
      response.status,
      data.errors || {}
    );
  }

  return data;
}

function messageForStatus(status) {
  switch (status) {
    case 400:
      return "Données invalides.";
    case 401:
      return "Session expirée, veuillez vous reconnecter.";
    case 403:
      return "Accès refusé.";
    case 404:
      return "Ressource introuvable.";
    default:
      return "Erreur serveur, réessayez plus tard.";
  }
}
