import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import FrameworksSkills from "./components/FrameworksSkills";
import Login from "./pages/Login";
import DeveloperProfilePage from "./profile/DeveloperProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<DeveloperProfilePage />} />
        <Route path="/profile/frameworks" element={<FrameworksSkills />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
