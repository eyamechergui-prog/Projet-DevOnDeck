import axios from "axios";
// getCurrentUser : fonction de l'équipe (authService.js) qui retourne l'utilisateur connecté avec son token
import { getCurrentUser } from "./authService";

// Les routes /api/organisation/** sont réservées aux organisations (voir SecurityConfig)
const API_URL = "http://localhost:8080/api/organisation/offres";

// on envoie le token JWT à chaque requête
const getConfig = () => {
  const user = getCurrentUser();
  return {
    headers: { Authorization: "Bearer " + user?.token },
  };
};

// US-09
export const ajouterOffre = (offre) => {
  return axios.post(API_URL, offre, getConfig());
};

// US-10
export const getMesOffres = () => {
  return axios.get(API_URL, getConfig());
};