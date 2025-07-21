import axios from 'axios';
import React, { createContext, useState } from 'react';

export const ContextNote = createContext();

export const NoteState = ({ children }) => {
  const token = localStorage.getItem('token');
  const port = 'http://localhost:5000';
  const [notes, setNotes] = useState([]);

const GetNotes = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/auth/fetchAllNotes`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      }
    });
    setNotes(response.data);
    return { success: true };
  } catch (error) {
    console.error("Fetch failed:", error.message);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

  const AddNotes = async (title, description, tags) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/createNote`, {
        title, description, tags
      }, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error("Add note failed:", error.message);
    }
  };

  const EditNotes = async (id, title, description, tags) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/auth/updateNote/${id}`, {
        title, description, tags
      }, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      const updatedNote = response.data;
      setNotes(notes.map(note => note._id === id ? updatedNote : note));
    } catch (error) {
      console.error("Edit note failed:", error.message);
    }
  };

  const DeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/deleteNote/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error("Delete note failed:", error.message);
    }
  };

  return (
    <ContextNote.Provider value={{ notes, AddNotes, EditNotes, DeleteNote, GetNotes }}>
      {children}
    </ContextNote.Provider>
  );
};
