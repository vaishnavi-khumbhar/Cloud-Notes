import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import editIcon from './assets/edit-icon.png';

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="card shadow-sm h-100 border-0" style={{ borderRadius: "12px", minHeight: "200px" }}>
      <div className="card-body d-flex flex-column">
        {/* Title */}
        <h5 className="card-title fw-bold text-primary">{note.title}</h5>

        {/* Description */}
        <p className="card-text text-muted flex-grow-1">{note.description}</p>

        {/* Tag */}
        {note.tag && (
          <span className="badge bg-secondary mb-2 align-self-start">{note.tag}</span>
        )}

        {/* Actions */}
        <div className="d-flex justify-content-end gap-3 mt-2">
          <lord-icon
            src="https://cdn.lordicon.com/jmkrnisz.json"
            trigger="hover"
            colors="primary:#e74c3c"
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted Successfully", "success");
            }}
          ></lord-icon>

          <img
            src={editIcon}
            alt="Edit"
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
            onClick={() => updateNote(note)}
          />
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
