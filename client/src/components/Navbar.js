// client/src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  // hide navbar on reset/forgot password pages
  const hideOnPaths = ['/reset-password'];
  if (hideOnPaths.includes(location.pathname)) return null;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          BarberConnect
        </Link>
      </div>

      <div className="navbar-center">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/features" className="nav-link">Features</Link>
        <Link to="/contact-us" className="nav-link">Contact Us</Link>
      </div>

      <div className="navbar-right">
        <Link to="/login" className="nav-link login-btn">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
