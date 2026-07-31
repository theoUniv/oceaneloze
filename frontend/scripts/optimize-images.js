/**
 * Génère les versions optimisées (responsive) des images du site.
 *
 * Les originaux dans public/images/ ne sont jamais modifiés : ils restent la
 * source (et servent aussi au redimensionnement à la volée côté backend).
 * Ce script écrit les déclinaisons dans public/images/opt/<nom>-<largeur>.webp,
 * qui sont les fichiers réellement envoyés au navigateur.
 *
 * Utilisation :  npm run optimize:images   (depuis frontend/)
 * Relancer après avoir ajouté ou remplacé une image de la liste ci-dessous.
 */

const fs = require('fs');
const path = require('path');

// sharp est déjà installé côté backend (utilisé par /api/images/thumbnail).
// On le réutilise pour éviter une deuxième installation de cette dépendance native.
let sharp;
try {
    sharp = require('sharp');
} catch (e) {
    sharp = require('../../backend/node_modules/sharp');
}

const SRC_DIR = path.join(__dirname, '../public/images');
const OUT_DIR = path.join(SRC_DIR, 'opt');

// Largeurs générées pour chaque image, en fonction de sa taille d'affichage réelle.
// (une image affichée en 60px n'a jamais besoin de faire 4000px de large)
const TARGETS = [
    // Carrousel d'accueil : plein écran
    { file: '5caroussel.webp', widths: [768, 1280, 1920], quality: 72 },
    { file: 'carousel-2.webp', widths: [768, 1280, 1920], quality: 72 },
    { file: 'carousel-3.webp', widths: [768, 1280, 1920], quality: 72 },
    { file: 'famille2.webp', widths: [768, 1280, 1920], quality: 72 },
    { file: 'karcher.webp', widths: [768, 1280, 1920], quality: 72 },
    { file: 'enfant_ext.webp', widths: [768, 1280, 1920], quality: 72 },

    // À propos : colonne ~50% de l'écran
    { file: 'nanane.webp', widths: [480, 800, 1280], quality: 74 },
    { file: 'signature.webp', widths: [220, 440], quality: 80 },

    // Avis : avatars affichés en 60px
    { file: 'maelle.webp', widths: [64, 128, 180], quality: 80 },
    { file: 'juline.webp', widths: [64, 128, 180], quality: 80 },
    { file: 'mathilde.webp', widths: [64, 128, 180], quality: 80 },
    { file: 'Vic.webp', widths: [64, 128, 180], quality: 80 },
    { file: 'sacha.webp', widths: [64, 128, 180], quality: 80 },
    { file: 'Victoria.webp', widths: [64, 128, 180], quality: 80 },

    // Contact : fond flouté (blur 25px) -> une petite image suffit largement
    { file: 'animaux.webp', widths: [640], quality: 60 },

    // Navbar : logo 40px de haut, texte 30px de haut
    { file: 'logoblanc.png', widths: [96, 192], quality: 85, alpha: true },
    { file: 'texteblanc.png', widths: [192, 384], quality: 85, alpha: true },
];

const fmtSize = (bytes) => `${(bytes / 1024).toFixed(0)} Ko`;

async function run() {
    fs.mkdirSync(OUT_DIR, { recursive: true });

    let srcTotal = 0;
    let outTotal = 0;
    const missing = [];

    for (const target of TARGETS) {
        const srcPath = path.join(SRC_DIR, target.file);
        if (!fs.existsSync(srcPath)) {
            missing.push(target.file);
            continue;
        }

        const base = path.parse(target.file).name;
        const srcSize = fs.statSync(srcPath).size;
        srcTotal += srcSize;

        const produced = [];
        for (const width of target.widths) {
            const outPath = path.join(OUT_DIR, `${base}-${width}.webp`);
            await sharp(srcPath)
                .resize({ width, withoutEnlargement: true })
                .webp({
                    quality: target.quality,
                    effort: 6,
                    alphaQuality: target.alpha ? 100 : 80,
                })
                .toFile(outPath);

            const outSize = fs.statSync(outPath).size;
            outTotal += outSize;
            produced.push(`${width}px ${fmtSize(outSize)}`);
        }

        console.log(`✅ ${target.file.padEnd(20)} ${fmtSize(srcSize).padStart(9)} → ${produced.join(' | ')}`);
    }

    if (missing.length) {
        console.warn(`\n⚠️  Introuvables (ignorées) : ${missing.join(', ')}`);
    }

    console.log(
        `\n📦 Sources : ${(srcTotal / 1024 / 1024).toFixed(1)} Mo` +
        ` → déclinaisons générées : ${(outTotal / 1024 / 1024).toFixed(2)} Mo`
    );
}

run().catch((err) => {
    console.error('❌ Échec de l\'optimisation :', err);
    process.exit(1);
});
