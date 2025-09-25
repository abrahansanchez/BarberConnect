import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../utils/api';

const RegisterBarber = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    languagePreference: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Register New Barber</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" type="text" required value={formData.name} onChange={handleChange} />

        <label>Phone:</label>
        <input name="phone" type="text" required value={formData.phone} onChange={handleChange} />

        <label>Email:</label>
        <input name="email" type="email" required value={formData.email} onChange={handleChange} />

        <label>Password:</label>
        <input name="password" type="password" required value={formData.password} onChange={handleChange} />

        <label>Language Preference (e.g., English or Spanish):</label>
        <input name="languagePreference" type="text" required value={formData.languagePreference} onChange={handleChange} />

        <button type="submit">Register</button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default RegisterBarber;
