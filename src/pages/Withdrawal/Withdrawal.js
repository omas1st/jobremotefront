import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Withdrawal.css';

const Withdrawal = () => {
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [crypto, setCrypto] = useState('Bitcoin');
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    // Simulate fetching wallet balance
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.walletBalance) {
      setWalletBalance(userData.walletBalance);
    } else {
      setWalletBalance(350); // Default value
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (amount < 200) {
      alert('Minimum withdrawal amount is $200');
      return;
    }
    
    if (amount > walletBalance) {
      alert('Insufficient balance');
      return;
    }
    
    navigate('/verify-withdrawal');
  };

  return (
    <div className="withdrawal-container">
      <div className="withdrawal-card">
        <h2 className="withdrawal-title">Withdrawal</h2>
        <p className="balance">Wallet Balance: ${walletBalance.toFixed(2)}</p>
        
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
          
          <button type="submit" className="withdrawal-button">Confirm Withdrawal</button>
        </form>
      </div>
    </div>
  );
};

export default Withdrawal;