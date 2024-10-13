import React, { useState, useEffect } from 'react';

function HomePage() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get the user ID from local storage when the component mounts
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []); // The empty dependency array ensures this effect runs only once, after the initial render

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {userId && (
        <p>Your User ID: {userId}</p>
      )}
    </div>
  );
}

export default HomePage;
