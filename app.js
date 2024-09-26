// Import des modules nécessaires
const express = require('express');
const dotenv = require('dotenv');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Initialisation de l'application Express
const app = express();

// Configuration du port (par défaut 3000 si non défini dans .env)
const port = process.env.PORT || 3000;

// Route de base pour tester le serveur
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon serveur Node.js avec Express !');
});

// Démarrer le serveur et écouter sur le port défini
app.listen(port, () => {
  console.log(`Serveur démarré et écoutant sur le port ${port}`);
})