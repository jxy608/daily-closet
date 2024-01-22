import React from "react";
import { Link, Navigate } from "react-router-dom";

import "../../utilities.css";
import "./ClothingCard.css";

import plusButton from "../../../assets/plus-button.svg";

const ClothingCard = (props) => {
  console.log(props);
  return (
    <Link to="/new" className="ClothingCard">
      {/* Replace this with the image of the clothes from props */}
      {/* <img src={plusButton} /> */}
      {props.name}: {props.color} {props.category}, wearable {props.max_wears} times
    </Link>
  );
};

export default ClothingCard;
