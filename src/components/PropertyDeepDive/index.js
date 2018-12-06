import React, { Component } from "react";
import * as _ from "lodash";
import { connect } from "react-redux";
import { getProperty, addToVisitingList, deleteProperty } from "../../store/actions/property";
import { getVisitingList } from "../../store/actions/visitingList";

import Modal from "../Modal";

import "./styles.scss";

class PropertyDeepDive extends Component {
  state = {
    isDeleted: false,
    inVisitingList: false,
    error: null,
    showModal: false,
    activeImage: 0,
  };

  componentDidMount() {
    const { propertyId } = this.props.match.params;
    const { auth, getProperty, getVisitingList } = this.props;
    getProperty(propertyId);
    if (auth.uid) {
      getVisitingList(auth.uid);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { propertyId } = this.props.match.params;
    const { visitingList, property } = nextProps;
    const inVisitingList =
      _.indexOf((visitingList && visitingList.data) || [], propertyId) >= 0;
    const isDeleted = (property && property.deleted);

    this.setState({
      inVisitingList: inVisitingList,
      isDeleted: isDeleted,
      activeImage: (property && property.imageURLs & property.imageURLs[0])
    });
  }

  addToVisitingList = () => {
    const { auth, user, addToVisitingList, property } = this.props;
    const { propertyId } = this.props.match.params;
    console.log(user.maxRent);
    console.log(property.rent);
    if (parseInt(user.maxRent) < parseInt(property.rent)) {
      this.setState({
        error: "The monthly rent for this property exceeds your maximum rent"
      });
      return;
    }
    this.setState({ inVisitingList: true, error: null });
    addToVisitingList(auth.uid, user, propertyId);
  };

  deleteProperty = () => {
    const { auth, user, property, deleteProperty } = this.props;
    const { propertyId } = this.props.match.params;
    this.setState({ isDeleted: true });
    deleteProperty(auth.uid, propertyId, user);
  }

  calculateImage = (step) => {
    const { property } = this.props;
    const { activeImage } = this.state;
    let index = activeImage + step;
    if (index < 0) {
      index += property.imageURLs.length;
    }
    else {
      index = index % property.imageURLs.length;
    }
    this.setState({ activeImage: index });
  }

  showImagePreviewModal = (idx) => {
    this.setState({ showModal: true, activeImage: idx || 0 });
  }

  closeImagePreviewModal = () => {
    this.setState({ showModal: false, activeImage: 0 });
  }

  render() {
    const {
      auth,
      user,
      property,
      visitingList,
      addToVisitingList
    } = this.props;
    const { propertyId } = this.props.match.params;
    const { inVisitingList, error, isDeleted, showModal, activeImage } = this.state;

    const isOwner =
      auth.uid &&
      user &&
      user.type === "owner" &&
      auth.uid === (property && property.userId);
    const isCustomer = auth.uid && user && user.type === "customer";

    if (!property) {
      return <div />;
    }

    return (
      <div className="property-deepdive-container">
        <div className="deep-dive-left">
          <p className="title">
          {`${property.streetNumber} ${property.streetName} - ${property.propertyType}`}</p>
          <p className="price">{`$${property.rent} /month`}</p>
          <div className="images-container">
            <div className="big-image" onClick={() => this.showImagePreviewModal(0)}>
              <img
                src={property.imageURLs && property.imageURLs[0]}
                alt="big"
              />
            </div>
            <div className="small-images-container">
              {_.map(
                _.slice(property.imageURLs, 2, property.imageURLs.length),
                (url, idx) => {
                  return (
                    <div className="small-image" onClick={() => this.showImagePreviewModal(idx + 2)}>
                      <img key={idx} src={url} alt={`p-${idx}`} />
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div className="rooms-container">
            <div className="room">
              <img
                src={window.location.origin + "/img/bedrooms.svg"}
                alt="bedroom"
              />
              <p>{`${property.numBedrooms} bedrooms`}</p>
            </div>
            <div className="room">
              <img
                src={window.location.origin + "/img/bathrooms.svg"}
                alt="bathroom"
              />
              <p>{`${property.numBathrooms} bathrooms`}</p>
            </div>
            <div className="room">
              <img
                src={window.location.origin + "/img/other.svg"}
                alt="otherroom"
              />
              <p>{`${property.numOtherRooms} other rooms`}</p>
            </div>
          </div>
        </div>
        <div className="deep-dive-right">
          <div className="location-container">
            <div className="location">
              <img
                src={window.location.origin + "/img/location.svg"}
                alt="location"
              />
              <p>{`${property.city}, ${property.province}`}</p>
            </div>
            <div className="map">
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${
                  property.city
                },${
                  property.province
                }&zoom=12&size=400x164&key=AIzaSyALZvqSgkzhLBtORw7iej52P3M-pvl4K5w`}
              />
            </div>
          </div>
          {(isOwner || isCustomer) && (
            <div className="actions-container">
              {isOwner && (
                <div className="btn-container">
                  <a href={`/update-property/${propertyId}`} className="btn">Edit Property</a>
                  <button className={"btn scnd " + (isDeleted ? "disabled" : "")} onClick={this.deleteProperty}>{isDeleted ? "Deleted" : "Delete Property"}</button>
                </div>
              )}
              {isCustomer && (
                <div className="btn-container">
                  {inVisitingList ? (
                    <button className="btn disabled" disabled={true}>
                      Added to Visiting List
                    </button>
                  ) : (
                    <button className="btn" onClick={this.addToVisitingList}>
                      Add to Visiting List
                    </button>
                  )}
                  {error && <p className="error">{error}</p>}
                </div>
              )}
            </div>
          )}
        </div>

          {showModal && <Modal close={this.closeImagePreviewModal}>
            <div className="image-preview-container">
              <div className="control left" onClick={() => this.calculateImage(-1)}>
                <img src={window.location.origin + "/img/left.svg"} />
              </div>
              <img className="image-preview" src={property && property.imageURLs[activeImage]}/>
              <div className="control right" onClick={() => this.calculateImage(1)}>
                <img src={window.location.origin + "/img/right.svg"} />
              </div>
            </div>
          </Modal>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    property: state.property.property,
    fetching: state.property.fetching,
    auth: state.firebase.auth,
    user: state.firebase.profile,
    visitingList: state.visitingList.visitingList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getProperty: propertyId => dispatch(getProperty(propertyId)),
    getVisitingList: userId => dispatch(getVisitingList(userId)),
    addToVisitingList: (userId, profile, propertyId) =>
      dispatch(addToVisitingList(userId, profile, propertyId)),
    deleteProperty: (userId, propertyId, profile) =>
      dispatch(deleteProperty(userId, propertyId, profile)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyDeepDive);
