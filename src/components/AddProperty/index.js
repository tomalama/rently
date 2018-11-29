import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { addProperty } from "../../store/actions/property";
import { provinces, locations } from "../../constants/geographic-info";
import ImageView from "../Misc/ImageView";

const MAX_IMAGES = 5;

class AddProperty extends Component {

  state = {
    propertyType: '',
    rent: '',
    streetNumber: '',
    streetName: '',
    city: '',
    province: 'ON',
    postalCode: '',
    location: 'Ottawa',
    numBedrooms: '',
    numBathrooms: '',
    numOtherRooms: '',
    images: [],
    imagePreviews: []
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleFileChange = e => {
    if (e.target.files.length >= 5) {
      alert("You may only upload a maximum of 5 images")
    } else {
      this.setState({ images: e.target.files });
      Array.from(e.target.files).forEach((image, index) => {
        this.updateImagePreview(image, index);
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addProperty(this.state)
  }

  updateImagePreview = (file, index) => {
    let reader = new FileReader();
    reader.onloadend = () => {      
      // I know this is bad practice but whatever lmao
      this.state.imagePreviews[index] = reader.result;
      this.forceUpdate();
    };

    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="add-property-form">
        <h1>Add Property</h1>
        <form onSubmit={this.handleSubmit}>
          <h3 className="add-property-form__header">Property Details</h3>
          <div className="property-type">
            <label className="add-property-form__label">
              Property Type:
              <div className="radio">
                <label>
                  <input 
                    type="radio" 
                    id="propertyType" 
                    value="Apartment"
                    checked={this.state.propertyType === 'Apartment'}
                    onChange={this.handleChange} />
                  Apartment
                </label>
              </div>
              <div className="radio">
                <label>
                  <input 
                    type="radio" 
                    id="propertyType" 
                    value="House"
                    checked={this.state.propertyType === 'House'}
                    onChange={this.handleChange} />
                  House
                </label>
              </div>
            </label>

          </div>

          <label className="add-property-form__label">
            Rent:
            <input 
              type="text"
              id="rent"
              value={this.state.rent}
              onChange={this.handleChange}
            />
          </label>

          <br />

          <label className="add-property-form__label">
            Property Address:
            <div className="add-property-form__address">

              <label className="add-property-form__label">
                Street Number:
                <input 
                  type="text"
                  id="streetNumber"
                  value={this.state.streetNumber}
                  onChange={this.handleChange}
                />
              </label>

              <label className="add-property-form__label">
                Street Name:
                <input 
                  type="text"
                  id="streetName"
                  value={this.state.streetName}
                  onChange={this.handleChange}
                />
              </label>

            </div>
          </label>

          <br />

          <label className="add-property-form__label">
            Property Location:
            <div className="add-property-form__property-location">

              <label className="add-property-form__label">
                City:
                <input 
                  type="text"
                  id="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </label>

              <label className="add-property-form__label">
                Province:
                <select id="province" onChange={this.handleChange}>
                  {provinces.map(province => <option value={province} key={province}>{province}</option>)}
                </select>
              </label>

              <br />

              <label className="add-property-form__label">
                Postal Code:
                <input 
                  type="text"
                  id="postalCode"
                  value={this.state.postalCode}
                  onChange={this.handleChange}
                />
              </label>

            </div>
          </label>


          <div className="add-property-form__location">
            <label className="add-property-form__label">
              Location:
              <select id="location" onChange={this.handleChange}>
                {locations.map(location => <option value={location} key={location}>{location}</option>)}
              </select>
            </label>
          </div>

          <label className="add-property-form__label">
            Number of Bedrooms:
            <input 
              type="text"
              id="numBedrooms"
              value={this.state.numBedrooms}
              onChange={this.handleChange}
            />
          </label>

          <br />

          <label className="add-property-form__label">
            Number of Bathrooms:
            <input 
              type="text"
              id="numBathrooms"
              value={this.state.numBathrooms}
              onChange={this.handleChange}
            />
          </label>

          <br />

          <label className="add-property-form__label">
            Number of Other Rooms:
            <input 
              type="text"
              id="numOtherRooms"
              value={this.state.numOtherRooms}
              onChange={this.handleChange}
            />
          </label>       

          <br />    

          <div className="image-upload">
            <input type="file" multiple="multiple" onChange={this.handleFileChange} />
            <div className="image-container">
              {_.range(MAX_IMAGES).map((img, index) => <ImageView image={this.state.imagePreviews[index]} key={index}/>)}
            </div>
          </div>

          <br />

          <input type="submit" value="Add Property" />
        </form>
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

