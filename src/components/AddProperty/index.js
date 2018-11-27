// React
import React, { Component } from "react";

const propertyTypes = ['House', 'Apartment'];

export default class AddProperty extends Component {

  state = {
    propertyType: '',
    address: '',
    rent: '',
    streetNumber: '',
    streetName: '',
    city: '',
    province: '',
    postalCode: '',
    location: '',
    numBedrooms: '',
    numBathrooms: '',
    numOtherRooms: ''
  };

  handleChange = e => {
    console.log(`${e.target.id} changed`);
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (event) => {

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
                  <option value="ON">ON</option>
                  <option value="NB">NB</option>
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
                  <option value="Ottawa">Ottawa</option>
                  <option value="Toronto">Toronto</option>
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

          <input type="submit" value="Add Property" />
        </form>
      </div>
    );
  }
}
