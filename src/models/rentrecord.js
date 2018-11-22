/**
 * HEADER info
 * I will be sealing the data objects so we cannot accidentally add
 * properties to objects 
 * */ 

 export class RentRecord {

    constructor(email, rentCost, rentalDate, rentalTime, customer, property) {
        this.email = email;
        this.rentCost = rentCost;
        this.rentalDate = rentalDate;
        this.rentalTime = rentalTime;
        this.customer = customer;
        this.property = property;
    }
 }