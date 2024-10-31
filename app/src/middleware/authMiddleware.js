// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader); // Vérifie si l’en-tête est bien reçu

    if (!authHeader) return res.status(401).json({ message: 'Accès refusé, token manquant' });

    const token = authHeader.split(' ')[1];
    console.log("Token:", token); // Vérifie si le token est extrait correctement

    if (!token) return res.status(401).json({ message: 'Token manquant dans l’en-tête' });

    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.user = decoded; // Définit req.user avec les informations du token décodé
        console.log("Decoded User:", decoded); // Vérifie que req.user est bien défini
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide ou expiré' });
    }
};

module.exports = authMiddleware;
