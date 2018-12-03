/**
 * HEADER info
 * I will be sealing the data objects so we cannot accidentally add
 * properties to objects 
 * */ 

 export class RentRecord {

    constructor(email, rentCost, rentalDate, rentalTime, customer, property) {
        this.email = email ? email : '';
        this.rentCost = rentCost ? rentCost : '';
        this.rentalDate = rentalDate ? rentalDate : '';
        this.rentalTime = rentalTime ? rentalTime : '';
        this.customer = customer ? customer : null;
        this.property = property ? property : null;
    }
 }