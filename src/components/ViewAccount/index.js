// React
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";

class ViewAccount extends Component {
  render() {
    const { auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;
    return <div>{profile.username}</div>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(ViewAccount);
