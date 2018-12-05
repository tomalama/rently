const initState = {
  authError: null,
  visitingList: {
    error: null,
    success: null
  },
  deletingProperty: {
    error: null,
    success: null
  }
};

const propertyReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_PROPERTY":
      console.log("Added property");
      return state;

    case "ADD_TO_VISITING_LIST_ERROR":

      console.error(action.err.e, action.err.message);
      return Object.assign({}, state, {visitingList: { error: action.err.message, success: null }})

    case "ADD_TO_VISITING_LIST_SUCCESS":
      return Object.assign({}, state, { visitingList: { error: null, success: action.payload.message }});

    case "DELETE_PROPERTY_ERROR":

      console.error(action.err.e, action.err.message)
      return Object.assign({}, state, { deletingProperty: { error: action.err.message, success: null }});

    case "DELETE_PROPERTY_SUCCESS":
      return Object.assign({}, state, { deletingProperty: { error: null, success: action.payload.message }});

    default:
      return state;
  }
};

export default propertyReducer;
