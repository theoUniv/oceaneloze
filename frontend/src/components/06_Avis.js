import React, { useState, useEffect } from 'react';

// Nouvelle structure de données enrichie
const testimonials = [
    {
        quote: "Nous avons contacté Océane pour notre mariage, et ce fut la meilleure décision. Elle a su capturer chaque émotion avec une discrétion et un œil artistique qui nous ont bluffés. Les photos sont vivantes, lumineuses et racontent parfaitement notre histoire. Un immense merci pour ces souvenirs impérissables !",
        author: "Alex & Léa",
        service: "Prestation Mariage",
        avatar: "/images/avatar-1.jpg"
    },
    {
        quote: "J'avais besoin de portraits professionnels pour mon activité et j'appréhendais un peu la séance. Océane a un talent incroyable pour mettre à l'aise. Elle guide avec douceur et professionnalisme. Le résultat est au-delà de mes espérances : des portraits qui ont du caractère et qui me ressemblent vraiment.",
        author: "Camille Durand",
        service: "Portrait Studio",
        avatar: "/images/avatar-2.jpg"
    },
    {
        quote: "Une séance en famille en extérieur qui s'est transformée en un merveilleux moment de complicité, et Océane a su immortaliser tout ça ! Elle a joué avec la lumière naturelle de fin de journée pour un rendu doux et poétique. Nous sommes plus que ravis et nous avons enfin de belles photos de nous tous.",
        author: "La famille Martin",
        service: "Séance Famille Extérieur",
        avatar: "/images/avatar-3.jpg"
    },
];

const Avis = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Le carrousel automatique continue de fonctionner
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 7000); // On augmente un peu le temps pour permettre la lecture

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="avis">
            <h2>Ils m'ont fait confiance</h2>
            <div className="testimonial-slider">
                {/* Le conteneur qui va bouger */}
                <div className="testimonial-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {testimonials.map((testimonial, index) => (
                        <div className="testimonial-card" key={index}>
                            <img src={testimonial.avatar} alt={`Avatar de ${testimonial.author}`} className="testimonial-avatar" />
                            <div className="testimonial-content">
                                <blockquote>{testimonial.quote}</blockquote>
                                <div className="testimonial-author-info">
                                    <p className="author-name">{testimonial.author}</p>
                                    <p className="service-type">{testimonial.service}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Points de navigation */}
                <div className="pagination-dots">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Avis;