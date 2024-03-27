import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Main from "./pages/Main";

const App = () => {
  const isAuthenticated = !!sessionStorage.getItem("token");

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute
          path="/main"
          component={Main}
          isAuthenticated={isAuthenticated}
        />
      </Switch>
    </Router>
  );
};

export default App;
