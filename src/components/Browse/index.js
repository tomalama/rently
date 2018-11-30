//React
import React, {Component} from 'react';

//Redux
import { connect } from 'react-redux';

//Paginate
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

//Actions
import { searchAll } from '../../store/actions/search';

import './Browse.scss';

const CARD_WIDTH = 286;
const CARD_HEIGHT = 261;

class Browse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            pageSize: 1,
            browserWidth: window.innerWidth * .75,
            browserHeight: window.innerHeight
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    updateWindowDimensions = () => {
        this.setState({
            browserWidth: window.innerWidth * .75,
            browserHeight: window.innerHeight,
            pageSize: Math.floor(this.state.browserWidth/CARD_WIDTH) *
                Math.floor(this.state.browserHeight/CARD_HEIGHT)
        })
    }
    
    renderProperty = (property, index) => {
        var lowerRange = (this.state.currentPage - 1) * this.state.pageSize
        var upperRange = (this.state.currentPage) * this.state.pageSize
        if(index >= lowerRange && index < upperRange)
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

    onChange = (page) => {
        this.setState({
            currentPage: page
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    componentDidMount() {
        this.props.searchAll();
        
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    render() {
        return (
            <div>
                <div className="card-container">
                    {this.props.properties !== undefined 
                        && this.props.properties.length < 1 
                        && <div className="no-results">No results found</div>}
                    <div className="cards">
                        {this.props.properties !== undefined 
                            && this.props.properties.map((element, index) => this.renderProperty(element, index))}
                    </div>
                </div>
                <Pagination
                    current={this.state.currentPage}
                    pageSize={this.state.pageSize}
                    total={this.props.querySize}
                    onChange={this.onChange}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        properties: state.search.properties,
        querySnapshot: state.search.querySnapshot,
        querySize: state.search.querySize
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchAll: () => dispatch(searchAll())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Browse)