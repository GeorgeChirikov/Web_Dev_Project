import { useState } from 'react'
import { notes } from '../Data' // Assuming you have a file called 'notes.js' in the '../data' directory

const SideBar = () => {
  const [note, setNote] = useState(notes)

  const addNote = () => {
    const newNote = {
      id: 9,
      title: 'Note 9',
      content: 'This is the content of Note 9.',
      timestamp: new Date(),
      created: new Date(),
      color: 'lightblue',
    }
    setNote([...note, newNote])
  }
  return (
    <div className="sideBar-Section">
      <div className="sideBar">
        <h2>SideBar</h2>
        {/* <button className="byttonAddNote" onClick={addNote}>
        Add Note
      </button> */}
      </div>
    </div>
  )
}

export default SideBar
