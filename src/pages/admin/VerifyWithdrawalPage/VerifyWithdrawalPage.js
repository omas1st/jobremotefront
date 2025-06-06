import React, { useState } from 'react';
import api from '../../../utils/api';
import './VerifyWithdrawalPage.css';

const VerifyWithdrawalPage = () => {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Setting PIN…');
    try {
      await api.post('/admin/verify-withdrawal', {
        email: email.trim().toLowerCase(),
        pin
      });
      setStatus('PIN set successfully');
    } catch (err) {
      setStatus('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="verify-withdrawal-page">
      <h1>Set Withdrawal PIN</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>5-Digit PIN</label>
          <input
            type="text"
            value={pin}
            onChange={e => setPin(e.target.value)}
            maxLength={5}
            pattern="\d{5}"
            required
          />
        </div>
        <button type="submit">Set PIN</button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default VerifyWithdrawalPage;
