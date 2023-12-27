import React, { createContext, useContext, useState } from "react";

const IdContext = createContext();

export const IdProvider = ({ children }) => {
  const [id, setId] = useState(null);

  const setContextId = (newId) => {
    setId(newId);
  };

  return (
    <IdContext.Provider value={{ id, setContextId }}>
      {children}
    </IdContext.Provider>
  );
};

export const useId = () => {
  return useContext(IdContext);
};
