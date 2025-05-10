import React from 'react';
import '../styles/About.css';
import aboutImage1 from '../assets/about1.jpg';
import aboutImage2 from '../assets/about2.jpg';
import aboutImage3 from '../assets/about3.jpg';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Our Ticket Booking System</h1>
        <p>Your one-stop solution for all travel needs</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              We aim to simplify travel planning by providing a seamless platform to book flights, 
              trains, and buses all in one place. Our mission is to make travel accessible, 
              affordable, and convenient for everyone.
            </p>
          </div>
          <div className="about-image">
            <img src={aboutImage1} alt="Our Mission" />
          </div>
        </div>

        <div className="about-section reverse">
          <div className="about-image">
            <img src={aboutImage2} alt="Our Services" />
          </div>
          <div className="about-text">
            <h2>Our Services</h2>
            <ul>
              <li>Flight bookings with multiple class options</li>
              <li>Train reservations across various routes</li>
              <li>Bus tickets with AC/Non-AC options</li>
              <li>Secure payment gateway</li>
              <li>Instant e-ticket generation</li>
              <li>User profile management</li>
            </ul>
          </div>
        </div>

        <div className="about-section">
          <div className="about-text">
            <h2>Why Choose Us?</h2>
            <p>
              With our user-friendly interface, real-time availability checks, and competitive pricing, 
              we stand out as your preferred travel partner. Our system is built with the latest 
              technologies to ensure reliability and security for all your transactions.
            </p>
          </div>
          <div className="about-image">
            <img src={aboutImage3} alt="Why Choose Us" />
          </div>
        </div>
      </div>

      <div className="about-team">
        <h2>Meet The Team</h2>
        <div className="team-members">
          <div className="team-member">
            <div className="member-avatar"></div>
            <h3>Farazana Velur</h3>
            <p>Gadag, Karnataka</p>
          </div>
          <div className="team-member">
            <div className="member-avatar"></div>
            <h3>Imran Baig</h3>
            <p>Gadag , Karnataka</p>
          </div>
          
            
            
          
        </div>
      </div>
    </div>
  );
};

export default About;