const mongoose = require('mongoose');
const Note = require('../models/Note');

//get all notes
const getNotes = async (req, res) => {
	const user_id = req.user._id;

	try {
		const notes = await Note.find({ user_id }).sort({ createdAt: 'desc' });
		res.status(200).json(notes);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

//New note
const newNote = async (req, res) => {
	const { title, content } = req.body;

	// add the note to db
	try {
		const user_id = req.user._id;
		const note = new Note({
			title,
			content,
			user_id,
		});
		await note.save();
		// const note = await Note.create({ title, content });
		// res.status(201).json({ message: 'Note: "' + title + '" created' });
		res.status(201).json({
			message: `Note: '${title}' created
    ${note}`,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
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
		const user_id = req.user._id;
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
		return res.status(404).json({ error: 'Note not found' });
	}

	try {
		const user_id = req.user._id;
		const note = await Note.findByIdAndDelete({
			_id: id,
			user_id: user_id,
		})
			.where('user_id')
			.equals(user_id);

		if (!note) {
			return res.status(404).json({ error: 'Note not found' });
		}
		res.status(200).json({ message: `Note: '${note.title}' deleted` });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

//Patch a note
const patchNote = async (req, res) => {
	const { id } = req.params;

	try {
		const user_id = req.user._id;
		const note = await Note.findByIdAndUpdate(
			{ _id: id, user_id: user_id },
			{ ...req.body },
			{ new: true }
		)
			.where('user_id')
			.equals(user_id);

		if (!note) {
			return res.status(404).json({ error: 'Note not found' });
		}
		res.status(200).json(note);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getNotes,
	newNote,
	getNote,
	deleteNote,
	patchNote,
};
