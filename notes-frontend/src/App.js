import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/notes").then((res) => setNotes(res.data));
  }, []);

  const addNote = () => {
    const newNote = { id: Date.now(), title, content };
    axios.post("http://127.0.0.1:8000/notes", newNote).then((res) => {
      setNotes([...notes, res.data]);
      setTitle("");
      setContent("");
    });
  };

  const deleteNote = (id) => {
    axios.delete(`http://127.0.0.1:8000/notes/${id}`).then(() => {
      setNotes(notes.filter((n) => n.id !== id));
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notes App</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={addNote}>Add</button>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <strong>{note.title}</strong>: {note.content}
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
