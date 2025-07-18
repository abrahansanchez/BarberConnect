import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImg from '../assets/beard-trimming.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  // Updated booking handler using window.open for cal.com
  const handleBooking = () => {
    window.open('https://cal.com/abrahan-sanchez', '_blank');
  };

  return (
    <div
      className="homepage"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: '#fff',
        position: 'relative',
        padding: 0,
        margin: 0,
      }}
    >
      {/* Transparent Header */}
      <header
        className="homepage-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.2rem',
          backgroundColor: 'transparent',
          flexWrap: 'wrap',
        }}
      >
        <h1
          onClick={() => navigate('/')}
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          BarberConnect
        </h1>

        <nav>
          <ul
            style={{
              display: 'flex',
              gap: '1.2rem',
              listStyle: 'none',
              padding: 0,
              margin: 0,
              flexWrap: 'wrap',
            }}
          >
            <li><Link to="/" style={navLink}>Home</Link></li>
            <li><Link to="/features" style={navLink}>Features</Link></li>
            <li><Link to="/contact-us" style={navLink}>Contact Us</Link></li>
            <li><button onClick={() => navigate('/login')} style={loginBtn}>Login</button></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="hero-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          height: 'calc(100vh - 120px)',
          backgroundColor: 'rgba(0,0,0,0.4)',
          padding: '0 1rem',
        }}
      >
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>
          Transform Your Barber Business
        </h2>
        <p style={{ fontSize: '1.1rem', margin: '1rem 0', color: '#ccc' }}>
          Streamline bookings. Manage voicemails. Grow client relationships.
        </p>
        <button
          onClick={handleBooking}
          className="cta-button"
          style={{
            backgroundColor: '#fff',
            color: '#000',
            fontWeight: 'bold',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Book with a Barber Now
        </button>
      </section>
    </div>
  );
};

// Link styling
const navLink = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
};

// Login button styling
const loginBtn = {
  backgroundColor: 'transparent',
  color: '#fff',
  border: '1px solid #fff',
  borderRadius: '5px',
  padding: '6px 12px',
  fontSize: '1rem',
  cursor: 'pointer',
};

export default HomePage;
