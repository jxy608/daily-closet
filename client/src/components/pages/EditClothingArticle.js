import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext.js";

import "./EditClothingArticle.css";
import { post, get } from "../../utilities";
// import BackButton from "../modules/BackButton.js";
import PrevButton from "../../../assets/prev.svg";
import PrevButtonDisabled from "../../../assets/prev_disabled.svg";
import NextButton from "../../../assets/next.svg";
import NextButtonDisabled from "../../../assets/next_disabled.svg";
import backButton from "../../../assets/back-button.svg";

const EditClothingArticle = (props) => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const clothingParams = useParams();
  const [clothingIds, setClothingIds] = useState(clothingParams.clothingIds.split(","));
  let clothingType = clothingParams.clothingType;
  if (clothingType == "welcome") {
    clothingType = "top";
  }
  const newArticle = clothingParams.newArticle;
  const [index, setIndex] = useState(0);
  const [imperial, setImperial] = useState(true);
  const [changed, setChanged] = useState(false);

  const defaultClothingInput = {
    userId: props.userId,
    image: "",
    name: "",
    type: clothingType,
    color: "",
    max_wears: null,
    current_wears: 0,
    // tags: [],
    min_temp: null,
    max_temp: null,
    current_wears: 0,
    times_rejected: 0,
  };

  const [clothingInput, setClothingInput] = useState(defaultClothingInput);

  const loadClothingArticle = async () => {
    if (clothingIds.length === 0 || index >= clothingIds.length) {
      setClothingInput(defaultClothingInput);
      return;
    }

    const currentId = clothingIds[index];

    try {
      const response = await get(`/api/clothingarticle/${currentId}`);
      console.log("fetched clothing item", response);
      setClothingInput(response);

      if (clothingInput.name === "") {
        document.getElementById("title").focus();
      }
    } catch (error) {
      console.error("Error fetching clothing article:", error);
    }
  };

  useEffect(() => {
    if (user && user[0].tempSetting == "imperial") {
      setImperial(true);
    } else if (user && user[0].tempSetting == "metric") {
      setImperial(false);
    }

    loadClothingArticle();
  }, [clothingParams, index]);

  useEffect(() => {
    if (clothingIds.length == 0 && newArticle == "true") {
      navigate(`/new/${clothingParams.clothingType}`);
    } else if (clothingIds.length == 0) {
      navigate(`/closet/${clothingParams.clothingType}`);
    }
    setIndex((prevIndex) => Math.min(prevIndex, clothingIds.length - 1));
    loadClothingArticle();
    console.log("clothing ids", clothingIds);
  }, [clothingIds]);

  // const isDefault = (input) => {
  //   console.log("default", defaultClothingInput);
  //   for (const key in defaultClothingInput) {
  //     if (key !== "image" && input[key] !== defaultClothingInput[key]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // called whenever the user changes one of the inputs
  const handleChange = (e) => {
    setChanged(true);
    const { name, value } = e.target;
    if (value !== "null") {
      let newValue = value;

      // Convert temperature if needed
      if (!imperial && (name === "min_temp" || name === "max_temp") && value) {
        newValue = (value * 9) / 5 + 32;
      }

      setClothingInput((prevClothing) => ({
        ...prevClothing,
        [name]: newValue,
      }));
    }
  };

  const handlePrevArticle = () => {
    saveEdits();
    setIndex((prevIndex) => prevIndex - 1);
  };

  const extractEditableProperties = (clothingArticle) => {
    const {
      userId,
      image,
      name,
      type,
      color,
      max_wears,
      // tags,
      min_temp,
      max_temp,
      current_wears,
      times_rejected,
    } = clothingArticle;

    return {
      userId,
      image,
      name,
      type,
      color,
      max_wears,
      current_wears,
      // tags,
      min_temp,
      max_temp,
      current_wears,
      times_rejected,
    };
  };

  const saveEdits = async () => {
    // Send the edited properties to the backend to update the clothing article
    try {
      const currentId = clothingIds[index];
      const editedProperties = extractEditableProperties(clothingInput);

      const response = await post(`/api/clothingarticle/${currentId}`, {
        editedProperties,
      });
      console.log("saved edits", response);
    } catch (error) {
      console.log("trouble saving edits");
    }
  };

  const handleNextArticle = () => {
    saveEdits();
    setIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = () => {
    saveEdits();
    console.log("clothing input is of type", clothingInput.type);
    if (clothingParams.clothingType == "welcome") {
      navigate(`/home`);
    } else {
      navigate(`/closet/${clothingType}`);
    }
  };

  const handleBack = () => {
    if (newArticle == "false" && !changed) {
      navigate(`/closet/${clothingType}`);
    } else {
      const userConfirmed = window.confirm(
        "Are you sure you want to return? Your edits will not be saved."
      );
      if (!userConfirmed) {
        return; // If the user cancels, do nothing
      }
      if (clothingIds.length > 1 || newArticle == "true") {
        post(`/api/del/${clothingIds.join(",")}`);
      }
      if (clothingParams.clothingType == "welcome") {
        navigate(`/new/welcome`);
      } else {
        navigate(`/closet/${clothingType}`);
      }
    }
  };

  const handleDelete = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item? This action cannot be undone."
    );
    if (!userConfirmed) {
      return; // If the user cancels, do nothing
    }
    post(`/api/del/${clothingIds[index]}`);

    const updatedClothingIds = [...clothingIds];
    updatedClothingIds.splice(index, 1);
    setClothingIds(updatedClothingIds);
  };

  return (
    <div>
      <div className="back-button" onClick={handleBack} style={{ cursor: "pointer" }}>
        <img src={backButton} />
      </div>

      <div className="u-flexColumn u-flex-alignCenter" style={{ gap: "20px" }}>
        <input
          id="title"
          type="text"
          placeholder={"Clothing Nickname"}
          value={clothingInput.name}
          name="name"
          onChange={handleChange}
          className="header-input"
        />
        {clothingInput.image ? (
          <img
            src={clothingInput.image}
            alt="loading clothing image..."
            height="160"
            className="my-10 mx-5"
          />
        ) : (
          <div style={{ height: "160px", visibility: "hidden" }}></div>
        )}
        <div className="input-container">
          <div className="property-container">
            <div>color: </div>
            <input
              type="text"
              placeholder={"n/a"}
              name="color"
              value={clothingInput.color}
              onChange={handleChange}
            />
          </div>
          <div className="property-container">
            <div>clothing category: </div>
            <select name="type" value={clothingInput.type} onChange={handleChange}>
              <option value="top">top</option>
              <option value="bottom">bottom</option>
              <option value="shoes">shoes</option>
              <option value="one piece">one piece</option>
              <option value="outerwear">outerwear</option>
              <option value="accessory">accessory</option>
            </select>
          </div>
          {/* Need to add tags but idk how to do array so ignoring it for now */}
          <div className="property-container">
            <div># of wears before wash: </div>
            <input
              type="number"
              placeholder={"0"}
              name="max_wears"
              value={clothingInput.max_wears !== null ? clothingInput.max_wears : ""}
              onChange={handleChange}
              className="num-input"
            />
          </div>
          <div className="property-container">
            {imperial ? <div>temp range (°F): </div> : <div>temp range (°C): </div>}

            <input
              type="number"
              placeholder={"min"}
              name="min_temp"
              value={
                clothingInput.min_temp !== null
                  ? imperial || !clothingInput.min_temp
                    ? clothingInput.min_temp
                    : Math.round((clothingInput.min_temp - 32) * (5 / 9))
                  : ""
              }
              onChange={handleChange}
              className="num-input"
            />
            <div>to</div>
            <input
              type="number"
              placeholder={"max"}
              name="max_temp"
              value={
                clothingInput.max_temp !== null
                  ? imperial || !clothingInput.max_temp
                    ? clothingInput.max_temp
                    : Math.round((clothingInput.max_temp - 32) * (5 / 9))
                  : ""
              }
              onChange={handleChange}
              className="num-input"
            />
          </div>
        </div>

        {clothingIds.length > 1 ? (
          <div className="control-container">
            {index > 0 ? (
              <img onClick={handlePrevArticle} src={PrevButton} style={{ cursor: "pointer" }} />
            ) : (
              <img src={PrevButtonDisabled} style={{ cursor: "not-allowed" }} />
            )}
            <div>
              {index + 1} of {clothingIds.length}
            </div>
            {index < clothingIds.length - 1 ? (
              <img onClick={handleNextArticle} src={NextButton} style={{ cursor: "pointer" }} />
            ) : (
              <img src={NextButtonDisabled} style={{ cursor: "not-allowed" }} />
            )}
          </div>
        ) : (
          <></>
        )}

        {index < clothingIds.length - 1 ? (
          <button onClick={handleDelete} className="u-button">
            Delete
          </button>
        ) : (
          <div>
            <button onClick={handleDelete} className="u-button">
              Delete
            </button>
            <button onClick={handleSubmit} className="u-button">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditClothingArticle;
