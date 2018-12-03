const initState = []

const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEARCH_SUCCESS': {
            console.log("Search success");
            const properties = action.payload.properties;
            const querySize = action.payload.querySize;
            return {
                ...state,
                properties,
                querySize
            };
        }
        
        default:
            return state;
    }
}

export default searchReducer