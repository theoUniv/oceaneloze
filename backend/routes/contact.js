const express = require('express');
const router = express.Router();

// On garde juste les fonctions de mail
const { sendBookingEmail, sendConfirmationEmail } = require('../services/mailService');

// @route   POST api/contact
// @desc    Envoie un e-mail de notification et un e-mail de confirmation (sans sauvegarde en base)
// @access  Public
router.post('/', async (req, res) => {
    try {
        const contactData = {
            nom: req.body.nom,
            email: req.body.email,
            telephone: req.body.telephone,
            prestation: req.body.prestation,
            creneau: req.body.creneau,
            message: req.body.message
        };

        // Envoie les e-mails sans rien stocker en base
        await Promise.all([
            sendBookingEmail(contactData),      // E-mail pour toi
            sendConfirmationEmail(contactData)  // E-mail pour le client
        ]);

        res.json({
            success: true,
            message: 'Votre demande a bien été envoyée !',
            contact: contactData
        });

    } catch (err) {
        console.error('Erreur lors du traitement du contact :', err);
        res.status(400).json({
            success: false,
            message: 'Une erreur est survenue lors du traitement de la demande.',
            error: err.message
        });
    }
});

module.exports = router;
