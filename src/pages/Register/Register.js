import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CountryDropdown } from 'react-country-region-selector';
import api from '../../utils/api';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profileType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    country: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      profileType,
      firstName,
      lastName,
      email,
      phone,
      gender,
      country,
      password,
      confirmPassword
    } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // CALL THE BACKEND REGISTER ENDPOINT:
      const response = await api.post('/auth/register', {
        profileType,
        firstName,
        lastName,
        email,
        phone,
        gender,
        country,
        password
      });

      // The backend returns { token, profileType } on success
      const { token, profileType: returnedProfileType } = response.data;

      // Save JWT token in localStorage
      localStorage.setItem('token', token);

      // Redirect based on profileType
      if (returnedProfileType === 'remote worker') {
        navigate('/worker-dashboard');
      } else {
        navigate('/customer-dashboard');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label className="form-label">Profile Type</label>
            <select
              name="profileType"
              value={formData.profileType}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select Profile Type</option>
              <option value="remote worker">Remote Worker</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

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
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Country</label>
            <CountryDropdown
              value={formData.country}
              onChange={(val) => setFormData({ ...formData, country: val })}
              className="form-input"
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

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="register-button">
            Register
          </button>

          <p className="login-text">
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
