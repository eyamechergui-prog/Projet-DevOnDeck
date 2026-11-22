import { useState, useEffect } from "react";
import { getMyProfile } from "../services/profileService.js";

// Charge le profil de l'utilisateur connecté au montage de la page.
export default function useProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false; // évite de modifier l'état si le composant est démonté

    getMyProfile()
      .then((data) => !cancelled && setProfile(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setIsLoading(false));

    return () => { cancelled = true; };
  }, []); // [] = exécuté une seule fois

  return { profile, isLoading, error };
}
