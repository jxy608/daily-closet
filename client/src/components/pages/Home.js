import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import ClosetIcon from "../modules/ClosetIcon.js";
import Outfit from "../modules/Outfit.js";
import Weather from "../modules/Weather.js";
import settingsButton from "../../../assets/settings-button.svg";
import floor from "../../../assets/floor.svg";

import "../../utilities.css";
import "./Home.css";

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
          <Outfit />
        </div>
        <div className="Home-subContainer u-textCenter">
          <Weather />
        </div>
      </div>
      <div>
        <img className="floor" src={floor} />
      </div>
      <div className="settings-button">
        <Link to={`/settings/`}>
          <img src={settingsButton} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
