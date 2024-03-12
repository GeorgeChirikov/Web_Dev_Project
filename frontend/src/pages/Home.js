import NoteForm from "../components/NoteForm";
import NoteDetails from "../components/NoteDetails";
import { useEffect, useState } from "react";
const Home = () => {
  const [noteArray, setNoteArray] = useState([]);
  useEffect(() => {
    const getNote = async () => {
      const response = await fetch("/api/notes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
        setNoteArray([]);
        return;
      }
      setNoteArray(data);
    };
    getNote();
  }, []);
  return (
    <div className="home">
      <div className="note">
        {noteArray.length === 0 && <h2>No Notes Found</h2>}
        {noteArray.map((note) => (
          <NoteDetails key={note._id} note={note} />
        ))}
      </div>
      <NoteForm />
    </div>
  );
};
export default Home;