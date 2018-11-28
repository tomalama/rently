//React
import React, {Component} from 'react';

//Redux
import { compose } from 'redux';
import { connect } from 'react-redux';

//Firebase
import { firestoreConnect } from 'react-redux-firebase';

import './Browse.scss';

class Browse extends Component {
    state = {
        propertyItems: []
    };
    
    renderProperty(property) {
        // return <div>{property.location}</div>
        return (
            <div className="card" key={property.streetName}>
                <span className="card-header" style={{backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsxk7HOaKjZk3rlDtNngrk2KWnhJuNI6MCLVlIso9KFIp6ICRbMg)"}}>
                    <span className="card-title">
                        <h3>{property.streetName}</h3>
                    </span>
                </span>
                <span className="card-summary">
                    ${property.rent} /month
                </span>
                <span className="card-meta">
                    {property.location}
                </span>
            </div>
        )
    }

    render() {
        if(this.props.properties) {
            this.propertyItems = this.props.properties.map(
                this.renderProperty
            )
        }
        return (
            <div className="card-container">
                <div className="cards">
                    {this.propertyItems}
                </div>
            </div>
        )
    }
}

export default compose(
    firestoreConnect(['properties']),
    connect((state, props) => ({
        properties: state.firestore.ordered.properties
    }))
)(Browse)