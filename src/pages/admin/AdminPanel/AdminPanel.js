import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="admin-panel">
      <nav className="admin-nav">
        <NavLink to="users">Users</NavLink>
        <NavLink to="messages">Messages</NavLink>
        <NavLink to="wallet">Wallet</NavLink>
        <NavLink to="verify-withdrawal">Verify Withdrawal</NavLink>
        <NavLink to="tasks">Tasks</NavLink>
        <NavLink to="payment-urls">Payment URLs</NavLink>
        <NavLink to="task-approvals">Task Approvals</NavLink>
        <button onClick={logout}>Logout</button>
      </nav>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
