const SEARCH_SUCCESS = "SEARCH_SUCCESS"

const addPropertyToArray = querySnapshot => {
    const properties = {};
    const queryData = [];
    var highestRent = 0;
    if(querySnapshot.docs.length > 0) {
        querySnapshot.forEach((docSnapshot) => {
            const id = docSnapshot.id;
            const data = docSnapshot.data();
            if(data.rent > highestRent) {
                highestRent = data.rent;
            }
            properties[id] = data;
        })
    }
    queryData.push(properties);
    queryData.push(highestRent);
    
    return queryData;
}

const dispatchAction = (dbRef, dispatch) => {
    dbRef.then(querySnapshot => {
        const queryData = addPropertyToArray(querySnapshot);
        const properties = queryData[0];
        const maxRent = queryData[1];
        const querySize = Object.keys(properties).length;

        dispatch({ 
            type: SEARCH_SUCCESS,
            payload: { properties, querySize, maxRent }
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