import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/login";
import LoginCandidatePage from "./components/auth/loginCandidate";
import Dashboard from "./components/dashboard/dashboard";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/home";
const App: React.FC = () => {
  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path="/loginAdmin" element={<LoginPage />} />
        <Route path="/login" element={<LoginCandidatePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
