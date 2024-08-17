import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/api/news'); // Updated endpoint
        setNews(response.data);
      } catch (err) {
        setError('Failed to fetch news.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="news-container">
      <h1>Latest News</h1>
      <div className="news-grid">
        {news.length > 0 ? (
          news.map((newsItem) => (
            <div className="news-card" key={newsItem.id}>
              <Link to={`/news/${newsItem.id}`}>
                {newsItem.image && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${newsItem.image}`}
                    alt={newsItem.title}
                    className="news-image"
                  />
                )}
                <div className="news-content">
                  <h2 className="news-title">{newsItem.title}</h2>
                </div>
              </Link>
              <p className="news-author">By {newsItem.author}</p>
            </div>
          ))
        ) : (
          <p>No news available.</p>
        )}
      </div>
    </div>
  );
};

export default News;
