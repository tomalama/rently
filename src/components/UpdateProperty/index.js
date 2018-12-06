import React, { Component } from 'react';
import * as _ from "lodash";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

import { updateProperty, getProperty } from '../../store/actions/property';

import PropertyForm from '../PropertyForm';

class UpdateProperty extends Component {
  componentDidMount() {
    const { propertyId } = this.props.match.params;
    const { getProperty } = this.props;
    getProperty(propertyId);
  }

  render() {
    const { propertyId } = this.props.match.params;
    const { property } = this.props;

    if (!property) {
      return <div></div>;
    }

    const propertyState = _.assign({propertyId: propertyId}, property);
    propertyState['imagePreviews'] = propertyState.imageURLs;

    return (
      <div>
        <PropertyForm
          type='update'
          propertyState={propertyState}
          redirect={`/property/${propertyId}`}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.firebase.profile,
    property: state.property.property,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProperty: newProperty => dispatch(updateProperty(newProperty)),
    getProperty: propertyId => dispatch(getProperty(propertyId)),
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UpdateProperty);
