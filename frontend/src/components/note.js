// import { useState } from 'react'
// import { notes } from '../Data'

const Note = ({ title, content, color }) => {
  //   const [note, setNote] = useState(notes)
  //   const deleteNote = (id) => {
  //     const updatedNotes = note.filter((note) => note.id !== id)
  //     setNote(updatedNotes)
  //   }

  return (
    <div className="note" style={{ backgroundColor: color }}>
      <article className="note-article">
        <h1>{title}</h1>
        <p>{content}</p>
        {/* <button onClick={() => deleteNote(note.id)}>Delete</button> */}
      </article>
    </div>
  )
}

export default Note
