import React from 'react';

// On structure les données pour plus de clarté et de flexibilité
const services = [
    {
        imageSrc: '/images/Studio.webp',
        title: 'Séance Studio',
        price: 'À partir de 120€',
        features: [
            'Séance de 1 heure',
            'Studio disponible à Meaux (77)',
            '40 photos en HD',
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
            'Séance de 1h',
            '40 photos en HD',
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
            'Mariage, anniversaire, entreprise...',
            'Reportage photo',
        ],
        ctaText: 'Demander un devis',
        ctaLink: '#contact'
    },
    {
        imageSrc: '/images/animaux.webp',
        title: 'Séance Animalière',
        price: 'À partir de 170€',
        features: [
            'Séance de 1h',
            'Chevaux mis à disposition (Provins 77)',
            'Avec votre animal (à partir de 100€)',
            '40 Photos en HD',
            'Galerie en ligne privée'
        ],
        ctaText: 'Réserver cette séance',
        ctaLink: '#contact'
    },
    {
        imageSrc: '/images/Vehicule.webp',
        title: 'Séance Auto/Moto',
        price: 'À partir de 100€',
        features: [
            'Séance de 1h avec votre véhicule',
            '40 photos en HD',
            'Galerie en ligne privée',
            'Lieu au choix',
            '*une moto ou un véhicule peuvent être mis à disposition pour le shooting ( 90€ en plus de la prestation - lieu en fonction du véhicule )',
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
            'Tirage photo à partir de 0.60€',
            'Restauration de photos anciennes à partir de 10€',
            'Toile photo'
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
                            <img src={service.imageSrc} alt={` pour ${service.title}`} loading="lazy" />
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