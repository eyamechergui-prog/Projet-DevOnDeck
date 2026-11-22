import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import profileRoutes from "./src/routes/profile.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/api/profile", profileRoutes);

// 404 pour les routes inconnues
app.use((req, res) => res.status(404).json({ message: "Route introuvable." }));

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`API sur http://localhost:${port}/api`)))
  .catch((err) => {
    console.error("Connexion MongoDB impossible :", err.message);
    process.exit(1);
  });
