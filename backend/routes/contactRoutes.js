// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.status(200).json({ message: "Contact saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save contact" });
  }
});

module.exports = router;
