import React, { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AppointmentsList = ({ barberId, searchQuery }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/appointments/${barberId}`);
        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [barberId]);

  const filteredAppointments = appointments.filter((appt) => {
    const query = searchQuery.toLowerCase();
    return (
      appt.clientName.toLowerCase().includes(query) ||
      appt.phoneNumber.includes(query) ||
      (appt.email && appt.email.toLowerCase().includes(query))
    );
  });

  return (
    <div className="list-container">
      <h2 className="section-title">Upcoming Appointments</h2>
      {filteredAppointments.length > 0 ? (
        <div className="appointment-list">
          {filteredAppointments.map((appt) => (
            <div key={appt._id} className="appointment-card">
              <p><strong>Client:</strong> {appt.clientName}</p>
              <p><strong>Phone:</strong> {appt.phoneNumber}</p>
              <p><strong>Service:</strong> {appt.service}</p>
              <p><strong>Time:</strong> {new Date(appt.appointmentTime).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-state">No appointments found.</p>
      )}
    </div>
  );
};

export default AppointmentsList;
