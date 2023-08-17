import React from 'react';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import { Outlet, Navigate } from 'react-router-dom';
const AdminRoutes = () => {
  const userInfo = localStorage.getItem('userInfo')
    ? getFromLocalStorage('userInfo')
    : '';
  const isAdmin = userInfo ? (userInfo.role === 'admin' ? true : false) : false;
  return isAdmin ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default AdminRoutes;
