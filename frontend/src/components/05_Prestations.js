import React from 'react';

// On structure les données pour plus de clarté et de flexibilité
const services = [
    {
        imageSrc: '/images/prestation-studio.webp',
        title: 'Séance Studio',
        price: 'À partir de 150€',
        features: [
            'Shooting de 1 heure',
            '10 photos retouchées en HD',
            'Galerie en ligne privée',
            'Décors et fonds au choix',
        ],
        ctaText: 'Réserver cette séance',
        ctaLink: '#contact'
    },
    {
        imageSrc: '/images/prestation-exterieur.webp',
        title: 'Séance Extérieur',
        price: 'À partir de 200€',
        features: [
            'Shooting de 1h30',
            '15 photos retouchées en HD',
            'Galerie en ligne privée',
            'Lieu au choix',
        ],
        ctaText: 'Réserver cette séance',
        ctaLink: '#contact'
    },
    {
        imageSrc: '/images/prestation-evenement.webp',
        title: 'Événementiel',
        price: 'Sur Devis',
        features: [
            'Mariage, baptême, entreprise...',
            'Reportage photo complet',
            'Photos triées et retouchées',
            'Discutons de votre projet',
        ],
        ctaText: 'Demander un devis',
        ctaLink: '#contact'
    }
];

const Prestations = () => {
    return (
        <section id="prestations">
            <h2>Mes Prestations</h2>
            <div className="prestations-container-modern">
                {services.map((service, index) => (
                    <div className="prestation-card-modern" key={index}>
                        <div className="prestation-image-container">
                            <img src={service.imageSrc} alt={` pour ${service.title}`} />
                        </div>
                        <div className="prestation-content">
                            <h3>{service.title}</h3>
                            <p className="price-modern">{service.price}</p>
                            <ul className="features-list">
                                {service.features.map((feature, fIndex) => (
                                    <li key={fIndex}>{feature}</li>
                                ))}
                            </ul>
                            <a href={service.ctaLink} className="prestation-cta">
                                {service.ctaText}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Prestations;