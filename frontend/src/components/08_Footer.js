import React from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer
            id="reseaux"
            className="footer"
            style={{
                textAlign: 'center',
                padding: '30px 0',
                backgroundColor: '#fff',
                borderTop: '1px solid #eee' // Petit séparateur subtil
            }}
        >
            {/* --- Réseaux Sociaux --- */}
            <div
                className="reseaux-sociaux"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '25px',
                    marginBottom: '20px',
                }}
            >
                <a
                    href="https://www.instagram.com/fotocege/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    style={{ fontSize: '36px', color: '#000', transition: '0.3s' }}
                >
                    <FaInstagram />
                </a>
                <a
                    href="https://www.facebook.com/oceane.loze.73"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    style={{ fontSize: '36px', color: '#000', transition: '0.3s' }}
                >
                    <FaFacebook />
                </a>
                <a
                    href="https://wa.me/33608606434"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    style={{ fontSize: '36px', color: '#000', transition: '0.3s' }}
                >
                    <FaWhatsapp />
                </a>
            </div>

            {/* --- Informations Légales & Liens --- */}
            <div style={{ marginBottom: '15px', fontSize: '14px', color: '#555' }}>
                <p style={{ margin: '5px 0' }}>
                    SIRET : 977 785 039 00016
                </p>

                {/* Liens vers les pages légales (à créer) */}
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                    <a href="/mentions-legales" style={{ color: '#555', textDecoration: 'none' }}>Mentions Légales</a>
                    <span>|</span>
                    <a href="/cgv" style={{ color: '#555', textDecoration: 'none' }}>CGV</a>
                    <span>|</span>
                    <a href="/politique-confidentialite" style={{ color: '#555', textDecoration: 'none' }}>Politique de confidentialité</a>
                </div>
            </div>

            {/* --- Copyright --- */}
            <p style={{ fontSize: '13px', color: '#888', marginTop: '10px' }}>
                &copy; 2025 Océane Loze | Tous droits réservés.
            </p>
        </footer>
    );
};

export default Footer;