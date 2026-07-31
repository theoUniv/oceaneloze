import React, { useState, useEffect, useCallback } from 'react';

// Largeurs générées par scripts/optimize-images.js
const SLIDE_WIDTHS = [768, 1280, 1920];

const srcSet = (name) =>
    SLIDE_WIDTHS.map((w) => `/images/opt/${name}-${w}.webp ${w}w`).join(', ');

// On garde notre liste d'images
const carouselImages = [
    {
        name: '5caroussel',
        alt: "Femme style vintage allongée sur une nappe de pique-nique dans l'herbe",
    },
    {
        name: 'carousel-2',
        alt: "Femme posant sur le capot d'une voiture de collection Ford Capri dans un garage",
    },
    {
        name: 'carousel-3',
        alt: "Femme en robe blanche posant devant la fontaine du Palais Longchamp à Marseille",
    },
    {
        name: 'famille2',
        alt: "Séance famille en extérieur",
    },

    {
        name: 'karcher',
        alt: "Photographie artistique Karcher",
    },
    {
        name: 'enfant_ext',
        alt: "Photographie d'enfant en extérieur",
    }
];

const Accueil = () => {
    // On utilise un état pour garder en mémoire l'index de l'image actuelle
    const [currentIndex, setCurrentIndex] = useState(0);

    // Les slides sont superposées et donc toutes "visibles" pour le navigateur :
    // loading="lazy" ne suffit pas à les différer. On ne monte donc dans le DOM
    // que les slides déjà nécessaires, pour ne télécharger que la première au
    // chargement de la page.
    const [mounted, setMounted] = useState(() => new Set([0]));

    const show = useCallback((index) => {
        setCurrentIndex(index);
        setMounted((prev) => {
            if (prev.has(index)) return prev;
            const next = new Set(prev);
            next.add(index);
            return next;
        });
    }, []);

    // Une fois la page chargée, on précharge discrètement les slides voisines
    // pour que le premier clic sur une flèche soit instantané.
    useEffect(() => {
        const preload = () => {
            setMounted((prev) => {
                const next = new Set(prev);
                next.add(1);
                next.add(carouselImages.length - 1);
                return next;
            });
        };

        const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));
        const id = schedule(preload, { timeout: 3000 });
        return () => {
            if (window.cancelIdleCallback) window.cancelIdleCallback(id);
            else clearTimeout(id);
        };
    }, []);

    // Fonction pour passer à l'image précédente
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        show(isFirstSlide ? carouselImages.length - 1 : currentIndex - 1);
    };

    // Fonction pour passer à l'image suivante
    const goToNext = () => {
        const isLastSlide = currentIndex === carouselImages.length - 1;
        show(isLastSlide ? 0 : currentIndex + 1);
    };


    return (
        <section id="accueil" className="accueil-section">

            {/* Conteneur du slider */}
            <div className="slider-container">
                {/* Flèche de gauche */}
                <button onClick={goToPrevious} className="arrow arrow-left" aria-label="Image précédente">
                    &#10094;
                </button>
                {/* Flèche de droite */}
                <button onClick={goToNext} className="arrow arrow-right" aria-label="Image suivante">
                    &#10095;
                </button>

                {/* Conteneur des images */}
                <div className="slides-container">
                    {carouselImages.map((image, index) => (
                        mounted.has(index) && (
                            <img
                                key={image.name}
                                src={`/images/opt/${image.name}-1280.webp`}
                                srcSet={srcSet(image.name)}
                                sizes="100vw"
                                alt={image.alt}
                                // La classe 'active' est ajoutée seulement si l'index correspond à l'image actuelle
                                className={index === currentIndex ? 'slide active' : 'slide'}
                                // Une slide n'est montée que lorsqu'elle est nécessaire :
                                // on la charge donc vraiment, mais en priorité basse
                                // sauf pour la première (élément LCP de la page).
                                loading="eager"
                                fetchPriority={index === 0 ? 'high' : 'low'}
                                decoding={index === 0 ? 'sync' : 'async'}
                            />
                        )
                    ))}
                </div>
            </div>

            {/* Texte centré par-dessus le slider */}
            <div className="accueil-content">
                <h1 className="accueil-title">Océane Loze</h1>
                <p className="accueil-subtitle">P H O T O G R A P H E</p>
            </div>

            {/* Copyright en bas */}
            <p className="accueil-copyright">© 2026 Océane Loze. Tous droits réservés.</p>
        </section>
    );
};

export default Accueil;
