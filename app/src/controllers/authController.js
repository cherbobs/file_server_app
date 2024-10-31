// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtConfig = require('../config/jwtConfig');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await User.create(username, email, password);
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la création de l’utilisateur:', error);
        res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur', error: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    if (user && await User.verifyPassword(password, user.password_hash)) { // Utiliser password_hash pour la vérification
        const token = jwt.sign({ userId: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Identifiants invalides' });
    }
};

module.exports = { register, login };
