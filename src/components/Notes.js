import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      getNotes();
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      {/* Hidden button to trigger modal */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
        Launch Edit Modal
      </button>

      {/* Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: "12px", boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }}>
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title fw-bold" id="editModalLabel">Edit Note</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-2">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label fw-semibold">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label fw-semibold">Description</label>
                  <textarea className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} rows="3" minLength={5} required></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label fw-semibold">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer bg-light">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 3 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="container my-4">
        <h2 className="fw-bold mb-3 text-primary">📒 Your Notes</h2>
        <div className="row">
          {Array.isArray(notes) && notes.length === 0 && (
            <p className="text-muted">No notes to display. Add a new note to get started!</p>
          )}

          {Array.isArray(notes) ? notes.map((note) => (
            <div className="col-md-4 col-sm-6 mb-4" key={note._id}>
              <Noteitem note={note} updateNote={updateNote} showAlert={props.showAlert} />
            </div>
          )) : <p className="text-danger">Error loading notes.</p>}
        </div>
      </div>
    </>
  );
};

export default Notes;
