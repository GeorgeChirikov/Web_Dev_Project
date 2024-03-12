import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoteForm = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [error, setError] = useState(null);
	const token = localStorage.getItem('token');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!token) {
			setError('You must be logged in');
			return;
		}

		const note = { title, content };
		const response = await fetch('/api/notes', {
			method: 'POST',
			body: JSON.stringify(note),
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
		}
	};
	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a New note</h3>

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

			<button>Add Note</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};
export default NoteForm;
