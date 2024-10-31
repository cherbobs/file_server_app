const { saveFile, updateUserQuota } = require('../services/filesServices');

// controllers/fileController.js

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Aucun fichier uploadé" });
  }
  
  // Réponse après succès de l'upload
  res.status(200).json({
    message: "Fichier uploadé avec succès",
    file: {
      originalName: req.file.originalname,
      storagePath: req.file.path,
      size: req.file.size
    }
  });
};

