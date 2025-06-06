import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src="/img1.png" alt="Logo" className="header-logo" />
        </Link>
      </div>
      <div className="header-center">
        <Link to="/" className="header-title">RemoteWorker</Link>
      </div>
      <nav className="header-right">
        <Link to="/contact-us" className="header-link">Contact Us</Link>
        <Link to="/login" className="header-link">Login</Link>
        <Link to="/register" className="header-link">Register</Link>
        <Link to="/admin/login" className="header-link">Admin</Link>
      </nav>
    </header>
  );
};

export default Header;
