import React, { useContext, useEffect, useState } from 'react';
import { ContextNote } from './ContextNote';
import { useParams, Link } from 'react-router-dom';
import { Card, Container, Button } from 'react-bootstrap';

const NoteDetail = () => {
  const { notes } = useContext(ContextNote);
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const foundNote = notes.find(n => n._id === id);
    if (foundNote) {
      setNote(foundNote);
    }
  }, [id, notes]);

  if (!note) {
    return (
      <Container className="py-5 text-center">
        <h2>Note not found</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Notes
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Note Details</h1>
        <Link to="/" className="btn btn-outline-secondary">
          Back to Notes
        </Link>
      </div>
      
      <Card className="shadow">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <Card.Title className="display-5">{note.title}</Card.Title>
            {note.tags && (
              <span className="badge bg-light text-dark fs-6">{note.tags}</span>
            )}
          </div>
          
          <Card.Text className="fs-5 text-muted py-3 border-top border-bottom my-4">
            {note.description}
          </Card.Text>
          
          <div className="text-muted small">
            Created: {new Date(note.Date).toLocaleString()}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NoteDetail;