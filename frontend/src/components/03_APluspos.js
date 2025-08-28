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
                    <img src="/images/profil_new.webp" alt="Photographe Océane Loze" className="apropos-img-modern" />
                </div>

                {/* --- Colonne du texte --- */}
                <div className="apropos-content-wrapper">
                    <h2 class="adelia">Mon Approche</h2>
                    <p className="apropos-intro">
                        Ce que j'aime par-dessus tout, c'est capturer des instants vrais, des sourires spontanés, des regards complices. ces petits moments qui racontent bien plus qu'une pose.
                        Après des études en art et en photographie, j'ai décidé de me lancer et de vivre de ma passion.
                    </p>
                    <p className="apropos-intro">
                        Je met tout en oeuvre pour que vous vous sentiez bien et que vos photos vous ressemblent.
                    </p>

                    {/* Section Philosophie */}
                    <div className="philosophy-section">
                        {philosophyPoints.map((point, index) => (
                            <div className="philosophy-item " key={index}>
                                <h3 class="adelia">{point.title}</h3>
                                <p class="apropos-intro">{point.description}</p>
                            </div>
                        ))}
                    </div>

                    <img
                        src="/images/signature.webp"
                        alt="Signature d'Océane Loze"
                        className="signature-img"
                        style={{ width: '300px', height: 'auto' }} // augmente la largeur, garde la proportion
                    />
                </div>
            </div>
        </section>
    );
};

export default APropos;