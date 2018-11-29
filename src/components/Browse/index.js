//React
import React, {Component} from 'react';

//Redux
import { connect } from 'react-redux';

//Actions
import { searchAll } from '../../store/actions/search';

import './Browse.scss';

class Browse extends Component {
    
    renderProperty = (property, index) => {
        return (
            <div className="card" key={index}>
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

    addPropertyToArray = querySnapshot => {
        const propertyItems = []
        if(this.props.properties.size > 0) {
            this.props.properties.forEach((docSnapshot) => {
                const data = docSnapshot.data();
                propertyItems.push(data);
            })
        }
        return propertyItems;
    }

    componentDidMount() {
        this.props.searchAll();
    }

    render() {
        return (
            <div className="card-container">
                <div className="cards">
                    {this.props.properties !== undefined 
                        && (this.addPropertyToArray(this.props.properties))
                            .map((element,index) => this.renderProperty(element, index))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        properties: state.search.properties
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchAll: () => dispatch(searchAll())
    };
};

// export default compose(
//     firestoreConnect(['properties']),
//     connect((state, props) => ({
//         properties: state.firestore.ordered.properties
//     })),
//     connect(mapStateToProps)
// )(Browse)

export default connect(mapStateToProps, mapDispatchToProps)(Browse)