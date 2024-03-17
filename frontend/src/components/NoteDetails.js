import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NoteUpdateForm from "./NoteUpdateForm";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const NoteDetails = ({ note }) => {
    const navigate = useNavigate();
    const [isUpdating, setIsUpdating] = useState(false);

    const noteDelete = async (id) => {
        await fetch(`/api/notes/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
    };

    // expands update form in contact details when update button is clicked
	const handleUpdate = async (updatedNote) => {
		const response = await fetch(`/api/notes/${note._id}`, {
		  method: 'PATCH',
		  body: JSON.stringify(updatedNote),
		  headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		  },
		});
	
		if (response.ok) {
		  setIsUpdating(false);
		  navigate('/login');
		}
	  };

    return (
        <div className="note-details">
        <h3>{note?.title ?? 'no title'}</h3>
        <text>{note?.content ?? 'no content'}</text>
        <p>{formatDistanceToNow(new Date(note?.date === undefined ? new Date() : note.date ?? new Date()), { addSuffix: true })}</p>
        
        {isUpdating ? (
				<NoteUpdateForm note={note} onUpdate={handleUpdate} />
			) : (
				<>
        <span
            className="material-symbols-outlined"
            onClick={() => {
                noteDelete(note._id);
                navigate("/login");
            }}
        >
            delete
        </span>

        <span
                className="material-symbols-outlined"
				onClick={() => setIsUpdating(true)}
			>
				update
        </span>
        </>
        )}
        </div>
    );
    };

    export default NoteDetails;