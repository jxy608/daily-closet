import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./EditClothingArticle.css";
import { post, get } from "../../utilities";
import BackButton from "../modules/BackButton.js";

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
  };
  const [clothingInput, setClothingInput] = useState(defaultClothingInput);

  useEffect(() => {
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
    const { userId, image, name, type, color, max_wears, tags, min_temp, max_temp } =
      clothingArticle;

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
      <h1 className="u-textCenter">Clothing Article #{index}</h1>
      {clothingInput.image ? (
        <img
          src={clothingInput.image}
          alt="loading clothing image..."
          width="100"
          className="my-10 mx-5"
        />
      ) : (
        <></>
      )}
      <div className="u-flex">
        <div>
          <input
            type="text"
            placeholder={"Clothing Nickname"}
            value={clothingInput.name}
            name="name"
            onChange={handleChange}
            className="NewPostInput-input"
          />
          <input
            type="text"
            placeholder={"Color"}
            name="color"
            value={clothingInput.color}
            onChange={handleChange}
            className="NewPostInput-input"
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
            name="num_wears"
            value={clothingInput.num_wears}
            onChange={handleChange}
            className="NewPostInput-input"
          />
          <input
            type="number"
            placeholder={"min temp"}
            name="min_temp"
            value={clothingInput.min_temp}
            onChange={handleChange}
            className="NewPostInput-input"
          />
          <input
            type="number"
            placeholder={"max temp"}
            name="max_temp"
            value={clothingInput.max_temp}
            onChange={handleChange}
            className="NewPostInput-input"
          />
          {index > 0 ? <button onClick={handlePrevArticle}>Previous</button> : <></>}
          {index < clothingIds.length - 1 ? (
            <button onClick={handleNextArticle}>Next</button>
          ) : (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditClothingArticle;
