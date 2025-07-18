import React, { useState, useEffect } from 'react';
import './BarberDashboard.css';
import '../global.css';
import BookingForm from './BookingForm';
import AppointmentsList from './AppointmentsList';
import SmsLogList from './SmsLogList';
import VoicemailList from './VoicemailList';
import SearchBar from './SearchBar';
import ProfileSettings from './ProfileSettings';
import Availability from './Availability';
import AnalyticsSummary from './AnalyticsSummary';

const BarberDashboard = () => {
  const [barber, setBarber] = useState(null);
  const [activeTab, setActiveTab] = useState('appointments');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('barber');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setBarber(parsed);
    }
    document.body.classList.add('dashboard-mode');
  return () => {
    document.body.classList.remove('dashboard-mode');
  };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('barber');
    window.location.href = '/';
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false); // close sidebar on mobile
  };

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  if (!barber) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h2 className="sidebar-title">Barber Dashboard</h2>
        <ul className="sidebar-menu">
          <li className={activeTab === 'appointments' ? 'active' : ''} onClick={() => handleTabClick('appointments')}>Appointments</li>
          <li className={activeTab === 'sms' ? 'active' : ''} onClick={() => handleTabClick('sms')}>SMS Logs</li>
          <li className={activeTab === 'voicemails' ? 'active' : ''} onClick={() => handleTabClick('voicemails')}>Voicemails</li>
          <li className={activeTab === 'analytics' ? 'active' : ''} onClick={() => handleTabClick('analytics')}>Analytics</li>
          <li className={activeTab === 'availability' ? 'active' : ''} onClick={() => handleTabClick('availability')}>Availability</li>
          <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabClick('profile')}>Profile Settings</li>
        </ul>
        <button className="btn-primary logout-button" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h1 className="welcome-title">Welcome, {barber.name}</h1>
            <p className="barber-email">{barber.email}</p>
          </div>
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
          <button className="hamburger" onClick={toggleSidebar}>
            &#9776;
          </button>
        </header>

        <section className="booking-form-section card">
          <h2 className="section-title">Book New Appointment</h2>
          <BookingForm />
        </section>

        <section className="tab-content">
          {activeTab === 'appointments' && (
            <div className="card">
              <AppointmentsList barberId={barber._id} searchQuery={searchQuery} />
            </div>
          )}
          {activeTab === 'sms' && (
            <div className="card">
              <SmsLogList barberId={barber._id} searchQuery={searchQuery} />
            </div>
          )}
          {activeTab === 'voicemails' && (
            <div className="card">
              <VoicemailList barberId={barber._id} searchQuery={searchQuery} />
            </div>
          )}
          {activeTab === 'analytics' && (
            <div className="card">
              <AnalyticsSummary barberId={barber._id} />
            </div>
          )}
          {activeTab === 'availability' && (
            <div className="card">
              <Availability barber={barber} />
            </div>
          )}
          {activeTab === 'profile' && (
            <div className="profile-settings card">
              <ProfileSettings barber={barber} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default BarberDashboard;
