import React from "react";
import { Link, Navigate } from "react-router-dom";

import "../../utilities.css";
import "./NewClothingCard.css";

import plusButton from "../../../assets/plus-button.svg";

const NewClothingCard = (props) => {
  const title = props.title;
  let type = title;
  switch (title) {
    case "tops":
      type = "top";
      break;
    case "bottoms":
      type = "bottom";
      break;
    case "shoes":
      type = "shoe";
      break;
    case "accessories":
      type = "accessory";
      break;
    case "one pieces":
      type = "one piece";
      break;
  }

  return (
    <Link to={`/new/${type}`} className="NewClothingCard">
      <img src={plusButton} />
    </Link>
  );
};

export default NewClothingCard;
