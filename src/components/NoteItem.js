
import React, { useContext } from 'react';
import  {ContextNote}  from './ContextNote';

const NoteItem = ({ note, updateNote }) => {
  const { DeleteNote } = useContext(ContextNote);

  return (
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title text-center">{note.title}</h5>
        <p className="card-text text-center">{note.description}</p>
        {note.tags && (
          <p className="text-muted text-center">
            <small>Tags: {note.tags}</small>
          </p>
        )}
        <div className="text-center mt-3">
          <i
            className="fa-solid fa-trash mx-2 text-center text-danger"
            onClick={() => DeleteNote(note._id)}
            style={{ cursor: 'pointer' }}
            title="Delete Note"
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2 text-center text-primary"
            onClick={() => updateNote(note)}
            style={{ cursor: 'pointer' }}
            title="Edit Note"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
