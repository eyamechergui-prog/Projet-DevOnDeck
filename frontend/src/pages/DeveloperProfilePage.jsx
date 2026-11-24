// Page « Mon profil » : charge le profil puis distribue les données aux sections.
import useProfile from "../hooks/useProfile.js";
import PersonalInfoForm from "../components/profile/PersonalInfoForm.jsx";
import LanguageSelector from "../components/profile/LanguageSelector.jsx";
import StatusMessage from "../components/common/StatusMessage.jsx";

function DeveloperProfilePage() {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) return <p className="page-message">Chargement du profil…</p>;
  if (error) return <div className="page"><StatusMessage type="error" message={error} /></div>;

  return (
    <main className="page">
      <h1>Mon profil développeur</h1>
      {/* Les props initiales pré-remplissent chaque section */}
      <PersonalInfoForm initialData={profile} />
      <LanguageSelector initialLanguages={profile?.languages ?? []} />
    </main>
  );
}

export default DeveloperProfilePage;
