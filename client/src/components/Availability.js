import React from 'react';

const Availability = ({ barber }) => {
  if (!barber || !barber.availability) return null;

  return (
    <div className="tab-content">
      <h2 className="section-title">Weekly Availability</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '300px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Day</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #ddd' }}>Available Time</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(barber.availability).map(([day, time]) => (
              <tr key={day}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>{day}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>
                  {time ? time : 'Unavailable'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Availability;
