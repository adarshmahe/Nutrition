import React from 'react';
import { arrowLeft, arrowRight } from '../icons/icons.jsx';

const Calendar = ({ events, currentDate, onMonthChange }) => {
  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const renderCalendarDays = () => {
    const totalDays = daysInMonth(currentDate);
    const startDay = firstDayOfMonth(currentDate);
    const calendarDays = [];
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const daysInPrevMonth = daysInMonth(prevMonth);
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

    // Add previous day cells from the previous month
    for (let i = startDay - 1; i >= 0; i--) {
      const prevDate = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth(),
        daysInPrevMonth - i
      );
      calendarDays.push(
        <div
          className="calendar-day faded"
          key={`prev-day-${i}`}
          onClick={() => onMonthChange(prevDate)}
        >
          {prevDate.getDate()}
        </div>
      );
    }

    // Add cells for each day of the current month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const hasEvent = events.some(
        (event) => new Date(event.date).toDateString() === date.toDateString()
      );
      const isCurrentDate = date.toDateString() === new Date().toDateString();

      calendarDays.push(
        <div
          className={`calendar-day${hasEvent ? ' has-event' : ''}${
            isCurrentDate ? ' active' : ''
          }`}
          key={`day-${day}`}
          onClick={() => onMonthChange(date)}
        >
          {day}
        </div>
      );
    }

    // Add next day cells from the next month
    for (let i = 1; calendarDays.length < 42; i++) {
      const nextDate = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        i
      );
      calendarDays.push(
        <div
          className="calendar-day faded"
          key={`next-day-${i}`}
          onClick={() => onMonthChange(nextDate)}
        >
          {nextDate.getDate()}
        </div>
      );
    }

    return calendarDays;
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    onMonthChange(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    onMonthChange(nextMonth);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>
          <img src={arrowLeft} alt="left arrow" />
        </button>
        <h2>
          {currentDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <button onClick={handleNextMonth}>
          <img src={arrowRight} alt="right arrow" />
        </button>
      </div>
      <ul className="calendar-day-title">
        <li>s</li>
        <li>m</li>
        <li>t</li>
        <li>w</li>
        <li>T</li>
        <li>f</li>
        <li>s</li>
      </ul>
      <div className="calendar-grid">{renderCalendarDays()}</div>
    </div>
  );
};

export default Calendar;
