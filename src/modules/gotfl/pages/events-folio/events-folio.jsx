import React, { useState, useEffect } from 'react';
import Calendar from '../../../../components/calendar/calendar.jsx';
import EventList from '../../components/events-list/events-list.jsx';
import { apiURL } from '../../../../env-url.js';
import api from '@/util/api.jsx'

const EventsFolio = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchEvents = () => {
    api
      .get(`${apiURL}/gotfl/events/upcoming`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleMonthChange = (date) => {
    setCurrentDate(date);
  };

  return (
    <>
      <div className="calendar-and-events">
        <Calendar
          events={events}
          currentDate={currentDate}
          onMonthChange={handleMonthChange}
        />
        <EventList events={events} currentDate={currentDate} />
      </div>
    </>
  );
};

export default EventsFolio;
