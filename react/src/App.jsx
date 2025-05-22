import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Userinput from "./components/Userinput.jsx";
import './App.css';
import data from './data.js';
import Landingpage from './components/Landingpage.jsx';
import NavLanding from './components/NavLanding.jsx';
import Login from './components/Login.jsx';

function App() {
  return (
    <Routes>
      {/* This is the default route shown when user opens the site */}
      <Route path="/" element={<Landingpage />} />

      {/* This is the login route */}
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Userinput />} />
    </Routes>
  );
}

export default App;
