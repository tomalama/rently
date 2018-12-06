import * as _ from "lodash";

const SEARCH_SUCCESS = "SEARCH_SUCCESS"

const dispatchAction = (dbRef, filter, dispatch) => {
    dbRef.then(querySnapshot => {
        const tmp = [];
        querySnapshot.forEach((doc) => {
          const property = doc.data();
          property['propertyId'] = doc.id;
          tmp.push(property);
        });
        const properties = _.filter(tmp, (property) => {
          if (!filter) {
            return true;
          }
          return property.numBedrooms >= filter.numberOfBedrooms && property.numBathrooms >= filter.numberOfBathrooms;
        });

        const maxRent = _.max(_.map(properties, (p) => { return parseInt(p.rent)}));
        const querySize = properties.length;

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
            .where('rent', '<=', filter.maximalRent)
            .where('rent', '>=', filter.minimalRent).get()

        dispatchAction(properties, filter, dispatch);
    }
}


export const searchAll = () => {
    return(dispatch, getState, { getFirestore }) => {
        const db = getFirestore();

        const allProperties = db.collection('properties').get()

        dispatchAction(allProperties, null, dispatch);
    }
}
