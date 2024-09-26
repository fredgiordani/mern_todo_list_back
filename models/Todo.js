const mongoose = require('mongoose');

// Définition du schéma pour une tâche
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Créer le modèle basé sur le schéma
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;