// On importe useState pour gérer les données et les messages de la page.
import { useState } from "react";
// useNavigate permet de naviguer vers une autre page.
import { useNavigate } from "react-router-dom";
// On importe la fonction qui permet d'ajouter une offre au Backend.( spring boot)
import { ajouterOffre } from "../services/offreService";
// On importe le design de la page.
import styles from "./AjouterOffre.module.css";
// Création du composant AjouterOffre.
function AjouterOffre() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [competences, setCompetences] = useState("");
  const [message, setMessage] = useState(""); // les messages d'erreur
  const navigate = useNavigate(); // On initialise la navigation entre les pages.

  // Fonction exécutée lorsque l'utilisateur valide le formulaire.
  const handleSubmit = async (e) => {

    // Empêche le rechargement automatique de la page.
    e.preventDefault();
    if (titre === "" || description === "" || competences === "") {
      setMessage("Veuillez remplir tous les champs");
      return;
    }
    const liste = competences
      .split(",")
      .map((c) => c.trim()) // map() supprime les espaces inutiles autour de chaque compétence.
      .filter((c) => c !== ""); // // filter() supprime les éléments vides.

    // try permet d'exécuter le code qui peut provoquer une erreur.
    try {
      await ajouterOffre({
        titre,
        description,
        competences: liste
      });

      // Si l'ajout réussit, on retourne au tableau de bord.
      navigate("/organization/offres");

    } catch (error) {
      console.log(error);

      // Vérifier si le serveur a envoyé une réponse d'erreur.
      if (error.response) {

        // Le serveur a répondu avec un code d'erreur.
        setMessage(
          "Erreur " + error.response.status + " : " + error.response.data
        );

      } else {

        // Le serveur n'a pas répondu.( l'app n'est pas liée au spring boot)
        setMessage("Impossible de contacter le serveur");
      }
    }
  };

  // Partie visuelle de la page.
  return (

    // Conteneur principal de la page.
    <div className={styles.container}>

      <h2>Ajouter un poste</h2>

     
      <form onSubmit={handleSubmit}> 

      
        <label>Titre</label>

        <input
          type="text"

          value={titre}
          // À chaque saisie, on met à jour titre.
          onChange={(e) => setTitre(e.target.value)}
          placeholder="Ex : Développeur Back-End"
        />

        <label>Description</label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Décrivez le poste"
        />

        <label>Compétences recherchées</label>

        <input
          type="text"
          value={competences}
          onChange={(e) => setCompetences(e.target.value)}
          placeholder="Ex : Java, Spring, SQL"
        />
        {message && <p className={styles.erreur}>{message}</p>}
        <button type="submit">Ajouter le poste</button>

      </form>
    </div>
  );
}

// On exporte le composant pour pouvoir l'utiliser dans App.jsx.
export default AjouterOffre;