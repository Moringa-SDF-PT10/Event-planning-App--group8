// src/pages/LoginPage.js
import React, { useState } from 'react';
import LoginForm from '../components/forms/LoginForm';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    console.log('Login values:', values);
    
    try {
      // Simulate API call (replace with actual backend endpoint)
      setTimeout(() => {
        console.log('Login successful (simulated)');
        setLoading(false);
        // Redirect or store authentication token here
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login to Your Account</h1>
      <LoginForm onSubmit={handleLogin} />
      {loading && <p>Logging in...</p>}
    </div>
  );
};

export default LoginPage;