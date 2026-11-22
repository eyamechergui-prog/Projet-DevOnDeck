import { useState } from "react";
import FormField from "../common/FormField";
import StatusMessage from "../common/StatusMessage";
import { validatePersonalInfo, BIO_MAX_LENGTH } from "../../utils/validators";
import { updateProfile } from "../../services/profileService";

function PersonalInfoForm({ initialData = {} }) {
  const savedValues = {
    firstName: initialData.firstName ?? "",
    lastName: initialData.lastName ?? "",
    title: initialData.title ?? "",
    location: initialData.location ?? "",
    bio: initialData.bio ?? "",
  };
  const [formData, setFormData] = useState(savedValues);
  const [lastSavedValues, setLastSavedValues] = useState(savedValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validatePersonalInfo(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");
    setMessage("");

    try {
      const updatedProfile = await updateProfile(formData);
      const saved = {
        firstName: updatedProfile.firstName ?? "",
        lastName: updatedProfile.lastName ?? "",
        title: updatedProfile.title ?? "",
        location: updatedProfile.location ?? "",
        bio: updatedProfile.bio ?? "",
      };
      setFormData(saved);
      setLastSavedValues(saved);
      setStatus("success");
      setMessage("Profil mis à jour avec succès");
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Erreur lors de la mise à jour du profil");
      if (err.errors) setErrors(err.errors);
    }
  };

  function handleCancel() {
    setFormData(lastSavedValues);
    setErrors({});
    setStatus("idle");
    setMessage("");
  }

  const isLoading = status === "loading";
  const isDirty =
    JSON.stringify(formData) !== JSON.stringify(lastSavedValues);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <section className="card profile-personal-card">
        <h2>Informations personnelles</h2>
        <div className="profile-fields-grid">
          <FormField label="Prénom" name="firstName" value={formData.firstName}
            onChange={handleChange} error={errors.firstName} />
          <FormField label="Nom" name="lastName" value={formData.lastName}
            onChange={handleChange} error={errors.lastName} />
          <FormField label="Titre professionnel" name="title" value={formData.title}
            onChange={handleChange} error={errors.title} />
          <FormField label="Localisation" name="location" value={formData.location}
            onChange={handleChange} error={errors.location} />
        </div>
      </section>

      <section className="card profile-bio-card">
        <h2>Biographie</h2>
        <FormField label="Bio" name="bio" value={formData.bio}
          multiline maxLength={BIO_MAX_LENGTH}
          onChange={handleChange} error={errors.bio} />
        <p className="counter">{formData.bio.length} / {BIO_MAX_LENGTH}</p>
      </section>

      <div className="profile-actions">
        <button type="submit" className="profile-primary-button"
          disabled={isLoading || !isDirty}>
          {isLoading ? "Enregistrement…" : "Enregistrer les modifications"}
        </button>
        <button type="button" className="profile-secondary-button"
          onClick={handleCancel} disabled={isLoading}>
          Annuler
        </button>
      </div>

      <StatusMessage
        type={status === "success" ? "success" : "error"}
        message={message}
      />
    </form>
  );
}

export default PersonalInfoForm;
