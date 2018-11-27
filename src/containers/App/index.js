// React
import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import AppRoute from "../AppRoute";
import { connect } from "react-redux";

import AuthenticatedContainer from "../AuthenticatedContainer";
import UnAuthenticatedContainer from "../UnAuthenticatedContainer";

// General
import Home from "../../components/Home";

// Admin
import Login from "../../components/Login";

// Agent
import SignUp from "../../components/SignUp";

// Owner
import AddProperty from "../../components/AddProperty";

class App extends Component {
  render() {
    const { auth } = this.props;
    const layout = (auth && auth.uid) ? AuthenticatedContainer : UnAuthenticatedContainer;
    return (
      <BrowserRouter>
        <Switch>
          <AppRoute exact path="/" layout={layout} component={Home} />
          <AppRoute exact path="/login" layout={layout} component={Login} />
          <AppRoute exact path="/signup" layout={layout} component={SignUp} />
          <AppRoute exact path="/add-property" layout={layout} component={AddProperty} />
        </Switch>
      </BrowserRouter>
    );
  }
}



const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps)(App);
