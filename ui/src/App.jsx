import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

const App = () => {
  const isAuthenticated = () => !!sessionStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/main" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/main"
          element={isAuthenticated ? <Main /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
