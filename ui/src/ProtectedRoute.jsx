import React from "react";
import { Route, Navigate } from "react-router";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!sessionStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Navigate to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
