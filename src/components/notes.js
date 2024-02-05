import Data from '../Data'
import Note from './note'
import React from 'react'

const Notes = () => {
  return (
    <div className="notes">
      <h1>Notes</h1>
      {Data.map((note, index) => {
        return <Note key={index} note={note} />
      })}
    </div>
  )
}

export default Notes
