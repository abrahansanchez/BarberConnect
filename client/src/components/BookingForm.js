import React, { useState } from 'react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    phoneNumber: '',
    service: '',
    appointmentTime: '',
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storedBarber = JSON.parse(localStorage.getItem('barber'));

      if (!storedBarber?._id || !storedBarber?.name) {
        throw new Error('Barber data not found. Please log in again.');
      }

      const payload = {
        ...formData,
        barberName: storedBarber.name,
        barberId: storedBarber._id,
      };

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check status BEFORE parsing body
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server error:', errorText);
        throw new Error(errorText || 'Failed to create appointment');
      }

      let result;
      try {
        result = await res.json();
      } catch (jsonErr) {
        throw new Error('Server returned invalid JSON response');
      }

      console.log("Submitted data:", payload);
       console.log("Server response:", result);

       setSuccess('Appointment booked successfully!');
      setError(null);

       setFormData({
        clientName: '',
        phoneNumber: '',
        service: '',
        appointmentTime: '',
      });
    } catch (err) {
      console.error('Booking Error:', err);
      setError(err.message || 'There was an error booking the appointment.');
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="form-group">
        <label>Client Name:</label>
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Service:</label>
        <input
          type="text"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Appointment Time:</label>
        <input
          type="datetime-local"
          name="appointmentTime"
          value={formData.appointmentTime}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="logout-button">
        {success ? 'Booked!' : 'Book Appointment'}
      </button>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default BookingForm;
