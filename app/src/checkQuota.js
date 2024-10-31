const { getUserQuotaUsed } = require('../services/userService'); // Service de récupération du quota

const MAX_QUOTA = 2 * 1024 * 1024 * 1024; // 2 Go en octets

module.exports = async (req, res, next) => {
  const userId = req.user.id; // ID de l’utilisateur, supposé être extrait du token d'authentification
  const fileSize = req.file.size; // Taille du fichier

  try {
    const quotaUsed = await getUserQuotaUsed(userId); // Récupère l’espace utilisé
    if (quotaUsed + fileSize > MAX_QUOTA) {
      return res.status(400).json({ error: "Quota exceeded" });
    }
    next(); // Passe au contrôleur d’upload si le quota est respecté
  } catch (err) {
    res.status(500).json({ error: "Error checking quota" });
  }
};
