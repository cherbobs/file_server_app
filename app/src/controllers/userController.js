// src/controllers/userController.js
const User = require('../models/User');

const getProfile = async (req, res) => {
    try {
        console.log("userId dans getProfile:", req.user); // Vérifie que userId est défini
        const user = await User.findById(req.user.userId);
        console.log("Utilisateur trouvé dans getProfile:", user); // Log pour vérifier
        if (user) {
            res.json({ username: user.username, email: user.email, quota: user.quota });
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du profil', error: error.message });
    }
};


const updateProfile = async (req, res) => {
    const { username, email } = req.body;
    try {
        // Vérifie que l'utilisateur existe
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Met à jour l'utilisateur
        await User.updateById(req.user.userId, username || user.username, email || user.email);

        res.json({ message: 'Profil mis à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du profil', error: error.message });
    }
};

const getQuota = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (user) {
            const usedQuota = await User.calculateUsedQuota(user.id); // Fonction pour calculer le quota utilisé
            res.json({ totalQuota: user.quota, usedQuota });
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du quota:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du quota', error: error.message });
    }
};

module.exports = { getProfile, updateProfile, getQuota };
