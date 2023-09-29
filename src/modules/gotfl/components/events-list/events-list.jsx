import React from 'react';

const formatDate = (inputDate) => {
  const dateObj = new Date(inputDate);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

const EventList = ({ events, currentDate }) => {
  const currentMonthEvents = events.filter((event) => {
    const eventDate = new Date(event.startDateTimeUtc);
    return (
      eventDate.getFullYear() === currentDate.getFullYear() &&
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getDate() >= currentDate.getDate()
    );
  });

  return (
    <div className="event-list containerwrapper">
      <h2>Event Calendar</h2>
      <ul>
        {currentMonthEvents.map((event) => (
          <li key={event.id}>
            <ul>
              <li className="event-date">
                {formatDate(event.startDateTimeUtc)}
              </li>
              <li className="event-title">{event.eventTitle}</li>
              <li className="event-description">{event.eventDescription}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
