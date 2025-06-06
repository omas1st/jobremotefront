import React, { useState, useEffect } from 'react';
import './CustomerDashboard.css';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndMessages = async () => {
      try {
        const resUser = await api.get('/user/profile');
        setUser(resUser.data);

        // Fetch inbox messages (if stored in user.messages)
        if (resUser.data.messages) {
          setMessages(resUser.data.messages);
        }
      } catch (err) {
        // If not authenticated, redirect to login
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUserAndMessages();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send message to admin
      await api.post('/user/contact-admin', { message });
      setSubmitStatus('success');
      setMessage('');

      // Optionally refetch messages
      const res = await api.get('/user/profile');
      setMessages(res.data.messages || []);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="customer-dashboard">
      <h1 className="welcome">Welcome, {user.firstName}!</h1>

      <div className="contact-section">
        <h2 className="section-title">Contact Sales Team</h2>
        <form onSubmit={handleSubmit} className="message-form">
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-textarea"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <p className="success-message">Message sent successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="error-message">Failed to send message. Please try again.</p>
          )}
        </form>
      </div>

      <div className="messages-section">
        <h2 className="section-title">Messages</h2>
        <div className="messages-list">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className="message-card">
                <p className="message-text">{msg.content}</p>
                <p className="message-date">{new Date(msg.date).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="no-messages">No messages yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
