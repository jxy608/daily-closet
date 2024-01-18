import React, { useState, useEffect } from "react";

const openWeatherKey = "50ae8eed134ab922522fd8abd9ca819e";
const limit = 1;
const countryCode = "US";
const part = "current,minutely,hourly,alerts";
// API call for coords:
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// or http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}

// Weather API call using coords:
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// exclude: current
// minutely
// hourly
// daily
// alerts

const Weather = () => {
  // Hardcoding it in for now, but should retrieve this from somewhere / pass in as a prop or smth. idk
  const zip = "02139";
  const units = "imperial"; // imperial for F, metric for C. should also retrieve from props

  // State to store weather data
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch coordinates based on zip
    fetch(
      `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countryCode}&appid=${openWeatherKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const lat = data.lat;
        const lon = data.lon;
        // Fetch weather data using coordinates
        return fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${openWeatherKey}&units=${units}`
        );
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data); // Set the weather data in state
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      });
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <h2>weather</h2>
      {weatherData ? (
        <div>
          {weatherData ? (
            <div>
              <p>{weatherData.daily[0].weather[0].main}</p>
              <p>
                {weatherData.daily[0].temp.max.toFixed(0)}° /{" "}
                {weatherData.daily[0].temp.min.toFixed(0)}°
              </p>
            </div>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
