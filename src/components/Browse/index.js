//React
import React, { Component } from 'react';

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
            browserHeight: window.innerHeight * 0.9 - 20
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    updateWindowDimensions = () => {
        this.setState({
            browserWidth: window.innerWidth * .75,
            browserHeight: window.innerHeight * 0.9 - 20,
            pageSize: Math.floor(this.state.browserWidth/CARD_WIDTH) *
                Math.floor(this.state.browserHeight/CARD_HEIGHT)
        })
    }
    
    renderProperty = (id, index) => {
        var lowerRange = (this.state.currentPage - 1) * this.state.pageSize;
        var upperRange = (this.state.currentPage) * this.state.pageSize;
        const imageURL = (this.props.properties[id].imageURLs) ? "url("+this.props.properties[id].imageURLs[0]+")"
            : "url(http://cdn.home-designing.com/wp-content/uploads/2017/05/wood-white-and-charcoal-modern-exterior-paint-themes.jpg)";
        console.log(imageURL);
        if(index >= lowerRange && index < upperRange)
        return (
            <a href={"/property?id="+id} key={id}>
                <div className="card">
                    <span className="card-header" style={{backgroundImage: imageURL}}>
                        <span className="card-title">
                            <h3>{this.props.properties[id].streetName}</h3>
                        </span>
                    </span>
                    <span className="card-summary">
                        ${this.props.properties[id].rent} /month
                    </span>
                    <span className="card-meta">
                        {this.props.properties[id].location}
                    </span>
                </div>
            </a>
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
                    {this.props.properties !== undefined
                        && <div className="total">{this.props.querySize} results found</div>
                    }
                    <div className="cards">
                        {this.props.properties !== undefined
                            && Object.keys(this.props.properties).map(this.renderProperty)}
                    </div>
                </div>
                <div>
                    <Pagination className="pagination"
                            current={this.state.currentPage}
                            pageSize={this.state.pageSize}
                            total={this.props.querySize}
                            onChange={this.onChange}
                        />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        properties: state.search.properties,
        querySize: state.search.querySize
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchAll: () => dispatch(searchAll())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Browse)