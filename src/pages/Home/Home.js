import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Home.css';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-container">
        <section className="hero">
          <h1 className="hero-heading">Empower Your Financial Freedom</h1>
          <p className="hero-subheading">
            Join our vibrant community and unlock the power of earning from anywhere, anytime! 
            We're dedicated to helping you achieve financial independence through diverse and rewarding opportunities.
          </p>
          <Link to="/register" className="cta-button">Become a Worker</Link>
        </section>

        <section className="content-section">
          <h2 className="section-title">Be Part of Something Bigger</h2>
          <p className="section-text">
            Our community thrives on the contributions of individuals like you. With state-of-the-art 
            technology and high safety standards, we guarantee a stable and secure platform for you to work and earn.
          </p>
        </section>

        <section className="content-section">
          <h2 className="section-title">Variety of Opportunities</h2>
          <p className="section-text">Explore our wide range of jobs, including:</p>
          <ul className="opportunity-list">
            <li>Transcription services</li>
            <li>Data Entry</li>
            <li>Micro-tasks</li>
            <li>AI training</li>
            <li>Surveys</li>
            <li>Voice recordings</li>
            <li>Photo contests</li>
            <li>Typing/word processing</li>
          </ul>
        </section>

        <section className="content-section">
          <h2 className="section-title">Work on Your Terms</h2>
          <p className="section-text">
            Enjoy the flexibility to work from anywhere, at any time. Our platform is designed to 
            provide you with a seamless experience, ensuring high availability and performance.
          </p>
        </section>

        <section className="content-section">
          <h2 className="section-title">Join Our Community Today!</h2>
          <p className="section-text">
            Shape the future with us and take the first step towards financial freedom. 
            Sign up now and discover the opportunities that await you!
          </p>
          <Link to="/register" className="cta-button">Sign Up Now</Link>
        </section>

        <section className="content-section">
          <h2 className="section-title">Earn Money with Micro Tasking</h2>
          <p className="section-text">
            At Remoteworker, we offer a flexible and secure way to earn money through micro tasking. 
            Here's what sets us apart:
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Weekly Payments</h3>
              <p>Get paid regularly and securely via Crypto or Payoneer. You decide when you get paid!</p>
            </div>
            <div className="feature-card">
              <h3>Data Security</h3>
              <p>We prioritize data privacy and security, ensuring your information is protected with ISO certification and transparent handling.</p>
            </div>
            <div className="feature-card">
              <h3>Find Your Perfect Job</h3>
              <p>Access a wide range of tasks that fit your schedule and skills, whether you're on-the-go or working from home.</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2 className="section-title">Remoteworker Platform</h2>
          <p className="section-text">Stay ahead with our platform features:</p>
          <ul className="platform-list">
            <li>Push notifications for new job opportunities</li>
            <li>Track your account balance and earnings</li>
            <li>Work offline and submit jobs when you're online</li>
            <li>Secure environment for your data</li>
          </ul>
        </section>

        <section className="content-section">
          <h2 className="section-title">Support</h2>
          <p className="section-text">
            Our helpdesk is here to assist you with any questions or concerns.
          </p>
        </section>

        <section className="content-section">
          <h2 className="section-title">What Makes Us Different?</h2>
          <p className="section-text">We offer a unique combination of:</p>
          <ul className="difference-list">
            <li>Diverse, high-quality tasks</li>
            <li>Supportive community</li>
            <li>Reliable payments</li>
          </ul>
          <p className="section-text">
            Join our community today and start earning money on your terms!
          </p>
          <Link to="/register" className="cta-button">Join Now</Link>
        </section>
      </div>
    </div>
  );
};

export default Home;