import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import "../../utilities.css";
import "./Welcome.css";

const Welcome = ({ userId, handleLogout }) => {
  return (
    <div>
      <h1 className="u-textCenter">
        Welcome to Daily Closet!
      </h1>
      <div>
        <Link to={`/new/`} className="button-link">New Clothing Article</Link>
      </div>
    </div>
  );
};

export default Welcome;
