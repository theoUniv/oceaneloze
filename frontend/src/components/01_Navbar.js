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
            <a href="#accueil" className="nav-logo">
                <img
                    src="/images/opt/logoblanc-96.webp"
                    srcSet="/images/opt/logoblanc-96.webp 96w, /images/opt/logoblanc-192.webp 192w"
                    sizes="46px"
                    alt="OL Logo"
                    className="nav-logo-icon"
                    width="46"
                    height="40"
                    decoding="async"
                />
                <img
                    src="/images/opt/texteblanc-192.webp"
                    srcSet="/images/opt/texteblanc-192.webp 192w, /images/opt/texteblanc-384.webp 384w"
                    sizes="181px"
                    alt="Océane Loze"
                    className="nav-logo-text"
                    width="181"
                    height="30"
                    decoding="async"
                />
            </a>
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