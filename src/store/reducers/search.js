const initState = []

const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEARCH_SUCCESS': {
            console.log("Search success");
            const properties = action.payload.properties;
            const querySnapshot = action.payload.querySnapshot;
            const querySize = action.payload.querySize;
            return {
                ...state,
                properties,
                querySnapshot,
                querySize
            };
        }
        
        default:
            return state;
    }
}

export default searchReducer