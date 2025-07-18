import React, { useState, useEffect } from 'react';

const SmsLogList = ({ barberId, searchQuery }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`/api/sms/${barberId}`);
        const data = await res.json();
        setLogs(data);
      } catch (error) {
        console.error('Error fetching SMS logs:', error);
      }
    };

    fetchLogs();
  }, [barberId]);

  const filteredLogs = logs.filter((log) => {
    const query = searchQuery.toLowerCase();
    return (
      log.from.toLowerCase().includes(query) ||
      log.to.toLowerCase().includes(query) ||
      log.body.toLowerCase().includes(query)
    );
  });

  return (
    <div className="list-container">
      <h2 className="section-title">SMS Logs</h2>
      {filteredLogs.length > 0 ? (
        filteredLogs.map((log) => (
          <div key={log._id} className="list-item">
            <p><strong>From:</strong> {log.from}</p>
            <p><strong>To:</strong> {log.to}</p>
            <p><strong>Message:</strong> {log.body}</p>
            <p><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p className="empty-state">No SMS logs found.</p>
      )}
    </div>
  );
};

export default SmsLogList;
