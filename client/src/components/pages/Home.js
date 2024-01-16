import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div>
      <h1>Home ! !! ! !!</h1>
      <div>
        <Link to={`/`}>back</Link>
      </div>
      <div>
        <Link to={`/closet`}>go to the closet</Link>
      </div>
    </div>
  );
};

export default Home;
