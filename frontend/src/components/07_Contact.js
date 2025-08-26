import React, { useState } from 'react';
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fr from 'date-fns/locale/fr';

registerLocale('fr', fr);

const Contact = () => {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        telephone: '',
        prestation: 'Studio',
        message: ''
    });
    const [dateSelectionnee, setDateSelectionnee] = useState(new Date());
    const [formMessage, setFormMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormMessage(null);

        const finalData = {
            ...formData,
            creneau: dateSelectionnee.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        };

        axios.post('http://localhost:8080/api/contact', finalData)
            .then(response => {
                setFormMessage({ type: 'success', text: response.data.message });
                setFormData({ nom: '', email: '', telephone: '', prestation: 'Studio', message: '' });
                setDateSelectionnee(new Date());
            })
            .catch(error => {
                const errorMsg = error.response?.data?.message || 'Une erreur est survenue.';
                setFormMessage({ type: 'error', text: errorMsg });
            });
    };

    return (
        <section id="contact" className="contact-section-wrapper">
            <div className="contact-container-modern">
                {/* --- Panneau de Gauche : Formulaire --- */}
                <div className="form-panel">
                    <h2>Demande de devis</h2>
                    <p className="form-subtitle">Remplissez ce formulaire pour me parler de votre projet. Je vous répondrai dans les plus brefs délais.</p>
                    <form className="contact-form-modern" onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <input type="text" id="nom" name="nom" placeholder=" " value={formData.nom} onChange={handleChange} required />
                            <label htmlFor="nom">Nom complet</label>
                        </div>
                        <div className="form-group">
                            <input type="email" id="email" name="email" placeholder=" " value={formData.email} onChange={handleChange} required />
                            <label htmlFor="email">Adresse email</label>
                        </div>
                        <div className="form-group">
                            <input type="tel" id="telephone" name="telephone" placeholder=" " value={formData.telephone} onChange={handleChange} required />
                            <label htmlFor="telephone">Téléphone</label>
                        </div>
                        <div className="form-group">
                            <textarea id="message" name="message" placeholder=" " rows="4" value={formData.message} onChange={handleChange}></textarea>
                            <label htmlFor="message">Votre message</label>
                        </div>
                        <button type="submit" className="submit-button-modern">Envoyer ma demande</button>
                    </form>
                </div>

                {/* --- Panneau de Droite : Calendrier --- */}
                <div className="booking-panel">

                    {/* MODIFIEZ LA LIGNE CI-DESSOUS */}
                    <div className="booking-field"> {/* <--- On remplace "form-group" par "booking-field" */}
                        <label htmlFor="prestation" className="prestation-label">Type de prestation</label>
                        <select id="prestation" name="prestation" value={formData.prestation} onChange={handleChange} required>
                            <option value="Studio">Séance Studio</option>
                            <option value="Exterieur">Séance Extérieur</option>
                            <option value="Evenementiel">Événementiel</option>
                            <option value="Autre">Autre demande</option>
                        </select>
                    </div>

                    <div className="datepicker-wrapper">
                        <label className="prestation-label">Date souhaitée</label>
                        <DatePicker
                            selected={dateSelectionnee}
                            onChange={(date) => setDateSelectionnee(date)}
                            inline
                            minDate={new Date()}
                            locale="fr"
                        />
                    </div>
                </div>
            </div>
            {formMessage && (
                <div className={`form-message modern ${formMessage.type}`}>
                    {formMessage.text}
                </div>
            )}
        </section>
    );
};

export default Contact;