import { Router } from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import { AVAILABLE_LANGUAGES, MAX_LANGUAGES } from "../constants/languages.js";

const router = Router();
router.use(auth); // toutes les routes du profil exigent un JWT valide

// Ne renvoie que les champs du profil
const toProfile = (u) => ({
  firstName: u.firstName,
  lastName: u.lastName,
  title: u.title,
  location: u.location,
  bio: u.bio,
  languages: u.languages,
});

// GET /api/profile/me
router.get("/me", async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: "Utilisateur introuvable." });
  res.json(toProfile(user));
});

// PUT /api/profile/me : US-05
router.put("/me", async (req, res) => {
  const { firstName = "", lastName = "", title = "", location = "", bio = "" } = req.body;
  const errors = {};

  if (firstName.trim().length < 2) errors.firstName = "Le prénom doit contenir au moins 2 caractères.";
  if (lastName.trim().length < 2) errors.lastName = "Le nom doit contenir au moins 2 caractères.";
  if (!title.trim()) errors.title = "Le titre professionnel est obligatoire.";
  if (!location.trim()) errors.location = "La localisation est obligatoire.";
  if (bio.length > 500) errors.bio = "La bio ne doit pas dépasser 500 caractères.";

  if (Object.keys(errors).length > 0)
    return res.status(400).json({ message: "Données invalides.", errors });

  const user = await User.findByIdAndUpdate(
    req.userId,
    { firstName: firstName.trim(), lastName: lastName.trim(), title: title.trim(),
      location: location.trim(), bio },
    { new: true }
  );
  if (!user) return res.status(404).json({ message: "Utilisateur introuvable." });
  res.json(toProfile(user));
});

// PUT /api/profile/me/languages : US-06
router.put("/me/languages", async (req, res) => {
  const { languages } = req.body;

  if (!Array.isArray(languages) || languages.length !== MAX_LANGUAGES)
    return res.status(400).json({ message: `Sélectionnez exactement ${MAX_LANGUAGES} langages.` });
  if (new Set(languages).size !== languages.length)
    return res.status(400).json({ message: "Les langages doivent être différents." });
  if (!languages.every((l) => AVAILABLE_LANGUAGES.includes(l)))
    return res.status(400).json({ message: "Langage non autorisé dans la sélection." });

  const user = await User.findByIdAndUpdate(req.userId, { languages }, { new: true });
  if (!user) return res.status(404).json({ message: "Utilisateur introuvable." });
  res.json(toProfile(user));
});

export default router;
