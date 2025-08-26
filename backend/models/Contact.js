const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true },
    prestation: { type: String, required: true },
    creneau: { type: String, required: true },
    message: { type: String, required: false },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contact', contactSchema);