import React, { useContext } from 'react';
import { ContextNote } from './ContextNote';
import { Link } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';

const NoteItem = ({ note, updateNote }) => {
  const { DeleteNote } = useContext(ContextNote);

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0 text-truncate">{note.title}</Card.Title>
          {note.tags && (
            <Badge bg="light" text="dark" className="ms-2">
              {note.tags}
            </Badge>
          )}
        </div>
        
        <Card.Text className="flex-grow-1 text-muted">
          {note.description.length > 100 
            ? `${note.description.substring(0, 100)}...` 
            : note.description}
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <Link 
              to={`/note/${note._id}`} 
              className="btn btn-sm btn-outline-primary me-2"
              title="View Note"
            >
<i class="fa-solid fa-eye"></i>
            </Link>
            <button
              className="btn btn-sm btn-outline-secondary me-2"
              onClick={() => updateNote(note)}
              title="Edit Note"
            >
              <i className="fas fa-edit"></i>
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => DeleteNote(note._id)}
              title="Delete Note"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NoteItem;