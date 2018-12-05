import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

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

const mapStateToProps = ({state}) => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProperty: newProperty => dispatch(addProperty(newProperty))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProperty);

