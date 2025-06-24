import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">InventoryPro</div>
      <ul className="navbar-links">
        <li><a href="#about">About</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
      <Link to="/login" className="login-btn">Login</Link>
    </nav>
  );
};

export default Navbar; 