// client/src/components/BarberLogin.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import backgroundImg from '../assets/nathon-oski-EW_rqoSdDes-unsplash.jpg';

const BarberLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
     const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
       method: 'POST',
      headers: {
      'Content-Type': 'application/json',
    },
     body: JSON.stringify({ email, password }),
});


      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('barber', JSON.stringify(data));
        navigate('/dashboard');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          padding: '2rem',
          borderRadius: '10px',
          maxWidth: '400px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          color: '#fff',
        }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', textAlign: 'center' }}>
          Barber Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '0.8rem',
            borderRadius: '5px',
            border: 'none',
            fontSize: '1rem',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '0.8rem',
            borderRadius: '5px',
            border: 'none',
            fontSize: '1rem',
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: '#ff5c5c',
            color: '#fff',
            padding: '0.8rem',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Login
        </button>

        <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          <Link
            to="/forgot-password"
            style={{
              color: '#00c6ff',
              textDecoration: 'none',
              fontSize: '0.95rem',
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
          >
            Forgot your password?
          </Link>
        </p>

        <div style={{ textAlign: 'center' }}>
          <Link
            to="/register"
            style={{
              color: '#00c6ff',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
          >
            Don’t have an account? Register here.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default BarberLogin;
