import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import "./NewClothingArticle.css";
import { post } from "../../utilities";

const NewClothingArticleInput = (props) => {
  //   const [value, setValue] = useState("");
  const defaultClothingInput = {
    userId: props.userId,
    name: "",
    type: "",
    color: "",
    num_wears: NaN,
    tags: [],

    // TODO: Should probably throw some kind of error if min_temp > max_temp
    // Another option is to only have temps > min_temp as selectable options for max temp and vice versa
    min_temp: NaN,
    max_temp: NaN,
  };

  const [clothingInput, setClothingInput] = useState(defaultClothingInput);

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
  };

  //   // called whenever the user types in the new post input box
  //   const handleChange = (event) => {
  //     setValue(event.target.value);
  //   };

  //   // called when the user hits "Submit" for a new post
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     props.onSubmit && props.onSubmit(value);
  //     setValue("");
  //   };

  return (
    <div>
      <h1 className="u-textCenter">add new clothing article</h1>
      <div>
        <Link to={`/closet`}>back</Link>
      </div>
      <div className="u-flex">
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
  );
};

const NewClothingArticle = (props) => {
  const addClothing = (clothingInput) => {
    const body = {
      ...clothingInput,
      userId: props.userId,
    };
    // const body = { name: value };
    console.log("posting new clothing article");
    post("/api/clothingarticle", body);
  };

  return (
    <NewClothingArticleInput
      defaultText="New Clothing Article"
      onSubmit={addClothing}
      userId={props.userId}
    />
  );
};

export default NewClothingArticle;
