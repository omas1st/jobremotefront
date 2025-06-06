import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      setTimeout(() => {
        setSubmitStatus('success');
        setMessage('');
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2 className="contact-title">Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
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
    </div>
  );
};

export default ContactUs;