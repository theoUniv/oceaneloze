const nodemailer = require('nodemailer');

// On crée le "transporteur" d'e-mail
const createTransporter = () => {
    let transporter;

    // On vérifie si la clé API SendGrid est définie
    if (process.env.SENDGRID_API_KEY) {
        // Configuration pour SendGrid (méthode recommandée)
        transporter = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 587,
            auth: {
                user: "apikey", // Ce nom d'utilisateur est littéral pour SendGrid
                pass: process.env.SENDGRID_API_KEY,
            },
        });
        console.log("Transporteur d'e-mail configuré avec SendGrid.");
    } else {
        // Configuration pour Gmail (méthode de secours/développement)
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM, // Votre adresse Gmail
                pass: process.env.GMAIL_APP_PASSWORD, // Le mot de passe d'application
            },
        });
        console.log("Transporteur d'e-mail configuré avec Gmail.");
    }
    return transporter;
};

// Fonction pour envoyer l'e-mail de réservation
const sendBookingEmail = async (contactData) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"Portfolio Océane" <${process.env.EMAIL_FROM}>`, // Nom de l'expéditeur et adresse
        to: process.env.EMAIL_TO, // Le destinataire (vous)
        subject: `Nouvelle demande de réservation de la part de ${contactData.nom}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Nouvelle demande de contact depuis le portfolio</h2>
                <p>Vous avez reçu une nouvelle demande de la part de :</p>
                <ul style="list-style: none; padding: 0;">
                    <li><strong>Nom :</strong> ${contactData.nom}</li>
                    <li><strong>Email :</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></li>
                    <li><strong>Téléphone :</strong> ${contactData.telephone}</li>
                </ul>
                <hr>
                <h3>Détails de la demande :</h3>
                <ul style="list-style: none; padding: 0;">
                    <li><strong>Type de prestation :</strong> ${contactData.prestation}</li>
                    <li><strong>Date souhaitée :</strong> ${contactData.creneau}</li>
                </ul>
                <h3>Message :</h3>
                <p style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
                    ${contactData.message || "Aucun message n'a été laissé."}
                </p>
                <p>Pensez à recontacter cette personne rapidement.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`E-mail de notification envoyé à ${process.env.EMAIL_TO}`);
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail de notification :", error);
        // On ne bloque pas la réponse à l'utilisateur même si l'e-mail échoue
    }
};


const sendConfirmationEmail = async (contactData) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"Océane Loze Photographe" <${process.env.EMAIL_FROM}>`,
        to: contactData.email, // <-- LA MAGIE EST ICI : on envoie à l'e-mail du client
        subject: `Confirmation de votre demande de séance photo`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #4a403a;">Merci pour votre demande, ${contactData.nom} !</h2>
                <p>J'ai bien reçu votre demande de réservation et je vous en remercie.</p>
                <p>Je reviendrai vers vous sous 48h pour confirmer les détails et la disponibilité pour la date souhaitée.</p>
                <br>
                <p><strong><u>Rappel de votre demande :</u></strong></p>
                <ul style="list-style: none; padding: 0;">
                    <li><strong>Prestation :</strong> ${contactData.prestation}</li>
                    <li><strong>Date souhaitée :</strong> ${contactData.creneau}</li>
                </ul>
                <br>
                <p>À très bientôt,</p>
                <p><strong>Océane Loze</strong><br>Photographe</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`E-mail de confirmation envoyé à ${contactData.email}`);
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail de confirmation :", error);
    }
};


module.exports = { sendBookingEmail, sendConfirmationEmail };