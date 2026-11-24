import mongoose from "mongoose";

// Modèle simplifié : le profil développeur est intégré au document utilisateur.
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    title: { type: String, default: "" },
    location: { type: String, default: "" },
    bio: { type: String, default: "", maxlength: 500 },
    languages: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
