import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Homepage } from "./components/Homepage";
import LoginsPage from "./components/logins/LoginsPage";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import ConsultantsPage from "./components/Consultants/ConsultantsPage";
import { AboutPage } from "./components/tmpAbout";
import { CasePage } from "./components/CasePages/CasePage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginsPage />} />
        <Route path="/consultants" element={<ConsultantsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cases" element={<CasePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
