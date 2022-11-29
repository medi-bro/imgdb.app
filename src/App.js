import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Homepage } from "./components/Homepage";
import LoginsPage from "./components/logins/LoginsPage";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import ConsultantsPage from "./components/Consultants/ConsultantsPage";
import { AboutPage } from "./components/AboutPage";
import { CasePage } from "./components/CasePages/CasePage";
import MyCasesPage from "./components/MyCases/MyCasesPage"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginsPage />} />
        <Route path="/consultants" element={<ConsultantsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cases" element={<MyCasesPage />} />
        <Route path="/case/:caseId" element={<CasePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
