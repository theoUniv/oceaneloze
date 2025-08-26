import React from 'react';
import './App.css';
import Navbar from './components/01_Navbar';
import Accueil from './components/02_Accueil';
import APropos from './components/03_APluspos';
import Portfolio from './components/04_Portfolio';
import Prestations from './components/05_Prestations';
import Avis from './components/06_Avis';
import Contact from './components/07_Contact';
import Footer from './components/08_Footer';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;