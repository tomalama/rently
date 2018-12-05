import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import _ from 'lodash';
import { firebaseConnect } from "react-redux-firebase";

import { updateProperty } from '../../store/actions/property';

import PropertyForm from '../PropertyForm';

// Below is an example of a property state that you can pass into the PropertyForm.
// You can get all these state values from Firestore. 
const testPropertyState = {
  propertyId: 'SjQgHZVvJfMS3M72YE25',
  propertyType: 'Apartment',
  rent: '123',
  streetNumber: '123',
  streetName: 'Testing St',
  city: 'Rack City',
  province: 'AB',
  postalCode: 'K1X1l2',
  location: 'Alberta',
  numBedrooms: '2',
  numBathrooms: '1',
  numOtherRooms: '3',
  imagePreviews: ['https://firebasestorage.googleapis.com/v0/b/rently-8a83b.appspot.com/o/images%2FSjQgHZVvJfMS3M72YE25%2Fhi-dad.jpg?alt=media&token=24a70dc6-c2c6-40fd-8960-e3c011695dd8']
}

class UpdateProperty extends Component {

  render() {
    return (
      <div>
        <PropertyForm
          type='update'
          propertyState={testPropertyState}
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
    updateProperty: newProperty => dispatch(updateProperty(newProperty))
  };
};

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UpdateProperty);

