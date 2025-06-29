// src/components/ContextNote.js
import React, { createContext, useState } from 'react';

// Create context
export const ContextNote = createContext();

// Provider component
export const NoteState = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const AddNotes = (title, description, tags) => {
    const newNote = {
      _id: Date.now().toString(),
      title,
      description,
      tags,
      date: new Date().toISOString()
    };
    setNotes([...notes, newNote]);
  };

  const EditNotes = (id, title, description, tags) => {
    setNotes(notes.map(note =>
      note._id === id ? { ...note, title, description, tags } : note
    ));
  };

  const DeleteNote = (id) => {
    setNotes(notes.filter(note => note._id !== id));
  };

  // ✅ Must pass `value` to Provider
  return (
    <ContextNote.Provider value={{ notes, AddNotes, EditNotes, DeleteNote }}>
      {children}
    </ContextNote.Provider>
  );
};