
import { useState } from "react";
import styles from "./Login.module.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    let newErreur = {};

    if (!email.trim()) {
      newErreur.email = "Veuillez introduire votre email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErreur.email = "Adresse email invalide";
    }

    if (!password.trim()) {
      newErreur.password = "Veuillez introduire votre mot de passe";
    }

    setError(newErreur);
    setSuccess("");

    if (Object.keys(newErreur).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const data = await login(email.trim(), password);

      setSuccess("Connexion réussie !");

      if (data.role === "DEVELOPPEUR") {
        navigate("/developer");
      } else if (data.role === "ORGANISATION") {
        navigate("/organization");
      }
    } catch (err) {
      setError({
        general: err.message,
      });
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

        <form
          onSubmit={handleSubmit}
          className={styles.form}
          noValidate
          autoComplete="off"
        >
          <div className={styles.formGroup}>
            <label htmlFor="email">Adresse email</label>

            <input
              id="email"
              type="email"
              placeholder="Votre adresse email"
              autoComplete="off"
              value={email}
              disabled={loading}
              onChange={(e) => {
                setEmail(e.target.value);
                setError((prev) => ({
                  ...prev,
                  email: "",
                  general: "",
                }));
                setSuccess("");
              }}
            />

            {error.email && (
              <p className={styles.error}>{error.email}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Mot de passe</label>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Votre mot de passe"
              autoComplete="new-password"
              value={password}
              disabled={loading}
              onChange={(e) => {
                setPassword(e.target.value);
                setError((prev) => ({
                  ...prev,
                  password: "",
                  general: "",
                }));
                setSuccess("");
              }}
            />

            {error.password && (
              <p className={styles.error}>{error.password}</p>
            )}
          </div>

          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            {showPassword
              ? "Masquer le mot de passe"
              : "Afficher le mot de passe"}
          </button>

          {error.general && (
            <p className={styles.error}>{error.general}</p>
          )}

          {success && (
            <p role="status">{success}</p>
          )}

          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>
        <p>
          Vous n'avez pas encore de compte ?
          {" "}
          <Link to="/register">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
