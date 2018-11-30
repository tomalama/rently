const SEARCH_SUCCESS = "SEARCH_SUCCESS"

const addPropertyToArray = querySnapshot => {
    const properties = [];
    if(querySnapshot.docs.length > 0) {
        querySnapshot.forEach((docSnapshot) => {
            const data = docSnapshot.data();
            properties.push(data);
        })
    }
    return properties;
}

const dispatchAction = (dbRef, dispatch) => {
    dbRef.then(querySnapshot => {
        const properties = addPropertyToArray(querySnapshot);
        const querySize = properties.length;
        dispatch({ 
            type: SEARCH_SUCCESS,
            payload: { properties, querySnapshot, querySize }
        })
    })
}

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

        dispatchAction(properties, dispatch);
    }
}

export const searchAll = () => {
    return(dispatch, getState, { getFirestore }) => {
        const db = getFirestore();

        const allProperties = db.collection('properties').get()

        dispatchAction(allProperties, dispatch);
    }
}