/**
 * HEADER info
 * I will be sealing the data objects so we cannot accidentally add
 * properties to objects 
 * */

export class UserAccount {

    constructor(username, email, password, fullName, accountType, user) {

        this.username = username;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.accountType = accountType;
        this.user = user;
    }
}

export class User {

}

export class Owner extends User {

    constructor(properties) {
        super();

        this.properties = properties;
    }
}

export class Customer extends User {

    constructor(visitingList, maxRent, rentRecords) {
        super();
        
        this.visitingList = visitingList;
        this.maxRent = maxRent;
        this.rentRecords = rentRecords;
    }
}

export class Agent extends User {
    
}