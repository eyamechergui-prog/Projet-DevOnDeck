// Validation pure : reçoit des données, renvoie un objet d'erreurs ({} = valide).
// La validation côté client améliore l'expérience ; le backend doit la refaire.
import { MAX_LANGUAGES } from "../constants/languages.js";

export const BIO_MAX_LENGTH = 500;

export function validatePersonalInfo(data) {
  const errors = {};

  if (!data.firstName.trim()) errors.firstName = "Le prénom est obligatoire.";
  else if (data.firstName.trim().length < 2)
    errors.firstName = "Le prénom doit contenir au moins 2 caractères.";

  if (!data.lastName.trim()) errors.lastName = "Le nom est obligatoire.";
  else if (data.lastName.trim().length < 2)
    errors.lastName = "Le nom doit contenir au moins 2 caractères.";

  if (!data.title.trim()) errors.title = "Le titre professionnel est obligatoire.";
  if (!data.location.trim()) errors.location = "La localisation est obligatoire.";

  if (data.bio.length > BIO_MAX_LENGTH)
    errors.bio = `La bio ne doit pas dépasser ${BIO_MAX_LENGTH} caractères.`;

  return errors;
}

export function validateLanguages(languages) {
  if (languages.length !== MAX_LANGUAGES)
    return `Sélectionnez exactement ${MAX_LANGUAGES} langages.`;
  return "";
}
