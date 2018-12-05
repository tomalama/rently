// React
import React, { Component } from "react";

//Components
import Search from "../Search";
import Browse from "../Browse";

import "./Home.scss"

class Home extends Component {
  render() {
    return (
      <div className="component-container">
        <Search />
        <Browse />
      </div>
    )
  }
}

export default Home;
