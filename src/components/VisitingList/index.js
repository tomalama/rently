import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";

import PropertyCard from "../PropertyCard";
import "./style.scss";
import { Property } from "../../models/property";

function getVisitingList(userId, visitingLists, properties) {
  if (visitingLists[userId]) {
    return visitingLists[userId].data.map(propertyId => {
      const propertyData = properties[propertyId];

      return new Property(
        propertyId,
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
      );
    });
  }
}

class VisitingList extends React.Component {
  render() {
    const { visitingLists, properties, auth } = this.props;
    const loaded = isLoaded(visitingLists) && isLoaded(properties);

    if (loaded)
      var visitingList = getVisitingList(auth.uid, visitingLists, properties);

    return (
      <div className="visiting-list">
        <h2 className="visiting-list__title">My Visiting List</h2>

        <div className="visiting-list__properties">
          {!loaded && <span>Loading</span>}
          {loaded &&
            visitingList &&
            visitingList.map((property, i) => {
              return <PropertyCard key={i} property={property} />;
            })}
          {loaded && !visitingList && (
            <span>It's quiet here... Add something to your visiting list!</span>
          )}
        </div>
      </div>
    );
  }
}

export default compose(
  firestoreConnect(["visiting-list", "properties"]),
  connect(state => ({
    auth: state.firebase.auth,
    visitingLists: state.firestore.data["visiting-list"],
    properties: state.firestore.data.properties
  }))
)(VisitingList);
