import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // CALL THE BACKEND LOGIN ENDPOINT:
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Backend responds { token, profileType }
      const { token, profileType } = response.data;

      // Save JWT in localStorage
      localStorage.setItem('token', token);

      // Redirect based on profileType
      if (profileType === 'remote worker') {
        navigate('/worker-dashboard');
      } else {
        navigate('/customer-dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data.message
      ) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          <div className="login-links">
            <Link to="/forgot-password" className="login-link">
              Forgot Password?
            </Link>
            <Link to="/register" className="login-link">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
