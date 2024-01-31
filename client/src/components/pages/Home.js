import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import ClosetIcon from "../modules/ClosetIcon.js";
import Outfit from "../modules/Outfit.js";
import Weather from "../modules/Weather.js";
import Laundry from "../modules/Laundry.js";
import settingsButton from "../../../assets/settings-button.svg";
import floor from "../../../assets/floor.svg";
import plant from "../../../assets/plant.svg";
import backpack from "../../../assets/backpack.svg";

import "../../utilities.css";
import { get } from "../../utilities";
import "./Home.css";

import { useUser } from "../../contexts/UserContext";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "254434847413-q18pai458nnnouokg7804klebv7hhj39.apps.googleusercontent.com";

const Home = ({ userId, handleLogout }) => {
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  const d = new Date();

  const { user, setUser } = useUser();
  const [zipCode, setZipCode] = useState(null);
  const [units, setUnits] = useState(null);

  // State to store weather data
  // should add non-US country support in future
  const [weatherData, setWeatherData] = useState(null);

  const [triggerLaundryUpdate, setTriggerLaundryUpdate] = useState(false);

  const handleOutfitButtonClick = () => {
    setTriggerLaundryUpdate(true);
  };

  useEffect(() => {
    if (user) {
      setZipCode(user[0].zipCode);
      setUnits(user[0].tempSetting);
    }
  }, [user]);

  useEffect(() => {
    if (zipCode && units) {
      // Fetch coordinates based on zip
      // get("/api/weather", { zipCode: zipCode, units: units }).then((data) => {
      //   console.log(data);
      //   setWeatherData(data);
      // });
      let tempWeather = {
        lat: 33.44,
        lon: -94.04,
        timezone: "America/Chicago",
        timezone_offset: -18000,
        current: {
          dt: 1684929490,
          sunrise: 1684926645,
          sunset: 1684977332,
          temp: 292.55,
          feels_like: 292.87,
          pressure: 1014,
          humidity: 89,
          dew_point: 290.69,
          uvi: 0.16,
          clouds: 53,
          visibility: 10000,
          wind_speed: 3.13,
          wind_deg: 93,
          wind_gust: 6.71,
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "broken clouds",
              icon: "04d",
            },
          ],
        },
        daily: [
          {
            dt: 1684951200,
            sunrise: 1684926645,
            sunset: 1684977332,
            moonrise: 1684941060,
            moonset: 1684905480,
            moon_phase: 0.16,
            summary: "Expect a day of partly cloudy with rain",
            temp: {
              day: 299.03,
              min: 55,
              max: 80,
              night: 291.45,
              eve: 297.51,
              morn: 292.55,
            },
            feels_like: {
              day: 299.21,
              night: 291.37,
              eve: 297.86,
              morn: 292.87,
            },
            pressure: 1016,
            humidity: 59,
            dew_point: 290.48,
            wind_speed: 3.98,
            wind_deg: 76,
            wind_gust: 8.92,
            weather: [
              {
                id: 500,
                main: "Rain",
                description: "light rain",
                icon: "10d",
              },
            ],
            clouds: 92,
            pop: 0.47,
            rain: 0.15,
            uvi: 9.23,
          },
        ],
        alerts: [
          {
            sender_name:
              "NWS Philadelphia - Mount Holly (New Jersey, Delaware, Southeastern Pennsylvania)",
            event: "Small Craft Advisory",
            start: 1684952747,
            end: 1684988747,
            description:
              "...SMALL CRAFT ADVISORY REMAINS IN EFFECT FROM 5 PM THIS\nAFTERNOON TO 3 AM EST FRIDAY...\n* WHAT...North winds 15 to 20 kt with gusts up to 25 kt and seas\n3 to 5 ft expected.\n* WHERE...Coastal waters from Little Egg Inlet to Great Egg\nInlet NJ out 20 nm, Coastal waters from Great Egg Inlet to\nCape May NJ out 20 nm and Coastal waters from Manasquan Inlet\nto Little Egg Inlet NJ out 20 nm.\n* WHEN...From 5 PM this afternoon to 3 AM EST Friday.\n* IMPACTS...Conditions will be hazardous to small craft.",
            tags: [],
          },
        ],
      };
      setWeatherData(tempWeather);
    }
  }, [zipCode, units]);

  return (
    <div>
      <h1 className="u-textCenter">
        {days[d.getDay()]}, {months[d.getMonth()]} {d.getDate()}
      </h1>
      <div className="u-flex">
        <div className="Home-subContainer u-textCenter">
          <ClosetIcon />
        </div>
        <div className="Home-subContainer u-textCenter">
          <Outfit
            weatherData={weatherData}
            onButtonClick={handleOutfitButtonClick}
            tempSetting={units}
          />
        </div>
        <div className="Home-subContainer u-textCenter">
          <Weather weatherData={weatherData} />
          <Laundry
            triggerUpdate={triggerLaundryUpdate}
            setTriggerUpdate={setTriggerLaundryUpdate}
            onButtonClick={handleOutfitButtonClick}
          />
        </div>
      </div>
      <img className="floor" src={floor} />
      <img className="plant" src={plant} />
      <img className="backpack" src={backpack} />
      <div className="settings-button">
        <Link to={`/settings/`}>
          <img src={settingsButton} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
