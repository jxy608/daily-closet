import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { post } from "../../utilities";
import BackButton from "../modules/BackButton.js";

const EditClothingArticleInput = (props) => {
  const clothingInputs = props.clothingInputs;

  // called whenever the user changes one of the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClothingInput((prevClothingInput) => ({
    ...prevClothingInput,
    [name]: value,
    }));
  };

  // called when the user hits "Submit" for a new clothing article
  const handleSubmit = (event) => {
    event.preventDefault();

    props.onSubmit && props.onSubmit(clothingInput);
    // Reset clothing input to default. can probably make a variable for default clothing input but im too lazy rn
    setClothingInput(defaultClothingInput);
    setImage(defaultImage);
  };

  // const submitPhoto = async () => {
  //   let formData = new FormData();
  //   await formData.append('image', image.raw);
  //   await axios
  //     .post(`http://localhost:3000/upload`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then((res) => {
  //       return res.data;
  //     });
  // }

  const submitPhoto = async () => {
    try {
      console.log("image data: ", image.raw);
    
      let formData = new FormData();
      formData.append('userId', props.userId);
      formData.append('image', image.raw);
      console.log("form data: ", Array.from(formData.entries()));
  
      const response = await axios.post(`http://localhost:3000/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Use the data from the response
      console.log(response.data[0]);
      clothingInput.image = response.data[0];

      setImage({
        ...image,
        status: "Resubmit photo",
      })
  
      return response.data;
    } catch (error) {
      console.error('Error submitting photo:', error);
      // Handle the error appropriately
      throw error;
    }
  };

  return (
    <div>
      <BackButton redirect="closet" />
      <h1 className="u-textCenter">add new clothing article</h1>
      <div className="u-flex">
        <div>
          <input
            name="image"
            type="file"
            id="upload-button"
            onChange={handleChange}
          />

          <label htmlFor="upload-button">
            {image.preview ? (
              <img
                src={image.preview}
                alt="dummy"
                width="100"
                className="my-10 mx-5"
              />
            ) : (
              <>
              </>
            )}
          </label>

          <button
            type="button"
            onClick={submitPhoto}
            className="text-white w-full mt-2 border-[1px]
             p-2 border-[#3d4f7c] rounded-full cursor-pointer "
          >
            {image.status}
          </button>

        </div>
        
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
          <button
            type="submit"
            className="NewPostInput-button u-pointer"
            value="Submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const EditClothingArticle = (props) => {
  const editClothing = (clothingInput) => {
    const body = {
      ...clothingInput,
      userId: props.userId,
      current_wears: 0,
    };
    // const body = { name: value };
    console.log("posting new clothing article", body);
    post("/api/clothingarticle", body);
  };

  return (
    <EditClothingArticleInput
      defaultText="Edit Clothing Article"
      onSubmit={editClothing}
      userId={props.userId}
    />
  );
};

export default EditClothingArticle;
