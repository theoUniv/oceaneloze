import React, { useState } from 'react';

// On enrichit la structure de nos données
const API = process.env.REACT_APP_API_URL;

// Toutes les images passent par le redimensionneur du backend (mis en cache sur
// disque) : on ne sert jamais l'original de plusieurs Mo au navigateur.
const resized = (imagePath, width) =>
    imagePath?.startsWith('http')
        ? imagePath
        : `${API}/api/images/thumbnail?path=${encodeURIComponent(imagePath)}&w=${width}`;

const Portfolio = () => {
    // État pour gérer l'image sélectionnée dans la lightbox
    const [selectedImage, setSelectedImage] = useState(null);
    const [portfolioItems, setPortfolioItems] = useState([]);

    React.useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/api/portfolio/cards`);
                const data = await res.json();
                // Garder que les portfolio et trier par order
                const items = data.filter(c => c.category === 'portfolio').sort((a, b) => a.order - b.order);
                setPortfolioItems(items);
            } catch (err) {
                console.error("Erreur de récupération du portfolio", err);
            }
        };
        fetchPortfolio();
    }, []);

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
                <h2 className="adelia">Portfolio</h2>
                <div className="portfolio-grid-modern">
                    {portfolioItems.filter(item => item.type === 'image').map((item, index) => (
                            <div
                                className={`portfolio-item-modern ${item.description === '1' ? 'span-2' : ''}`}
                                key={item.id || index}
                                onClick={() => openLightbox(item.imagePath)}
                            >
                                <img
                                    src={resized(item.imagePath, 600)}
                                    srcSet={item.imagePath?.startsWith('http') ? undefined :
                                        `${resized(item.imagePath, 400)} 400w, ${resized(item.imagePath, 600)} 600w, ${resized(item.imagePath, 1000)} 1000w`}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    alt={item.title}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="portfolio-overlay">
                                </div>
                            </div>
                    ))}
                </div>
            </section>

            {/* La Lightbox (s'affiche uniquement si une image est sélectionnée) */}
            {selectedImage && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
                    <img
                        src={resized(selectedImage, 1600)}
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