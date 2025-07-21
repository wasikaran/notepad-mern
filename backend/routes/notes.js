const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// Route 1: Fetch All Notes
router.get('/fetchAllNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error("Failed to fetch notes:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ Route 2: Add a new note
router.post('/createNote', fetchuser, [
  body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Notes({
      title,
      description,
      tags,
      user: req.user.id
    });

    const saveNote = await note.save();
    res.json(saveNote);
  } catch (error) {
    console.log(Notes)

    console.error("addNotes Error:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

// Route 3: Update Note
router.put('/updateNote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const updateNote = {};
        if (title) updateNote.title = title;
        if (description) updateNote.description = description;
        if (tags) updateNote.tags = tags;

        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).send("Note not found");
        if (note.user.toString() !== req.user.id)
            return res.status(401).send("Unauthorized");

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: updateNote }, { new: true });
        res.json(note);

    } catch (error) {
        console.error("Update failed:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 4: Delete Note
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).send("Note not found");
        if (note.user.toString() !== req.user.id)
            return res.status(401).send("Unauthorized");

        await Notes.findByIdAndDelete(req.params.id);
        res.json({ success: "Note deleted successfully", note });

    } catch (error) {
        console.error("Delete failed:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
