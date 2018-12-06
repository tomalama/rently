import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import AppRoute from "../AppRoute";
import AppContainer from "../AppContainer";

import Home from "../../components/Home";
import ViewAccount from "../../components/ViewAccount";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import AddProperty from "../../components/AddProperty";
import UpdateProperty from "../../components/UpdateProperty";
import VisitingList from '../../components/VisitingList'
import PropertyDeepDive from "../../components/PropertyDeepDive";
import OwnerList from '../../components/OwnerViewProperties';

import "./style.scss";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <AppRoute exact path="/" layout={AppContainer} component={Home} />
          <AppRoute exact path="/property/:propertyId/" layout={AppContainer} component={PropertyDeepDive} />
          <AppRoute
            exact
            path="/login"
            layout={AppContainer}
            component={Login}
          />
          <AppRoute
            exact
            path="/create-account"
            layout={AppContainer}
            component={SignUp}
          />
          <AppRoute
            exact
            path="/my-account"
            layout={AppContainer}
            component={ViewAccount}
          />
          <AppRoute
            exact
            path="/add-property"
            layout={AppContainer}
            component={AddProperty}
          />
          <AppRoute
            exact
            path="/update-property"
            layout={AppContainer}
            component={UpdateProperty}
          />
          <AppRoute
            exact
            path='/visiting-list'
            layout={AppContainer}
            component={VisitingList}
          />
          <AppRoute
            exact
            path='/my-properties'
            layout={AppContainer}
            component={OwnerList}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
