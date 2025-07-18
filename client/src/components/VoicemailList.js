import React, { useEffect, useState } from 'react';

const VoicemailList = ({ barberId, searchQuery }) => {
  const [voicemails, setVoicemails] = useState([]);

  useEffect(() => {
    const fetchVoicemails = async () => {
      try {
        const res = await fetch(`/api/voicemails/${barberId}`);
        const data = await res.json();
        
        setVoicemails(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching voicemails:', err);
        setVoicemails([]);
      }
    };

    fetchVoicemails();
  }, [barberId]);

  const filtered = voicemails.filter((vm) => {
    const query = searchQuery.toLowerCase();
    return (
      vm.clientName?.toLowerCase().includes(query) ||
      vm.phoneNumber?.includes(query) ||
      vm.transcript?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="voicemail-list">
      <h2>Voicemails</h2>
      {filtered.length > 0 ? (
        filtered.map((vm) => (
          <div key={vm._id} className="voicemail-card">
            <p><strong>Client:</strong> {vm.clientName}</p>
            <p><strong>Phone:</strong> {vm.phoneNumber}</p>
            <p><strong>Transcript:</strong> {vm.transcript || 'No transcript available'}</p>
            <p><strong>Time:</strong> {new Date(vm.timestamp).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No voicemails found.</p>
      )}
    </div>
  );
};

export default VoicemailList;
