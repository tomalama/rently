import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

import PropertyCard from "../PropertyCard";
import { Property } from "../../models/property";
import "./style.scss";

function getOwnerList(userId, properties) {
  return properties.reduce((sum, propertyData) => {
    if (propertyData.userId === userId) {
      sum.push(
        new Property(
          propertyData.id,
          propertyData.propertyType,
          propertyData.numBedrooms,
          propertyData.numBathrooms,
          propertyData.numOtherRooms,
          propertyData.rent,
          propertyData.province,
          propertyData.city,
          propertyData.streetNumber,
          propertyData.streetName,
          propertyData.postalCode,
          propertyData.location,
          propertyData.deleted ? propertyData.deleted : false,
          propertyData.imageURLs
        )
      );
    }

    return sum;
  }, []);
}

class OwnerList extends React.Component {
  render() {
    const { auth, properties, profile } = this.props;
    if (isLoaded(profile)) {
      if (!auth.uid) return <Redirect to="/login" />;

      if (profile.type !== "owner") return <Redirect to="/" />;

      const loaded = isLoaded(properties);

      if (loaded) var ownerList = getOwnerList(auth.uid, properties);

      return (
        <div className="owner-list">
          <h2 className="owner-list__title">My Properties</h2>

          <div className="owner-list__properties">
            {!loaded && <span>Loading</span>}
            {loaded &&
              ownerList &&
              ownerList.map((property, i) => {
                return <PropertyCard key={i} showStatus property={property} />;
              })}
            {loaded && isEmpty(ownerList) && (
              <span>It's quiet here... Add some properties!</span>
            )}
          </div>
        </div>
      );
    }
    return <div />;
  }
}

const enhance = compose(
  firestoreConnect(["properties"]),
  connect(state => ({
    auth: state.firebase.auth,
    properties: state.firestore.ordered.properties,
    profile: state.firebase.profile
  }))
);

export default enhance(OwnerList);
