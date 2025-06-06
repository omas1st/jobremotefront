import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import './Withdrawal.css';

const Withdrawal = () => {
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [crypto, setCrypto] = useState('Bitcoin');
  const [walletAddress, setWalletAddress] = useState('');
  const [taxAmount, setTaxAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile to get balance
        const resUser = await api.get('/user/profile');
        const user = resUser.data;
        setWalletBalance(user.walletBalance || 0);

        // Calculate tax (10% of balance)
        setTaxAmount((user.walletBalance || 0) * 0.1);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount < 200) {
      alert('Minimum withdrawal amount is $200');
      return;
    }

    if (amount > walletBalance) {
      alert('Insufficient balance');
      return;
    }

    try {
      // Initiate withdrawal on backend (sends PIN to user email)
      await api.get('/user/initiate-withdrawal');

      // Redirect to VerifyWithdrawal, passing amount, crypto, and address
      navigate('/verify-withdrawal', {
        state: {
          amount,
          crypto,
          address: walletAddress
        }
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Cannot initiate withdrawal');
    }
  };

  return (
    <div className="withdrawal-container">
      <div className="withdrawal-card">
        <h2 className="withdrawal-title">Withdrawal</h2>
        <p className="balance">Wallet Balance: ${walletBalance.toFixed(2)}</p>
        <p className="balance">Tax (10%): ${taxAmount.toFixed(2)}</p>

        <form onSubmit={handleSubmit} className="withdrawal-form">
          <div className="form-group">
            <label className="form-label">Amount to Withdraw (min $200)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              min="200"
              step="0.01"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Choose Cryptocurrency</label>
            <select
              value={crypto}
              onChange={(e) => setCrypto(e.target.value)}
              className="form-input"
              required
            >
              <option value="Bitcoin">Bitcoin (BTC)</option>
              <option value="Ethereum">Ethereum (ETH)</option>
              <option value="Ripple">Ripple (XRP)</option>
              <option value="Tether">Tether (USDT)</option>
              <option value="Solana">Solana (SOL)</option>
              <option value="Dogecoin">Dogecoin (DOGE)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Wallet Address</label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="withdrawal-button">
            Confirm Withdrawal
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdrawal;
