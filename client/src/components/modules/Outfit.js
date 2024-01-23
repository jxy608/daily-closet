import React, { useEffect, useCallback } from 'react';

const Outfit = () => {
  const updateOutfit = useCallback(() => {
    // Trigger the logic or state update that should happen daily
    // This could be a function to force a re-render, or you can update some state
    // that causes a re-render
    console.log('Outfit has been changed!');
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
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default Outfit;
