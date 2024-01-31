import React from "react";
import { Link, Navigate } from "react-router-dom";

import "../../utilities.css";
import "./ClothingCard.css";

import plusButton from "../../../assets/plus-button.svg";

const ClothingCard = (props) => {
  return (
    <Link to={`/edit/${props.category}/false/${props.id}`} className="ClothingCard">
      <img src={props.image} alt="Clothing Image" />
      {/* <div className="CardContent">
        {props.name}: {props.color} {props.category}, wearable {props.max_wears} times
      </div> */}
    </Link>
  );
};

export default ClothingCard;
