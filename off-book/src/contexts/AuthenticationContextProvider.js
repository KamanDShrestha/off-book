import { createContext } from 'react';

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';

const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isInHome, setIsInHome] = useState(false);
  return (
    <AuthenticationContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isInHome,
        setIsInHome,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export function useAuthenticationContext() {
  const context = useContext(AuthenticationContext);
  return context;
}

export default AuthenticationContextProvider;
