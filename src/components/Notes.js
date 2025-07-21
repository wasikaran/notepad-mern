import React, { useContext, useState, useEffect } from 'react';
import { ContextNote } from './ContextNote';
import { useNavigate } from 'react-router-dom';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { Modal, Button, Form, Spinner, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Notes = () => {
  const { notes, EditNotes, GetNotes } = useContext(ContextNote);
  const [note, setNote] = useState({ id: "", title: "", description: "", tags: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchNotes = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/signin');
      return;
    }
    
    try {
      setLoading(true);
      await GetNotes();
      setError(null);
    } catch (err) {
      setError('Failed to fetch notes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchNotes();
}, [navigate]); 

  const handleClose = () => {
    setShow(false);
    setNote({ id: "", title: "", description: "", tags: "" });
  };

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tags: currentNote.tags || "",
    });
    setShow(true);
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (note.title.trim() && note.description.trim()) {
      EditNotes(note.id, note.title, note.description, note.tags);
      handleClose();
    }
  };

  return (
    <div className="container py-4">
      <AddNote />
      
      {error && <Alert variant="danger" className="my-4">{error}</Alert>}
      
      <div className="my-4">
        <h2 className="mb-4">Your Notes</h2>
        
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="text-muted">No notes found</h4>
            <p className="text-muted">Start by adding your first note above</p>
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {notes.map((note) => (
              <Col key={note._id}>
                <NoteItem note={note} updateNote={updateNote} />
              </Col>
            ))}
          </Row>
        )}
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={note.title}
                onChange={handleChange}
                placeholder="Enter title"
                required
                minLength={4}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={note.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
                minLength={5}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={note.tags}
                onChange={handleChange}
                placeholder="Enter tags (comma separated)"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Notes;