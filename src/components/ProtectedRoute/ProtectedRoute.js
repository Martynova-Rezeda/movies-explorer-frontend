import React from "react";
import { Navigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const ProtectedRoute = ({
  element: Component,
  isLoggedIn,
  isTokenChecked,
  ...props
}) => {
  if (!isTokenChecked) return <Preloader />;
  return isLoggedIn ? <Component {...props} /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
