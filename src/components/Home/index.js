// React
import React, { Component } from "react";

import Search from "../Search";
import Browse from "../Browse";

class Home extends Component {
  render() {
    return (
      <div>
        <Search />
        <Browse />
      </div>
    )
  }
}

export default Home;
