import { useState } from "react";
import FormField from "../common/FormField";
import StatusMessage from "../common/StatusMessage";
import { validatePersonalInfo, BIO_MAX_LENGTH } from "../../utils/validators";
import { updatePersonalInfo } from "../../services/profileService";

function PersonalInfoForm({ initialData = {} }) {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName ?? "",
    lastName: initialData.lastName ?? "",
    title: initialData.title ?? "",
    location: initialData.location ?? "",
    bio: initialData.bio ?? "",
  });
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
      await updatePersonalInfo(formData);
      setStatus("success");
      setMessage("Informations enregistrées avec succès.");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
      if (err.errors) setErrors(err.errors);
    }
  };

  const isLoading = status === "loading";

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h2>Informations personnelles</h2>

      <FormField
        label="Prénom"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName}
      />
      <FormField
        label="Nom"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        error={errors.lastName}
      />
      <FormField
        label="Titre professionnel"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
      />
      <FormField
        label="Localisation"
        name="location"
        value={formData.location}
        onChange={handleChange}
        error={errors.location}
      />
      <FormField
        label="Bio"
        name="bio"
        value={formData.bio}
        multiline
        maxLength={BIO_MAX_LENGTH}
        onChange={handleChange}
        error={errors.bio}
      />
      <p className="counter">
        {formData.bio.length} / {BIO_MAX_LENGTH}
      </p>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Enregistrement…" : "Enregistrer"}
      </button>

      <StatusMessage
        type={status === "success" ? "success" : "error"}
        message={message}
      />
    </form>
  );
}

export default PersonalInfoForm;
