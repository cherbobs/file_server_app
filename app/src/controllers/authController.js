// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwtConfig = require('../config/jwtConfig');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Vérifie si l'email ou le nom d'utilisateur existe déjà
        const existingUser = await User.findByUsername(username) || await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Nom d’utilisateur ou email déjà utilisé' });
        }

        // Crée l'utilisateur
        await User.create(username, email, password);
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la création de l’utilisateur:', error);
        res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur', error: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findByUsername(username);
        if (user && await bcrypt.compare(password, user.password_hash)) {
            // S'assurer que le token contient `userId`
            const token = jwt.sign({ userId: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Identifiants invalides' });
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
    }
};

module.exports = { register, login };
