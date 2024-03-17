import { useState } from 'react';
import { Link } from 'react-router-dom';
import { notes } from '../Data'; // Assuming you have a file called 'notes.js' in the '../data' directory
import Notes from './notes';
import { useNavigate } from 'react-router-dom';
const SideBar = () => {
	const [note, setNote] = useState(notes);
	const navigate = useNavigate();

	const addNote = () => {
		const newNote = {
			id: 9,
			title: 'Note 9',
			content: 'This is the content of Note 9.',
			timestamp: new Date(),
			created: new Date(),
			color: 'lightblue',
		};
		setNote([...note, newNote]);
	};
	return (
		<div className="sideBar-Section">
			<div className="sideBar">
				{/* <Link to="/create-note">Create Note</Link> */}
				<span
					className="material-symbols-outlined"
					onClick={() => {
						navigate('/create-note');
					}}
				>
					Create Note
				</span>
			</div>
		</div>
	);
};

export default SideBar;
