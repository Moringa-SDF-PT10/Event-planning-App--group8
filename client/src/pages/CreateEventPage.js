// src/pages/CreateEventPage.js
import React, { useState } from 'react';
import EventForm from '../components/forms/EventForm';

const CreateEventPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEventSubmit = async (values) => {
    setLoading(true);
    setMessage('');
    console.log('Event values:', values);
    
    try {
      // Simulate API call
      setTimeout(() => {
        setMessage('Event created successfully!');
        console.log('Event created (simulated)');
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessage('Error creating event. Please try again.');
      console.error('Event creation error:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create New Event</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <EventForm onSubmit={handleEventSubmit} />
      {loading && <p>Creating event...</p>}
    </div>
  );
};

export default CreateEventPage;