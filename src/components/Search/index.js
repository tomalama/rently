// React
import React, { Component } from "react";

// Slider
import Slider, {createSliderWithTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';

//Dropdown
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import './Search.scss'

const SliderWithTooltip = createSliderWithTooltip(Slider);
const Range = createSliderWithTooltip(Slider.Range);

const roomMarks = {
    0: <strong>0</strong>,
    10: <strong>10</strong>
}

const moneyMarks = {
    0: <strong>0</strong>,
    200000: <strong>200K</strong>
}

class Search extends Component {
    state = {
        location: "Ottawa",
        typeOfProperty: "House",
        numberOfBedrooms: 0,
        numberOfBathrooms: 0,
        minimalRent: 0,
        maximalRent: 0
    };

    bedroomFormatter = v => {
        return `${v} bedrooms`
    }

    bathroomFormatter = v => {
        return `${v} bathrooms`
    }

    moneyFormatter = v => {
        return `$${v}`
    }

    handleLocationChange = e => {
        this.setState({
            location: e
        })
    }

    handleTypeOfPropertyChange = e => {
        this.setState({
            typeOfProperty: e
        })
    }
    
    handleBedroomChange = e => {
        this.setState({
            numberOfBedrooms: e
        })   
    }

    handleBathroomChange = e => {
        this.setState({
            numberOfBathrooms: e
        })
    }

    handleRentalChange = e => {
        this.setState({
            minimalRent: e[0],
            maximalRent: e[1]
        })
    }

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
            <div className="form-container">
                <div className="form-body">
                    <form onSubmit={this.handleSubmit}>
                        <h2>Filter</h2>
                        <div className="input-field">
                            <label htmlFor="location">Location</label>
                            <Dropdown
                                options={["Ottawa", "Gatineau", "All of Ottawa and Gatineau"]}
                                value={this.state.location}
                                onChange={this.handleLocationChange}
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="typeOfProperty">Type of property</label>
                            <Dropdown
                                options={["House", "Apartment"]}
                                value={this.state.typeOfProperty}
                                onChange={this.handleTypeOfPropertyChange}
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="numberOfBedrooms">Number of bedrooms</label>
                            <div>
                                <SliderWithTooltip
                                    tipFormatter={this.bedroomFormatter}
                                    marks={roomMarks}
                                    min={0}
                                    max={10}
                                    step={1}
                                    value={this.state.numberOfBedrooms}
                                    onChange={this.handleBedroomChange}
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <label htmlFor="numberOfBathrooms">Number of bathrooms</label>
                            <div>
                                <SliderWithTooltip
                                    tipFormatter={this.bathroomFormatter}
                                    marks={roomMarks}
                                    min={0}
                                    max={10}
                                    step={1}
                                    value={this.state.numberOfBathrooms}
                                    onChange={this.handleBathroomChange}/>
                            </div>
                        </div>
                        <div className="input-field">
                            <label htmlFor="rentalFee">Rental Fee</label>
                            <div>
                                <Range
                                    tipFormatter={this.moneyFormatter}
                                    marks={moneyMarks}
                                    allowCross={false}
                                    min={0}
                                    max={200000}
                                    step={100}
                                    defaultValue={[0, 200000]}
                                    onChange={this.handleRentalChange}
                                />
                            </div>
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
            </div>
        )
    }
}

export default Search;