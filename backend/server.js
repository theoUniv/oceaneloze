const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./db');
const Contact = require('./models/Contact');
const User = require('./models/User');
const Card = require('./models/Card');
const authMiddleware = require('./middleware/authMiddleware');

const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');

const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Servir les images de manière statique (résout le problème des 404 en prod après un upload)
app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')));

// Servir directement le PDF du portfolio à la racine: /portfolio.pdf
app.get('/portfolio.pdf', (req, res) => {
    const pdfPath = path.join(__dirname, '../frontend/public/images/portfolio.pdf');
    res.sendFile(pdfPath, (err) => {
        if (err) {
            console.error('Erreur en envoyant portfolio.pdf:', err);
            return res.status(404).send('Fichier non trouvé');
        }
    });
});

// Synchronisation base de données locale (SQLite)
sequelize.sync({ alter: true }) // Met à jour la structure sans supprimer les données existantes
    .then(async () => {
        console.log("✅ Base de données locale synchronisée avec succès");

        // Créer un admin par défaut si aucun n'existe
        const adminCount = await User.count();
        if (adminCount === 0) {
            const bcrypt = require('bcryptjs');
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                email: 'admin@admin.com',
                password: hashedPassword,
                role: 'admin'
            });
            console.log("🔑 Utilisateur admin par défaut généré : admin@admin.com / admin123");
        }

        const cardCount = await Card.count();
        if (cardCount === 0) {
            console.log("🚀 Initialisation des données du portfolio et prestations par défaut...");
            
            // Séeding Portfolio
            const portfolioItems = [
                { category: 'portfolio', type: 'image', imagePath: '/images/1.webp', title: 'Douce Rêverie', description: '1', order: 1 },
                { category: 'portfolio', type: 'image', imagePath: '/images/2.webp', title: 'Chrome & Caractère', order: 2 },
                { category: 'portfolio', type: 'quote', description: "Etre soi c'est déjà magnifique.", order: 3 },
                { category: 'portfolio', type: 'image', imagePath: '/images/3.webp', title: "Palais d'Été", order: 4 },
                { category: 'portfolio', type: 'image', imagePath: '/images/4.webp', title: 'Urbain & Sauvage', description: '1', order: 5 },
                { category: 'portfolio', type: 'image', imagePath: '/images/portfolio-6.webp', title: 'Pose Intemporelle', order: 6 },
                { category: 'portfolio', type: 'image', imagePath: '/images/6.webp', title: 'Reflets Mystiques', order: 7 },
                { category: 'portfolio', type: 'quote', description: "Capturer l'âme, pas seulement le sourire.", order: 8 },
                { category: 'portfolio', type: 'image', imagePath: '/images/7.webp', title: 'Lumière Dorée', order: 9 },
                { category: 'portfolio', type: 'image', imagePath: '/images/8.webp', title: 'Élégance Naturelle', order: 10 },
                { category: 'portfolio', type: 'image', imagePath: '/images/9.webp', title: 'Instant Suspendu', order: 11 },
                { category: 'portfolio', type: 'image', imagePath: '/images/10.webp', title: 'Grâce & Mouvement', order: 12 },
                { category: 'portfolio', type: 'image', imagePath: '/images/11.webp', title: 'Portrait Intimiste', order: 13 },
                { category: 'portfolio', type: 'image', imagePath: '/images/12.webp', title: 'Harmonie', order: 14 },
            ];
            
            // Séeding Prestations
            const services = [
                { category: 'prestation', imagePath: '/images/Studio.webp', title: 'Séance Studio', price: 'À partir de 120€', features: JSON.stringify(['Séance de 1 heure', 'Studio disponible à Meaux (77)', '40 photos en HD', 'Galerie en ligne privée', 'Décors et fonds au choix']), order: 15 },
                { category: 'prestation', imagePath: '/images/exterieur.webp', title: 'Séance Extérieur', price: 'À partir de 100€', features: JSON.stringify(['Séance de 1h', '40 photos en HD', 'Galerie en ligne privée', 'Lieu au choix']), order: 16 },
                { category: 'prestation', imagePath: '/images/mariage.webp', title: 'Evènementiel', price: 'Sur Devis', features: JSON.stringify(['Mariage, anniversaire, entreprise...', 'Reportage photo']), order: 17 },
                { category: 'prestation', imagePath: '/images/animaux.webp', title: 'Séance Animalière', price: 'À partir de 170€', features: JSON.stringify(['Séance de 1h', 'Chevaux mis à disposition (Provins 77)', 'Avec votre animal (à partir de 100€)', '40 Photos en HD', 'Galerie en ligne privée']), order: 18 },
                { category: 'prestation', imagePath: '/images/Vehicule.webp', title: 'Séance Auto/Moto', price: 'À partir de 100€', features: JSON.stringify(['Séance de 1h avec votre véhicule', '40 photos en HD', 'Galerie en ligne privée', 'Lieu au choix', '*une moto ou un véhicule peuvent être mis à disposition pour le shooting ( 90€ en plus )']), order: 19 },
                { category: 'prestation', imagePath: '/images/contact.webp', title: 'Restauration Photo/Tirage', price: 'Sur devis', features: JSON.stringify(['Tirage grand format', 'Tirage photo à partir de 0.60€', 'Restauration de photos anciennes à partir de 10€', 'Toile photo']), order: 20 },
            ];

            await Card.bulkCreate([...portfolioItems, ...services]);
            console.log("✅ Données par défaut (Portfolio/Prestations) insérées dans la BDD !");
        }
    })
    .catch((err) => console.error("❌ Erreur de synchronisation BDD :", err));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes); // Auth locale JWT

// Endpoint admin pour voir toutes les demandes
app.get('/api/admin/contacts', authMiddleware, async (req, res) => {
    try {
        const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Endpoint pour gérer le portfolio (futur interface)
app.get('/api/portfolio/cards', async (req, res) => {
    try {
        const cards = await Card.findAll();
        res.json(cards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.post('/api/portfolio/cards', authMiddleware, async (req, res) => {
    try {
        const { title, description, category, type, imagePath, price, features, order } = req.body;
        const newCard = await Card.create({ title, description, category, type, imagePath, price, features, order });
        res.json(newCard);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.put('/api/portfolio/cards/:id', authMiddleware, async (req, res) => {
    try {
        const card = await Card.findByPk(req.params.id);
        if (!card) return res.status(404).json({ message: 'Carte non trouvée' });
        
        const { title, description, category, type, imagePath, price, features, order } = req.body;
        await card.update({ title, description, category, type, imagePath, price, features, order });
        res.json(card);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.delete('/api/portfolio/cards/:id', authMiddleware, async (req, res) => {
    try {
        const card = await Card.findByPk(req.params.id);
        if (!card) return res.status(404).json({ message: 'Carte non trouvée' });
        await card.destroy();
        res.json({ message: 'Carte supprimée' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

app.get('/api/images/thumbnail', async (req, res) => {
    try {
        const imagePath = req.query.path;
        if (!imagePath) return res.status(400).send('Path is required');
        
        const sharp = require('sharp');
        const path = require('path');
        const fs = require('fs');
        
        // Résoudre le vrai chemin de l'image (frontend/public + imagePath)
        const fullPath = path.join(__dirname, '../frontend/public', imagePath);
        
        if (!fs.existsSync(fullPath)) {
            return res.status(404).send('Image non trouvée');
        }

        // Redimensionnement basse résolution (ex: 600px de large max) et compression améliorée
        const buffer = await sharp(fullPath)
            .resize({ width: 600, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toBuffer();

        res.set('Content-Type', 'image/webp');
        res.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
        res.send(buffer);
    } catch (err) {
        console.error('Erreur redimensionnement:', err);
        res.status(500).send('Erreur lors du traitement de l\'image');
    }
});

// Upload d'image avec Multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../frontend/public/images');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Renommage automatique : portfolio_163456789.jpg
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `upload_${uniqueSuffix}${ext}`);
    }
});
const upload = multer({ storage: storage });

const uploadSingle = upload.single('image');

app.post('/api/upload', authMiddleware, (req, res) => {
    uploadSingle(req, res, function (err) {
        if (err) {
            console.error('Erreur Multer:', err);
            return res.status(500).json({ message: 'Erreur lors de la sauvegarde du fichier: ' + err.message });
        }
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Aucun fichier uploadé' });
            }
            // Renvoie le chemin public pour le frontend
            res.json({ imagePath: `/images/${req.file.filename}` });
        } catch (err) {
            console.error('Erreur upload:', err);
            res.status(500).json({ message: 'Erreur Serveur' });
        }
    });
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé localement sur le port ${PORT}`);
});
