// src/pages/EditEventPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import EventForm from '../components/forms/EventForm';

const EditEventPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Mock event data for demonstration
  const mockEvent = {
    title: 'Sample Event',
    description: 'This is a sample event description',
    location: 'Sample Location',
    date: '2024-12-31',
    time: '19:00',
    capacity: '100',
    price: '50.00'
  };

  const handleEventSubmit = async (values) => {
    setLoading(true);
    setMessage('');
    
    try {
      // Simulate API call
      setTimeout(() => {
        setMessage('Event updated successfully!');
        console.log('Event updated:', values);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessage('Error updating event. Please try again.');
      console.error('Event update error:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Edit Event #{id}</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <EventForm 
        onSubmit={handleEventSubmit} 
        initialValues={mockEvent}
        isEdit={true}
      />
      {loading && <p>Updating event...</p>}
    </div>
  );
};

export default EditEventPage;