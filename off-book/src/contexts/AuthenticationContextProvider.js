import { createContext, useEffect } from 'react';

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

  useEffect(() => {
    // window.addEventListener('storage', (event) => {
    //   if (event.key === 'userInfo') {
    //     console.log('Userinfo has been added');
    //     setUserInfo(() => JSON.parse(localStorage.getItem('userInfo')));
    //   }
    // });
    console.log('checking if it running');
    const storageEventListener = (event) => {
      if (event.key === 'userInfo') {
        console.log('Userinfo has been added');
        setUserInfo(JSON.parse(event.newValue));
      }
    };

    window.addEventListener('storage', storageEventListener);

    return () => {
      window.removeEventListener('storage', storageEventListener);
    };
  }, []);

  console.log('in Authentication Provider', userInfo);

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
