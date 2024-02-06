// import Notes from './notes'
import Note from './note'
import { notes } from '../Data'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home">
      <section className="notes-section">
        {notes.slice(0, 3).map((note) => {
          console.log(note)
          return <Note key={note.id} {...note} color={note.color} />
        })}
      </section>

      {
        <section className="noteFolders-section">
          <Link to="/notefolders">
            <button>Navigate to Note Folders</button>
          </Link>
        </section>
      }
    </div>
  )
}

export default Home

// {{ color: note.color }}
