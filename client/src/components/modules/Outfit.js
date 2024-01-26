import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { get } from "../../utilities";

import "./Outfit.css";
import "../../utilities.css";

const Outfit = (props) => {
  const [outfit, setOutfit] = useState({});
  const { userId } = useAuth();

  const updateOutfit = useCallback(() => {
    // Trigger the logic or state update that should happen daily
    // This could be a function to force a re-render, or you can update some state that causes a re-render
    // TODO: change from all clothes to only clothes that match weather
    const currentDate = new Date().toLocaleDateString();
    const storedOutfit = JSON.parse(localStorage.getItem(`outfit-${userId}-${currentDate}`));

    if (storedOutfit) {
      // Use the outfit data from local storage
      setOutfit(storedOutfit);
      console.log("Outfit loaded from local storage:", storedOutfit);
    } else {
      if (props.weatherData) {
        console.log("weather data found");
        // console.log(props.weatherData.daily[0].temp.max);
        // console.log(props.weatherData.daily[0].weather[0].temperature);
        // Fetch a new outfit if not found in local storage
        get("/api/outfit", {
          userId: userId,
          high: props.weatherData.daily[0].temp.max,
          low: props.weatherData.daily[0].temp.min,
        })
          .then((clothes) => {
            setOutfit(clothes);
            // Store the outfit data in local storage
            localStorage.setItem(`outfit-${userId}-${currentDate}`, JSON.stringify(clothes));
            console.log("Outfit has been changed!", clothes);
          })
          .catch((error) => {
            console.error("Error fetching available clothes:", error);
          });
      }
    }
  }, [userId, props]);

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

    // Initial update when the component mounts?
    updateOutfit();

    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, [updateOutfit]);

  const handleRefresh = () => {
    // Clear outfit data from local storage
    const currentDate = new Date().toLocaleDateString();
    localStorage.removeItem(`outfit-${userId}-${currentDate}`);

    // Manually trigger the update and re-render
    updateOutfit();
  };

  // Your component rendering logic goes here
  return (
    <div>
      <h2>outfit</h2>
      <div className="outfit-container">
        <img src={outfit["top"]} alt="Top" className="top-image" />
        <img src={outfit["bottom"]} alt="Bottom" className="bottom-image" />
      </div>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default Outfit;
