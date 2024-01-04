import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">Dashboard</Link>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/signup" className="nav-link mr-3">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link to="/signin" className="nav-link">Sign In</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}


export default Navbar;
