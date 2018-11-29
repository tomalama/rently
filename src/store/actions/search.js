export const search = filter => {
    return (dispatch, getState, { getFirestore }) => {
        const db = getFirestore();

        const propertyRef = db.collection('properties');

        const properties = propertyRef
            .where('location', '==', filter.location)
            .where('propertyType', '==', filter.typeOfProperty)
            .where('numBedrooms', '==', filter.numberOfBedrooms)
            .where('numBathrooms', '==', filter.numberOfBathrooms)
            .where('rent', '<=', filter.maximalRent)
            .where('rent', '>=', filter.minimalRent).get()

        properties.then(properties => {
                dispatch({ 
                    type: "SEARCH_SUCCESS",
                    payload: properties
                })
            })
    }
}