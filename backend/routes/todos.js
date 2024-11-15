// routes/todos.js
const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Create a new Todo
router.post('/', async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all Todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a Todo
// routes/todos.js
// Update a Todo
router.patch('/:id', async (req, res) => {
  try {
    const { title, completed } = req.body;
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Delete a Todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    await Todo.deleteOne({ _id: req.params.id }); // Alternative delete method
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error("Delete Route Error:", error.message); // Log the error to understand it better
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
