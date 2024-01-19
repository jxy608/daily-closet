import React, { useState, useEffect } from "react";

import { useUser } from "../../contexts/UserContext";

const openWeatherKey = "50ae8eed134ab922522fd8abd9ca819e";
const limit = 1;
const countryCode = "US";
const part = "current,minutely,hourly,alerts";

const Weather = () => {
  // should add non-US country support in future

  const { user, setUser } = useUser();
  const [zipCode, setZipCode] = useState(null);
  const [units, setUnits] = useState(null);

  // State to store weather data
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (user) {
      setZipCode(user[0].zipCode);
      setUnits(user[0].tempSetting);
    }
  }, [user]);

  useEffect(() => {
    if (zipCode && units) {
      // Fetch coordinates based on zip
      fetch(
        `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${openWeatherKey}`
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
    }
  }, [zipCode, units]); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <h2>weather</h2>
      <div>
        {weatherData && zipCode && units ? (
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
    </div>
  );
};

export default Weather;
