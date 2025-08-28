import React, { useState, useEffect } from 'react';

// Nouvelle structure de données enrichie
const testimonials = [
    {
        quote: "Océane possède un regard rare, qui sait capturer bien plus que des images : elle fige des émotions, des instants suspendus. Chaque photo raconte une histoire, avec une sensibilité qui témoigne d’un véritable talent. C’est aussi une personne profondément humaine, l’écoute et patiente.Elle crée un climat de confiance naturel, qui se voit dans l’authenticité de ses clichés. À travers l’objectif, elle ne photographie pas seulement ce qu’elle voit, mais ce qu’elle ressent. Océane ne se contente pas de photographier, elle est investie du début à la fin. Travailler avec elle, c’est faire l’expérience d’une délicatesse et d’un regard sincère.C’est une personne passionnée et vous ne regretterez pas de l’avoir choisie !!",
        author: "Maëlle",
        service: "Shooting exterieur",
        avatar: "/images/maelle.webp"
    },
    {
        quote: "J’ai eu la chance de faire plusieurs shootings avec Océane et à chaque fois l’expérience a été incroyable. Elle est non seulement très professionnelle, mais aussi passionnée et investie dans son travail. Elle sait mettre à l’aise, créer une ambiance agréable et bienveillante, ce qui permet de se sentir en confiance devant l’objectif. Le résultat est toujours magnifique : des photos de qualité qui reflètent parfaitement l’instant et l’émotion. Je la recommande les yeux fermés !",
        author: "Mathilde",
        service: "Portrait Studio",
        avatar: "/images/mathilde.webp"
    },
    {
        quote: "J'ai adoré réalisé mes shootings a tes côtés c'était une trop bonne expérience tu m'as mis tellement en confiance et à fond dans dedans que je voulais plus m'arrêter ! Tu fais un travail de fou t'es super douée je suis impatient d'avoir le résultat du shotting à chaque fois parce que je sais que ça va être une pépite grâce à toi ! Continu comme ça ! Vraiment n'hesitez même pas une seconde à vous lancer avec Oceane elle est trop good vibe, et vous ne serrez jamais dessus avec elle attendez vous a prendre confiance en vous et à kiffer votre moment !",
        author: "Elie Tardy",
        service: "Séance Extérieur",
        avatar: "/images/eli.webp"
    },
    {
        quote: "J’ai eu la chance de rencontrer Océane un peu sur un coup de tête, en lui partageant mon histoire et mon envie de réaliser un shooting qui me tenait à cœur. Elle m’a tout de suite proposé de faire ce projet à Étretat, avec des idées magnifiques et une sensibilité incroyable. Au-delà de son talent, Océane est d’une gentillesse rare, qui met immédiatement en confiance. Ce shooting restera une expérience unique et précieuse pour moi, autant par le résultat des photos que par le moment partagé.",
        author: "Sacha",
        service: "Séance Extérieur",
        avatar: "/images/sacha.webp"
    },
    {
        quote: "Superbe photographe, elle nous mes alaise directement et c’est très agréable. Au moment des séances si nous avons pas d’idée toujours elle en trouvé t je trouve sa super. Les photos sont tellement bien prise la qualité est superbe. Je recommande fortement elle fait du super boulot 🥰",
        author: "Chloé",
        service: "Séance Grossesse",
        avatar: "/images/cloe.webp"
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