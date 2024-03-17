import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoteUpdateForm = ({ note, onUpdate }) => { 
    const navigate = useNavigate();
	const [title, setTitle] = useState(note.title);
	const [content, setContent] = useState(note.content);
	const [error, setError] = useState(null);
	const token = localStorage.getItem('token');


  //function to handle the form submission for update note
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedNote = { title, content };
    

    if (!token) {
      setError('You must be logged in');
      return;
    }

    const response = await fetch(`/api/notes/${note._id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedNote),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle('');
      setContent('');
      setError(null);
      navigate('/login');

      onUpdate(updatedNote);
    }
  };

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Update note</h3>

			<label>Title:</label>
			<input
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
			/>

			<label>Content:</label>
			<input
				type="text"
				onChange={(e) => setContent(e.target.value)}
				value={content}
			/>

			<button>Update Note</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};
export default NoteUpdateForm;