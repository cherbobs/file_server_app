// src/index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./init-db/init'); // Connexion à la base de données

// Middleware pour parser le JSON
app.use(express.json());

// Route racine pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur de fichiers avec MySQL !');
});

// Importation et utilisation des routes d'authentification
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
