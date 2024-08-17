import React, { useEffect, useState } from 'react';
import './Teams.css';

const Teams = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/api/players');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="teams-container">
      <h1 className="teams-title">Meet Our Team</h1>
      <div className="teams-grid">
        {players.map((player) => (
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
      </div>
    </div>
  );
};

export default Teams;
