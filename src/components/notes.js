import Note from './note'
import { notes } from '../Data'

const Notes = () => {
  return (
    <div className="notes">
      {notes.map((note) => {
        console.log(note)
        return <Note key={note.id} {...note} />
      })}
    </div>
  )
}

export default Notes
