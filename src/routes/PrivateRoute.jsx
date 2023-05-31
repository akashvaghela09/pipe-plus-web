import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {
  const { authStatus } = useSelector((state) => state.auth);

  if (!authStatus) {
    return <Navigate to="/signin" />;
  }

  return children;
};
