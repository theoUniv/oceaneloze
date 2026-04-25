import React from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer id="reseaux" className="footer">
            {/* --- Réseaux Sociaux --- */}
            <div className="reseaux-sociaux">
                <a
                    href="https://www.instagram.com/fotocege/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                >
                    <FaInstagram />
                </a>
                <a
                    href="https://www.facebook.com/oceane.loze.73"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                >
                    <FaFacebook />
                </a>
                <a
                    href="https://wa.me/33608606434"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                >
                    <FaWhatsapp />
                </a>
            </div>

            {/* --- SIRET --- */}
            <p>SIRET : 977 785 039 00016</p>

            {/* --- Lien téléchargement CGU --- */}
            <div style={{ marginTop: '10px' }}>
                <a
                    href="/cgu.pdf"
                    download="Mentions_Legales_et_CGV_Oceane_Loze.pdf"
                    style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}
                >
                    Télécharger les CGU
                </a>
            </div>

            {/* --- Copyright --- */}
            <p style={{ fontSize: '13px', opacity: 0.6, marginTop: '10px' }}>
                &copy; {new Date().getFullYear()} Océane Loze | Tous droits réservés.
            </p>
        </footer>
    );
};

export default Footer;
