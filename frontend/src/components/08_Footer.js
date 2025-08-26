import React from 'react';
// Importez les icônes si vous utilisez une librairie comme react-icons
// import { FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer id="reseaux" className="footer">
            <div className="reseaux-sociaux">
                {/* Remplacez '#' par les vrais liens */}
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    {/* <FaInstagram /> */}
                    Instagram
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    {/* <FaFacebook /> */}
                    Facebook
                </a>
            </div>
            <p>&copy; 2025 Océane Loze | Tous droits réservés.</p>
        </footer>
    );
};

export default Footer;