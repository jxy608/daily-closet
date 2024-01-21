import React, { useState, useEffect } from "react";

import { useUser } from "../../contexts/UserContext";

import "./Weather.css";
import "../../utilities.css";

const openWeatherKey = "50ae8eed134ab922522fd8abd9ca819e";
const limit = 1;
const countryCode = "US";
const part = "current,minutely,hourly,alerts";

// I shoudl probably have put these in the public file
import cloudy from "../../../assets/cloudy.svg";
import sunny from "../../../assets/sunny.svg";
import misty from "../../../assets/misty.svg";
import rainy from "../../../assets/rainy.svg";
import stormy from "../../../assets/stormy.svg";
import snowy from "../../../assets/snowy.svg";

const Weather = () => {
  // should add non-US country support in future

  const { user, setUser } = useUser();
  const [zipCode, setZipCode] = useState(null);
  const [units, setUnits] = useState(null);

  // State to store weather data
  const [weatherData, setWeatherData] = useState(null);
  const [weatherType, setWeatherType] = useState(null);

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

  const getWeatherCondition = (condition, description, getImage = false) => {
    switch (condition) {
      case "Clear":
        if (getImage) {
          return sunny;
        } else {
          return "sunny";
        }
      case "Clouds":
        console.log(description);
        if (description == "few clouds") {
          if (getImage) {
            return sunny;
          } else {
            return "sunny";
          }
        } else {
          if (getImage) {
            return cloudy;
          } else {
            return "cloudy";
          }
        }
      case "Drizzle":
      case "Rain":
        if (getImage) {
          return rainy;
        } else {
          return "rainy";
        }
      case "Thunderstorm":
        if (getImage) {
          return stormy;
        } else {
          return "stormy";
        }
      case "Snow":
        if (getImage) {
          return snowy;
        } else {
          return "snowy";
        }
      default:
        if (getImage) {
          return misty;
        } else {
          return "misty";
        }
    }
  };

  return (
    <div className="u-flex u-flex-justifyCenter">
      {weatherData && zipCode && units ? (
        <div
          className="weather-container"
          style={{
            backgroundImage: `url(${getWeatherCondition(
              weatherData.daily[0].weather[0].main,
              weatherData.daily[0].weather[0].description,
              true
            )})`,
          }}
        >
          <div className="weather-text">
            <p>
              {getWeatherCondition(
                weatherData.daily[0].weather[0].main,
                weatherData.daily[0].weather[0].description
              )}
            </p>
            <p>
              {weatherData.daily[0].temp.max.toFixed(0)}° /{" "}
              {weatherData.daily[0].temp.min.toFixed(0)}°
            </p>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
