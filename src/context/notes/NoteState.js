import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    // Backend URL from environment variable
    const host = process.env.REACT_APP_API_BASE;
    const [notes, setNotes] = useState([]);

    // Get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log("Fetched notes:", json);

        setNotes(Array.isArray(json) ? json : []);
    };

    // Add a Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    };

    // Delete a Note
    const deleteNote = async (id) => {
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });

        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
    };

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log("Updated note:", json);

        const newNotes = notes.map(note => note._id === id ? json : note);
        setNotes(newNotes);
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, getNotes, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
