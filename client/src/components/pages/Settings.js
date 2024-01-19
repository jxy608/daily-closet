import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

// import "./NewClothingArticle.css";
import { post, get } from "../../utilities";

const SettingsInput = (props) => {
  // GET request to database --> get current user settings based on props.userId
  const { user, setUser } = useUser();
  const [settingsInput, setSettingsInput] = useState(user ? { ...user } : null);
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
    // setSettingsInput(currentUser);
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
      <SettingsInput onSubmit={updateSettings} userId={props.userId} />
    </div>
  );
};

export default Settings;
