const db = require('../db'); // Connexion à la base de données

// Enregistrer un fichier
async function saveFile(userId, file) {
  return db.query(
    'INSERT INTO files (user_id, filename, filepath, size) VALUES ($1, $2, $3, $4)',
    [userId, file.originalname, file.path, file.size]
  );
}

// Mettre à jour le quota utilisé par un utilisateur
async function updateUserQuota(userId, fileSize) {
  return db.query(
    'UPDATE users SET quota_used = quota_used + $1 WHERE id = $2',
    [fileSize, userId]
  );
}

module.exports = { saveFile, updateUserQuota };
