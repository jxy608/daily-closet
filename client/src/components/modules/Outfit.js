import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { get } from "../../utilities";

import "./Outfit.css";
import "../../utilities.css";

const Outfit = () => {

  const [outfit, setOutfit] = useState({});
  const { userId } = useAuth();

  const updateOutfit = useCallback(() => {
    // Trigger the logic or state update that should happen daily
    // This could be a function to force a re-render, or you can update some state that causes a re-render
    // TODO: change from all clothes to only clothes that match weather
    get('/api/outfit', { userId: userId })
      .then((clothes) => {
        setOutfit(clothes);
        console.log('Outfit has been changed!', clothes);
      })
      .catch((error) => {
        console.error('Error fetching available clothes:', error);
      });
  }, []);

  useEffect(() => {
    // Calculate the time until the next midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to next midnight

    const timeUntilMidnight = midnight.getTime() - now.getTime();

    // Set up a timeout to trigger a re-render at midnight each day
    const timeoutId = setTimeout(() => {
      updateOutfit();
    }, timeUntilMidnight);



    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, [updateOutfit]);

  const handleRefresh = () => {
    // Manually trigger the update and re-render
    updateOutfit();
  };

  // Your component rendering logic goes here
  return (
    <div>
      <h2>outfit</h2>
      <div className="outfit-container">
        top
        <img src={outfit['top']}/>
        bottom
        <img src={outfit['bottom']}/>
      </div>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default Outfit;
