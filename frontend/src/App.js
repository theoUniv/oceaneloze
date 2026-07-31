import React, { useEffect, lazy, Suspense } from 'react';
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

// Admin pages : chargées à la demande. Elles ne concernent que l'administration
// du site et représentaient une part importante du JavaScript téléchargé par
// chaque visiteur du site public (dont toute la librairie d'icônes lucide-react).
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function Home() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.15 // Se déclenche quand 15% de l'élément est visible
    });

    revealElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <main>
        {/* Pas d'animation de révélation sur l'accueil : la section est de toute
            façon visible au chargement, et le fondu de 1,2 s retardait d'autant
            l'affichage de la plus grande image de la page (LCP). */}
        <Accueil />
        <div className="reveal fade-up">
          <APropos />
        </div>
        <div className="reveal fade-up">
          <Portfolio />
        </div>
        <div className="reveal fade-up">
          <Prestations />
        </div>
        <div className="reveal fade-up">
          <Avis />
        </div>
        <div className="reveal fade-up">
          <Contact />
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;