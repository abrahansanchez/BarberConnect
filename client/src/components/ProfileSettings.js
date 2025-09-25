import React, { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const ProfileSettings = ({ barber }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    calLink: '',  
    bio: '',
  });

  const [availability, setAvailability] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (barber) {
      setFormData({
        name: barber.name || '',
        email: barber.email || '',
        phone: barber.phone || '',
        calLink: barber.calLink || '', 
        bio: barber.bio || '',
      });
      setAvailability(barber.availability || {});
    }
  }, [barber]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAvailabilityChange = (day, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch(`${apiUrl}/api/barbers/${barber._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ ...formData, availability }),
      });

      if (res.ok) {
        const updatedBarber = await res.json();
        localStorage.setItem('barber', JSON.stringify(updatedBarber));
        window.location.reload(); // reload to reflect updated state
      } else {
        const data = await res.json();
        setErrorMsg(data.message || 'Update failed.');
      }
    } catch (err) {
      setErrorMsg('An error occurred.');
    }
  };

  return (
    <div className="tab-content">
      <h2 className="section-title">Profile Settings</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input name="email" value={formData.email} onChange={handleChange} disabled />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="calLink">Your Cal.com Booking Link</label>
          <input
            type="text"
            id="calLink"
            name="calLink"
            value={formData.calLink}
            onChange={handleChange}
            placeholder="e.g. https://cal.com/yourname"
          />
        </div>

        <div className="form-group">
          <label>Bio:</label>
          <textarea
            name="bio"
            rows="3"
            value={formData.bio}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div className="form-group">
          <label>Weekly Availability:</label>
          {daysOfWeek.map((day) => (
            <div key={day} style={{ marginBottom: '0.5rem' }}>
              <label style={{ fontWeight: '500' }}>{day}</label>
              <input
                type="text"
                placeholder="e.g. 9 AM - 5 PM or leave blank"
                value={availability[day] || ''}
                onChange={(e) => handleAvailabilityChange(day, e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
              />
            </div>
          ))}
        </div>

        <button type="submit">Update Profile</button>

        {successMsg && <p className="success-message">{successMsg}</p>}
        {errorMsg && <p className="error-message">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default ProfileSettings;
