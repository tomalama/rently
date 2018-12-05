import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import _ from 'lodash';
import { firebaseConnect } from "react-redux-firebase";

import { addProperty } from '../../store/actions/property';

import PropertyForm from '../PropertyForm';

class AddProperty extends Component {

  render() {
    return (
      <div>
        <PropertyForm
          type='add'
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.firebase.profile
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