import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./EditClothingArticle.css";
import { post, get } from "../../utilities";
import BackButton from "../modules/BackButton.js";
import PrevButton from "../../../assets/prev.svg";
import PrevButtonDisabled from "../../../assets/prev_disabled.svg";
import NextButton from "../../../assets/next.svg";
import NextButtonDisabled from "../../../assets/next_disabled.svg";

const EditClothingArticle = () => {
  const navigate = useNavigate();

  const clothingParams = useParams();
  const clothingIds = clothingParams.clothingIds.split(",");
  const [index, setIndex] = useState(0);

  const defaultClothingInput = {
    userId: "",
    image: "",
    name: "",
    type: "top",
    color: "",
    max_wears: NaN,
    tags: [],
    min_temp: NaN,
    max_temp: NaN,
    current_wears: 0,
    times_rejected: 0,
  };
  const [clothingInput, setClothingInput] = useState(defaultClothingInput);

  useEffect(() => {
    document.getElementById("title").focus();
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
    setClothingInput((prevClothing) => ({
      ...prevClothing,
      [name]: value,
    }));
  };

  const handlePrevArticle = () => {
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
      tags,
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
      tags,
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
    navigate("/closet");
  };

  return (
    <div>
      <BackButton redirect="closet" />

      <div className="u-flexColumn u-flex-alignCenter" style={{gap: '20px'}}>
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
          <></>
        )}
        <div className="input-container">
          <input
            type="text"
            placeholder={"Color"}
            name="color"
            value={clothingInput.color}
            onChange={handleChange}
          />
          <select name="type" value={clothingInput.type} onChange={handleChange}>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="shoes">Shoes</option>
            <option value="one piece">One Piece</option>
            <option value="outerwear">Outerwear</option>
            <option value="accessory">Accessory</option>
          </select>
          {/* Need to add tags but idk how to do array so ignoring it for now */}
          <input
            type="number"
            placeholder={"# of wears before wash"}
            name="max_wears"
            value={clothingInput.max_wears}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder={"min temp"}
            name="min_temp"
            value={clothingInput.min_temp}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder={"max temp"}
            name="max_temp"
            value={clothingInput.max_temp}
            onChange={handleChange}
          />
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
