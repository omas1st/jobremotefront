import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import './UsersProfile.css';

const UsersProfile = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/admin/users');
        setUsers(res.data);
      } catch {
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="users-profile">
      <h2>All Registered Users</h2>
      <table>
        <thead>
          <tr>
            <th>Registered At</th>
            <th>Profile Type</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Wallet Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{new Date(u.createdAt).toLocaleString()}</td>
              <td>{u.profileType}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.gender}</td>
              <td>{u.country}</td>
              <td>${(u.walletBalance || 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersProfile;
