import { useState, useEffect } from "react";
// Link permet de créer un lien vers une autre page.
import { Link } from "react-router-dom";
import { getMesOffres } from "../services/offreService"; // récupère les offres depuis le Backend.
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

        </div>
      ))}

    </div>
  );
}
export default MesOffres;
