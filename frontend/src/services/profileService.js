// Fonctions d'accès à l'API du profil développeur.
// ⚠️ ROUTES ET FORMATS SUPPOSÉS : à corriger ici uniquement, selon le backend.
import { request } from "./api.js";

// GET /profile/me -> { firstName, lastName, title, location, bio, languages: [] }
export function getMyProfile() {
  return request("/profile/me");
}

// US-05 : PUT /profile/me avec les infos personnelles
export function updatePersonalInfo(personalInfo) {
  return request("/profile/me", { method: "PUT", body: personalInfo });
}

// US-06 : PUT /profile/me/languages avec { languages: [5 noms] }
export function updateLanguages(languages) {
  return request("/profile/me/languages", { method: "PUT", body: { languages } });
}
