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
        const [apptRes, vmRes, smsRes] = await Promise.all([
          fetch(`/api/appointments/${barberId}`),
          fetch(`/api/voicemails/${barberId}`),
          fetch(`/api/sms/${barberId}`),
        ]);

        const appointments = await apptRes.json();
        const voicemails = await vmRes.json();
        const sms = await smsRes.json();

        const serviceCount = {};
        appointments.forEach(a => {
          if (a.service) {
            serviceCount[a.service] = (serviceCount[a.service] || 0) + 1;
          }
        });

        const topService = Object.entries(serviceCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

        setStats({
          totalAppointments: appointments.length,
          totalVoicemails: voicemails.length,
          totalSMS: sms.length,
          topService,
        });
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
