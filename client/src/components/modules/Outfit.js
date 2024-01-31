import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { get, post } from "../../utilities";

import "./Outfit.css";
import "../../utilities.css";
import acceptButton from "../../../assets/accept.svg";
import rejectButton from "../../../assets/reject.svg";
import heartIcon from "../../../assets/heart.svg";

const Outfit = (props) => {
  const [outfit, setOutfit] = useState({});
  // TODO: HOW TO MAINTAIN OUTFIT SELECTED STATE?
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

  const handleReject = () => {
    // TODO: INCREMENT REJECTIONS OF OUTFIT
    const outfitIds = [outfit["top"]._id, outfit["bottom"]._id];
    post("/api/updateRejections", { ids: outfitIds, updateValue: 1 });

    // Clear outfit data from local storage
    const currentDate = new Date().toLocaleDateString();
    localStorage.removeItem(`outfit-${userId}-${currentDate}`);

    // Manually trigger the update and re-render
    updateOutfit();
  };

  const handleRefresh = () => {
    // Clear outfit data from local storage
    const currentDate = new Date().toLocaleDateString();
    localStorage.removeItem(`outfit-${userId}-${currentDate}`);

    // Manually trigger the update and re-render
    updateOutfit();
  };

  const handleAccept = () => {
    // TODO: HAVE SOME INDICATION OF WHEN TO PUT CLOTHES IN THE LAUNDRY
    setOutfitSelected(!outfitSelected);

    const outfitIds = [outfit["top"]._id, outfit["bottom"]._id];
    post("/api/updateWears", { ids: outfitIds, updateValue: 1 });
    post("/api/updateRejections", { ids: outfitIds, updateValue: -1 });
  };

  const handleUnselect = () => {
    setOutfitSelected(!outfitSelected);

    const outfitIds = [outfit["top"]._id, outfit["bottom"]._id];
    post("/api/updateWears", { ids: outfitIds, updateValue: -1 });
  };

  // Your component rendering logic goes here
  return (
    <div>
      <h2>outfit</h2>
      {outfit["top"] && outfit["bottom"] ? (
        <div>
          <div
            className={
              outfitSelected ? "outfit-container greyed-out shrink-image" : "outfit-container"
            }
          >
            <img src={outfit["top"].image} alt="Top" className="top-image" />
            <img src={outfit["bottom"].image} alt="Bottom" className="bottom-image" />
          </div>
          {outfitSelected && (
            <img src={heartIcon} onClick={handleUnselect} className="heart-icon" alt="Heart" />
          )}
          <div>
            {!outfitSelected && (
              <div className="outfitButtonContainer">
                <img className="outfitButton" onClick={handleReject} src={rejectButton} />
                <img className="outfitButton" onClick={handleAccept} src={acceptButton} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          No clothes found for the temperature outside!
          <button onClick={handleRefresh}>refresh</button>
        </div>
      )}
    </div>
  );
};

export default Outfit;
