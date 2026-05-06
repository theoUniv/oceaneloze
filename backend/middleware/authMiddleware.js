const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_pour_dev';

function authMiddleware(req, res, next) {
    const tokenHeader = req.header('Authorization');
    
    if (!tokenHeader) {
        return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
    }

    const token = tokenHeader.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Token malformé.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // { userId, role, etc. }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token invalide ou expiré. Veuillez vous reconnecter.' });
    }
}

module.exports = authMiddleware;
