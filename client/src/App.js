// App.js
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import BarberDashboard from './components/BarberDashboard';
import Features from './pages/Features';
import ContactUs from './pages/ContactUs';
import BarberLogin from './components/BarberLogin';
import RegisterBarber from './components/RegisterBarber';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';


import './global.css';
import './index.css'; // Just in case it's needed

function AppWrapper() {
  const location = useLocation();

  // Define which routes should NOT show the Navbar
  const hideNavbarRoutes = ['/', '/login', '/dashboard'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<BarberLogin />} />
        <Route path="/register" element={<RegisterBarber />} />
        <Route path="/dashboard" element={<BarberDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
