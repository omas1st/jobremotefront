import React, { useState } from 'react';
import api from '../../../utils/api';
import './MessagesPage.css';

const MessagesPage = () => {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Sending…');
    try {
      const form = new FormData();
      form.append('email', email.trim().toLowerCase());
      form.append('message', message);
      if (file) form.append('file', file);

      await api.post('/admin/send-message', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('Message sent');
      setMessage('');
      setFile(null);
    } catch (err) {
      setStatus('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="messages-page">
      <h1>Send Message to User</h1>
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
          <label>Message</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Send</button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default MessagesPage;
