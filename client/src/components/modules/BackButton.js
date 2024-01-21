import React from "react";
import backButton from "../../../assets/back-button.svg";
import { Link, Navigate } from "react-router-dom";

import "./BackButton.css";

const BackButton = (props) => {
  return (
    <div className="back-button">
      <Link to={`/${props.redirect}`}>
        <img src={backButton} />
      </Link>
    </div>
  );
};

export default BackButton;
