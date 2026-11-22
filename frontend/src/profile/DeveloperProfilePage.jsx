import useProfile from "./hooks/useProfile";
import PersonalInfoForm from "./components/profile/PersonalInfoForm";
import LanguageSelector from "./components/profile/LanguageSelector";
import StatusMessage from "./components/common/StatusMessage";
import FrameworksSkills from "../components/FrameworksSkills";
import "./profile.css";

function DeveloperProfilePage() {
  const { profile, isLoading, error } = useProfile();

  return (
    <main className="profile-page">
      <header className="profile-header">
        <p className="profile-eyebrow">DevOnDeck</p>
        <h1>Mon profil développeur</h1>
        <p>Mettez à jour vos informations et votre expertise.</p>
      </header>

      {isLoading && (
        <p className="page-message">Chargement du profil...</p>
      )}

      {error && (
        <StatusMessage
          type="error"
          message={`${error} Les compétences restent disponibles ci-dessous.`}
        />
      )}

      {!isLoading && (
        <>
          <PersonalInfoForm initialData={profile ?? {}} />
          <LanguageSelector initialLanguages={profile?.languages ?? []} />
        </>
      )}

      <section className="profile-skills-section">
        <h2>Frameworks et bibliothèques</h2>
        <FrameworksSkills />
      </section>
    </main>
  );
}

export default DeveloperProfilePage;
