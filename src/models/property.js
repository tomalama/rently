/**
 * HEADER info
 * I will be sealing the data objects so we cannot accidentally add
 * properties to objects 
 * */ 

 export class Property {

    constructor(propertyType, numBedrooms, numBathrooms, numOtherRooms, rentCost, pictures, address) {

        this.propertyType = propertyType;
        this.numBedrooms = numBedrooms;
        this.numBathrooms = numBathrooms;
        this.numOtherRooms = numOtherRooms;
        this.rentCost = rentCost;
        this.address = address;
        //this line is to enforce the 0..5
        this.pictures = pictures && pictures.length > 0 ? pictures.splice(0,5) : []
    }
 }