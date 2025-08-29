// src/pages/EventDetailsPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RSVPForm from '../components/forms/RSVPForm';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Mock user ID for demonstration
  const userId = 'user123';

  const handleRSVP = async (values) => {
    setLoading(true);
    setMessage('');
    
    try {
      // Simulate API call
      setTimeout(() => {
        setMessage('RSVP submitted successfully!');
        console.log('RSVP submitted:', values);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessage('Error submitting RSVP. Please try again.');
      console.error('RSVP error:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Event Details #{id}</h1>
      <p>Event information will be displayed here...</p>
      
      <h2>RSVP to this Event</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <RSVPForm 
        onSubmit={handleRSVP}
        eventId={id}
        userId={userId}
      />
      {loading && <p>Submitting RSVP...</p>}
    </div>
  );
};

export default EventDetailsPage;