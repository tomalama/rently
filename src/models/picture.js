/**
 * HEADER info
 * I will be sealing the data objects so we cannot accidentally add
 * properties to objects 
 * */

export class Picture {

    constructor(content) {

        this.content = content ? content : '';
    }
}