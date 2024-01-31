import React, { useState, useEffect } from "react";

import "./Weather.css";
import "../../utilities.css";

// I shoudl probably have put these in the public file
import cloudy from "../../../assets/cloudy.svg";
import sunny from "../../../assets/sunny.svg";
import misty from "../../../assets/misty.svg";
import rainy from "../../../assets/rainy.svg";
import stormy from "../../../assets/stormy.svg";
import snowy from "../../../assets/snowy.svg";

const Weather = (props) => {
  const getWeatherCondition = (condition, description, getImage = false) => {
    switch (condition) {
      case "Clear":
        if (getImage) {
          return sunny;
        } else {
          return "sunny";
        }
      case "Clouds":
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
      {props.weatherData && props.weatherData.daily ? (
        <div
          className="weather-container"
          style={{
            backgroundImage: `url(${getWeatherCondition(
              props.weatherData.daily[0].weather[0].main,
              props.weatherData.daily[0].weather[0].description,
              true
            )})`,
          }}
        >
          <div className="weather-text">
            <p>
              {getWeatherCondition(
                props.weatherData.daily[0].weather[0].main,
                props.weatherData.daily[0].weather[0].description
              )}
            </p>
            <p>
              {props.weatherData.daily[0].temp.max.toFixed(0)}° /{" "}
              {props.weatherData.daily[0].temp.min.toFixed(0)}°
            </p>
          </div>
        </div>
      ) : (
        <div
          className="weather-container"
          style={{
            backgroundImage: `url(${cloudy})`,
          }}
        >
          <div className="weather-text">
            <p>Loading weather data...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
