// src/pages/ProfilePage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>User Profile #{id}</h1>
      <p>Profile information will be displayed here...</p>
      <div>
        <h2>Events Organized</h2>
        <p>List of organized events...</p>
      </div>
      <div>
        <h2>Events Attending</h2>
        <p>List of attending events...</p>
      </div>
    </div>
  );
};

export default ProfilePage;