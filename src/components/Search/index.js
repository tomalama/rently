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

import styles from "./Search.module.scss";

//Slider package scss
import './Slider.scss'

const SliderWithTooltip = createSliderWithTooltip(Slider);
const Range = createSliderWithTooltip(Slider.Range);

const roomMarks = {
    0: <strong>0</strong>,
    10: <strong>10</strong>
}

const moneyMarks = {
    0: <strong>0</strong>,
    100000: <strong>100K</strong>
}

class Search extends Component {
    state = {
        location: "Ottawa",
        typeOfProperty: "House",
        numberOfBedrooms: 0,
        numberOfBathrooms: 0,
        minimalRent: 0,
        maximalRent: 100
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

    handleSubmit = e => {
        e.preventDefault();
        this.props.search(this.state);
    }

    render() {
        return (
            <div className={styles.formContainer}>
                <div className={styles.formBody}>
                    <form onSubmit={this.handleSubmit}>
                        <h2>Filter</h2>
                        <div className={styles.inputField}>
                            <label htmlFor="location">Location</label>
                            <Dropdown
                                options={["Ottawa", "Gatineau", "All of Ottawa and Gatineau"]}
                                value={this.state.location}
                                onChange={this.handleLocationChange}
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label htmlFor="typeOfProperty">Type of property</label>
                            <Dropdown
                                options={["House", "Apartment"]}
                                value={this.state.typeOfProperty}
                                onChange={this.handleTypeOfPropertyChange}
                            />
                        </div>
                        <div className={styles.inputField}>
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
                        <div className={styles.inputField}>
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
                        <div className={styles.inputField}>
                            <label htmlFor="rentalFee">Rental Fee</label>
                            <div>
                                <Range
                                    tipFormatter={this.moneyFormatter}
                                    marks={moneyMarks}
                                    allowCross={false}
                                    min={0}
                                    max={(this.props.maxRent !== undefined) ? parseInt(this.props.maxRent) : 1}
                                    step={1}
                                    defaultValue={(this.props.maxRent !== undefined) ? [0, parseInt(this.props.maxRent)] : [0, 1]}
                                    onChange={this.handleRentalChange}
                                />
                            </div>
                        </div>
                        <div>
                            <button className={styles.searchButton}>Search</button>
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