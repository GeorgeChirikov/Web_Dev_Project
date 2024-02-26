const express = require('express');
const router = express.Router();
const {
    getNotes,
    newNote,
    getNote,
    deleteNote,
    patchNote
} = require('../controllers/NotesController');

const requireAuth = require('../middlewares/requireAuth');

// require authentification middleware
router.use(requireAuth);

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