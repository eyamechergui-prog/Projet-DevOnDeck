// US-06 : sélection de exactement 5 langages parmi une liste prédéfinie.
import { useState } from "react";
import LanguageOption from "./LanguageOption.jsx";
import StatusMessage from "../common/StatusMessage.jsx";
import { AVAILABLE_LANGUAGES, MAX_LANGUAGES } from "../../constants/languages.js";
import { validateLanguages } from "../../utils/validators.js";
import { updateLanguages } from "../../services/profileService.js";

function LanguageSelector({ initialLanguages = [] }) {
  const [selected, setSelected] = useState(initialLanguages);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  // Valeurs dérivées : calculées à chaque rendu, pas stockées dans l'état
  const count = selected.length;
  const isLimitReached = count >= MAX_LANGUAGES;

  // Sélectionner ou désélectionner
  const handleToggle = (language) => {
    setStatus("idle");
    setMessage("");
    setSelected((previous) =>
      previous.includes(language)
        ? previous.filter((item) => item !== language) // retire (nouveau tableau)
        : previous.length < MAX_LANGUAGES
          ? [...previous, language]                    // ajoute (nouveau tableau)
          : previous                                   // limite atteinte : rien ne change
    );
  };

  const handleSave = async () => {
    const validationError = validateLanguages(selected);
    if (validationError) {
      setStatus("error");
      setMessage(validationError);
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      await updateLanguages(selected);
      setStatus("success");
      setMessage("Langages enregistrés avec succès.");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  const isLoading = status === "loading";

  return (
    <section className="card">
      <h2>Mes {MAX_LANGUAGES} langages principaux</h2>
      <p className="counter">{count} / {MAX_LANGUAGES} sélectionnés</p>

      <div className="language-grid">
        {AVAILABLE_LANGUAGES.map((language) => {
          const isSelected = selected.includes(language);
          return (
            <LanguageOption
              key={language}
              name={language}
              isSelected={isSelected}
              // on bloque les non-sélectionnés quand la limite est atteinte
              disabled={isLimitReached && !isSelected}
              onToggle={handleToggle}
            />
          );
        })}
      </div>

      <button type="button" onClick={handleSave} disabled={isLoading}>
        {isLoading ? "Enregistrement…" : "Enregistrer la sélection"}
      </button>

      <StatusMessage type={status === "success" ? "success" : "error"} message={message} />
    </section>
  );
}

export default LanguageSelector;
