import React, { Component } from "react";
import * as _ from "lodash";
import { connect } from "react-redux";
import { getProperty, addToVisitingList } from "../../store/actions/property";
import { getVisitingList } from "../../store/actions/visitingList";

import "./styles.scss";

class PropertyDeepDive extends Component {
  state = {
      inVisitingList: false,
  }

  componentDidMount() {
    const { propertyId } = this.props.match.params;
    const { auth, getProperty, getVisitingList } = this.props;
    getProperty(propertyId);
    getVisitingList(auth.uid);
  }

  componentWillReceiveProps(nextProps) {
    const { propertyId } = this.props.match.params;
    const { visitingList } = nextProps;
    const inVisitingList = _.indexOf((visitingList && visitingList.data) || [], propertyId) >= 0;
    console.log(`it is found in the list: ${inVisitingList}`);
    this.setState({ inVisitingList: inVisitingList })
  }

  addToVisitingList = () => {
    const { auth, user, addToVisitingList } = this.props;
    const { propertyId } = this.props.match.params;
    this.setState({ inVisitingList: true });
    addToVisitingList(auth.uid, user, propertyId)
  }

  render() {
    const { auth, user, property, visitingList, addToVisitingList } = this.props;
    const { propertyId } = this.props.match.params;
    const { inVisitingList } = this.state;

    const isOwner = (auth.uid && user && user.type === "owner") && (auth.uid === (property && property.userId));
    const isCustomer = auth.uid && user && user.type === "customer";

    console.log(auth.uid);
    console.log(property && property.userId);
    console.log(isOwner);

    if (!property) {
      return <div></div>;
    }

    return <div className="property-deepdive-container">
      <div className="deep-dive-left">
        <p className="title">{`${property.streetNumber} ${property.streetName}`}</p>
        <p className="price">{`${property.rent} /month`}</p>
        <div className="images-container">
          <div className="big-image">
            <img src={property.imageURLs && property.imageURLs[0]} alt="big"/>
          </div>
          <div className="small-images-container">
            {
              _.map(_.slice(property.imageURLs, 2, property.imageURLs.length), (url, idx) => {
                return <div className="small-image">
                  <img key={idx} src={url} alt={`p-${idx}`}/>
                </div>
              })
            }
          </div>
        </div>
        <div className="rooms-container">
          <div className="room">
            <img src={window.location.origin + "/img/bedrooms.svg"} alt="bedroom" />
            <p>{`${property.numBedrooms} bedrooms`}</p>
          </div>
          <div className="room">
            <img src={window.location.origin + "/img/bathrooms.svg"} alt="bathroom" />
            <p>{`${property.numBathrooms} bathrooms`}</p>
          </div>
          <div className="room">
            <img src={window.location.origin + "/img/other.svg"} alt="otherroom" />
            <p>{`${property.numOtherRooms} other rooms`}</p>
          </div>
        </div>
      </div>
      <div className="deep-dive-right">
        <div className="location-container">
          <div className="location">
            <img src={window.location.origin + "/img/location.svg"} alt="location" />
            <p>{`${property.city}, ${property.province}`}</p>
          </div>
          <div className="map">
            <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${property.city},${property.province}&zoom=12&size=400x164&key=AIzaSyALZvqSgkzhLBtORw7iej52P3M-pvl4K5w`} />
          </div>
        </div>
        { (isOwner || isCustomer) &&
          <div className="actions-container">
            { isOwner &&
              <div className="btn-container">
                <button className="btn">Edit Property</button>
                <button className="btn scnd">Delete Property</button>
              </div>
            }
            { isCustomer &&
              <div className="btn-container">
                { inVisitingList ?
                  <button className="btn disabled" disabled={true}>Added to Visiting List</button> :
                  <button className="btn" onClick={this.addToVisitingList}>Add to Visiting List</button>
                }
              </div>
            }
          </div>
        }
      </div>
    </div>;
  }
}


const mapStateToProps = (state) => {
  return {
    property: state.property.property,
    fetching: state.property.fetching,
    auth: state.firebase.auth,
    user: state.firebase.profile,
    visitingList: state.visitingList.visitingList,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getProperty: (propertyId) => dispatch(getProperty(propertyId)),
    getVisitingList: (userId) => dispatch(getVisitingList(userId)),
    addToVisitingList: (userId, profile, propertyId) => dispatch(addToVisitingList(userId, profile, propertyId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDeepDive);
