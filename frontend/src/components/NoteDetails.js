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
        <h4>{note.title}</h4>
        <p>{formatDistanceToNow(new Date(note.date), { addSuffix: true })}</p>
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