import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import "./NewClothingArticle.css";
import { post, get } from "../../utilities";

const SettingsInput = (props) => {
  // GET request to database --> get current user settings based on props.userId
  const [currentUser, setCurrentUser] = useState(null);
  const [settingsInput, setSettingsInput] = useState(null);
  console.log(props);

  useEffect(() => {
    get("/api/user", { userId: props.userId }).then((currentUserSettings) => {
      setCurrentUser(currentUserSettings);
      console.log(currentUserSettings);

      const defaultSettingsInput = {
        ...currentUser,
      };
      setSettingsInput(currentUser);
    });
  }, []);

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
    setSettingsInput(currentUser);
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

const Settings = (props) => {
  const updateSettings = (settingsInput) => {
    const settings = {
      ...settingsInput,
    };

    console.log("updating settings");
    console.log(settings);
    // POST REQUEST HERE
    // post("/api/clothingarticle", body);
    post("/api/user", settings);
  };
  return (
    <div>
      <Link to={`/`}>back</Link>
      <h1>account settings</h1>
      <SettingsInput onSubmit={updateSettings} userId={props.userId} />
    </div>
  );
};

export default Settings;
