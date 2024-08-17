import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Founders.css'; // Import the CSS file for founders

const Founders = () => {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/founder')
      .then((response) => {
        setFounders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('There was an error fetching the founder data.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading founders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="founders-container">
      <h1>Our Founders</h1>
      <div className="founders-grid">
        {founders.map((founder) => (
          <div key={founder.id} className="founder-card">
            {founder.image && (
              <img
                src={`http://127.0.0.1:8000/images/${founder.image}`}
                alt={founder.name}
                className="founder-image"
              />
            )}
            <h2 className="founder-name">{founder.name}</h2>
            <p className="founder-position">{founder.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Founders;
