// React
import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

// General
import AppRoute from "../layout/AppRoute";
import MainLayout from "../layout/MainLayout";
import Home from "../Home";

// Admin
import Login from "../Login";

// Agent
import SignUp from "../SignUp";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <AppRoute exact path="/" layout={MainLayout} component={Home} />
          <AppRoute exact path="/login" layout={MainLayout} component={Login} />
          <AppRoute
            exact
            path="/signup"
            layout={MainLayout}
            component={SignUp}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
