import React from 'react';


const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <div className="tab-content">
        <h2 className="section-title">Contact Us</h2>
        <p>If you have any questions, feedback, or support needs — feel free to reach out!</p>
        <div className="contact-details">
          <p><strong>Email:</strong> support@barberconnectapp.com</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
          <p><strong>Instagram:</strong> <a href="https://instagram.com/barberconnectapp" target="_blank" rel="noreferrer">@barberconnectapp</a></p>
        </div>
        <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
          Our team typically replies within 24 hours Monday through Friday.
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
