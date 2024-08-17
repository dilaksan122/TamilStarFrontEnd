import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch gallery data from the Laravel API
    axios.get('http://127.0.0.1:8000/api/galleries/show')
      .then(response => {
        setGalleries(response.data); // Assuming the response data is an array of gallery items
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="gallery-container">
      {galleries.length > 0 ? (
        <div className="gallery-grid">
          {galleries.map(gallery => (
            <div key={gallery.id} className="gallery-item">
              <h3>{gallery.title}</h3>
              <img src={`http://127.0.0.1:8000/storage/${gallery.image}`} alt={gallery.title} className="gallery-image"/>
             
            </div>
          ))}
        </div>
      ) : (
        <p>No galleries available.</p>
      )}
    </div>
  );
}

export default Gallery;
