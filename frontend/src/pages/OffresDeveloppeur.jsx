import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getOffresDisponibles,
  postuler,
} from "../services/offreDeveloppeurService";
import styles from "./OffresDeveloppeur.module.css";

// US-12 : le développeur consulte les offres et peut postuler.
function OffresDeveloppeur() {
  const [offres, setOffres] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [message, setMessage] = useState("");
  // id de l'offre en cours d'envoi (pour bloquer le double clic)
  const [envoiEnCours, setEnvoiEnCours] = useState(null);

  useEffect(() => {
    getOffresDisponibles()
      .then((response) => setOffres(response.data))
      .catch(() => setMessage("Impossible de charger les offres"))
      .finally(() => setChargement(false));
  }, []);

  const marquerPostule = (id) => {
    setOffres((anciennes) =>
      anciennes.map((offre) =>
        offre.id === id ? { ...offre, dejaPostule: true } : offre
      )
    );
  };

  const handlePostuler = async (id) => {
    setEnvoiEnCours(id);
    setMessage("");

    try {
      await postuler(id);
      marquerPostule(id);
    } catch (error) {
      const status = error.response?.status;

      if (status === 409) {
        // déjà postulé : on met simplement le bouton à jour
        marquerPostule(id);
      } else if (status === 404) {
        setMessage("Cette offre n'existe plus.");
        setOffres((anciennes) => anciennes.filter((offre) => offre.id !== id));
      } else {
        setMessage("Impossible d'envoyer votre candidature");
      }
    } finally {
      setEnvoiEnCours(null);
    }
  };

  return (
    <div className={styles.container}>
      <Link to="/developer" className={styles.retour}>
        ← Retour
      </Link>

      <h2>Offres disponibles</h2>

      {message && <p className={styles.erreur}>{message}</p>}

      {chargement && <p className={styles.vide}>Chargement...</p>}

      {!chargement && offres.length === 0 && !message && (
        <p className={styles.vide}>Aucune offre disponible pour le moment.</p>
      )}

      {offres.map((offre) => (
        <div key={offre.id} className={styles.carteOffre}>
          <h3>{offre.titre}</h3>
          <p className={styles.organisation}>{offre.organisation}</p>
          <p>{offre.description}</p>

          <div className={styles.competences}>
            {offre.competences.map((competence) => (
              <span key={competence} className={styles.badge}>
                {competence}
              </span>
            ))}
          </div>

          <p className={styles.date}>Publiée le : {offre.datePublication}</p>

          <button
            type="button"
            className={styles.postuler}
            disabled={offre.dejaPostule || envoiEnCours === offre.id}
            onClick={() => handlePostuler(offre.id)}
          >
            {offre.dejaPostule
              ? "Candidature envoyée ✓"
              : envoiEnCours === offre.id
                ? "Envoi..."
                : "Postuler"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default OffresDeveloppeur;
