import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    resetToken: '',
    newPassword: '',
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setFormData((prev) => ({
        ...prev,
        resetToken: tokenFromUrl,
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.message || 'Password reset successful!');
        setTimeout(() => {
          navigate('/login'); // Redirect to login after success
        }, 3000);
      } else {
        setErrorMsg(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Server error.');
    }
  };

  return (
    <div className="tab-content" style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2 className="section-title">Reset Your Password</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Update Password</button>

        {successMsg && (
          <p className="success-message" style={{ color: 'green' }}>
            {successMsg} — Redirecting to login...
          </p>
        )}
        {errorMsg && (
          <p className="error-message" style={{ color: 'red' }}>{errorMsg}</p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
