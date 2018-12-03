// React
import React, { Component } from "react";

import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return <div>Hey
      <Link to='/demo'>demo</Link>
    </div>;
  }
}

export default Home;
