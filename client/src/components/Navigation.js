// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={{ 
      backgroundColor: '#f8f9fa', 
      padding: '1rem', 
      marginBottom: '2rem',
      borderBottom: '1px solid #dee2e6'
    }}>
      <Link to="/" style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff' }}>
        Home
      </Link>
      <Link to="/events/new" style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff' }}>
        Create Event
      </Link>
      <Link to="/vendors" style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff' }}>
        Vendors
      </Link>
      <Link to="/profile/1" style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff' }}>
        Profile
      </Link>
      <Link to="/login" style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff' }}>
        Login
      </Link>
      <Link to="/register" style={{ textDecoration: 'none', color: '#007bff' }}>
        Register
      </Link>
    </nav>
  );
};

export default Navigation;