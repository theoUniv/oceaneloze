const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendBookingEmail, sendConfirmationEmail } = require('../services/mailService');

// @route   POST /api/contact
// @desc    Enregistre en base + envoie les e-mails
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

        // ✅ Sauvegarde dans la base locale (SQLite/Sequelize)
        const newContact = await Contact.create(contactData);

        // ✅ Envoie les e-mails
        await Promise.all([
            sendBookingEmail(contactData),
            sendConfirmationEmail(contactData)
        ]);

        res.json({
            success: true,
            message: 'Votre demande a bien été enregistrée et envoyée !',
            contact: contactData
        });

    } catch (err) {
        console.error('❌ Erreur lors du traitement du contact :', err);
        res.status(400).json({
            success: false,
            message: 'Une erreur est survenue lors du traitement de la demande.',
            error: err.message
        });
    }
});

module.exports = router;
