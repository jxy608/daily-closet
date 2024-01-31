import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { get } from "../../utilities";

import "./Outfit.css";
import "../../utilities.css";
import acceptButton from "../../../assets/accept.svg";
import rejectButton from "../../../assets/reject.svg";
import heartIcon from "../../../assets/heart.svg";

const Outfit = (props) => {
  const [outfit, setOutfit] = useState({});
  const [outfitSelected, setOutfitSelected] = useState(false);
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
        let high = props.weatherData.daily[0].temp.max;
        let low = props.weatherData.daily[0].temp.min;
        if (props.tempSetting === "metric") {
          high = (high * 9) / 5 + 32;
          low = (low * 9) / 5 + 32;
        }
        console.log("weather data found", high, low);
        // console.log(props.weatherData.daily[0].temp.max);
        // console.log(props.weatherData.daily[0].weather[0].temperature);
        // Fetch a new outfit if not found in local storage
        get("/api/outfit", {
          userId: userId,
          high: high,
          low: low,
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

  const handleReject = () => {
    // TODO: INCREMENT REJECTIONS OF OUTFIT

    // Clear outfit data from local storage
    const currentDate = new Date().toLocaleDateString();
    localStorage.removeItem(`outfit-${userId}-${currentDate}`);

    // Manually trigger the update and re-render
    updateOutfit();
  };

  const handleAccept = () => {
    // TODO: INCREMENT CURRENT WEARS OF OUTFIT
    setOutfitSelected(!outfitSelected);
  };

  const handleUnselect = () => {
    // TODO: DECREMENT CURRENT WEARS OF OUTFIT
    setOutfitSelected(!outfitSelected);
  };

  // Your component rendering logic goes here
  return (
    <div>
      <h2>outfit</h2>
      <div
        className={outfitSelected ? "outfit-container greyed-out shrink-image" : "outfit-container"}
      >
        <img src={outfit["top"]} alt="Top" className="top-image" />
        <img src={outfit["bottom"]} alt="Bottom" className="bottom-image" />
      </div>
      {outfitSelected && (
        <img src={heartIcon} onClick={handleUnselect} className="heart-icon" alt="Heart" />
      )}
      <div>
        {!outfitSelected && (
          <img className="outfitButton" onClick={handleReject} src={rejectButton} />
        )}
        {!outfitSelected && (
          <img className="outfitButton" onClick={handleAccept} src={acceptButton} />
        )}
      </div>
    </div>
  );
};

export default Outfit;
