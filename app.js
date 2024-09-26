const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todo');

// Charger les variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/todolist')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Erreur de connexion à MongoDB :', err));

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Utiliser les routes Todo
app.use('/api/todos', todoRoutes);

// Routes simples pour tester
app.get('/', (req, res) => {
  res.send('Serveur et MongoDB connectés avec succès !');
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
