const initState = {
  visitingList: null,
  error: null,
  fetching: false,
}

const visitingListReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCHING_VISITING_LIST":
      return {
        ...state,
        property: null,
        error: null,
        fetching: true,
      }
    case "FETCHED_VISITING_LIST":
      return {
        ...state,
        visitingList: action.payload,
        error: null,
        fetching: false,
      }
    case "ERROR_FETCHING_VISITING_LIST":
      return {
        ...state,
        visitingList: null,
        error: action.error,
        fethcing: false,
      }
    default:
      return state;
  }
  return state;
};


export default visitingListReducer;
