import React, { useState } from 'react';
import './PaymentURLsPage.css';

const PaymentURLsPage = () => {
  const [email, setEmail] = useState('');
  const [urls, setUrls] = useState(Array(10).fill(''));
  const [approved, setApproved] = useState(null);

  const handleChange = (idx, val) => {
    const a = [...urls];
    a[idx] = val;
    setUrls(a);
  };

  const handleApprove = idx => {
    setApproved(urls[idx]);
  };

  return (
    <div className="payment-urls-page">
      <h1>Payment URLs for User</h1>
      <div>
        <label>User Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="urls-grid">
        {urls.map((u, i) => (
          <div key={i} className="url-row">
            <input
              placeholder={`URL ${i+1}`}
              value={u}
              onChange={e => handleChange(i, e.target.value)}
            />
            <button onClick={() => handleApprove(i)}>
              {approved === u ? 'Approved' : 'Approve'}
            </button>
          </div>
        ))}
      </div>
      {approved && (
        <p>
          Proceed button will redirect to:{" "}
          <a href={approved} target="_blank" rel="noopener noreferrer">
            {approved}
          </a>
        </p>
      )}
    </div>
  );
};

export default PaymentURLsPage;
