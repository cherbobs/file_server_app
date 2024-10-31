const bcrypt = require('bcryptjs');
const db = require('../init-db/init');

const User = {
    create: async (username, email, password) => {
        const password_hash = await bcrypt.hash(password, 10); // Hachage du mot de passe
        const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
        await db.execute(query, [username, email, password_hash]);
    },
    findByUsername: async (username) => {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }
};

module.exports = User;
