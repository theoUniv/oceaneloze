import React from 'react';

// On définit les points clés de votre philosophie ici
const philosophyPoints = [
    {
        title: "Authenticité",
        description: "Capturer le vrai, sans artifice."
    },
    {
        title: "Lumière",
        description: "Jouer avec la lumière naturelle pour sculpter chaque image."
    },
    {
        title: "Émotion",
        description: "Raconter votre histoire, une émotion à la fois."
    }
];

const APropos = () => {
    return (
        <section id="apropos">
            <div className="apropos-modern-container">

                {/* --- Colonne de l'image --- */}
                <div className="apropos-image-wrapper">
                    <div className="apropos-image-bg"></div>
                    <img src="/images/profil.webp" alt="Photographe Océane Loze" className="apropos-img-modern" />
                </div>

                {/* --- Colonne du texte --- */}
                <div className="apropos-content-wrapper">
                    <h2>Mon Approche</h2>
                    <p className="apropos-intro">
                        Bienvenue dans mon univers. Je suis Océane Loze, une photographe passionnée par la lumière,
                        les émotions et les histoires que chaque personne porte en elle.
                    </p>
                    <p>
                        Ma démarche est douce et naturelle, je cherche à vous mettre à l'aise pour que votre véritable personnalité puisse rayonner. Mon objectif est de capturer l'authenticité et la beauté de chaque instant, de créer des souvenirs intemporels que vous chérirez pour toujours.
                    </p>

                    {/* Section Philosophie */}
                    <div className="philosophy-section">
                        {philosophyPoints.map((point, index) => (
                            <div className="philosophy-item" key={index}>
                                <h3>{point.title}</h3>
                                <p>{point.description}</p>
                            </div>
                        ))}
                    </div>

                    <img src="/images/signature.png" alt="Signature d'Océane Loze" className="signature-img" />
                </div>
            </div>
        </section>
    );
};

export default APropos;