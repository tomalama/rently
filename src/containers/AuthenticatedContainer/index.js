import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from 'redux'
import { connect } from "react-redux";
import { firestoreConnect } from 'react-redux-firebase'

import { signOut } from "../../store/actions/auth";

class NavBar extends Component {
  
  render() {
    return <nav>
      <Link to="/">Home</Link>
      <a href="/" onClick={this.props.signOut}>Log Out</a>
    </nav>;
  }

  componentDidMount() {
    console.log(this);
  }
}

// const mapStateToProps = state => ({
//   user: state.firestore.ordered.users
// })

// const mapDispatchToProps = dispatch => ({
//   signOut: () => dispatch(signOut())
// })

// const ConnectedNavBar = compose(
//   firestoreConnect(['users']),
//   connect(mapStateToProps, mapDispatchToProps)
// )(NavBar);

const ConnectedNavBar = compose(
  firestoreConnect((props) => )
)(NavBar);

export default class AuthenticatedContainer extends Component {
  render() {
    return <div>
      <ConnectedNavBar />
      {this.props.children}
    </div>;
  }
}
