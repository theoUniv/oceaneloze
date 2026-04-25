import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/01_Navbar';
import Accueil from './components/02_Accueil';
import APropos from './components/03_APluspos';
import Portfolio from './components/04_Portfolio';
import Prestations from './components/05_Prestations';
import Avis from './components/06_Avis';
import Contact from './components/07_Contact';
import Footer from './components/08_Footer';

// Admin pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function Home() {
  return (
    <React.Fragment>
      <Navbar />
      <main>
        <Accueil />
        <APropos />
        <Portfolio />
        <Prestations />
        <Avis />
        <Contact />
      </main>
      <Footer />
    </React.Fragment>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;