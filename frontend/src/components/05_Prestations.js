import React from 'react';

// On structure les données pour plus de clarté et de flexibilité
const services = [
    {
        imageSrc: '/images/studio.webp',
        title: 'Séance Studio',
        price: 'À partir de 120€',
        features: [
            'Shooting de 1 heure',
            '40 photos retouchées en HD',
            'Galerie en ligne privée',
            'Décors et fonds au choix',
        ],
        ctaText: 'Réserver cette séance',
        ctaLink: '#contact'
    },
    {
        imageSrc: '/images/exterieur.webp',
        title: 'Séance Extérieur',
        price: 'À partir de 100€',
        features: [
            'Shooting de 1h',
            '40 photos retouchées en HD',
            'Galerie en ligne privée',
            'Lieu au choix',
        ],
        ctaText: 'Réserver cette séance',
        ctaLink: '#contact'
    },
    {
        imageSrc: '/images/mariage.webp',
        title: 'Evènementiel',
        price: 'Sur Devis',
        features: [
            'Mariage, baptême, entreprise...',
            'Reportage photo complet',
            'Photos triées et retouchées',
            'Discutons de votre projet',
        ],
        ctaText: 'Demander un devis',
        ctaLink: '#contact'
    },
        {
        imageSrc: '/images/animaux.webp',
            title: 'Shooting Animalier',
        price: 'À partir de 170€',
        features: [
            'Séance disponible à Provins (77)',
        ],
        ctaText: 'Réserver cette séance',
        ctaLink: '#contact'
    },
    {
        imageSrc: '/images/Vehicule.webp',
        title: 'Séance Auto/Moto',
        price: 'À partir de 100€',
        features: [
            'Shooting de 1h30',
            '30 photos retouchées en HD',
            'Galerie en ligne privée',
            'Lieu au choix',
        ],
        ctaText: 'Réserver cette séance',
        ctaLink: '#contact'
    },
    {
        imageSrc: '/images/contact.webp',
        title: 'Restauration Photo/Tirage',
        price: 'Sur devis',
        features: [
            'Tirage grand format',
            'Tirage photo à partir de 0.40€',
            'Restauration de photos anciennes à partir de 10€',
            'Toile photo sur devis'
        ],
        ctaText: 'Réserver cette séance',
        ctaLink: '#contact'
    }
];

const Prestations = () => {
    return (
        <section id="prestations">
            <h2 class="adelia">Mes Prestations</h2>
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