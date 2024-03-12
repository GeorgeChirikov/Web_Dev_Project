import { useState } from 'react';

const NoteForm = () => {
	const [title, setTitle] = useState('');
	const [date, setDate] = useState('');
	const [content, setContent] = useState('');
	const [error, setError] = useState(null);
	const token = localStorage.getItem('token');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!token) {
			setError('You must be logged in');
			return;
		}

		const note = { title, date, content };

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
			setDate('');
			setError(null);
		}
	};
	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a New Note</h3>

			<label>Title:</label>
			<input
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
			/>

			<label>Date:</label>
			<input
				type="date"
				onChange={(e) => setDate(e.target.value)}
				value={date}
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
