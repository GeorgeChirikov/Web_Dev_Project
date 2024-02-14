import Note from './note'
import { notes } from '../Data'
import { useState } from 'react'
const Notes = () => {
  const [notes_, setNotes] = useState(notes)
  const deleteNote = (id) => {
    const updatedNotes = notes_.filter((note) => note.id !== id)
    setNotes(updatedNotes)
  }

  return (
    <div className="notes">
      {notes.map((note) => (
        <>
          <Note
            key={note.id}
            title={note.title}
            content={note.content}
            color={note.color}
          />
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </>
      ))}
    </div>
  )
}

export default Notes
