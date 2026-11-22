import { Routes, Route, Navigate } from "react-router-dom";
import DeveloperProfilePage from "./pages/DeveloperProfilePage.jsx";

// Les routes de l'application. Les autres pages de l'équipe s'ajoutent ici.
function App() {
  return (
    <Routes>
      <Route path="/profile" element={<DeveloperProfilePage />} />
      <Route path="*" element={<Navigate to="/profile" replace />} />
    </Routes>
  );
}

export default App;
