import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import logo from '../../assets/images/logo.jpg';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [clubInfo, setClubInfo] = useState({ name: '', address: '' });

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

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  const closeNavbar = () => {
    setIsNavbarVisible(false);
  };

  return (
    <>
      <header className="header">
        <div className="club-info">
          <img src={logo} alt="Club Logo" className="club-logo" />
          <div className="club-details">
            <h2 className="club-name">{clubInfo.name}</h2>
            <p className="club-address">{clubInfo.address}</p>
          </div>
        </div>
        <button className="mobile-menu-button" onClick={toggleNavbar}>
          <FontAwesomeIcon icon={isNavbarVisible ? faTimes : faBars} />
        </button>
        <nav className={`navbar ${isNavbarVisible ? 'navbar-visible' : ''}`}>
          <ul>
            <li><Link to="/" onClick={closeNavbar}>Home</Link></li>
            <li><Link to="/about" onClick={closeNavbar}>About Us</Link></li>
            <li><Link to="/teams" onClick={closeNavbar}>Teams</Link></li>
            <li><Link to="/events" onClick={closeNavbar}>Events</Link></li>
            <li><Link to="/galleries" onClick={closeNavbar}>Galleries</Link></li>
            <li><Link to="/news" onClick={closeNavbar}>News</Link></li>
            <li><Link to="/contact" onClick={closeNavbar}>Contact Us</Link></li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
