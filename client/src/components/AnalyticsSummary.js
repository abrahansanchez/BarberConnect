import React, { useEffect, useState } from 'react';

const AnalyticsSummary = ({ barberId }) => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalVoicemails: 0,
    totalSMS: 0,
    topService: 'N/A',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/analytics/${barberId}`);
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          console.error('Analytics API error:', data);
        }
      } catch (err) {
        console.error('Error fetching analytics:', err);
      }
    };

    fetchData();
  }, [barberId]);

  return (
    <div className="tab-content" style={{ marginBottom: '2rem' }}>
      <h2 className="section-title">Dashboard Summary</h2>
      <div className="card">
        <p><strong>Total Appointments:</strong> {stats.totalAppointments}</p>
        <p><strong>Total Voicemails:</strong> {stats.totalVoicemails}</p>
        <p><strong>Total SMS:</strong> {stats.totalSMS}</p>
        <p><strong>Top Service:</strong> {stats.topService}</p>
      </div>
    </div>
  );
};

export default AnalyticsSummary;
