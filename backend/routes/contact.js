const express = require('express');
const router = express.Router();

const Contact = require('../models/Contact');
// LIGNE CORRIGÉE : On importe bien les deux fonctions
const { sendBookingEmail, sendConfirmationEmail } = require('../services/mailService');

// @route   POST api/contact
// @desc    Créer une nouvelle demande, envoyer un e-mail de notif et un e-mail de confirmation
// @access  Public
router.post('/', async (req, res) => {
    try {
        const newContact = new Contact({
            nom: req.body.nom,
            email: req.body.email,
            telephone: req.body.telephone,
            prestation: req.body.prestation,
            creneau: req.body.creneau,
            message: req.body.message
        });

        const savedContact = await newContact.save();

        // Cette partie est correcte et fonctionnera maintenant que l'import est bon
        await Promise.all([
            sendBookingEmail(savedContact),      // L'e-mail pour vous
            sendConfirmationEmail(savedContact)  // L'e-mail pour le client
        ]);

        res.json({ success: true, message: 'Votre demande a bien été envoyée !', contact: savedContact });

    } catch (err) {
        console.error(err.message);
        // On log l'erreur spécifique pour mieux comprendre
        console.error(err);
        res.status(400).json({ success: false, message: 'Une erreur est survenue lors du traitement de la demande.', error: err.message });
    }
});

module.exports = router;