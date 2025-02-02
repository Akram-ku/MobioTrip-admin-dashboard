import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginContext } from "../App";

const PrivateRoute = () => {
  const [loggedIn] = useContext(LoginContext);

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
