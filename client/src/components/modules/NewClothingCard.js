import React from "react";
import { Link, Navigate } from "react-router-dom";

import "../../utilities.css";
import "./NewClothingCard.css";

import plusButton from "../../../assets/plus-button.svg";

const NewClothingCard = () => {
  return (
    <Link to="/new" className="NewClothingCard">
      <img src={plusButton} />
    </Link>
  );
};

export default NewClothingCard;
