import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import './AdminLogin.css';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/admin/login', form);
      // we don’t get a token, so just store a flag
      localStorage.setItem('adminToken', 'logged-in');
      navigate('/admin/users');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <div>
          <label>Username</label>
          <input name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
