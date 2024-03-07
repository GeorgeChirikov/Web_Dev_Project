const mongoose = require('mongoose');
const Note = require('../models/Note');

//get all notes
const getNotes = async (req, res) => {
  const notes = await Note.find({}).sort({ createdAt: 'desc' });

  res.status(200).json(notes);
};

//New note
const newNote = async (req, res) => {
  const { title, content } = req.body;

  // add the note to db
  try {
    const note = await Note.create({ title, content });
    res.status(201).json({ message: 'Note: "' + title + '" created' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get a single note
const getNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such note' });
  }

  // const note = await note.findById(id)

  try {
    const user_id = req.params._id;
    const note = await Note.findById(id).where('user_id').equals(user_id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }

  // res.status(200).json(note)
};

//Delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Note not found' });
  }

  const note = await Note.findByIdAndDelete({ _id: id });

  if (!note) {
    return res.status(400).json({ error: 'Note not found' });
  }

  res.status(200).json({ message: 'Note deleted' });
};

//Patch a note
const patchNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Note not found' });
  }

  const note = await Note.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!note) {
    return res.status(400).json({ error: 'Note not found' });
  }

  res.status(200).json({ message: 'Note updated' });
};

module.exports = {
  getNotes,
  newNote,
  getNote,
  deleteNote,
  patchNote,
};
