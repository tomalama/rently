// React
import React, { Component } from "react";

class Search extends Component {
    state = {
        location: [],
        typeOfProperty: "",
        numberOfBedrooms: "",
        numberOfBathrooms: "",
        minimalRent: "",
        maximalRent: ""
    };

    handleChange = e => {
        this.setState({
          [e.target.id]: e.target.value}
        );
    };

    validation = () => {
        return this.state.location || this.state.typeOfProperty || this.state.numberOfBedrooms 
            || this.state.numberOfBathrooms || this.state.minimalRent || this.state.maximalRent;
    }

    handleSubmit = e => {
        e.preventDefault();
        // todo add view properties
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Search Properties</h2>
                    <div>
                        <label htmlFor="location">Location</label>
                        {/* todo radiobox for each location */}
                    </div>
                    <div>
                        <label htmlFor="typeOfProperty">Type of property</label>
                        <input type="text" id="typeOfProperty" onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor="numberOfBedrooms">Number of bedrooms</label>
                        <input type="number" id="numberOfBedrooms" step="1" onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor="numberOfBathrooms">Number of bathrooms</label>
                        <input type="number" id="numberOfBathrooms" step="1" onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor="minimalRent">Minimal desired rent</label>
                        <input type="number" id="minimalRent" step="0.01" onChange={this.handleChange}></input>
                        <label htmlFor="maximalRent">Maximal desired rent</label>
                        <input type ="number" id="maximalRent" step="0.01" onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <button disabled={!this.validation()}>Search</button>
                    </div>
                </form>
                {   
                    !this.validation() ? <p style={{color: 'red'}}>Form cannot be empty</p>
                    : ""
                }
            </div>
        )
    }
}

export default Search