const bcrypt = require('bcryptjs');
const db = require('../init-db/init');

const User = {
    // Méthode pour créer un utilisateur
    create: async (username, email, password) => {
        const password_hash = await bcrypt.hash(password, 10); // Hachage du mot de passe
        const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
        await db.execute(query, [username, email, password_hash]);
    },

    // Méthode pour trouver un utilisateur par son nom d'utilisateur
    findByUsername: async (username) => {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    },

    // Méthode pour trouver un utilisateur par son email
    findByEmail: async (email) => {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    // Méthode pour trouver un utilisateur par son ID (utile pour les requêtes de profil)
    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        console.log("Utilisateur trouvé par ID:", rows[0]); // Log pour vérifier
        return rows[0];
    },

     // Méthode pour mettre à jour un utilisateur
    updateById: async (id, newUsername, newEmail) => {
        const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
        await db.execute(query, [newUsername, newEmail, id]);
    }
};

module.exports = User;
