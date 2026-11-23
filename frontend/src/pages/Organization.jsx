import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Organization.module.css";

function Organization() {
  const { user, logout } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Espace Organisation</h1>

        <p className={styles.info}>
          Bienvenue sur DevOnDeck !
        </p>

        <p className={styles.info}>
          Email : {user.email}
        </p>

        <p className={styles.info}>
          Rôle : {user.role}
        </p>
        <Link to="/organization/offres">Mes offres</Link>
        <button className={styles.logoutButton} onClick={logout}>
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

export default Organization;
