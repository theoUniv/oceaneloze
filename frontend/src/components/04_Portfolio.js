import React, { useState } from 'react';

// On enrichit la structure de nos données
const portfolioItems = [
    { type: 'image', src: '/images/portfolio-1.jpg', title: 'Douce Rêverie', cols: 2 },
    { type: 'image', src: '/images/portfolio-2.jpg', title: 'Chrome & Caractère' },
    { type: 'quote', text: "La beauté est dans les yeux de celui qui regarde." },
    { type: 'image', src: '/images/portfolio-3.jpg', title: 'Palais d\'Été' },
    { type: 'image', src: '/images/portfolio-4.jpg', title: 'Urbain & Sauvage', cols: 2 },
    { type: 'image', src: '/images/portfolio-5.jpg', title: 'Reflets Mystiques' },
    { type: 'image', src: '/images/portfolio-6.jpg', title: 'Pose Intemporelle' },
    { type: 'quote', text: "Capturer l'âme, pas seulement le sourire." },
];

const Portfolio = () => {
    // État pour gérer l'image sélectionnée dans la lightbox
    const [selectedImage, setSelectedImage] = useState(null);

    const openLightbox = (src) => {
        setSelectedImage(src);
        document.body.style.overflow = 'hidden'; // Empêche le scroll en arrière-plan
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto'; // Réactive le scroll
    };

    return (
        <>
            <section id="portfolio">
                <h2>Portfolio</h2>
                <div className="portfolio-grid-modern">
                    {portfolioItems.map((item, index) => {
                        if (item.type === 'image') {
                            return (
                                <div
                                    className={`portfolio-item-modern ${item.cols === 2 ? 'span-2' : ''}`}
                                    key={index}
                                    onClick={() => openLightbox(item.src)}
                                >
                                    <img src={item.src} alt={item.title} />
                                    <div className="portfolio-overlay">
                                        <h3>{item.title}</h3>
                                    </div>
                                </div>
                            );
                        }
                        if (item.type === 'quote') {
                            return (
                                <div className="portfolio-quote-item" key={index}>
                                    <blockquote>"{item.text}"</blockquote>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </section>

            {/* La Lightbox (s'affiche uniquement si une image est sélectionnée) */}
            {selectedImage && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
                    <img
                        src={selectedImage}
                        alt="Vue agrandie"
                        className="lightbox-image"
                        onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique sur l'image
                    />
                </div>
            )}
        </>
    );
};

export default Portfolio;