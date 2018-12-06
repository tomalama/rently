import React, { Component } from "react";
import * as _ from "lodash";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, isLoaded } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

import { updateProperty, getProperty } from "../../store/actions/property";

import PropertyForm from "../PropertyForm";

class UpdateProperty extends Component {
  componentDidMount() {
    const { propertyId } = this.props.match.params;
    const { getProperty } = this.props;
    getProperty(propertyId);
  }

  render() {
    const { propertyId } = this.props.match.params;
    const { property, auth, profile } = this.props;

    if (isLoaded(profile)) {
      if (!auth.uid) return <Redirect to="/login" />;

      if (!property) {
        return <div />;
      }

      if (profile.type !== "owner" || auth.uid !== property.userId)
        return <Redirect to="/" />;

      const propertyState = _.assign({ propertyId: propertyId }, property);
      propertyState["imagePreviews"] = propertyState.imageURLs;

      return (
        <div>
          <PropertyForm
            type="update"
            propertyState={propertyState}
            redirect={`/property/${propertyId}`}
          />
        </div>
      );
    }
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    property: state.property.property
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProperty: newProperty => dispatch(updateProperty(newProperty)),
    getProperty: propertyId => dispatch(getProperty(propertyId))
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UpdateProperty);
