// Crée (ou retrouve) un utilisateur de test et affiche un JWT valide 7 jours.
import "dotenv/config";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../src/models/User.js";

await mongoose.connect(process.env.MONGODB_URI);
const user =
  (await User.findOne({ email: "test@devondeck.com" })) ||
  (await User.create({ email: "test@devondeck.com" }));

const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
console.log("\nToken à coller dans la console du navigateur (frontend) :\n");
console.log(`localStorage.setItem("token", "${token}")\n`);
await mongoose.disconnect();
