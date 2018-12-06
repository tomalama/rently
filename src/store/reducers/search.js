const initState = []

const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEARCH_SUCCESS': {
            console.log("Search success");
            const properties = action.payload.properties;
            const querySize = action.payload.querySize;
            const maxRent = action.payload.maxRent;
            
            if (maxRent !== undefined && maxRent !== null) {
                return {
                    ...state,
                    properties,
                    querySize,
                    maxRent
                };
            } else {
                return {
                    ...state,
                    properties,
                    querySize
                }
            }
        }
        
        default:
            return state;
    }
}

export default searchReducer