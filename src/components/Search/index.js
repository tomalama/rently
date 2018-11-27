// React
import React, { Component } from "react";

// Slider
import Slider, {createSliderWithTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';

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
        location: "",
        typeOfProperty: "",
        numberOfBedrooms: 0,
        numberOfBathrooms: 0,
        minimalRent: 0,
        maximalRent: 0
    };

    handleChange = e => {
        this.setState({
          [e.target.id]: e.target.value}
        );
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
    
    handleBedroomChange = e => {
        this.setState({
            numberOfBedrooms: e}
        )   
    }

    handleBathroomChange = e => {
        this.setState({
            numberOfBathrooms: e}
        )
    }

    handleRentalChange = e => {
        this.setState({
            minimalRent: e[0],
            maximalRent: e[1]}
        )
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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Search Properties</h2>
                    <div>
                        <label htmlFor="location">Location</label>
                        {/* todo radiobox for each location */}
                    </div>
                    <div>
                        <label htmlFor="typeOfProperty">Type of property</label>
                        <select id="typeOfProperty">
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                        </select>
                    </div>
                    <div>
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
                    <div>
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
                    <div>
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
        )
    }
}

export default Search