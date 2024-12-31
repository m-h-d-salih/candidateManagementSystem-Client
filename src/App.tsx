import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/login";
import LoginCandidatePage from "./components/auth/loginCandidate";
import Dashboard from "./components/dashboard/dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/loginAdmin" element={<LoginPage />} />
        <Route path="/" element={<LoginCandidatePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
