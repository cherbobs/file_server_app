// src/index.js
const express = require('express');
const app = express();
const upload = require('/UploadConfig.js'); 
const fileController = require('./controllers/fileController'); // Contrôleur de l'upload
const PORT = process.env.PORT || 3000;

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    // Récupérez les informations du fichier uploadé
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Aucun fichier uploadé" });
    }

    // Réponse après succès de l'upload
    res.status(200).json({
      message: "Fichier uploadé avec succès",
      file: {
        originalName: file.originalname,
        storagePath: file.path,
        size: file.size
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'upload du fichier" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
