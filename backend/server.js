const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const contactRoutes = require('./routes/contact');
const Contact = require('./models/Contact');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sessions pour Passport
app.use(session({
    secret: 'ton_secret_ultra_securisé',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Google OAuth
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Autoriser uniquement l'admin
    if (profile.emails[0].value === 'oceaneloze631@gmail.com') {
        return done(null, profile);
    } else {
        return done(null, false, { message: 'Non autorisé' });
    }
}));

// Middleware pour protéger les routes admin
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: 'Non autorisé' });
}

// Connexion à MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connecté avec succès"))
    .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));

// Routes
app.use('/api/contact', contactRoutes);

// Routes Auth Google
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/admin');
    }
);

// Endpoint admin pour voir toutes les demandes
app.get('/api/admin/contacts', ensureAuthenticated, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
