/**
 * HEADER info
 * I will be sealing the data objects so we cannot accidentally add
 * properties to objects 
 * */ 

 //another note, I might try to get the model setup in the backend with firebase functions
 export { UserAccount, User, Owner, Customer, Agent } from './accounts'
 export { RentRecord } from './rentrecord'
 export { Property } from './property'
 export { Location } from './location'
 export { Picture } from './picture'
 export { Address } from './address'
 export { RentalSystem } from './rentalsystem'