// src/pages/RegisterPage.js
import React, { useState } from 'react';
import RegisterForm from '../components/forms/RegisterForm';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async (values) => {
    setLoading(true);
    setMessage('');
    console.log('Register values:', values);
    
    try {
      // Simulate API call
      setTimeout(() => {
        setMessage('Registration successful! You can now login.');
        console.log('Registration successful (simulated)');
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessage('Registration error. Please try again.');
      console.error('Registration error:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create New Account</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <RegisterForm onSubmit={handleRegister} />
      {loading && <p>Creating account...</p>}
    </div>
  );
};

export default RegisterPage;