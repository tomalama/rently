import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from 'redux'
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase'

import { signOut } from "../../store/actions/auth";

class NavBar extends Component {
  
  render() {

    const { signOut, user } = this.props;

    return <nav>
      <Link to="/">Home</Link>
      <a href="/" onClick={this.props.signOut}>Log Out</a>
      <a href="/" onClick={this.props.signOut}>Add Property</a>
    </nav>;
  }
}

const mapStateToProps = state => ({
  user: state.firebase.profile
})

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
})

const ConnectedNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default class AuthenticatedContainer extends Component {
  render() {
    return <div>
      <ConnectedNavBar />
      {this.props.children}
    </div>;
  }
}
