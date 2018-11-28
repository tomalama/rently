import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/auth";

class NavBar extends Component {
  render() {
    return <nav>
      <Link to="/">Home</Link>
      <a href="/" onClick={this.props.signOut}>Log Out</a>
      <a href="/" onClick={this.props.signOut}>Add Property</a>
    </nav>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};
const ConnectedNavBar = connect(null, mapDispatchToProps)(NavBar);

export default class AuthenticatedContainer extends Component {
  render() {
    return <div>
      <ConnectedNavBar />
      {this.props.children}
    </div>;
  }
}
