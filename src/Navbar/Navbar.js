import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">InventoryPro</div>
      
      {/* Desktop Menu */}
      <ul className="navbar-links">
        <li><a href="#about">About</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
      <Link to="/login" className="nav-btn">Login</Link>

      {/* Mobile Menu Toggle */}
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <img src="/icons8-menu.svg" alt="Menu" className="hamburger-icon" />
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <div className="navbar-logo">InventoryPro</div>
            <button className="mobile-menu-close" onClick={closeMobileMenu}>
              ×
            </button>
          </div>
          <ul className="mobile-navbar-links">
            <li><a href="#about" onClick={closeMobileMenu}>About</a></li>
            <li><a href="#features" onClick={closeMobileMenu}>Features</a></li>
            <li><Link to="/login" onClick={closeMobileMenu} className="mobile-nav-btn">Login</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 