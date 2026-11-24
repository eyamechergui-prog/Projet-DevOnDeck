import { useState, useEffect } from "react";
// Link permet de créer un lien vers une autre page.
import { Link } from "react-router-dom";
import { getMesOffres, supprimerOffre } from "../services/offreService"; // récupère les offres depuis le Backend.
// On importe le design de la page.
import styles from "./MesOffres.module.css";

// Création du composant MesOffres.
function MesOffres() {
  const [offres, setOffres] = useState([]);
  const [message, setMessage] = useState("");

  // useEffect permet d'exécuter une action après l'affichage du composant.
  useEffect(() => {

    // On appelle la fonction getMesOffres() pour récupérer les offres.
    getMesOffres()
      .then((response) => {
        setOffres(response.data); // mise à jour du tab aprés avoir récupéré les offres du backend
      })
      .catch(() => {
        setMessage("Impossible de charger les offres");
      });
  }, []);

  // US-11 : supprimer une offre après confirmation.
  const handleSupprimer = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette offre ?")) {
      return;
    }

    try {
      await supprimerOffre(id);
      // On retire l'offre supprimée de la liste affichée, sans recharger la page.
      setOffres((anciennes) => anciennes.filter((offre) => offre.id !== id));
      setMessage("");
    } catch (error) {
      if (error.response?.status === 404) {
        setMessage("Cette offre n'existe plus.");
        setOffres((anciennes) => anciennes.filter((offre) => offre.id !== id));
      } else {
        setMessage("Impossible de supprimer l'offre");
      }
    }
  };

  // Partie visuelle de la page.
  return (

    // Conteneur principal.
    <div className={styles.container}>
      <h2>Mes offres</h2>

      <Link to="/organization/offres/ajouter">

        
        <button>Ajouter un poste</button>

      </Link>

      
      {message && <p className={styles.erreur}>{message}</p>}

      
      {offres.length === 0 && !message && (
        <p>Aucune offre publiée pour le moment.</p>
      )}

      
      {offres.map((offre) => (

        // key permet d'identifier chaque carte de manière unique.
        <div key={offre.id} className={styles.carteOffre}>

          
          <h3>{offre.titre}</h3>

         
          <p>{offre.description}</p>

          
          <p>
            <b>Compétences :</b> {offre.competences.join(", ")}
          </p>

          
          <p>Publiée le : {offre.datePublication}</p>

          <button
            type="button"
            className={styles.supprimer}
            onClick={() => handleSupprimer(offre.id)}
          >
            Supprimer
          </button>

        </div>
      ))}

    </div>
  );
}
export default MesOffres;
