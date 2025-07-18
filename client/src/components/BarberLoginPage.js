// client/src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import BarberLogin from './BarberLogin';
import backgroundImg from '../assets/nathon-oski-EW_rqoSdDes-unsplash.jpg';

const HomePage = () => {
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const handleCalendlyEvent = (event) => {
      if (event.data.event === 'calendly.event_scheduled') {
        setAppointmentConfirmed(true);
        setTimeout(() => setAppointmentConfirmed(false), 5000);
      }
    };
    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, []);

  const openMainCalendly = () => {
    window.Calendly.initPopupWidget({
      url: 'https://calendly.com/abrahansanchez78/30min',
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Navbar */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.2rem 2rem',
        backgroundColor: 'rgba(0,0,0,0.4)'
      }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>BarberConnect</h1>
        <nav>
          <button
            onClick={openMainCalendly}
            style={{
              backgroundColor: '#ff5c5c',
              border: 'none',
              padding: '0.6rem 1rem',
              color: '#fff',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Book Appointment
          </button>
        </nav>
      </header>

      {/* Hero & Login Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 80px)'
      }}>
        {/* Confirmation Banner */}
        {appointmentConfirmed && (
          <p style={{ marginBottom: '1rem', color: '#8aff8a', textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            Appointment scheduled successfully!
          </p>
        )}

        {/* Login Form Container */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          color: '#000',
          padding: '2rem',
          borderRadius: '1rem',
          width: '100%',
          maxWidth: '500px',
        }}>
          <BarberLogin />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
