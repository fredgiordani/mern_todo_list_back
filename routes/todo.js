const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo'); // Importer le modèle Todo

// Route pour créer une nouvelle tâche
router.post('/add', async (req, res) => {
  try {
    const newTask = new Todo({
      task: req.body.task,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour récupérer toutes les tâches
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour mettre à jour une tâche (marquer comme terminée)
router.patch('/:id', async (req, res) => {
    try {
      // Trouver la tâche par ID
      const task = await Todo.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Tâche non trouvée' });
      }
  
      // Mise à jour des champs si présents dans la requête
      if (req.body.task !== undefined) {
        task.task = req.body.task;
      }
      
      if (req.body.completed !== undefined) {
        task.completed = req.body.completed;
      }
  
      // Sauvegarder les modifications
      const updatedTask = await task.save();
      res.json(updatedTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Route pour supprimer une tâche
router.delete('/:id', async (req, res) => {
  try {
    const task = await Todo.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tâche supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
