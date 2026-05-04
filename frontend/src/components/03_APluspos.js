import React from 'react';

const philosophyPoints = [
    {
        icon: "✦",
        title: "Authenticité",
        description: "Capturer le vrai, sans artifice."
    },
    {
        icon: "◈",
        title: "Lumière",
        description: "Sculpter chaque image grâce à la lumière naturelle."
    },
    {
        icon: "◇",
        title: "Émotion",
        description: "Raconter votre histoire, une émotion à la fois."
    }
];

const APropos = () => {
    return (
        <section id="apropos" className="apropos-section-v2">

            {/* --- Colonne image : pleine hauteur, bord à bord --- */}
            <div className="apropos-img-col">
                <img
                    src="/images/oce.webp"
                    alt="Photographe Océane Loze"
                    className="apropos-img-full"
                    loading="lazy"
                />
                {/* Badge flottant */}
                <div className="apropos-badge">
                    <span className="apropos-badge-number">∞</span>
                    <span className="apropos-badge-label">Instants capturés</span>
                </div>
            </div>

            {/* --- Colonne texte --- */}
            <div className="apropos-text-col">

                <span className="apropos-eyebrow">À propos</span>
                <h2 className="apropos-headline adelia">Mon Approche</h2>

                <p className="apropos-body">
                    Ce que j'aime par-dessus tout, c'est capturer des instants vrais —
                    des sourires spontanés, des regards complices, ces petits moments
                    qui racontent bien plus qu'une pose.
                </p>
                <p className="apropos-body">
                    Après des études en art et en photographie, j'ai décidé de vivre
                    de ma passion. Je mets tout en œuvre pour que vous vous sentiez
                    bien et que vos photos vous ressemblent.
                </p>

                {/* --- Valeurs --- */}
                <div className="apropos-values">
                    {philosophyPoints.map((point, index) => (
                        <div className="apropos-value-item" key={index}>
                            <span className="apropos-value-icon">{point.icon}</span>
                            <div>
                                <h3 className="apropos-value-title">{point.title}</h3>
                                <p className="apropos-value-desc">{point.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Signature --- */}
                <img
                    src="/images/signature.webp"
                    alt="Signature d'Océane Loze"
                    className="apropos-signature"
                    loading="lazy"
                />
            </div>
        </section>
    );
};

export default APropos;