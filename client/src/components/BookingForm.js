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

      const payload = {
        ...formData,
        barberName: storedBarber?.name,
        barberId: storedBarber?._id,
      };

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let result;
      try {
        result = await res.json(); // Try parsing JSON
      } catch (jsonErr) {
        const text = await res.text(); // fallback to plain text
        console.error('Non-JSON response:', text);
        throw new Error('Server returned invalid response');
      }

      console.log("Submitted data:", payload);
      console.log("Server response:", result);

      if (!res.ok) {
        throw new Error(result?.error || 'Failed to create appointment');
      }

      setSuccess('Appointment booked successfully!');
      setError(null);

      // Clear form
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
