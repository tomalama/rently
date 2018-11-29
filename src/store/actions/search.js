const SEARCH_SUCCESS = "SEARCH_SUCCESS"

const addPropertyToArray = querySnapshot => {
    if(this.props.properties.size > 0) {
        this.props.properties.forEach((docSnapshot) => {
            const data = docSnapshot.data();
            this.state.propertyItems.push(data);
        })
    }
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

        properties.then(properties => {
                dispatch({ 
                    type: SEARCH_SUCCESS,
                    payload: properties
                })
            })
    }
}

export const searchAll = () => {
    return(dispatch, getState, { getFirestore }) => {
        const db = getFirestore();

        const allProperties = db.collection('properties').get()

        allProperties.then(properties => {
            dispatch({
                type: SEARCH_SUCCESS,
                payload: properties
            })
        })
    }
}