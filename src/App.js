import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HelloWorld } from './components/HelloWorld';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HelloWorld/>}/>
    </Routes>
  );
}

export default App;
