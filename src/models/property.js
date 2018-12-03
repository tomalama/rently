/**
 * HEADER info
 * I will be sealing the data objects so we cannot accidentally add
 * properties to objects 
 * */ 

 export function Property(propertyType, numBedrooms, numBathrooms, numOtherRooms, rentCost, pictures, address) {

    return {
        propertyType: propertyType ? propertyType : null,
        numBedrooms: numBedrooms ? numBedrooms : null,
        numBathrooms: numBathrooms ? numBathrooms : null,
        numOtherRooms: numOtherRooms ? numOtherRooms : null,
        rentCost: rentCost ? rentCost : null,
        address: address ? address : null,
        //this line is to enforce the 0..5
        pictures: pictures && pictures.length > 0 ? pictures.splice(0,5) : []
    }
}