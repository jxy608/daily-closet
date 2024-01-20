import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

// import "./NewClothingArticle.css";
import { post, get } from "../../utilities";

const SettingsInput = (props) => {
  // GET request to database --> get current user settings based on props.userId
  const { user, setUser } = useUser();
  //   const [settingsInput, setSettingsInput] = useState(user ? { ...user } : null);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(settingsInput);
    setSettingsInput(user);
  };

  return (
    <div>
      {settingsInput ? (
        <div>
          <input
            type="text"
            placeholder={"nickname"}
            value={settingsInput.name}
            name="name"
            onChange={handleChange}
            className="NewPostInput-input"
          />
          <input
            type="number"
            placeholder={"zip code"}
            value={settingsInput.zipCode}
            name="zipCode"
            onChange={handleChange}
            className="NewPostInput-input"
          />
          <select name="tempSetting" value={settingsInput.tempSetting} onChange={handleChange}>
            <option value="imperial">fahrenheit</option>
            <option value="metric">celsius</option>
          </select>
          <button
            type="submit"
            className="NewPostInput-button u-pointer"
            value="Submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const Settings = () => {
  const { user, setUser } = useUser();

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
      <Link to={`/`}>back</Link>
      <h1>account settings</h1>
      <SettingsInput onSubmit={updateSettings} />
    </div>
  );
};

export default Settings;
