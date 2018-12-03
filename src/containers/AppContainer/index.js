import React, { Component } from "react";
import NavigationBar from "../../components/NavigationBar";

export default class AppContainer extends Component {
  render() {
    return <div>
      <NavigationBar />
      {this.props.children}
    </div>;
  }
}
