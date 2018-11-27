/**
 * HEADER info
 * I will be sealing the data objects so we cannot accidentally add
 * properties to objects 
 * */

export class Location {

    constructor(properties) {

        this.properties = properties ? properties : '';
    }
}