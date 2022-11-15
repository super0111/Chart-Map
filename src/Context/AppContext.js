import React, { useState, createContext } from 'react';

const Context = createContext();

const AppProvider = ({children}) => {

const [ drawOpen, setDrawOpen ] = useState(true);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Context.Provider 
      value={{
        drawOpen, setDrawOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { AppProvider, Context };