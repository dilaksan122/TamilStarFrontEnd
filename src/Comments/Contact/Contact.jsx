import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [contactInfo, setContactInfo] = useState(null);

  // Fetch contact info data using useEffect
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/clubinfo/show')
      .then((response) => {
        const data = response.data; // Adjust based on your API response structure
        setContactInfo({
          address: data.address,
          phone: data.PhoneNo,
          email: data.Email,
        });
      })
      .catch((error) => {
        console.error('There was an error fetching the contact info!', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/contact', formData);
      setSuccessMessage(response.data.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <div className="contact-info">
  {contactInfo ? (
    <div>
      <div className="contact-item">
        <FaMapMarkerAlt className="contact-item-icon" />
        <div className="contact-item-text">
          <span>Address</span>
          <p>{contactInfo.address}</p>
        </div>
      </div>
      <div className="contact-item">
        <FaPhoneAlt className="contact-item-icon" />
        <div className="contact-item-text">
          <span>Phone</span>
          <p>{contactInfo.phone}</p>
        </div>
      </div>
      <div className="contact-item">
        <FaEnvelope className="contact-item-icon" />
        <div className="contact-item-text">
          <span>Email</span>
          <p>{contactInfo.email}</p>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading contact info...</p>
  )}
</div>
      <div className="contact-form-container">
        <h2 className="contact-subtitle">Send Us a Message</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Contact;
