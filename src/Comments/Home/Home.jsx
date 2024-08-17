import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';
import baner1 from '../../assets/images/tamilstar.jpg';
import baner2 from '../../assets/images/newtab.jpg';
import baner3 from '../../assets/images/mobileViews.jpg';

const Home = () => {
  const [aboutData, setAboutData] = useState([]);
  const [players, setPlayers] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [founders, setFounders] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch About Data
        const aboutResponse = await axios.get('http://127.0.0.1:8000/api/api/about-us');
        setAboutData(aboutResponse.data);

        // Fetch Players Data
        const playersResponse = await axios.get('http://127.0.0.1:8000/api/api/players');
        setPlayers(playersResponse.data);

        // Fetch News Data
        const newsResponse = await axios.get('http://127.0.0.1:8000/api/api/news');
        setNews(newsResponse.data);

        // Fetch Events Data
        const eventsResponse = await axios.get('http://127.0.0.1:8000/api/api/events');
        setEvents(eventsResponse.data);

        // Fetch Founders Data
        const foundersResponse = await axios.get('http://127.0.0.1:8000/api/founder');
        setFounders(foundersResponse.data);

        // Fetch Galleries Data
        const galleriesResponse = await axios.get('http://127.0.0.1:8000/api/galleries/show');
        setGalleries(galleriesResponse.data);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="error">{error}</div>;

  return (
    <div className='backg'>
      <div className="banner">
        <img src={baner1} alt="Desktop Banner" className="banner-image desktop-banner" />
        <img src={baner2} alt="Tablet Banner" className="banner-image tablet-banner" />
        <img src={baner3} alt="Mobile Banner" className="banner-image mobile-banner" />
      </div>
      <div className="home-container">
        {/* About Us Section */}
        <div className="section about-section">
          <h1>About Us</h1>
          {aboutData.length > 0 ? (
            <>
              {aboutData.slice(0, 1).map((item) => (
                <div key={item.id} className="about-content">
                  <div className="about-history">
                    <div
                     dangerouslySetInnerHTML={{
                    __html: item.history.length > 300 
                     ? item.history.substring(0, 2000) + '...' 
                     : item.history
                       }}
                      ></div>
                  </div>
                  <div className="founder-info">
                    {founders.map((founder) => (
                      <div key={founder.id} className="founder-card">
                        <img 
                         src={`http://127.0.0.1:8000/images/${founder.image}`}
                          alt={founder.name} 
                          className="founder-image" 
                        />
                        <h2>{founder.name}</h2>
                        <p>{founder.position}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <Link to="/about" className="view-more-link">View More About Us</Link>
            </>
          ) : (
            <div>No data available in About Us section</div>
          )}
        </div>

        {/* Teams Section */}
        <div className="section teams-section">
          <h1>Meet Our Team</h1>
          <div className="teams-grid">
            {players.length > 0 ? (
              <>
                {players.slice(0, 4).map((player) => (
                  <div key={player.id} className="team-card">
                    <div className="image-container">
                      <img
                        src={`http://127.0.0.1:8000/storage/${player.image}`}
                        alt={player.name}
                        className="team-image"
                      />
                      <div className="overlay">
                        <div className="overlay-content">
                          <h3>{player.role}</h3>
                          <p>{player.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="team-info">
                      <h2 className="team-name">{player.name}</h2>
                    </div>
                  </div>
                ))}
                <Link to="/teams" className="view-more-link">View More Teams</Link>
              </>
            ) : (
              <div>No data available in Teams section</div>
            )}
          </div>
        </div>

        {/* News Section */}
        <div className="section news-section">
          <h1>Latest News</h1>
          <div className="news-grid">
            {news.length > 0 ? (
              <>
                {news.slice(0, 4).map((newsItem) => (
                  <div className="news-card" key={newsItem.id}>
                    <Link to={`/news/${newsItem.id}`}>
                      {newsItem.image && (
                        <img
                          src={`http://127.0.0.1:8000/storage/${newsItem.image}`}
                          alt={newsItem.title}
                          className="news-image"
                        />
                      )}
                      <h2 className="news-title">{newsItem.title}</h2>
                    </Link>
                    <div className="news-author">By {newsItem.author}</div>
                  </div>
                ))}
                <Link to="/news" className="view-more-link">View More News</Link>
              </>
            ) : (
              <div>No data available in News section</div>
            )}
          </div>
        </div>

        {/* Events Section */}
        <div className="section events-section">
          <h1>Upcoming Events</h1>
          <div className="events-list">
            {events.length > 0 ? (
              <>
                {events.slice(0, 4).map((event) => (
                  <div key={event.id} className="event-card">
                    <h2 className="event-title">{event.title}</h2>
                    <p className="event-date">{event.date}</p>
                    <div
                      className="news-detail-body"
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    ></div>
                  </div>
                ))}
                <Link to="/events" className="view-more-link">View More Events</Link>
              </>
            ) : (
              <div>No data available in Events section</div>
            )}
          </div>
        </div>

        {/* Galleries Section */}
        <div className="section galleries-section">
          <h1>Photo Galleries</h1>
          <div className="galleries-grid">
            {galleries.length > 0 ? (
              <>
                {galleries.slice(0, 4).map((gallery) => (
                  <div key={gallery.id} className="gallery-card">
                    <img
                      src={`http://127.0.0.1:8000/storage/${gallery.image}`}
                      alt={gallery.title}
                      className="gallery-image"
                    />
                    <h2 className="gallery-title">{gallery.title}</h2>
                    
                  </div>
                ))}
                <Link to="/galleries" className="view-more-link">View More Galleries</Link>
              </>
            ) : (
              <div>No data available in Galleries section</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
