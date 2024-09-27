const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todo');

// Charger les variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/todolist')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Erreur de connexion à MongoDB :', err));

const cors = require('cors');
app.use(cors());

// Middleware pour traiter les requêtes JSON
app.use(express.json({ limit: '50mb' }));

// Utiliser les routes Todo
app.use('/api/todos', todoRoutes);

// Routes simples pour tester
app.get('/', (req, res) => {
  res.status(200).send('Serveur et MongoDB connectés avec succès !');
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Quelque chose a mal tourné !');
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
