import React from 'react'
import PropTypes from 'prop-types'

import ImageView from '../Misc/ImageView'
import { Property } from '../../models/property'

import bathroomsSvg from './bathrooms.svg'
import bedroomsSvg from './bedrooms.svg'
import othersSvg from './other.svg'
import './style.scss'


class PropertyCard extends React.Component {

    static propTypes = {
        property: PropTypes.instanceOf(Property).isRequired,
        clickHandler: PropTypes.func,
        showStatus: PropTypes.bool
    }

    static defaultProps = {
        property: new Property(
            'House',
            1,
            1,
            1,
            2000,
            'ON',
            'Ottawa',
            415,
            'Wilbrod St',
            'k1n6m7',
            'Sandy Hill',
            false
        ),
        showStatus: true
    }

    render() {

        const { property, showStatus, clickHandler } = this.props; 

        return <div className='property-card' onClick={clickHandler ? clickHandler : this.defaultClickHandler}>
            <div className='property-card__main-pic'>
                <ImageView image={property.images[0]} />
            </div>
            
            <div className='property-card__content content-1'>
                <div className='property-card__location-composite'>
                    <div className='property-card__house-address'>{property.getFullAddress()}</div>
                   
                    <div className='property-card__house-location'>{property.location}</div>
                   
                    <div className='property-card__house-rent'>$ {(property.rent ? property.rent : 0.00)} / month</div>
                </div>
                
                <div className='property-card__other-pics'>
                    { property.images.splice(1).map((img, i) => <ImageView image={img} key={i} />) }
                </div>
            </div>
            
            <div className='property-card__dividor' />
            
            <div className='property-card__content content-2'>
                <div className='property-card__bedrooms'>
                    <img src={bedroomsSvg} />
                    
                    <span className='number'>{property.numBedrooms}</span>
                    
                    <span className='text'> bedroom{property.numBedrooms && property.numBedrooms > 1 ? 's': ''}</span>
                </div>
                
                <div className='property-card__bathrooms'>
                    <img src={bathroomsSvg} />
                    
                    <span className='number'>{property.numBathrooms}</span>
                    
                    <span className='text'> bathroom{property.numBathrooms && property.numBathrooms > 1 ? 's': ''}</span>
                </div>
                <div className='property-card__other'>
                    <img src={othersSvg} />
                   
                    <span className='number'>{property.numOtherRooms}</span>
                   
                    <span className='text'> other room{property.numOtherRooms && property.numOtherRooms > 1 ? 's' : ''}</span>
                </div>
            </div>
            
            { showStatus &&
            <div className={'property-card__status' + (property.deleted ? ' inactive' : ' active')}>{property.deleted ? 'Inactive' : 'Active'}</div>
            }
        </div>
    }

    defaultClickHandler = (e) => {
        console.log(e, this);
    }
}

export default PropertyCard