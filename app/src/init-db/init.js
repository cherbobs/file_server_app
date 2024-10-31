// src/init-db/init.js
const mysql = require('mysql2/promise');

// Créer un pool de connexions pour une meilleure gestion des connexions
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Vérifier la connexion au démarrage
db.getConnection()
  .then(connection => {
    console.log('Connecté à MySQL');
    connection.release(); // libère la connexion
  })
  .catch(err => {
    console.error('Erreur de connexion à MySQL:', err);
  });

module.exports = db;
