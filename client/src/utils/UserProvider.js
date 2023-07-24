import React, { createContext, useContext, useState, useEffect } from "react";

// Create a User context
const UserContext = createContext();

// Create a custom hook to use the UserContext, this is a best practice
export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // start with no user
  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    console.log(savedUserId);
    if (savedUserId) {
      setUserId(savedUserId);
    }
  }, []);
  const login = (userId) => {
    setUserId(userId);
    localStorage.setItem("userId", JSON.stringify(userId));
  };

  const logout = () => {
    setUserId(null);
    localStorage.removeItem("userId");
  };
  const value = {
    userId,
    setUserId,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
