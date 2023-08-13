import { createContext } from 'react';

import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';

const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isInHome, setIsInHome] = useState(false);

  const [userInfo, setUserInfo] = useState(
    localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : []
  );
  return (
    <AuthenticationContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isInHome,
        setIsInHome,
        userInfo,
        setUserInfo,
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
