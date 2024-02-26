const express = require('express');

const {
    getNotes,
    newNote,
    getNote,
    deleteNote,
    patchNote
} = require('../controllers/NotesController');

const router = express.Router();

// GET all notes
router.get('/', getNotes);

// GET a single note by id
router.get('/:id', getNote);

// POST a new note
router.post('/', newNote);

// PATCH a note by id
router.patch('/:id', patchNote);

// DELETE a note by id
router.delete('/:id', deleteNote);

module.exports = router;