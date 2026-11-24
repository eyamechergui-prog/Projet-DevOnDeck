// Couche HTTP de base : URL, token JWT, gestion des erreurs.
// Aucun composant React ne doit écrire d'URL ou appeler fetch directement.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Erreur personnalisée : garde le code HTTP et les erreurs par champ.
export class ApiError extends Error {
  constructor(message, status, errors = {}) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

// ⚠️ Hypothèse : le JWT est stocké dans localStorage sous la clé "token".
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
    // fetch ne rejette que sur erreur réseau (serveur éteint, pas de connexion)
    throw new ApiError("Impossible de joindre le serveur.", 0);
  }

  // Le corps peut être vide ou non JSON : on protège le parsing.
  const data = await response.json().catch(() => ({}));

  // fetch ne rejette PAS sur 400/401/500 : on vérifie response.ok nous-mêmes.
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
    case 400: return "Données invalides.";
    case 401: return "Session expirée, veuillez vous reconnecter.";
    case 403: return "Accès refusé.";
    case 404: return "Ressource introuvable.";
    default:  return "Erreur serveur, réessayez plus tard.";
  }
}
