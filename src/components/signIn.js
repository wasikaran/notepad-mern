import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ContextNote } from './ContextNote';

const SignIn = () => {
  const port = 'http://localhost:5000';
  const navigate = useNavigate();
  const { GetNotes } = useContext(ContextNote);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    try {
      const response = await axios.post(
        `${port}/api/auth/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const json = response.data;
      localStorage.setItem('token', json.authToken);
          await GetNotes(); // Call GetNotes directly after login

      navigate('/'); // Or navigate to your dashboard if needed
    } catch (error) {
      console.log('signin failed', error.message);
      alert('Sign-in failed. Please try again.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '500px',
      color: '#fff',
      width: '500px',
      margin: '20px',
    },
    formBox: {
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 0 15px rgba(0,0,0,0.5)',
      width: '100%',
      maxWidth: '400px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      color: '#ccc',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: 'none',
      borderRadius: '8px',
      marginBottom: '20px',
      backgroundColor: '#1e1f24',
      color: '#fff',
      fontSize: '15px',
    },
    button: {
      width: '100%',
      padding: '12px',
      border: 'none',
      borderRadius: '8px',
      background: 'linear-gradient(to right, #00ffd5, #007bff)',
      color: '#000',
      fontWeight: 'bold',
      fontSize: '16px',
      cursor: 'pointer',
    },
    small: {
      fontSize: '12px',
      color: '#888',
      marginBottom: '20px',
      display: 'block',
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.formBox} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" style={styles.label}>
            Email address
          </label>
          <input
            name="email"
            type="email"
            id="email"
            style={styles.input}
            placeholder="Enter email"
            onChange={handleChange}
          />
          <small style={styles.small}>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            style={styles.input}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <button
          disabled={
            credentials.email.length <= 10 || credentials.password.length <= 4
          }
          type="submit"
          style={styles.button}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
