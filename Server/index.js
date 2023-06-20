const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/Note.js');
const app = express();

mongoose.connect('mongodb+srv://noppawut:mZ6hFJGa6HyW3a5n@cluster.pq7vqi4.mongodb.net/mydatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(express.json());

// Create a new note
app.post('/notes', async (req, res) => {
  try {
    const { topic, message, priority, time, dueDate } = req.body;
    const note = await Note.create({ topic, message, priority, time, dueDate });
    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.error('Error getting notes:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single note by ID
app.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    console.error('Error getting note:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a note by ID
app.put('/notes/:id', async (req, res) => {
  try {
    const { topic, message, priority, time, dueDate } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { topic, message, priority, time, dueDate },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a note by ID
app.delete('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(4000, () => {
  console.log('Server started on port 4000');
});
