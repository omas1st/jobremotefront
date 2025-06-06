import React, { useState } from 'react';
import api from '../../utils/api';
import './MessagePage.css';

const MessagePage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/send-message', { email, message });
      alert('Message sent successfully');
      setEmail('');
      setMessage('');
    } catch {
      alert('Failed to send message');
    }
  };

  return (
    <div className="form-container">
      <h2>Send Message</h2>
      <form onSubmit={handleSend}>
        <label>User Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default MessagePage;
