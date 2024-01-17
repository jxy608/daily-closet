import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "254434847413-q18pai458nnnouokg7804klebv7hhj39.apps.googleusercontent.com";

const Home = ({ userId, handleLogout }) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {userId ? (
        <div>
          {/* Replace this text with today's date */}
          <h1 className="u-textCenter">welcome Home ! !! ! !!</h1>
          <div>
            {/* <Link to={`/`}>back</Link> */}
            <button
              onClick={() => {
                googleLogout();
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
          <div>
            <Link to={`/closet`}>go to the closet</Link>
          </div>
        </div>
      ) : (
        <Navigate replace to="/" />
      )}
    </GoogleOAuthProvider>
  );
};

export default Home;
