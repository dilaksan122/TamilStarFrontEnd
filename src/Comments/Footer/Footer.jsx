import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [clubInfo, setClubInfo] = useState({ address:'',Email:'',PhoneNo:''});

  useEffect(() => {
    const fetchClubInfo = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/clubinfo/show');
        setClubInfo(response.data);
      } catch (error) {
        console.error('Error fetching club info:', error);
      }
    };

    fetchClubInfo();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <h1>Sports Club</h1>
        </div>
      </div>

      <div className="footer-middle">
        <div className="footer-column">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h2 style={{ color: '#fff' }}>Contact Us</h2>
          {clubInfo ? (
            <>
              <p style={{ color: '#fff' }}>Address: {clubInfo.address}</p>
              <p style={{ color: '#fff' }}>Email: {clubInfo.Email}</p>
              <p style={{ color: '#fff' }}>Phone: {clubInfo.PhoneNo}</p>
            </>
          ) : (
            <p style={{ color: '#fff' }}>Loading contact information...</p>
          )}
        </div>
        <div className="footer-column">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://web.facebook.com/tamilstarsdortmund/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://www.instagram.com/dortmund_tamil_stars?igsh=MW5jZGtqN2tjdjI4Ng==" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
           
          </div>
        </div>
        <div className="footer-column">
          <h2>Newsletter</h2>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sports Club. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
