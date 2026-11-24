import jwt from "jsonwebtoken";

// Vérifie l'en-tête "Authorization: Bearer <token>" et place l'id dans req.userId.
export default function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ message: "Authentification requise." });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch {
    res.status(401).json({ message: "Session expirée, veuillez vous reconnecter." });
  }
}
