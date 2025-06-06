import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import './UsersPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/admin/users')
      .then(res => {
        // newest first
        setUsers(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      })
      .catch(err => setError(err.response?.data?.message || 'Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users…</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="users-page">
      <h1>All Registered Users</h1>
      <table>
        <thead>
          <tr>
            <th>Joined</th>
            <th>Name</th>
            <th>Email</th>
            <th>Profile</th>
            <th>Country</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.profileType}</td>
              <td>{u.country}</td>
              <td>${u.walletBalance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
