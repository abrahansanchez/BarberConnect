import React, { useEffect } from 'react';
import './App.css';
//import BookingForm from './components/BookingForm';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const openMainCalendly = () => {
    window.Calendly.initPopupWidget({
      url: 'https://calendly.com/abrahansanchez78/30min?back=1&month=2025-06'
    });
  };

  return (
    <div className="App">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>BarberConnect</h1>
          <p>Book with the best — wherever you are.</p>
          <button className="main-book-btn" onClick={openMainCalendly}>
            Book Appointment
          </button>
        </div>
      </section>

      {/* Booking Form Section 
      <section className="form-section">
        <BookingForm />
      </section>*/}
      
    </div>
    
  );
}

export default App;
