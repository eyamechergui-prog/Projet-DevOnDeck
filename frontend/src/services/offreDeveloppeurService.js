import axios from "axios";
import { getCurrentUser } from "./authService";

// Les routes /api/developpeur/** sont réservées aux développeurs (voir SecurityConfig)
const API_URL = "http://localhost:8080/api/developpeur/offres";

// on envoie le token JWT à chaque requête
const getConfig = () => {
  const user = getCurrentUser();
  return {
    headers: { Authorization: "Bearer " + user?.token },
  };
};

// US-12 : toutes les offres publiées (avec "dejaPostule" pour chaque offre)
export const getOffresDisponibles = () => {
  return axios.get(API_URL, getConfig());
};

// US-12 : postuler à une offre
export const postuler = (offreId) => {
  return axios.post(`${API_URL}/${offreId}/candidatures`, null, getConfig());
};
