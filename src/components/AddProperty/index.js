import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { addProperty } from "../../store/actions/property";
import { provinces, locations } from "../../constants/geographic-info";
import { locationNameRegex, postalCodeRegex, integerRegex } from '../../constants/regex';
import ImageView from "../Misc/ImageView";
import './index.scss'

const MAX_IMAGES = 5;
const inputStyleError = { borderColor: 'red' }

class AddProperty extends Component {

  state = {
    propertyType: 'Apartment',
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
    imagePreviews: [],
    validInputs: [],
    invalidInputs: [],
    error: false
  };

  handleChange = e => {
    const valid = this.validateInput(e.target.id, e.target.value);
    const invalidInputs = this.state.invalidInputs;

    if (valid) 
      _.pull(invalidInputs, e.target.id);
    else
      invalidInputs.push(e.target.id);
    

    this.setState({
      [e.target.id]: e.target.value,
      invalidInputs
    });
  };

  handleProxyFile = () => {
    this.refs.fileUploader.click();
  };

  handleFileChange = e => {
    if (e.target.files.length > 5) {
      alert("You may only upload a maximum of 5 images")
    } else {
      this.setState({ images: e.target.files });
      Array.from(e.target.files).forEach((image, index) => {
        this.updateImagePreview(image, index);
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    let errorMessage = '';
    if (this.state.invalidInputs.length > 0) 
      errorMessage += 'There were errors in the form values you entered, please correct the form fields highlighted in red. ';
    
    if (this.state.images.length == 0) 
      errorMessage += 'Please upload at least one image for the property.'

    if (errorMessage) {
      this.setState({ error: errorMessage });
    } else {
      this.setState({ error: false });
      this.props.addProperty(this.state);
    }
  }

  validateInput = (inputId, inputValue) => {
    // Only need to validate streetName, postalCode, and City.
    // The rest are handled by the input type
    if (inputId === 'streetName') {
      return locationNameRegex.test(inputValue);
    } else if (inputId === 'city') {
      return locationNameRegex.test(inputValue);
    } else if (inputId === 'postalCode') {
      return postalCodeRegex.test(inputValue);
    } else if (inputId === 'numBedrooms' || inputId === 'numBathrooms' || inputId === 'numOtherRooms') {
      return integerRegex.test(inputValue);
    } 

    return true;
  };

  updateImagePreview = (file, index) => {
    let reader = new FileReader();
    reader.onloadend = () => {      
      // I know this is bad practice but whatever lmao
      this.state.imagePreviews[index] = reader.result;
      this.forceUpdate();
    };

    reader.readAsDataURL(file);
  };

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
                        onChange={this.handleChange} 
                        required
                      />
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
                        onChange={this.handleChange} 
                        required
                      />
                      House
                    </label>
                  </div>
                </div>
              </div>
              <div className='property-form__row'>
                <div className='property-form__label'>Rent:</div>
                <div className='property-form__input'>
                  <input 
                    type="number"
                    id="rent"
                    value={this.state.rent}
                    onChange={this.handleChange}
                    style={this.state.invalidInputs.includes('rent') ? inputStyleError : undefined}
                    required
                  />
                </div>
              </div>
              <div className='property-form__row'>
                <div className='property-form__label'>Property Address:</div>
                <div className='property-form__input'>
                  <span className='add-property-form__input-composition'>
                    <input 
                      type="number"
                      id="streetNumber"
                      value={this.state.streetNumber}
                      onChange={this.handleChange}
                      required
                    />
                    <div>Street Number</div>
                  </span>
                  <span className='add-property-form__input-composition'>
                    <input 
                      type="text"
                      id="streetName"
                      value={this.state.streetName}
                      onChange={this.handleChange}
                      required
                      style={this.state.invalidInputs.includes('streetName') ? inputStyleError : undefined}
                    />
                    <div>Street Name</div>
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
                      required
                      style={this.state.invalidInputs.includes('city') ? inputStyleError : undefined}
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
                      required
                      style={this.state.invalidInputs.includes('postalCode') ? inputStyleError : undefined}
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
                    type="number"
                    id="numBedrooms"
                    value={this.state.numBedrooms}
                    onChange={this.handleChange}
                    required
                    style={this.state.invalidInputs.includes('numBedrooms') ? inputStyleError : undefined}
                  />
                </div>
              </div>
              <div className='property-form__row'>
                <div className='property-form__label'>Number of Bathrooms:</div>
                <div className='property-form__input'>
                  <input 
                    type="number"
                    id="numBathrooms"
                    value={this.state.numBathrooms}
                    onChange={this.handleChange}
                    required
                    style={this.state.invalidInputs.includes('numBathrooms') ? inputStyleError : undefined}
                  />
                </div>
              </div>
              <div className='property-form__row'>
                <div className='property-form__label'>Number of Other Rooms:</div>
                <div className='property-form__input'>
                  <input 
                    type="number"
                    id="numOtherRooms"
                    value={this.state.numOtherRooms}
                    onChange={this.handleChange}
                    required
                    style={this.state.invalidInputs.includes('numOtherRooms') ? inputStyleError : undefined}
                  />
                </div>
              </div>

              {this.state.error && <p className="add-property-form__error">{this.state.error}</p>}
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
                accept="image/*"
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

