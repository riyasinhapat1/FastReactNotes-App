import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch all notes
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/notes`)
      .then((res) => setNotes(res.data))
      .catch((err) => console.error("Error fetching notes:", err));
  }, []);

  // Add a new note
  const addNote = () => {
    const newNote = { id: Date.now(), title, content };
    axios
      .post(`${API_BASE}/api/notes`, newNote)
      .then((res) => {
        setNotes([...notes, res.data]);
        setTitle("");
        setContent("");
      })
      .catch((err) => console.error("Error adding note:", err));
  };

  // Delete a note
  const deleteNote = (id) => {
    axios
      .delete(`${API_BASE}/api/notes/${id}`)
      .then(() => {
        setNotes(notes.filter((n) => n.id !== id));
      })
      .catch((err) => console.error("Error deleting note:", err));
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
