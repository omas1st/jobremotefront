import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src="img1.png" alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="nav">
        <Link to="/contact-us" className="nav-link">Contact Us</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
      </div>
    </header>
  );
};

export default Header;