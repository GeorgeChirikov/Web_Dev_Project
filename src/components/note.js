const Note = ({ title, content, color }) => {
  return (
    <div className="note" style={{ backgroundColor: color }}>
      <article className="note-article">
        <h1>{title}</h1>
        <p>{content}</p>
      </article>
    </div>
  )
}

export default Note
