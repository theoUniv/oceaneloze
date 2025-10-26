const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contact');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/contact', contactRoutes);

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port ${PORT}`);
});