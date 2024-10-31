// services/userService.js
const db = require('../db'); // Connexion à la base de données (assurez-vous d'avoir configuré cela)

async function getUserQuotaUsed(userId) {
  const result = await db.query(
    'SELECT quota_used FROM users WHERE id = $1',
    [userId]
  );
  return result.rows[0].quota_used;
}

module.exports = { getUserQuotaUsed };
