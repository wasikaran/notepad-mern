// ContactForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/contact', formData);
      setResponseMessage(res.data.message);
    } catch (err) {
      setResponseMessage('Failed to send contact message.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Your Name" onChange={handleChange} required />
      <input name="email" placeholder="Your Email" onChange={handleChange} required />
      <input name="subject" placeholder="Subject" onChange={handleChange} required />
      <textarea name="message" placeholder="Message" onChange={handleChange} required></textarea>
      <button type="submit">Send</button>
      <p>{responseMessage}</p>
    </form>
  );
};

export default ContactForm;
