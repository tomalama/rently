// React
import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import AppRoute from "../AppRoute";

import AppContainer from "../AppContainer";
// General
import Home from "../../components/Home";

// Admin
import Login from "../../components/Login";

// Agent
import SignUp from "../../components/SignUp";

import "./style.scss";

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <AppRoute exact path="/" layout={AppContainer} component={Home} />
          <AppRoute exact path="/login" layout={AppContainer} component={Login} />
          <AppRoute exact path="/signup" layout={AppContainer} component={SignUp} />
        </Switch>
      </BrowserRouter>
    );
  }
}
