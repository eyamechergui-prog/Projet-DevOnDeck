// US-05 : formulaire des informations personnelles et de la bio.
import { useState } from "react";
import FormField from "../common/FormField.jsx";
import StatusMessage from "../common/StatusMessage.jsx";
import { validatePersonalInfo, BIO_MAX_LENGTH } from "../../utils/validators.js";
import { updatePersonalInfo } from "../../services/profileService.js";

function PersonalInfoForm({ initialData }) {
  // 1. Valeurs des champs (un seul objet pour tous les champs)
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName ?? "",
    lastName: initialData?.lastName ?? "",
    title: initialData?.title ?? "",
    location: initialData?.location ?? "",
    bio: initialData?.bio ?? "",
  });
  // 2. Erreurs de validation par champ
  const [errors, setErrors] = useState({});
  // 3. État de l'envoi : "idle" | "loading" | "success" | "error"
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  // onChange : un seul gestionnaire pour tous les champs, grâce à l'attribut name
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" })); // efface l'erreur du champ modifié
  };

  // onSubmit : valider, puis envoyer
  const handleSubmit = async (event) => {
    event.preventDefault(); // empêche le rechargement de la page

    const validationErrors = validatePersonalInfo(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return; // on n'envoie rien

    setStatus("loading");
    setMessage("");
    try {
      await updatePersonalInfo(formData);
      setStatus("success");
      setMessage("Informations enregistrées avec succès.");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
      if (err.errors) setErrors(err.errors); // erreurs de validation renvoyées par le backend
    }
  };

  const isLoading = status === "loading";

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h2>Informations personnelles</h2>

      <FormField label="Prénom" name="firstName" value={formData.firstName}
        onChange={handleChange} error={errors.firstName} />
      <FormField label="Nom" name="lastName" value={formData.lastName}
        onChange={handleChange} error={errors.lastName} />
      <FormField label="Titre professionnel" name="title" value={formData.title}
        onChange={handleChange} error={errors.title} />
      <FormField label="Localisation" name="location" value={formData.location}
        onChange={handleChange} error={errors.location} />
      <FormField label="Bio" name="bio" value={formData.bio} multiline
        maxLength={BIO_MAX_LENGTH} onChange={handleChange} error={errors.bio} />
      <p className="counter">{formData.bio.length} / {BIO_MAX_LENGTH}</p>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Enregistrement…" : "Enregistrer"}
      </button>

      <StatusMessage type={status === "success" ? "success" : "error"} message={message} />
    </form>
  );
}

export default PersonalInfoForm;
