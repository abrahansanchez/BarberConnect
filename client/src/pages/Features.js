import React from 'react';


const Features = () => {
  return (
    <div className="features-page">
      <div className="tab-content">
        <h2 className="section-title">BarberConnect Features</h2>
        <ul className="features-list">
          <li>
            <strong>Automated Voice Call Scheduler:</strong> Book appointments through Calendly with automatic SMS confirmation and voice call reminders.
          </li>
          <li>
            <strong>Calendly Integration for Online Booking:</strong> Each barber has a dedicated Calendly link for online booking. Clients can easily pick available times and receive automated confirmations.
          </li>
          <li>
            <strong>SMS Communication:</strong> View and manage all text messages exchanged with clients in a dedicated SMS log tab.
          </li>
          <li>
            <strong>Profile Management:</strong> Barbers can update their bio, Calendly link, and contact preferences directly from their dashboard.
          </li>
          <li>
            <strong>Real-Time Analytics:</strong> View total bookings, voicemails, and SMS volume to understand your shop’s activity.
          </li>
         
        </ul>
      </div>
    </div>
  );
};

export default Features;
