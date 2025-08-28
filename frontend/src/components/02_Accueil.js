import React, { useState } from 'react';

// On garde notre liste d'images
const carouselImages = [
    {
        src: '/images/carousel-1.webp',
        alt: "Femme style vintage allongée sur une nappe de pique-nique dans l'herbe",
    },
    {
        src: '/images/carousel-2.webp',
        alt: "Femme posant sur le capot d'une voiture de collection Ford Capri dans un garage",
    },
    {
        src: '/images/carousel-3.webp',
        alt: "Femme en robe blanche posant devant la fontaine du Palais Longchamp à Marseille",
    }
];

const Accueil = () => {
    // On utilise un état pour garder en mémoire l'index de l'image actuelle
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fonction pour passer à l'image précédente
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? carouselImages.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    // Fonction pour passer à l'image suivante
    const goToNext = () => {
        const isLastSlide = currentIndex === carouselImages.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };


    return (
        <section id="accueil" className="accueil-section">

            {/* Conteneur du slider */}
            <div className="slider-container">
                {/* Flèche de gauche */}
                <button onClick={goToPrevious} className="arrow arrow-left">
                    &#10094;
                </button>
                {/* Flèche de droite */}
                <button onClick={goToNext} className="arrow arrow-right">
                    &#10095;
                </button>

                {/* Conteneur des images */}
                <div className="slides-container">
                    {carouselImages.map((image, index) => (
                        <img
                            key={index}
                            src={image.src}
                            alt={image.alt}
                            // La classe 'active' est ajoutée seulement si l'index correspond à l'image actuelle
                            className={index === currentIndex ? 'slide active' : 'slide'}
                        />
                    ))}
                </div>
            </div>

            {/* Le contenu textuel reste au premier plan */}
            <div className="accueil-content">
                <h1 class="adelia">Océane Loze</h1>
                <p>Photographe Capturant l'Instant</p>
            </div>
        </section>
    );
};

export default Accueil;