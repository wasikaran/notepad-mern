import { useContext, useState } from "react";
import { ContextNote } from './ContextNote';
import { Card, Form, Button, FloatingLabel } from 'react-bootstrap';

const AddNotes = () => {
    const { AddNotes } = useContext(ContextNote);
    const [note, setNote] = useState({ title: "", description: "", tags: "" });

    const handleClick = (e) => {
        e.preventDefault();
        AddNotes(note.title, note.description, note.tags);
        setNote({ title: "", description: "", tags: "" });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <Card.Title className="mb-4">Add New Note</Card.Title>
                <Form>
                    <FloatingLabel controlId="title" label="Note Title" className="mb-3">
                        <Form.Control
                            type="text"
                            name="title"
                            value={note.title}
                            onChange={onChange}
                            placeholder="Enter title"
                            minLength={4}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="description" label="Description" className="mb-3">
                        <Form.Control
                            as="textarea"
                            style={{ height: '100px' }}
                            name="description"
                            value={note.description}
                            onChange={onChange}
                            placeholder="Enter description"
                            minLength={5}
                            required
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="tags" label="Tags (optional)" className="mb-3">
                        <Form.Control
                            type="text"
                            name="tags"
                            value={note.tags}
                            onChange={onChange}
                            placeholder="Enter tags"
                        />
                    </FloatingLabel>

                    <Button 
                        variant="primary"
                        disabled={note.title.length < 4 || note.description.length < 5} 
                        onClick={handleClick}
                    >
                        Add Note
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default AddNotes;