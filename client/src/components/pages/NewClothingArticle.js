import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import "./NewClothingArticle.css";
import { post } from "../../utilities";

const NewClothingArticleInput = (props) => {
  //   const [value, setValue] = useState("");
  const [clothingInput, setClothingInput] = useState({
    name: "",
    type: "",
    color: "",
    num_wears: 0,
    tags: [],

    // TODO: Should probably throw some kind of error if min_temp > max_temp
    // Another option is to only have temps > min_temp as selectable options for max temp and vice versa
    min_temp: 0,
    max_temp: 0,
  });

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
    setValue("");
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
          onChange={handleChange}
          className="NewPostInput-input"
        />
        <select>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
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
    </div>
  );
};

const NewClothingArticle = (props) => {
  const addClothing = (value) => {
    const body = { name: value };
    console.log("posting new clothing article");
    console.log(body);
    post("/api/clothingarticle", body);
    // post("/api/clothingarticle", body).then((story) => {
    //   // display this story on the screen
    //   props.addNewStory(story);
    // });
  };

  return <NewClothingArticleInput defaultText="New Clothing Article" onSubmit={addClothing} />;
};

export default NewClothingArticle;
