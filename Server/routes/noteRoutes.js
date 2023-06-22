const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Create a new note
router.post('/', noteController.createNote);

// Get all notes
router.get('/', noteController.getAllNotes);

// Get a single note by ID
router.get('/:id', noteController.getNoteById);

// Update a note by ID
router.put('/:id', noteController.updateNoteById);

// Delete a note by ID
router.delete('/:id', noteController.deleteNoteById);

module.exports = router;
