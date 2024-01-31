import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import { post, get } from "../../utilities";
import BackButton from "../modules/BackButton.js";
import "./Settings.css";

const SettingsInput = (props) => {
  // GET request to database --> get current user settings based on props.userId
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const welcome_status = props.status;

  const [settingsInput, setSettingsInput] = useState({
    name: "",
    zipCode: "",
    tempSetting: "imperial", // Default value
  });
  console.log(settingsInput);

  useEffect(() => {
    if (user) {
      setSettingsInput(...user);
    }
  }, [user]);

  // called whenever the user changes one of the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettingsInput((prevSettingsInput) => ({
      ...prevSettingsInput,
      [name]: value,
    }));
  };

  const handleToggleChange = () => {
    setSettingsInput((prevSettings) => ({
      ...prevSettings,
      tempSetting: prevSettings.tempSetting === "imperial" ? "metric" : "imperial",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(settingsInput);
    setSettingsInput(user);

    if (welcome_status == "welcome") {
      navigate(`/new/welcome`);
    } else {
      navigate("/home");
    }
  };

  return (
    <div>
      {settingsInput ? (
        <div>
          <div>
            <div className="input-label">nickname</div>
            <input
              type="text"
              placeholder={"nickname"}
              value={settingsInput.name}
              name="name"
              onChange={handleChange}
              className="NewPostInput-input"
            />
          </div>
          <div className="input-label">zip code</div>
          <div>
            <input
              type="number"
              placeholder={"zip code"}
              value={settingsInput.zipCode}
              name="zipCode"
              onChange={handleChange}
              className="NewPostInput-input"
            />
          </div>
          <div className="temperature-toggle">
            <label>fahrenheit</label>
            <label className="switch">
              <input
                type="checkbox"
                checked={settingsInput.tempSetting === "metric"}
                onChange={handleToggleChange}
              />
              <span className="slider"></span>
            </label>
            <label>celsius</label>
          </div>
          <div>
            <button
              type="submit"
              className="u-button u-pointer"
              value="Submit"
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const Settings = ({ handleLogout }) => {
  const { user, setUser } = useUser();
  const welcome_status = useParams().status;

  const updateSettings = (settingsInput) => {
    const body = {
      ...settingsInput,
    };

    console.log("updating settings");
    console.log(body);
    setUser([body]);
    post("/api/user", body);
  };

  return (
    <div>
      <div className="settings-header">
      {welcome_status === "welcome" ? (
        <></>
      ) : (
        <BackButton redirect={"home"} />
      )}
        
        <h2>account settings</h2>
      </div>
      <div className="settingsContainer">
        <SettingsInput onSubmit={updateSettings} status={welcome_status} />
        <button
          className="Logout-button"
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          log out
        </button>
      </div>
    </div>
  );
};

export default Settings;
