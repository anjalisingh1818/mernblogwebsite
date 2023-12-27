import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState(null);

  const setContextUserId = (newId) => {
    setId(newId);
  };
  

  return (
    <UserContext.Provider value={{ id, setContextUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserId = () => {
  return useContext(UserContext);
};
