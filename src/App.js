import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HelloWorld } from "./components/HelloWorld";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/tmphome";
import { LoginsPage } from "./components/logins/LoginsPage";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import { ConsultantsPage } from "./components/Consultants/ConsultantsPage";
import { AboutPage } from "./components/tmpAbout";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginsPage />} />
        <Route path="/consultants" element={<ConsultantsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
