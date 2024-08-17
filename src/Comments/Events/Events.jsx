import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [matchFeatures, setMatchFeatures] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Fetch upcoming matches
  useEffect(() => {
    const fetchUpcomingMatches = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/api/match-features');
        setUpcomingMatches(response.data);
      } catch (error) {
        console.error('Error fetching upcoming matches:', error);
      }
    };

    fetchUpcomingMatches();
  }, []);

  // Fetch match features when an event is selected
  useEffect(() => {
    if (selectedEventId) {
      const fetchMatchFeatures = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/api/match-features/${selectedEventId}`);
          setMatchFeatures(response.data);
        } catch (error) {
          console.error('Error fetching match features:', error);
          setMatchFeatures([]); // Ensure it defaults to an empty array
        }
      };

      fetchMatchFeatures();
    } else {
      setMatchFeatures([]);
    }
  }, [selectedEventId]);

  const handleEventClick = (eventId) => {
    setSelectedEventId(selectedEventId === eventId ? null : eventId);
  };

  const handleMonthChange = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11; // Move to December of the previous year
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0; // Move to January of the next year
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="events-container">
      <h1 className="events-title">Upcoming Events</h1>
      <div className="calendar-container">
        <div className="calendar">
          <div className="calendar-header">
            <button className="calendar-nav" onClick={() => handleMonthChange(-1)}>&#60;</button>
            <span className="calendar-month">{monthNames[currentMonth]} {currentYear}</span>
            <button className="calendar-nav" onClick={() => handleMonthChange(1)}>&#62;</button>
          </div>
          <div className="calendar-days">
            <div className="calendar-day">Sun</div>
            <div className="calendar-day">Mon</div>
            <div className="calendar-day">Tue</div>
            <div className="calendar-day">Wed</div>
            <div className="calendar-day">Thu</div>
            <div className="calendar-day">Fri</div>
            <div className="calendar-day">Sat</div>
            {Array.from({ length: daysInMonth }).map((_, index) => (
              <div 
                key={index} 
                className={`calendar-date ${events.some(event => {
                  const eventDate = new Date(event.date);
                  return eventDate.getDate() === index + 1 &&
                         eventDate.getMonth() === currentMonth &&
                         eventDate.getFullYear() === currentYear;
                }) ? 'event-day' : ''}`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-card" onClick={() => handleEventClick(event.id)}>
              <h2 className="event-title">{event.title}</h2>
              <p className="event-date">{event.date}</p>
              <p className="event-description">{event.description}</p>
              {selectedEventId === event.id && matchFeatures.length > 0 && (
                <div className="match-schedule">
                  <h3>Match Schedule:</h3>
                  {matchFeatures.map(match => (
                    <div key={match.id} className="match-card">
                      <h3 className="match-name">{match.title}</h3>
                      <p className="match-date">Date: {match.date}</p>
                      <p className="match-time">Time: {match.time}</p>
                      <p className="match-location">Location: {match.location}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <h2 className="match-title">Upcoming Matches</h2>
      <div className="match-features">
        {upcomingMatches.slice(0, 4).map((match) => (  // Slice the first four matches
          <div key={match.id} className="match-card">
            <h3 className="match-name">{match.title}</h3>
            <p className="match-date">Date: {match.date}</p>
            <p className="match-time">Time: {match.time}</p>
            <p className="match-location">Location: {match.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
