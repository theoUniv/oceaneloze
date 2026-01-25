import React, { useState, useEffect } from 'react';

// Nouvelle structure de données enrichie
const testimonials = [
    {
        quote: "Océane possède un regard rare, qui sait capturer bien plus que des images : elle fige des émotions, des instants suspendus. Chaque photo raconte une histoire, avec une sensibilité qui témoigne d’un véritable talent. C’est aussi une personne profondément humaine, à l’écoute et patiente. Elle créer un climat de confiance naturel, qui se voit dans l’authenticité de ses clichés. À travers l’objectif, elle ne photographie pas seulement ce qu’elle voit, mais ce qu’elle ressent. Océane ne se contente pas de photographier, elle est investie du début à la fin. Travailler avec elle, c’est faire l’expérience d’une délicatesse et d’un regard sincère. C’est une personne passionnée et vous ne regretterez pas de l’avoir choisie !!",
        author: "Maëlle",
        service: "Séance Animalière",
        avatar: "/images/maelle.webp"
    },
    {
        quote: "J’ai eu la chance de faire plusieurs shootings avec Océane et à chaque fois l’expérience a été incroyable. Elle est non seulement très professionnelle, mais aussi passionnée et investie dans son travail. Elle sait mettre à l’aise, créer une ambiance agréable et bienveillante, ce qui permet de se sentir en confiance devant l’objectif. Le résultat est toujours magnifique : des photos de qualité qui reflètent parfaitement l’instant et l’émotion. Je la recommande les yeux fermés !",
        author: "Mathilde",
        service: "Portrait Studio",
        avatar: "/images/mathilde.webp"
    },
    {
        quote: "Océane a su me mettre en avant dans une très belle série de photos dans un musée. Elle a su me mettre à l’aise et s’adapter à mes demandes facilement. Le résultat était épatant. Je vous recommande d’y aller les yeux fermés. 😊",
        author: "Vic",
        service: "Séance Extérieur",
        avatar: "/images/Vic.webp"
    },
    {
        quote: "J’ai eu la chance de rencontrer Océane un peu sur un coup de tête, en lui partageant mon histoire et mon envie de réaliser un shooting qui me tenait à cœur. Elle m’a tout de suite proposée de faire ce projet à Étretat, avec des idées magnifiques et une sensibilité incroyable. Au-delà de son talent, Océane est d’une gentillesse rare, qui met immédiatement en confiance. Ce shooting restera une expérience unique et précieuse pour moi, autant par le résultat des photos que par le moment partagé.",
        author: "Sacha",
        service: "Séance Extérieur",
        avatar: "/images/sacha.webp"
    },
    {
        quote: "Un immense merci à Océane pour ce magnifique shooting mère-fille. Elle a su nous mettre à l’aise dès les premières minutes, avec beaucoup de douceur, de patience et de bienveillance. Le moment a été rempli d’émotion, de rires et de complicité, et cela se ressent parfaitement dans les photos. Océane a un vrai talent pour capturer les instants naturels et authentiques, sans jamais forcer les poses. Le résultat est tout simplement sublime, des souvenirs précieux que je garderai toute ma vie. Je recommande Océane les yeux fermés à toutes les mamans (et familles) qui souhaitent vivre une belle expérience et repartir avec des photos pleines d’amour et de sensibilité. 💕📸",
        author: "Victoria",
        service: "Séance Mère-Fille",
        avatar: "/images/Victoria.webp"
    },
];

const Avis = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Le carrousel automatique continue de fonctionner
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 15000); // On augmente un peu le temps pour permettre la lecture

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="avis">
            <h2 class="adelia">Ils m'ont fait confiance</h2>
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