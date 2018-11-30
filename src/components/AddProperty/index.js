import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { addProperty } from "../../store/actions/property";
import { provinces, locations } from "../../constants/geographic-info";
import ImageView from "../Misc/ImageView";
import './index.scss'

const MAX_IMAGES = 5;

class AddProperty extends Component {

  state = {
    propertyType: '',
    rent: '',
    streetNumber: '',
    streetName: '',
    city: '',
    province: provinces[0],
    postalCode: '',
    location: locations[0],
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

  handleProxyFile = () => {
    this.refs.fileUploader.click();
  }

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
        
        <h1 className='add-property-form__title'>Add Property</h1>
        <br />

        <form onSubmit={this.handleSubmit}>
          
          <div className='add-property-form__card'>
            
            <div className="add-property-form__header">
                <div className="header__number"><span>1</span></div>
                <span className='header__text'>Property Details</span>
            </div>
            
            <div className='add-property-form__form'>
              <div className='property-form__row'>
                <div className='property-form__label'>Property Type:</div>
                <div className='property-form__input'>
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
                </div>
              </div>
              <div className='property-form__row'>
                <div className='property-form__label'>Rent:</div>
                <div className='property-form__input'>
                  <input 
                    type="text"
                    id="rent"
                    value={this.state.rent}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className='property-form__row'>
                <div className='property-form__label'>Property Address:</div>
                <div className='property-form__input'>
                  <span className='add-property-form__input-composition'>
                    <input 
                      type="text"
                      id="streetNumber"
                      value={this.state.streetNumber}
                      onChange={this.handleChange}
                    />
                    <div>Street Number</div>
                  </span>
                  <span className='add-property-form__input-composition'>
                    <input 
                      type="text"
                      id="streetName"
                      value={this.state.streetName}
                      onChange={this.handleChange}
                    />
                    <div>Street Address</div>
                  </span>
                </div>
              </div>
              <div className='property-form__row'>
                <div className='property-form__label'>Property Location:</div>
                <div className='property-form__input'>
                  <span className='add-property-form__input-composition'>
                    <input 
                      type="text"
                      id="city"
                      value={this.state.city}
                      onChange={this.handleChange}
                    />
                    <div>City</div>
                  </span>
                  <span className='add-property-form__input-composition'>
                  <select id="province" onChange={this.handleChange}>
                    {provinces.map(province => <option value={province} key={province}>{province}</option>)}
                  </select>
                    <div>Province</div>
                  </span>
                  <br />
                  <span className="add-property-form__input-composition">
                    <input 
                      type="text"
                      id="postalCode"
                      value={this.state.postalCode}
                      onChange={this.handleChange}
                    />
                    <div>Postal Code</div>
                  </span>
                </div>
              </div>
              <div className='property-form__row'>
                <div className='property-form__label'>Location:</div>
                <div className='property-form__input'>
                <select id="location" onChange={this.handleChange}>
                  {locations.map(location => <option value={location} key={location}>{location}</option>)}
                </select>
                </div>
              </div>
              <div className='property-form__row'>
                <div className='property-form__label'>Number of Bedrooms:</div>
                <div className='property-form__input'>
                  <input 
                    type="text"
                    id="numBedrooms"
                    value={this.state.numBedrooms}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className='property-form__row'>
                <div className='property-form__label'>Number of Bathrooms:</div>
                <div className='property-form__input'>
                  <input 
                    type="text"
                    id="numBathrooms"
                    value={this.state.numBathrooms}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className='property-form__row'>
                <div className='property-form__label'>Number of Other Rooms:</div>
                <div className='property-form__input'>
                  <input 
                    type="text"
                    id="numOtherRooms"
                    value={this.state.numOtherRooms}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='add-property-form__card'>
            
            <div className="add-property-form__header">
                <div className="header__number"><span>2</span></div>
                <span className='header__text'>Upload Images</span>
            </div>
          
            <div className="add-property-form__upload">
              
              <div className="image-container">
                {_.range(MAX_IMAGES).map((img, index) => <ImageView image={this.state.imagePreviews[index]} key={index}/>)}
              </div>

              <button
                className='add-property-form__upload-btn'
                onClick={this.handleProxyFile}>Upload Images</button>
              <input 
                style={{display: 'none'}}
                id="upload-btn"
                type="file"
                multiple="multiple"
                ref="fileUploader"
                onChange={this.handleFileChange}
                />
            </div>

          </div>
          
          <button className='add-property-form__submit' type="submit">Add Property</button>
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

