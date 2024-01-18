import React from "react";
import { Link, Navigate } from "react-router-dom";

import "../../utilities.css";
import "./ClosetIcon.css";
import closetIcon from "../../../assets/closet-temporary.png";

const ClosetIcon = () => {
  return (
    <div>
      <Link to="/closet" className="closet-link">
        <h2>closet</h2>
        <img src={closetIcon} width="70%" height="70%" />
      </Link>
    </div>
  );
};

export default ClosetIcon;
