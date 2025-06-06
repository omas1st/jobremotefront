import React, { useState } from 'react';
import api from '../../../utils/api';
import './WalletPage.css';

const WalletPage = () => {
  const [email, setEmail] = useState('');
  const [balance, setBalance] = useState('');
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState('');

  // fetch user on email blur
  const fetchUser = () => {
    if (!email) return;
    api.get('/admin/users')
      .then(res => {
        const u = res.data.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
        if (u) {
          setUserId(u._id);
          setBalance(u.walletBalance);
          setStatus('');
        } else {
          setStatus('User not found');
          setUserId(null);
        }
      })
      .catch(() => setStatus('Error fetching users'));
  };

  const handleSave = () => {
    if (!userId) return;
    setStatus('Saving…');
    api.put('/admin/wallet', { email: email.trim().toLowerCase(), balance })
      .then(() => setStatus('Balance updated'))
      .catch(err => setStatus('Error: ' + err.response?.data?.message));
  };

  return (
    <div className="wallet-page">
      <h1>Edit User Wallet</h1>
      <div>
        <label>User Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={fetchUser}
          required
        />
      </div>
      {userId && (
        <div>
          <label>Balance ($)</label>
          <input
            type="number"
            value={balance}
            onChange={e => setBalance(parseFloat(e.target.value) || 0)}
            min="0"
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default WalletPage;
