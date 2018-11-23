/**
 * HEADER info
 * I will be sealing the data objects so we cannot accidentally add
 * properties to objects 
 * */

 export class RentalSystem {

    constructor(locations, properties, rentRecords, userAccounts) {
        this.locations = locations;
        this.properties = properties;
        this.rentRecords = rentRecords;
        this.userAccounts = userAccounts;
    }
 }