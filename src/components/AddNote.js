import { useContext, useState } from "react";
import  {ContextNote}  from './ContextNote';

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
        <div>
            <h1>Add Note</h1>
            <div className="container my-3">
                <form>
                    <div className="form-group my-3">
                        <label htmlFor="title">Notes Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={note.title}
                            onChange={onChange}
                            placeholder="Enter title"
                            minLength={4}
                            required
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={note.description}
                            onChange={onChange}
                            placeholder="Enter description"
                            minLength={5}
                            required
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="tags">Tags</label>
                        <input
                            type="text"
                            className="form-control"
                            id="tags"
                            name="tags"
                            value={note.tags}
                            onChange={onChange}
                            placeholder="Enter tags"
                        />
                    </div>
                    <button 
                        disabled={note.title.length < 4 || note.description.length < 5} 
                        type="submit" 
                        onClick={handleClick} 
                        className="btn btn-primary"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNotes;