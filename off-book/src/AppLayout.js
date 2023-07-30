import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useAuthenticationContext } from './contexts/AuthenticationContextProvider';

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default AppLayout;
