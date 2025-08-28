import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Ferme le menu si la fenêtre est redimensionnée en mode "desktop"
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <a href="#accueil" className="nav-logo adelia">Océane Loze</a>
            <button className={`nav-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                ☰
            </button>
            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                <li><a href="#apropos" onClick={() => setIsOpen(false)}>À Propos</a></li>
                <li><a href="#portfolio" onClick={() => setIsOpen(false)}>Portfolio</a></li>
                <li><a href="#prestations" onClick={() => setIsOpen(false)}>Prestations</a></li>
                <li><a href="#avis" onClick={() => setIsOpen(false)}>Avis</a></li>
                <li><a href="https://www.jingoo.com/client/accessReport" onClick={() => setIsOpen(false)}>Accès Client</a></li>
                <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
                
            </ul>
        </nav>
    );
};

export default Navbar;