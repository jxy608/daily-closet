import React from "react";
import { Link, Navigate } from "react-router-dom";

const ClosetIcon = () => {
  return (
    <div>
      <h2>closet</h2>
      <p>
        <Link to={`/closet`}>go to the closet</Link>
      </p>
    </div>
  );
};

export default ClosetIcon;
