import React, { Component } from "react";

import { Property } from '../../models'
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

        return <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} name="propertyType" placeholder="Property Type" />
            <input onChange={this.handleChange} name="numBedrooms" type="number" placeholder="Number of Bedrooms"/>
            <input onChange={this.handleChange} name="numBathrooms" type="number" placeholder="Number of Bathrooms" />
            <input onChange={this.handleChange} name="numOtherRooms" type="number" placeholder="Number of Other Rooms" />
            <input onChange={this.handleChange} name='rentCost' type="number" placeholder="Cost of Rent" />
            <input onChange={this.handleChange} name="houseNumber" type="number" placeholder="House number"/>
            <input onChange={this.handleChange} name="steetName" placeholder="Street Name" />
            <input onChange={this.handleChange} name="postalCode" placeholder="Postal Code" />
            <br></br>
            <button type="submit">Update</button>
        </form>
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