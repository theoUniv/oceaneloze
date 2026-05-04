import React from 'react';

// On structure les données pour plus de clarté et de flexibilité
const Prestations = () => {
    const [services, setServices] = React.useState([]);

    React.useEffect(() => {
        const fetchPrestations = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/api/portfolio/cards`);
                const data = await res.json();
                const items = data.filter(c => c.category === 'prestation').sort((a, b) => a.order - b.order);
                
                // Parse features back to array
                const parsedItems = items.map(item => ({
                    ...item,
                    features: item.features ? JSON.parse(item.features) : []
                }));

                setServices(parsedItems);
            } catch (err) {
                console.error("Erreur de récupération des prestations", err);
            }
        };
        fetchPrestations();
    }, []);

    return (
        <section id="prestations">
            <h2 className="adelia">Mes Prestations</h2>
            <div className="prestations-container-modern">
                {services.map((service, index) => (
                    <div className="prestation-card-modern" key={service.id || index}>
                        <div className="prestation-image-container">
                            <img 
                                src={service.imagePath?.startsWith('http') ? service.imagePath : `${process.env.REACT_APP_API_URL}/api/images/thumbnail?path=${encodeURIComponent(service.imagePath)}`} 
                                alt={` pour ${service.title}`} 
                                loading="lazy" 
                            />
                        </div>
                        <div className="prestation-content">
                            <h3>{service.title}</h3>
                            <p className="price-modern">{service.price}</p>
                            <ul className="features-list">
                                {service.features.map((feature, fIndex) => (
                                    <li key={fIndex}>{feature}</li>
                                ))}
                            </ul>
                            <a href="#contact" className="prestation-cta">
                                {service.description || 'Réserver cette séance'}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Prestations;