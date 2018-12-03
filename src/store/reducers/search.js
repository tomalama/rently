const initState = []

const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEARCH_SUCCESS': {
            console.log("Search success");
            const properties = action.payload.properties;
            const querySize = action.payload.querySize;
            const maxRent = action.payload.maxRent;
            return {
                ...state,
                properties,
                querySize,
                maxRent
            };
        }
        
        default:
            return state;
    }
}

export default searchReducer