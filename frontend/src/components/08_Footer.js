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
                borderTop: '1px solid #eee'
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

            {/* --- SIRET --- */}
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>
                SIRET : 977 785 039 00016
            </p>

            {/* --- Lien téléchargement CGU --- */}
            <div
                style={{
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '15px',
                    flexWrap: 'wrap'
                }}
            >
                <a
                    href="/CGU.txt"
                    download
                    style={{ color: '#555', textDecoration: 'none' }}
                >
                    Télécharger les CGU
                </a>
            </div>

            {/* --- Copyright --- */}
            <p style={{ fontSize: '13px', color: '#888', marginTop: '10px' }}>
                &copy; {new Date().getFullYear()} Océane Loze | Tous droits réservés.
            </p>
        </footer>
    );
};

export default Footer;
