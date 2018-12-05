import _ from 'lodash'

/**
 * HEADER info
 * I will be sealing the data objects so we cannot accidentally add
 * properties to objects 
 * */ 

 export class Property {

    constructor(id, propertyType, numBedrooms, numBathrooms, numOtherRooms, rent, province, city, streetNumber, streetName, postalCode, location, deleted, images) {

        this.id = id;
        this.propertyType = propertyType;
        this.numBedrooms = numBedrooms;
        this.numBathrooms = numBathrooms;
        this.numOtherRooms = numOtherRooms;
        this.rent = rent;
        this.province = province;
        this.city = city;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.postalCode = postalCode;
        this.location = location;
        this.deleted = deleted;
        //this line is to enforce the 0..5
        this.images = images && images.length > 0 ? images.splice(0,5) : _.times(5, _.constant(null))
    }

    getFullAddress() {
        return `${this.streetNumber} ${this.streetName} ${this.city}, ${this.province}`;
    }
}