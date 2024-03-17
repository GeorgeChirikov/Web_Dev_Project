import Note from './note';
import NoteDetails from './NoteDetails';
import { notes } from '../Data';
import { useState } from 'react';
const Notes = () => {
	const [notes_, setNotes] = useState(notes);
	const deleteNote = (id) => {
		const updatedNotes = notes_.filter((note) => note.id !== id);
		setNotes(updatedNotes);
	};

	return (
		<div className="notes">
			{notes.map((note) => (
				<div key={note.id} className="note-container">
					<Note
						key={note.id}
						title={note.title}
						content={note.content}
						color={note.color}
					/>
					<button onClick={() => deleteNote(note.id)}>Delete</button>
					<NoteDetails key={note._id} note={note} />
				</div>
			))}
		</div>
	);
};

export default Notes;
