import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const user = await login(email.trim(), password);

      if (user.role === "DEVELOPPEUR") {
        navigate("/developer", { replace: true });
      } else if (user.role === "ORGANISATION") {
        navigate("/organization", { replace: true });
      } else {
        setError("Rôle utilisateur non reconnu.");
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la connexion.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.logo}>DevOnDeck</h1>
        <p className={styles.slogan}>
          Le recrutement tech, pensé autrement.
        </p>

        <h2 className={styles.title}>Connexion</h2>
        <p className={styles.subtitle}>
          Bienvenue sur votre plateforme de recrutement.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Adresse email</label>
            <input
              id="email"
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          </button>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
