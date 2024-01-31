// UserContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { get } from "../utilities.js"; // Adjust the import path as necessary

import { useAuth } from "./AuthContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { userId } = useAuth();

  useEffect(() => {
    get("/api/user", { userId: userId })
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error("Failed to fetch user data: ", error);
      });
  }, [userId]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
