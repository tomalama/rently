import React, { Component } from "react";

import { Property } from '../../models'
import '../../css/site.css'
import '../../css/update-property.css'
/**
 * Where ever you want to add the link to update a property
 * <Link to="/update-property">...</Link>
 */
class UpdateProperty extends Component {

    state = {
        propertyType: null,
        numBedrooms: null,
        numBathrooms: null,
        numOtherRooms: null,
        rentCost: 0.00,
        houseNumber: null,
        streetName: null,
        postalCode: null
    }

    render() {

        return <div className="container">
            
            <div className="content-title">Update Property</div>

            <br></br>

            <div className="form-card" id="prop-details">
                
                <div className="card-title-content">
                    <div className="oval-3"><span>1</span></div>
                    <span>Property Details</span>
                </div>
                
                <table style={{
                    marginTop: 35,
                    marginLeft: 50
                }}>
                    <tr>
                        <td>Property Type</td>
                        <td>
                            {/* <label className='custom-radio'>
                                Apartment
                                <input type="radio" value='apartment' name="prop-type" />
                                <span class="checkmark"></span>
                            </label>
                            <label className='custom-radio'>
                                House
                                <input type="radio" value='house' name="prop-type" />
                                <span class="checkmark"></span>
                            </label> */}
                            <div>
                                <input id='apartment-prop' type='radio' value="apartment" name="prop-type" />
                                <label for="apartment-prop">Apartment</label>
                            </div>
                            <div>
                                <input id='house-prop' type='radio' value="house" name="prop-type" />
                                <label for="house-prop">House</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Rent</td>
                        <td><input name='rentCost' onChange={this.handleChange} placeholder='0.00' /></td>
                    </tr>
                    <tr>
                        <td>Property Address</td>
                        <td>
                            <div style={{
                                display: 'flex'
                            }}>
                                <span className="input-composition" style={{ width: 50 }}>
                                    <input type='number' name='houseNumber' onChange={this.handleChange} />
                                    <div>Street Address</div>
                                </span>
                                <span className="input-composition">
                                    <input name='streetName' onChange={this.handleChange} />
                                    <div>Street Name</div>
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Property Location</td>
                        <td>
                            <div style={{
                                display: 'flex'
                            }}>
                                <span className="input-composition" style={{ width: 180 }}>
                                    <input type='number' name='city' onChange={this.handleChange} />
                                    <div>City</div>
                                </span>
                                <span className="input-composition">
                                    <select name='province' defaultValue='ON' onChange={this.handleChange}>
                                        <option value='ON'>Ontario</option>
                                        <option value='QC'>Quebec</option>
                                        <option value='NS'>Nova Scotia</option>
                                        <option value='NB'>New Brunswick</option>
                                        <option value='MB'>Manitoba</option>
                                        <option value='BC'>British Columbia</option>
                                        <option value='PE'>Prince Edward Island</option>
                                        <option value='SK'>Saskatchewan</option>
                                        <option value='AB'>Alberta</option>
                                        <option value='NL'>Newfoundland and Labrador</option>
                                    </select>
                                    <div>Province</div>
                                </span>
                            </div>
                            <br></br>
                            <span className="input-composition">
                                <input name='postalCode' onChange={this.handleChange} />
                                <div>Postal Code</div>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>Location</td>
                        <td>
                            <select></select>
                        </td>
                    </tr>
                    <tr>
                        <td># of bedrooms</td>
                        <td><input onChange={this.handleChange} name="numBedrooms" type="number" placeholder="Number of Bedrooms" /></td>
                    </tr>
                    <tr>
                        <td># of bathrooms</td>
                        <td><input onChange={this.handleChange} name="numBathrooms" type="number" placeholder="Number of Bathrooms" /></td>
                    </tr>
                    <tr>
                        <td># of other rooms</td>
                        <td><input onChange={this.handleChange} name="numOtherRooms" type="number" placeholder="Number of Other Rooms" /></td>
                    </tr>
                </table>

            </div>

            <div className="form-card" id="prop-images">
                
                <div className="card-title-content">
                    <div className="oval-3"><span>2</span></div>
                    <span>Upload Images</span>
                </div>

                <div id='images'>
                    <div className='pic empty'></div>
                    <div className='pic empty'></div>
                    <div className='pic empty'></div>
                    <div className='pic empty'></div>
                    <div className='pic empty'></div>
                </div>

                <br></br>

                <button id='uploadImg'>Upload Images</button>
            </div>

            <button id='editProperty'>Edit Property</button>
        </div>
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        console.log(this.state);
        e.preventDefault()
    }
}

export default UpdateProperty