import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HelloWorld } from './components/HelloWorld';
import { HomePage } from './components/tmphome';
import { LoginsPage } from "./components/logins/LoginsPage";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginsPage/>}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  );
}

export default App;
