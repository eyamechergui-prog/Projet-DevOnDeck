import { useState } from "react";
import LanguageOption from "./LanguageOption";
import StatusMessage from "../common/StatusMessage";
import { AVAILABLE_LANGUAGES, MAX_LANGUAGES } from "../../constants/languages";
import { validateLanguages } from "../../utils/validators";
import { updateLanguages } from "../../services/profileService";

function LanguageSelector({ initialLanguages = [] }) {
  const [selected, setSelected] = useState(initialLanguages);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const count = selected.length;
  const isLimitReached = count >= MAX_LANGUAGES;

  const handleToggle = (language) => {
    setStatus("idle");
    setMessage("");
    setSelected((previous) =>
      previous.includes(language)
        ? previous.filter((item) => item !== language)
        : previous.length < MAX_LANGUAGES
          ? [...previous, language]
          : previous
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
              disabled={isLimitReached && !isSelected}
              onToggle={handleToggle}
            />
          );
        })}
      </div>

      <button type="button" onClick={handleSave} disabled={isLoading}>
        {isLoading ? "Enregistrement…" : "Enregistrer la sélection"}
      </button>

      <StatusMessage
        type={status === "success" ? "success" : "error"}
        message={message}
      />
    </section>
  );
}

export default LanguageSelector;
