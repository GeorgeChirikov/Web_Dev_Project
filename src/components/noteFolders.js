import NoteFolder from './noteFolder'

const NoteFolders = () => {
  // Component logic and JSX here
  const folders = ['Folder 1', 'Folder 2', 'Folder 3']

  return (
    <div>
      {folders.map((folder) => (
        <NoteFolder key={folder.id} {...folder} />
      ))}
    </div>
  )
}

export default NoteFolders
