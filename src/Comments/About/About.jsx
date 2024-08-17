import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './About.css'; // Import the CSS file
import baner2 from '../../assets/images/ban2.jpg';

const About = () => {
  const [aboutData, setAboutData] = useState([]);
  const [founders, setFounders] = useState([]);
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    // Fetch About Us data
    axios
      .get('http://127.0.0.1:8000/api/api/about-us')
      .then((response) => {
        setAboutData(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the About Us data!', error);
      });

    // Fetch Founder details
    axios
      .get('http://127.0.0.1:8000/api/founder')
      .then((response) => {
        setFounders(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the Founder data!', error);
      });

    // Fetch Audio data
    axios
      .get('http://127.0.0.1:8000/api/viewVideo') // Replace with the correct API endpoint
      .then((response) => {
        setAudios(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the Audio data!', error);
      });
  }, []);

  return (
    <>
      <div className="about-container">
        {aboutData.map((item) => (
          <div key={item.id} className="about-item">
            <div className="details">
              <div className='history'>
                <h4>History</h4>
                <div
                  dangerouslySetInnerHTML={{ __html: item.history }}
                  className="text-content"
                ></div>
              </div>
              <div className="vision">
                <h4>Vision</h4>
                <div
                  dangerouslySetInnerHTML={{ __html: item.vision }}
                  className="text-content"
                ></div>
              </div>
              <div className="mission">
                <h4>Mission</h4>
                <div
                  dangerouslySetInnerHTML={{ __html: item.mission }}
                  className="text-content"
                ></div>
              </div>
            </div>
            <div className="founders">
              <h3>Our Founders</h3>
              {founders.map((founder) => (
                <div key={founder.id} className="founder-item">
                  {founder.image && (
                    <img
                      src={`http://127.0.0.1:8000/images/${founder.image}`}
                      alt={founder.name}
                      className="founder-image"
                    />
                  )}
                  <h4>{founder.name}</h4>
                  <p>{founder.position}</p>
                </div>
              ))}
            </div>
            <div className="audio-files">
              <h3>Tamistar Dortmund SportsClub Anthem</h3>
              {audios.map((audio) => (
                <div key={audio.id} className="audio-item">
                  <h4>{audio.title}</h4>
                  <audio controls>
                    <source src={`http://127.0.0.1:8000/storage/${audio.file_path}`} type="audio/mpeg" />
                  
                  </audio>
                  <p>{audio.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default About;
