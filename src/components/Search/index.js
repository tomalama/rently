// React
import React, { Component } from "react";

//Redux
import { connect } from 'react-redux';

//Actions
import { search } from '../../store/actions/search';

// Slider
import Slider, {createSliderWithTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';

//Dropdown
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

//Locations
import { locations } from "../../constants/geographic-info";

import "./Search.scss";

const SliderWithTooltip = createSliderWithTooltip(Slider);
const Range = createSliderWithTooltip(Slider.Range);

const roomMarks = {
    0: <p>0</p>,
    10: <p>10</p>
}


class Search extends Component {
    state = {
        location: "Ontario",
        typeOfProperty: "House",
        numberOfBedrooms: 0,
        numberOfBathrooms: 0,
        minimalRent: 0,
        maximalRent: 50,
        maxRent: 50
    };

    rentMarks = {
      0: <p>0</p>
    }

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
            typeOfProperty: e.value
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

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.search(this.state);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.maxRent !== this.props.maxRent) {
            if (prevProps.maxRent !== undefined) {
                if (this.state.maxRent <= prevProps.maxRent) {
                    this.setState({
                        maxRent: prevProps.maxRent
                    })
                }
            }
        }
        this.rentMarks = {
          0: <p>0</p>
        }
        this.rentMarks[this.props.maxRent || this.state.maxRent] = <p>{this.props.maxRent || this.state.maxRent}</p>;

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
                                options={locations}
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
                                    included={false}
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
                                    included={false}
                                    value={this.state.numberOfBathrooms}
                                    onChange={this.handleBathroomChange}/>
                            </div>
                        </div>
                        <div className="input-field">
                            <label htmlFor="rentalFee">Rental Fee</label>
                            <div>
                                <Range
                                    tipFormatter={this.moneyFormatter}
                                    marks={this.rentMarks}
                                    allowCross={false}
                                    min={0}
                                    max={this.props.maxRent}
                                    step={1}
                                    value={[this.state.minimalRent, this.state.maximalRent]}
                                    onChange={this.handleRentalChange}
                                />
                            </div>
                        </div>
                        <div>
                            <button className="search-button">Search</button>
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

const mapStateToProps = state => {
    return {
        maxRent: state.search.maxRent
    };
};

const mapDispatchToProps = dispatch => {
    return {
        search: filter => dispatch(search(filter))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
