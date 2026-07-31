import React from 'react';

// Avatars : affichés en 60px, on ne sert donc que de petites déclinaisons
// générées par scripts/optimize-images.js (et pas les originaux de plusieurs Mo).
const AVATAR_WIDTHS = [64, 128, 180];

const avatarSrcSet = (name) =>
    AVATAR_WIDTHS.map((w) => `/images/opt/${name}-${w}.webp ${w}w`).join(', ');

// Nouvelle structure de données enrichie
const testimonials = [
    {
        quote: "Océane possède un regard rare, qui sait capturer bien plus que des images : elle fige des émotions, des instants suspendus. Chaque photo raconte une histoire, avec une sensibilité qui témoigne d’un véritable talent. C’est aussi une personne profondément humaine, à l’écoute et patiente. Elle créer un climat de confiance naturel, qui se voit dans l’authenticité de ses clichés. À travers l’objectif, elle ne photographie pas seulement ce qu’elle voit, mais ce qu’elle ressent. Océane ne se contente pas de photographier, elle est investie du début à la fin. Travailler avec elle, c’est faire l’expérience d’une délicatesse et d’un regard sincère. C’est une personne passionnée et vous ne regretterez pas de l’avoir choisie !!",
        author: "Maëlle",
        service: "Séance Animalière",
        avatar: 'maelle'
    },
    {
        quote: "Un énorme coup de cœur pour cette expérience avec elle. J’ai adoré shooter avec Océane, elle est tellement douce, bienveillante et passionnée.Elle sait vraiment mettre à l’aise et créer une ambiance naturelle pendant le shooting, on oublie presque l’objectif et le résultat est juste... incroyable ! On sent tout l’amour qu’elle met dans son travail et ça se ressent énormément dans ses images, Je recommande à 1000% ",
        author: "Juline",
        service: "Exterieur",
        avatar: 'juline'
    },
    {
        quote: "J’ai eu la chance de faire plusieurs shootings avec Océane et à chaque fois l’expérience a été incroyable. Elle est non seulement très professionnelle, mais aussi passionnée et investie dans son travail. Elle sait mettre à l’aise, créer une ambiance agréable et bienveillante, ce qui permet de se sentir en confiance devant l’objectif. Le résultat est toujours magnifique : des photos de qualité qui reflètent parfaitement l’instant et l’émotion. Je la recommande les yeux fermés !",
        author: "Mathilde",
        service: "Portrait Studio",
        avatar: 'mathilde'
    },
    {
        quote: "Océane a su me mettre en avant dans une très belle série de photos dans un musée. Elle a su me mettre à l’aise et s’adapter à mes demandes facilement. Le résultat était épatant. Je vous recommande d’y aller les yeux fermés. 😊",
        author: "Victoire",
        service: "Séance Extérieur",
        avatar: 'Vic'
    },
    {
        quote: "J’ai eu la chance de rencontrer Océane un peu sur un coup de tête, en lui partageant mon histoire et mon envie de réaliser un shooting qui me tenait à cœur. Elle m’a tout de suite proposée de faire ce projet à Étretat, avec des idées magnifiques et une sensibilité incroyable. Au-delà de son talent, Océane est d’une gentillesse rare, qui met immédiatement en confiance. Ce shooting restera une expérience unique et précieuse pour moi, autant par le résultat des photos que par le moment partagé.",
        author: "Sacha",
        service: "Séance Extérieur",
        avatar: 'sacha'
    },
    {
        quote: "Un immense merci à Océane pour ce magnifique shooting mère-fille. Elle a su nous mettre à l’aise dès les premières minutes, avec beaucoup de douceur, de patience et de bienveillance. Le moment a été rempli d’émotion, de rires et de complicité, et cela se ressent parfaitement dans les photos. Océane a un vrai talent pour capturer les instants naturels et authentiques, sans jamais forcer les poses. Le résultat est tout simplement sublime, des souvenirs précieux que je garderai toute ma vie. Je recommande Océane les yeux fermés à toutes les mamans (et familles) qui souhaitent vivre une belle expérience et repartir avec des photos pleines d’amour et de sensibilité. 💕📸",
        author: "Victoria",
        service: "Séance Mère-Fille",
        avatar: 'Victoria'
    },
];

const Avis = () => {
    return (
        <section id="avis" className="avis-section-modern">
            <div className="avis-header">
                <span className="avis-eyebrow">Témoignages</span>
                <h2 className="adelia">Ils m'ont fait confiance</h2>
                <p className="avis-subtitle">Ce que mes clients disent de leur expérience.</p>
            </div>

            <div className="avis-masonry-grid">
                {testimonials.map((testimonial, index) => (
                    <div className="avis-card-modern" key={index}>
                        <div className="avis-card-header">
                            <img
                                src={`/images/opt/${testimonial.avatar}-128.webp`}
                                srcSet={avatarSrcSet(testimonial.avatar)}
                                sizes="60px"
                                alt={`Avatar de ${testimonial.author}`}
                                className="avis-avatar-modern"
                                width="60"
                                height="60"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="avis-author-info">
                                <h3 className="avis-author-name">{testimonial.author}</h3>
                                <span className="avis-service-tag">{testimonial.service}</span>
                            </div>
                        </div>
                        <div className="avis-card-body">
                            <span className="avis-quote-mark">"</span>
                            <p className="avis-quote-text">{testimonial.quote}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Avis;