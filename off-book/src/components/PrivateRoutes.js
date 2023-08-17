//protecting from unauthorized access to that element

import React from 'react';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const userInfo = localStorage.getItem('userInfo')
    ? getFromLocalStorage('userInfo')
    : '';

  return userInfo ? <Outlet /> : Navigate({ to: '/login', replace: true });
};

export default PrivateRoutes;
