import React, { useContext,useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ContextNote } from './ContextNote';

const SignUp = () => {
  const host = 'http://localhost:5000' 
  const navigate = useNavigate()
  const {  GetNotes } = useContext(ContextNote);
  
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password } = credentials

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/signup`,
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const json = response.data
      localStorage.setItem('token', json.authToken)
          await GetNotes(); // Call GetNotes directly after login

      navigate('/')
    } catch (error) {
      console.error('Signup failed:', error.message)
      alert("Signup failed. Try again.")
    }
  }

  return (
    <div className="signup-container">
      <h2>Create Your VIP Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            id="name"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            onChange={handleChange}
            type="password"
            id="password"
            placeholder="Create a strong password"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Sign Up</button>
      </form>

      <div className="login-link">
        <p>Already have an account?</p>
        <button className="btn btn-primary" onClick={() => navigate('/signin')}>
          Log In
        </button>
      </div>
    </div>
  )
}

export default SignUp
