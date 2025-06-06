import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <Link to="/">
          <img src="img1.png" alt="Logo" style={styles.logo} />
        </Link>
      </div>
      <div style={styles.nav}>
        <Link to="/contact-us" style={styles.navLink}>Contact Us</Link>
        <Link to="/login" style={styles.navLink}>Login</Link>
        <Link to="/register" style={styles.navLink}>Register</Link>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    height: '50px',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  }
};

export default Header;