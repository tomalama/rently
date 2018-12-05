const initState = {
  authError: null,
  visitingList: {
    error: null,
    success: null
  },
  property: null,
  error: null,
  fetching: false,
};

const propertyReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_PROPERTY":
      console.log("Added property");
      return state;

    case "UPDATE_PROPERTY":
      console.log("Updated property");
      return state;

    case "ADD_TO_VISITING_LIST_ERROR":

      console.error(action.err.e, action.err.message);
      return Object.assign({}, state, {visitingList: { error: action.err.message, success: null }})

    case "ADD_TO_VISITING_LIST_SUCCESS":
      return Object.assign({}, state, { visitingList: { error: null, success: action.payload.message }});
    case "FETCHING_PROPERTY":
      return {
        ...state,
        property: null,
        error: null,
        fetching: true,
      }
    case "FETCHED_PROPERTY":
      return {
        ...state,
        property: action.payload,
        error: null,
        fetching: false,
      }
    case "ERROR_FETCHING_PROPERTY":
      return {
        ...state,
        property: null,
        error: action.error,
        fetching: false,
      }
    default:
      return state;
  }
};

export default propertyReducer;
