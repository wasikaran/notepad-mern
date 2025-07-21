import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogOut = ()=>{
    localStorage.removeItem('token')
      navigate('/signin');

  }
  let location = useLocation()
  useEffect(() => {
    // Google Analytics
    console.log(location)
  }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link  ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? <form>
              <Link className="btn btn-primary mx-2" to="/signup" >Sign Up</Link>
              <Link className="btn btn-primary mx-2" to="/signin" >Log In</Link>
            </form> :
              <button onClick={handleLogOut} className="btn btn-primary mx-3">Log Out</button>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
