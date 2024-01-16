import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Closet = (props) => {
  return (
    <div>
      <h1 className="u-textCenter">hello welcome to the closet</h1>
      <div>
        <Link to={`/home/`}>home</Link>
      </div>
    </div>
  );
};

export default Closet;
