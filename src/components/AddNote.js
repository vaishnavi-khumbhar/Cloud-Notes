import React, { useContext, useState, useEffect, useRef } from 'react';
import NoteContext from '../context/notes/noteContext';

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const titleRef = useRef(null);

  // Auto focus title field when component mounts
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Note added successfully", "success");
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}>
        <h3 className="text-center text-primary mb-3">📝 Add a New Note</h3>

        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">Title</label>
            <input
              ref={titleRef}
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
              minLength={3}
              required
              placeholder="Enter note title"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              rows="3"
              minLength={5}
              required
              placeholder="Enter note description"
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label fw-semibold">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              placeholder="Optional tag"
            />
          </div>

          <button
            disabled={note.title.length < 2 || note.description.length < 3}
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            onClick={handleClick}
          >
            ➕ Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
