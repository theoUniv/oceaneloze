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
                backgroundColor: '#fff', // fond blanc
            }}
        >
            <div
                className="reseaux-sociaux"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '25px',
                    marginBottom: '15px',
                }}
            >
                <a
                    href="https://www.instagram.com/fotocege/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    style={{
                        fontSize: '36px',
                        color: '#000', // icônes noires sur fond blanc
                        transition: '0.3s',
                    }}
                >
                    <FaInstagram />
                </a>
                <a
                    href="https://www.facebook.com/oceane.loze.73"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    style={{
                        fontSize: '36px',
                        color: '#000',
                        transition: '0.3s',
                    }}
                >
                    <FaFacebook />
                </a>
                <a
                    href="https://wa.me/33608606434"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    style={{
                        fontSize: '36px',
                        color: '#000',
                        transition: '0.3s',
                    }}
                >
                    <FaWhatsapp />
                </a>
            </div>
            <p style={{ fontSize: '14px', color: '#555' }}>
                &copy; 2025 Océane Loze | Tous droits réservés.
            </p>
        </footer>
    );
};

export default Footer;
