
import { useState } from "react";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    let newErreur = {};

    // Validation de l'email
    if (!email.trim()) {
      newErreur.email = "Veuillez introduire votre email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErreur.email = "Adresse email invalide";
    }

    // Validation du mot de passe
    if (!password.trim()) {
      newErreur.password = "Veuillez introduire votre mot de passe";
    }

    setError(newErreur);

    // Si aucune erreur n'existe
    if (Object.keys(newErreur).length === 0) {
      alert("Formulaire valide !");
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
        >
          {/* Champ Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email">Adresse email</label>

            <input
              id="email"
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError((prev) => ({ ...prev, email: "" }));
              }}
            />

            {error.email && (
              <p className={styles.error}>{error.email}</p>
            )}
          </div>

          {/* Champ Mot de passe */}
          <div className={styles.formGroup}>
            <label htmlFor="password">Mot de passe</label>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError((prev) => ({ ...prev, password: "" }));
              }}
            />

            {error.password && (
              <p className={styles.error}>{error.password}</p>
            )}
          </div>

          {/* Afficher / masquer le mot de passe */}
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword
              ? "Masquer le mot de passe"
              : "Afficher le mot de passe"}
          </button>

          {/* Bouton de connexion */}
          <button type="submit" className={styles.loginButton}>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
