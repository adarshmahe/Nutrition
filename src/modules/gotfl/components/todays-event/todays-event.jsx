import React, { useState, useEffect } from 'react';
import { Popup } from '../../../../components/popup-modal/popup-modal.jsx';
import { apiURL } from '../../../../env-url.js';
import api from '../../../../util/api.jsx';

const TodaysEvent = () => {
  const [open, setOpen] = useState(false);
  const [eventData, setEventsData] = useState([]);
  const fetchData = () => {
    api
      .get(`${apiURL}/gotfl/events/current`)
      .then((data) => {
        setEventsData(data);
        if (data && data.length === 0) {
          setOpen(false);
        } else {
          const eventForCurrentDate =
            data &&
            data.some(
              (event) =>
                formatDate(event.startDateTimeUtc) === formatDate(new Date())
            );
          setOpen(eventForCurrentDate);
        }
      });
  };
  const formatDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Adding 1 to get the correct month
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (startDate, endDate) => {
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    const timeDiff = endDateTime.getTime() - startDateTime.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${hours}:${minutes}:${seconds}`;
  };

  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const day = weekday[new Date().getDay()];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        {open && eventData ? (
          <Popup
            text={
              <>
                <div className="event-container">
                  {eventData &&
                    eventData.map((data) =>
                      formatDate(data.startDateTimeUtc) ===
                      formatDate(new Date()) ? (
                          <div key={data.id}>
                            <h3>{data.eventTitle}</h3>
                            <p>{data.eventDescription}</p>
                            <div className="event-date-time">
                            Date:{' '}
                              <span>
                                {formatDate(data.startDateTimeUtc)} - {day}
                              </span>
                            </div>
                            <div className="event-date-time">
                            Time:{' '}
                              <span>
                                {formatTime(
                                  data.startDateTimeUtc,
                                  data.endDateTimeUtc
                                )}{' '}
                              hrs
                              </span>
                            </div>
                          </div>
                        ) : null
                    )}
                </div>
              </>
            }
            closePopup={() => setOpen(false)}
          />
        ) : null}
      </div>
    </>
  );
};

export default TodaysEvent;
