import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return <nav>
      <Link to="/">Home</Link>
      <NavLink to="/signup">Sign Up</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/add-property">Add Property</NavLink>
    </nav>
  }
}

export default class UnAuthenticatedContainer extends Component {
  render() {
    return <div>
        <Navbar />
        {this.props.children}
    </div>
  }
}
