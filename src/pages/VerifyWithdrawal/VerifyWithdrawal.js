import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyWithdrawal.css';

const VerifyWithdrawal = () => {
  const navigate = useNavigate();
  const [taxAmount] = useState(35); // 10% of $350
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (pin.length !== 5) {
      setMessage('PIN must be 5 digits');
      return;
    }
    
    // Simulate PIN verification
    if (pin === '12345') {
      navigate('/account-insurance');
    } else {
      setMessage('Invalid PIN. Please try again.');
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2 className="verify-title">Verify Withdrawal</h2>
        
        <div className="payment-section">
          <h3 className="section-title">Payment Required</h3>
          <p className="section-text">
            Please pay 10% of your wallet balance as tax fee: 
            <span className="amount"> ${taxAmount.toFixed(2)}</span>
          </p>
        </div>
        
        <div className="details-section">
          <h3 className="section-title">Payment Details</h3>
          <div className="crypto-details">
            <p><strong>Crypto:</strong> Bitcoin</p>
            <p><strong>Wallet Address:</strong> 535afgvshadsb534sfb</p>
          </div>
        </div>
        
        <div className="note-section">
          <p className="note-text">
            After making the payment, a 5-digit PIN will be sent to your email. 
            Enter the PIN below to verify your withdrawal.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="verify-form">
          <div className="form-group">
            <label className="form-label">5-digit PIN</label>
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={5}
              className="form-input"
              required
            />
          </div>
          
          {message && <p className="error-message">{message}</p>}
          
          <button type="submit" className="verify-button">Verify Withdrawal</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyWithdrawal;