export default function searchReducer(state = [], action) {
    switch (action.type) {
        case 'SEARCH_SUCCESS': {
            console.log("Search success");
            const properties = action.payload;
            return {
                ...state,
                properties
            };
        }
        
        default:
            return state;
    }
}