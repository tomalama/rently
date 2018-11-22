/**
 * HEADER info
 * I will be sealing the data objects so we cannot accidentally add
 * properties to objects 
 * */

export class Address {

    constructor(houseNumber, streetName, postalCode) {

        this.houseNumber = houseNumber;
        this.streetName = streetName;
        this.postalCode = postalCode;
    }
}