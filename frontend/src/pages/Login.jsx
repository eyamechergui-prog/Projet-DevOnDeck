import { useState } from "react";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError("");
    alert("Formulaire validé !");
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

          <button type="submit" className={styles.loginButton}>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;