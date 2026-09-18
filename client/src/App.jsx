import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setNotes(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Could not load notes. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Please fill in both title and content.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await axios.post(API_URL, { title, content });
      setNotes((prevNotes) => [res.data, ...prevNotes]);
      setTitle("");
      setContent("");
      setError("");
    } catch (err) {
      console.error("Error creating note:", err);
      setError("Could not save note. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Could not delete note. Please try again.");
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Notes</h1>
        <p className="subtitle">A simple MERN CRUD notes app</p>
      </header>

      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-title"
        />
        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input-content"
          rows={4}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Note"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <main className="notes-section">
        {loading ? (
          <p className="status-message">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="status-message">No notes yet — add one above!</p>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <div className="note-card" key={note._id}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <div className="note-footer">
                  <span className="note-date">{formatDate(note.createdAt)}</span>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
