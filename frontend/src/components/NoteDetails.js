import { useNavigate } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const NoteDetails = ({ note }) => {
    const navigate = useNavigate();

    const noteDelete = async (id) => {
        await fetch(`/api/notes/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
    };

    return (
        <div className="note-details">
        <h3>{note?.title ?? 'no title'}</h3>
        <text>{note?.content ?? 'no content'}</text>
        <p>{formatDistanceToNow(new Date(note?.date === undefined ? new Date() : note.date ?? new Date()), { addSuffix: true })}</p>
        <span
            className="material-symbols-outlined"
            onClick={() => {
                noteDelete(note._id);
                navigate("/login");
            }}
        >
            delete
        </span>
        </div>
    );
    };

    export default NoteDetails;