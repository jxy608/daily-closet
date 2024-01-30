import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import "../../utilities.css";
import "./ClosetIcon.css";
import closetClosed from "../../../assets/closet-closed.png";
import closetOpen from "../../../assets/closet-open.png";

const ClosetIcon = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <Link to="/closet" className="closet-link">
        <h2>closet</h2>
        <img
          className="closet-icon"
          src={isHovered ? closetOpen : closetClosed}
          width="100%"
          height="100%"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {/* <div className="closet-icon"></div> */}
      </Link>
    </div>
  );
};

export default ClosetIcon;
