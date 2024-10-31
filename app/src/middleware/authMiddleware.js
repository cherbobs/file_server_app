// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Token manquant' });
    }
    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = authenticate;
