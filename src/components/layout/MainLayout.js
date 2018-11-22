// React
import React, { Component } from "react";

// Child components
import Navbar from "./Navbar";

class MainLayout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default MainLayout;
