import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext.js";

import "./EditClothingArticle.css";
import { post, get } from "../../utilities";
import BackButton from "../modules/BackButton.js";
import PrevButton from "../../../assets/prev.svg";
import PrevButtonDisabled from "../../../assets/prev_disabled.svg";
import NextButton from "../../../assets/next.svg";
import NextButtonDisabled from "../../../assets/next_disabled.svg";

const EditClothingArticle = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const clothingParams = useParams();
  const clothingIds = clothingParams.clothingIds.split(",");
  const [index, setIndex] = useState(0);
  const [imperial, setImperial] = useState(true);

  const defaultClothingInput = {
    userId: "",
    image: "",
    name: "",
    type: "top",
    color: "",
    max_wears: NaN,
    current_wears: 0,
    tags: [],
    min_temp: NaN,
    max_temp: NaN,
  };
  const [clothingInput, setClothingInput] = useState(defaultClothingInput);

  useEffect(() => {
    console.log("cltohing input", clothingInput);
    if (clothingInput.name === "") {
      document.getElementById("title").focus();
    }
  }, [clothingInput]);

  useEffect(() => {
    if (user && user[0].tempSetting == "imperial") {
      setImperial(true);
    } else if (user && user[0].tempSetting == "metric") {
      setImperial(false);
    }

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
      } catch (error) {
        console.error("Error fetching clothing article:", error);
      }
    };

    loadClothingArticle();
  }, [clothingParams, index]);

  // called whenever the user changes one of the inputs
  const handleChange = (e) => {
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
    const { userId, image, name, type, color, max_wears, current_wears, tags, min_temp, max_temp } =
      clothingArticle;

    return {
      userId,
      image,
      name,
      type,
      color,
      max_wears,
      current_wears,
      tags,
      min_temp,
      max_temp,
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
    navigate("/closet");
  };

  return (
    <div>
      <BackButton redirect="closet" />

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

        {index < clothingIds.length - 1 ? (
          <div style={{ height: "5vh", width: "8vw", visibility: "hidden" }}></div>
        ) : (
          <button onClick={handleSubmit} className="u-button">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default EditClothingArticle;
