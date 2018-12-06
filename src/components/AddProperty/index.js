import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import _ from "lodash";
import { firebaseConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

import { addProperty } from "../../store/actions/property";

import PropertyForm from "../PropertyForm";

class AddProperty extends Component {
  render() {
    const { auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;

    if (profile.type !== "owner") return <Redirect to="/" />;

    return (
      <div>
        <PropertyForm type="add" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProperty: newProperty => dispatch(addProperty(newProperty))
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AddProperty);
